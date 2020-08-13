/**
 * /anwsers/:id のvueコンポーネント
 * idで指定されたアンケート結果を集計表示することができる
 * 
 *
 */

<template>
  <v-card>

     <!-- アンケート情報の表示 -->
     <v-card-subtitle> 
         <v-icon small> mdi-folder </v-icon>
       {{ question.title }}
         <v-icon small> mdi-account </v-icon> by {{ question.owner }}
         <v-icon small> mdi-text </v-icon> {{ question.purpose }}
         <v-icon small> mdi-message </v-icon> {{ question.description }}
         <v-icon small> mdi-tag </v-icon> {{ question.tagsString }}
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

      // アンケートidの回答全結果を取得したresponseデータ
      resAnswer : {},
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
    // ページ作成時にデータを取得する
     this.getQuestionById()

  },
  
  methods: {

    // idで指定されるデータを取得する（アンケート、アンケート結果）
   async getQuestionById(){

      // バックエンドサーバーからidで指定するアンケート、その回答データを取得する
      this.question  = await Methods.getQuestionById(this.id)
      this.question.tagsString = this.question.tags.toString()
      this.resAnswer  = await Methods.getAnswersAll(this.id)
      this.answer  = this.resAnswer.data


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
