/**
 * /anwsers/:id のvueコンポーネント
 * idで指定されたアンケート結果を集計表示することができる
 * 
 *
 */

<template>
  <v-card>
    <!-- アンケート結果が非公開の場合は、アクセストークを入力させるダイアログを表示 -->
    <v-dialog v-model='visibleInputTokenDialog'>
      <v-card>
        <v-card-title> アクセストークンを入力 
        </v-card-title>
        <v-text-field v-model='token' placeholder='トークンを貼り付けて下さい'>
        </v-text-field>
        <v-btn color="primary" block @click="getPrivateAnswer" > アクセス
          <v-icon small> mdi-download </v-icon>
        </v-btn>
      </v-card>
    </v-dialog>
    <div v-if='visibleError' style="padding: 25px; text-align: center">
      アクセスが拒否されました
      {{ errorMessage }}
    </div>
    <!-- ダイアログ終了 -->

    <v-card v-if=visibleAnswer>
     <!-- アンケート情報の表示 -->
     <v-card-subtitle> 
         <v-icon small> mdi-folder </v-icon>
       {{ question.title }}
         <v-icon small> mdi-account </v-icon> by {{ question.owner }}
         <v-icon small> mdi-text </v-icon> 目的 {{ question.purpose }}
         <v-icon small> mdi-message </v-icon> 詳細 {{ question.description }}
         <v-icon small> mdi-tag </v-icon> {{ question.tagsString }}
         <v-icon small> mdi-key </v-icon> {{ question.isPublicAnswer? "回答は公開":"回答は非公開" }}
     </v-card-subtitle>

     <!-- 集計結果の表示開始 -->
     <h3 style="padding: 25px;"> 集計結果   (回答数：{{ answer.length }}件 )
     </h3>

     <!-- 個々質問と回答集計の表示 -->
     <v-card v-for="(n,index) in question.total" :key="index" style="padding: 25px;">

       <div>
         <v-icon> mdi-pencil </v-icon>
         質問{{ n }}
       </div>
       <div style="padding: 10px 25px;" v-html="convertMarkdownToHTML(question.items[n-1].questionText)">
       </div>
       
       <!-- 自由形式回答の集計結果表示 -->
       <div style="padding: 10px 25px;" v-if="question.items[n-1].isFreeFormAnswer">
         <div>
           <v-icon> mdi-comment </v-icon>
           回答集計 :自由記述形式回答 (回答が無記入の場合は表示しません)
         </div>
         <ul style="padding: 10px 25px;">
           <li v-for="(value,key,index) in viewAs[n-1]" :key="index">
             {{ key +1 }}  : {{ value}}
           </li>
         </ul>
       </div>
       <!-- 自由形式回答以外の集計結果表示 -->
       <div style="padding: 10px 25px;" v-else>
         <div>
           <v-icon> mdi-comment </v-icon>
           回答集計 
           <span v-if="!question.items[n-1].isFreeFormAnswer && question.items[n-1].isMultipleAnswer"> : 複数選択回答 </span>
           <span v-if="!question.items[n-1].isFreeFormAnswer && !question.items[n-1].isMultipleAnswer"> : 単一選択回答 </span>
         </div>
         <ul style="padding: 10px 25px;">
           <li v-for="(value,key,index) in viewAs[n-1]" :key="index">
             {{ key }} : {{ value}}
           </li>
         </ul>
       </div>
     </v-card>

     <!-- ダウンロードボタン -->
     <v-btn color="primary" block @click="download"> 回答データをダウンロードする
       <v-icon small> mdi-download </v-icon>
     </v-btn>

    </v-card>    
 </v-card>
</template>

<script>
  
import Methods from '@/api/methods'
import { createMarkdown } from 'safe-marked'
import hljs from 'highlightjs'

export default {
  
  // 問題集のid 
  props: ['id'],

  data: () => {

    return {
      // 回答の表示コントロール
      visibleAnswer: false,
      // トークンインプット用のダイアログ表示コントロール
      visibleInputTokenDialog: false,
      // アクセストークン
      token: "",
      // アクセス不可の場合の表示コントロール
      visibleError: false,
      // アクセストークンのチェック関連エラーメッセージ
      errorMessage: "",

      // アンケートidの回答全結果 Array
      answer : [],
      // アンケートidのデータ
      question : {},
      // アンケートid の回答全結果を集計したデータ 表示用
      viewAs : [],
      


      markdown : createMarkdown(
        {
          marked: {
            highlight: function(code, lang){
              const validLanguage = hljs.getLanguage(lang) ? lang : 'plaintext'
              return  hljs.highlight(validLanguage, code).value
            }
          },
          gfm: true
        }
      ),


    }
  }, 
  
  
  created: function(){

    this.getQuestion()
    // ページ作成時にデータを取得する

  },
  
  methods: {

   async getQuestion(){
     // アンケートのデータ取得
     this.question  = await Methods.getQuestionById(this.id)
     this.question.tagsString = this.question.tags.toString()

    if(!this.question.isPublicAnswer){
      // アンケート結果は非公開 トークンの入力へ
      this.visibleInputTokenDialog = true
    } else {
      // アンケート結果は公開
      this.getPublicAnswer()
    }
   },

   // アンケート結果が非公開の場合の回答データ取得処理
   //    トークンのエラー処理が異なるぐらい
   async getPrivateAnswer(){
     this.visibleInputTokenDialog = false
     await Methods.getAnswersAll(this.id, this.token)
       .then((response) => {
         this.answer  = response
         this.visibleAnswer = true
       })
       .catch((err) => {
         this.visibleError = true
         this.errorMessage = err
       })
     if(!this.visibleError){
       this.setViewAs()
     }
   },

   // アンケート結果が公開の場合の回答データ取得処理
   async getPublicAnswer(){
     this.token = ""
     this.answer  = await Methods.getAnswersAll(this.id, this.token)
     this.visibleAnswer = true
     this.setViewAs()
   },

   // 結果の集計表示用のデータ作成処理
   setViewAs(){
      if(this.answer.length == 0){
        return
      }

      // 回答の表示用集約データの作成
      this.viewAs = [] 
      for(let i=0; i<this.question.total; i++){
        if(this.question.items[i].isFreeFormAnswer){
          // フリーフォーム回答
          const freeAnswer = this.answer.map((e) => {return e.items[i].freeFormAnswer})
          this.viewAs.push(freeAnswer.filter((e) => e != ""))
        
        }else if(!this.question.items[i].isFreeFormAnswer && !this.question.items[i].isMultipleAnswer){
          // 単回答
          const singleAnswer = this.answer.map((e) => {return e.items[i].choiceItems[0].text})
          this.viewAs.push(this.toCountDict(singleAnswer,this.question.items[i].choiceItems.map((e1) => e1.text)))
        }else{
          // 複数回答
          const multiAnswer1 = this.answer.map((e) => {return e.items[i].choiceItems.map((e1) => {return e1.text})})
          const multiAnswer2 = multiAnswer1.reduce((a=[], b) => a.concat(b))
          this.viewAs.push( this.toCountDict(multiAnswer2,this.question.items[i].choiceItems.map((e1) => e1.text)) )
        }
      }
   },

    // 該当のアンケートデータをダウンロード
    async download() {
      const filename = "answers.json"
      const data = JSON.stringify(this.answer) 
      if(window.navigator.msSaveOrOpenBolb){
        // for IE
        window.navigator.msSaveOrOpenBlob(data, filename)
      } else {
        // for chrome, firefox
        const url = URL.createObjectURL(new Blob([data], {type: "text/json"}));
        const linkEl = document.createElement('a')
        linkEl.href = url
        linkEl.setAttribute('download', filename)
        document.body.appendChild(linkEl)
        linkEl.click()
        URL.revokeObjectURL(url)
      }
    },

    // keyの出現回数をカウントする
    toCountDict(array, keys){
      let dict = {}
      for(let key of keys){
        dict[key] = array.filter(function(x){return x==key}).length
      }
      return dict
    },

    // マークダウンテキストをHTMLへ変換
    convertMarkdownToHTML(text){
      if(text==null){
        return ""
      }else{
        return this.markdown(text)
      }
    },

  },
}
</script>
