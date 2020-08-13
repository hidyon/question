/**
 * /questions/:id のvueコンポーネント
 * idで指定されたアンケートを表示することができる
 * 
 *  アンケートの表示、回答の選択
 *  （繰り返す）
 *  回答結果の確認表示、登録
 *  
 *
 */

<template>
  <v-card>


     <v-card-subtitle> 
         <v-icon small> mdi-folder </v-icon>
       {{ question.title }}
         <v-icon small> mdi-account </v-icon> by {{ question.owner }}
         <v-icon small> mdi-text </v-icon> {{ question.purpose }}
         <v-icon small> mdi-message </v-icon> {{ question.description }}
         <v-icon small> mdi-tag </v-icon> {{ question.tagsString }}
     </v-card-subtitle>

  <!-- 問題表示部分 開始------------------------------------------------------>
     <div v-if="visibleQuestion">
       <v-card-title>  
         質問 {{ currentIndex }}   
       </v-card-title>
       <div style="padding: 25px;" v-html="convertMarkdownToHTML(currentItem.questionText)">
       </div>
      
       <!-- 自由形式回答 ----------------------------------------------------> 
       <div v-if="isFreeFormAnswer" style="padding: 25px;">
         <v-row>
           <v-col cols=20>
           <v-text-field label="回答記入ください" v-model="freeFormAnswer">
           </v-text-field>
           </v-col>
           <v-col cols=4>
           <v-btn tile outlined color="blue-grey" block @click="setAnswer(currentItem, freeFormAnswer)">
             <v-icon small> mdi-send </v-icon>
             確定 
           </v-btn>
           </v-col>
         </v-row>
       </div>    
      
       <!-- 複数回答 ----------------------------------------------------> 
       <div v-else>
         <div v-if="isMultipleAnswer" style="padding: 25px;">
           <v-row>
             <v-col cols=20>
               <v-select 
                 v-model="choicedItems"
                 itme-value="symbol"
                 item-text="text"
                 label="リストから選択してください"
                 :items="currentChoiceItems"
                 multiple
                 return-object
               > </v-select>  
             </v-col>
             <v-col cols=4>
               <v-btn tile outlined color="blue-grey" block @click="setAnswer(currentItem, choicedItems)">
                 <v-icon small> mdi-send </v-icon>
                 確定  
               </v-btn>
             </v-col>
           </v-row>
         </div>

       <!-- 単一回答 ----------------------------------------------------> 
         <div v-else style="padding: 25px;">
           <v-row>
             <v-col cols=20>
               <v-select 
                 v-model="choicedItem"
                 itme-value="symbol"
                 item-text="text"
                 label="リストから選択してください"
                 :items="currentChoiceItems"
                 return-object
               > </v-select>  
             </v-col>
             <v-col cols=4>
               <v-btn tile outlined color="blue-grey" block @click="setAnswer(currentItem, choicedItem)">
                 <v-icon small> mdi-send </v-icon>
                 確定 
               </v-btn>
             </v-col>
           </v-row>
         </div>
       </div>


     </div>
  <!-- 問題表示部分 終了------------------------------------------------------>

  <!-- 結果表示部分 開始------------------------------------------------------>
     <div v-if="visibleResult">
       <v-data-table
         :headers = "headers"
         :items = "result"
         :items-per-page = "10"
       >
         <template v-slot:item.action="{item}">
           <v-btn tile outlined color="blue-grey" @click="modify(item)">
             <v-icon small> mdi-pencil </v-icon> 修正
           </v-btn>
         </template>
       </v-data-table>
       <v-btn color="primary" block @click="submit"> この内容で回答する 
         <v-icon small> mdi-send </v-icon>
       </v-btn>
     </div>
  <!-- 結果表示部分 終了------------------------------------------------------>


  <!-- 結果表示部分 開始------------------------------------------------------>
     <div v-if="visibleThanks">
       <div style="padding: 25px; text-align: center"> 
       <v-btn tile block color="primary" @click="goHome">
         アンケートへご協力ありがとうございました 
         <v-icon small> mdi-home </v-icon> 
       </v-btn>
       </div>
     </div>
  
  <!-- 結果表示部分 終了------------------------------------------------------>

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

      // 表示コントロール用変数
      visibleQuestion : false, // true: アンケートと回答選択画面を表示
      visibleResult : false,   // true: すべての結果の画面を表示
      visibleThanks : false,   // true: 結果を送信済み、お礼文言の表示
      isFinished : false,      // true: いちどすべての回答を終わらせている（修正は可能）
      isMultipleAnswer : false, // true: 回答は複数選択できる
      isFreeFormAnswer : false, // true: 回答は自由に記述できる

      // アンケートデータ
      question : {},
      

      // 現在の質問
      currentItem : {},
      // 現在の質問INDEX
      currentIndex : 0,
      // 現在の質問文
      currentQuestion : "",
      // 現在の回答選択肢
      currentChoiceItems : [],
      // 選択した回答 (単回答)
      choicedItem :{},
      // 選択した回答 (複数回答）
      choicedItems :[],
      // 選択した回答 (自由形式)
      freeFormAnswer : "",

      
      // すべての回答
      result : [],

      // 回答結果表示用テーブルのヘッダ
      headers : [
        {
          text : "質問 ",
          value : "questionIndex",
          align: "start",
          sortable: false,
        },
        {
          text : "回答内容",
          value : "choiceItemsString",
          sortable: false,
        },
        {
          text : "",
          value : "action",
          align: "end",
          sortable: false,
        },
      ],

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

    // idで指定される問題集データを取得する
   async getQuestionById(){

      this.question  = await Methods.getQuestionById(this.id)
      this.question.tagsString = this.question.tags.toString()

      this.showQuestion(1, false)

    },



    // 質問表示の準備
    showQuestion(questionIndex, isFinished){
         
        // 次の質問の設定
        this.currentIndex = questionIndex
        this.currentItem = this.question.items[questionIndex-1]
        this.currentQuestionText = this.currentItem.questionText
        this.currentChoiceItems = this.currentItem.choiceItems 

        // 次の質問用の回答初期化
        this.choicedItem = {},
        this.choicedItems = [],
        this.freeFormAnswer = "",

        // 画面表示関係の設定
        this.isFinished = isFinished
        this.visibleQuestion = true
        this.visibleResult = false
        this.visibleThanks = false
        this.isMultipleAnswer = this.currentItem.isMultipleAnswer
        this.isFreeFormAnswer = this.currentItem.isFreeFormAnswer
    },

    // 結果の表示の準備 
    showResult(){

        this.isFinished = true
        this.visibleQuestion =  false
        this.visibleResult = true
        this.visibleThanks = false

    },
    
    // 選んだ回答記録、次の質問or結果の表示へ
    setAnswer(item, choosedAnswerItem){

        let choiceItems 
        let choiceItemsString
        let freeFormAnswer
        if( this.isFreeFormAnswer ){
            choiceItems = []
            choiceItemsString = choosedAnswerItem
            freeFormAnswer =  choosedAnswerItem
        } else {
          if ( this.isMultipleAnswer ){
            choiceItems = choosedAnswerItem
            choiceItemsString = choiceItems.map((v) => { return v.text })
            freeFormAnswer = ""
          } else {
            choiceItems = [ choosedAnswerItem ]
            choiceItemsString = choiceItems.map((v) => { return v.text })
            freeFormAnswer = ""
          }
        }

      // isFinished の時は、要素追加ではなく書き換え
      if(this.isFinished){
        let resultItem = this.result.find((v) => v.questionIndex == item.questionIndex)
        resultItem.choiceItems = choiceItems
        resultItem.choiceItemsString = choiceItemsString
        resultItem.freeFormAnswer = freeFormAnswer
        this.showResult()
      } else {
        this.result.push({ 
          "questionIndex" : item.questionIndex, 
          "questionText" : item.questionText,
          "isMultipleAnswer" : item.isMultipleAnswer,
          "choiceItems" : choiceItems,
          "choiceItemsString" : choiceItemsString,
          "isFreeFormAnswer" : item.isFreeFormAnswer,
          "freeFormAnswer" : freeFormAnswer,
           })
       
        
        this.currentIndex = this.currentIndex + 1 
        if( this.question.total >= this.currentIndex ){
          // 次の質問がある状態
          this.showQuestion(this.currentIndex)
        } else {
          // すべての問題へ回答が終了した状態
          this.showResult()
        }
      }

    },

    // 結果表示のなかでクリックした場合には、その質問を再表示する
    modify(item){
      this.showQuestion(item.questionIndex, true)
    },

    // 結果を登録する
    async submit(){

      let postData = {}
      postData.questionId = this.id
      postData.items = this.result.map((v) =>  { return {questionIndex : v.questionIndex,
                                      questionText : v.questionText,
                                      isMultipleAnswer : v.isMultipleAnswer,
                                      choiceItems : v.choiceItems,
                                      isFreeFormAnswer : v.isFreeFormAnswer,
                                      freeFormAnswer : v.freeFormAnswer,
      }})

      await Methods.postAnswer(this.id, postData)
      this.visibleThanks = true
      this.visibleResult = false
    },

    // マークダウンテキストをHTMLへ変換
    convertMarkdownToHTML(text){
      return this.markdown(text)
    },
    
    // Homeへ移動する
    goHome(){
      this.$router.push({path: "/"}) 
    }


  },
}
</script>
