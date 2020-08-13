/**
 * /questions/new のvueコンポーネント
 * 新規のアンケートを作成することができる
 * 
 *
 */

<template>
<div>
  <!-- アンケート作成部分 開始------------------------------------------------------>
  <v-card v-if="visibleCreate" style="padding: 25px; margin: 10px">
    <v-card-title> 新しいアンケートを作成 
    </v-card-title>

    <!-- 基本情報部分 開始------------------------------------------------------>
    <v-card style="padding: 25px;">

      <v-text-field label="タイトル" v-model="question.title">
        <v-icon small slot="prepend"> mdi-folder </v-icon>
      </v-text-field>
     
      <v-text-field label="タグ" v-model="tagsString">>
        <v-icon small slot="prepend"> mdi-tag </v-icon> 
      </v-text-field>

      <v-text-field label="作成者" v-model="question.owner"> 
        <v-icon small slot="prepend"> mdi-account </v-icon> 
      </v-text-field>

      <v-text-field label="目的" v-model="question.purpose">>
        <v-icon small slot="prepend"> mdi-text </v-icon> 
      </v-text-field>

      <v-text-field label="詳細" v-model="question.description"> 
        <v-icon small slot="prepend"> mdi-message </v-icon> 
      </v-text-field>
    </v-card>

    <!-- 質問部分 ------------------------------------------------------------>
  <div v-if="visibleItems">
    <v-card v-for="item in question.items" :key="item.questionIndex" style="padding: 25px;">
      <v-card-subtitle>
        <span>
          質問index {{ item.questionIndex }}
        </span>

        <span v-if="item.isFreeFormAnswer">
          自由形式回答
        </span>
        <span v-else>
          <span v-if="item.isMultipleAnswer"> 
            複数回答選択 
          </span>
          <span v-else>
            単回答選択 
          </span>
        </span>
      </v-card-subtitle>

      <v-card-actions>
        <v-spacer>
        </v-spacer>
        <v-btn color="error" @click="deleteItem(item)"> この質問を削除する
          <v-icon small > mdi-delete </v-icon>
        </v-btn>
      </v-card-actions>

      <v-card-subtitle block> 質問文
      </v-card-subtitle>

      <v-tabs>
        <v-tab> edit 
        </v-tab>
        <v-tab @click="convertMarkdownTextToHTML(item)"> preview
        </v-tab>
        <v-tab-item>
          <v-textarea v-model="item.questionText">
          </v-textarea>
        </v-tab-item>
        <v-tab-item>
          <div v-html="item.questionHTML">
          </div>
        </v-tab-item>
      </v-tabs>

      <div v-if="item.isFreeFormAnswer">
      </div>

      <div v-else>
        <div v-for="choice in item.choiceItems" :key="choice.symbol">
          <v-text-field label="回答選択肢" v-model="choice.text">
          </v-text-field>
        </div>
        <v-card-actions>
          <v-btn block tile color="secondary" @click="addAnswerItem(item)"> 回答選択肢をさらに追加 
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </div>

  <!-- 質問追加ボタン --------------------------------------------------------->
  <v-card style="padding: 10px 25px;">
    <v-card-actions>
      <v-btn block tile color="secondary" @click="addItem(SINGLE)">
        <v-icon small> mdi-plus </v-icon> 単一回答の質問を追加
      </v-btn>
    </v-card-actions>
    <v-card-actions>
      <v-btn block tile color="secondary" @click="addItem(MULTIPLE)">
        <v-icon small> mdi-plus </v-icon> 複数回答の質問を追加
      </v-btn>
    </v-card-actions>
    <v-card-actions>
      <v-btn block tile color="secondary" @click="addItem(FREE_FORM)">
        <v-icon small> mdi-plus </v-icon> 自由形式回答の質問を追加
      </v-btn>
    </v-card-actions>
  </v-card>

  <!-- アンケート登録ボタン --------------------------------------------------->
  <v-card style="padding: 10px 25px;">
    <v-card-actions>
        <v-btn block tile color="primary" @click=submit>
          <v-icon small> mdi-send </v-icon> この内容でアンケートを登録する 
        </v-btn>
    </v-card-actions>
  </v-card>

 </v-card>

 <!-- 登録終了後メッセージ --------------------------------------------------->
 <v-card v-if="visibleThanks">
    <div style="padding: 25px; text-align: center">
      アンケートの新規登録が完了しました
    </div>
    <div style="padding: 25px; text-align: center">
      回答希望者へURLを伝えましょう
    </div>
    <div style="padding: 25px; text-align: center">
      {{ "http://"+ config.FRONTEND_DOMAIN + "/?id=" + postRes.data._id}}
    </div>
  </v-card>

</div>
</template>

<script>
  
import Methods from '@/api/methods'
import {createMarkdown} from 'safe-marked'
import hljs from 'highlightjs'
import CONF from '@/config.json'

export default {
  

  data: () => {

    return {

      // 設定定数
      config : CONF,
      // 質問作成の画面表示コントロール true: 表示する
      visibleCreate : true,
      // 各質問の画面表示コントロール true: 表示する
      visibleItems : false,
      // 登録終了後のメッセージ画面表示コントロール true: 表示する
      visibleThanks : false,

      // アンケートデータ
      question : {
        title : "",
        tags : [],
        owner : "",
        purpose : "",
        description : "",
        items : [],
        answerCounter : 0,
      },

      // タグのデータ（文字列型）
      tagsString : "",

      // 登録レスポンスデータ
      postRes : {},

      // 質問数
      questionCounter : 0,

      // 回答方式
      SINGLE : 1,     // 単回答方式
      MULTIPLE : 2,   // 複数回答方式
      FREE_FORM : 3,  // 自由回答方式

      // マークダウンパーサ
      markdown : createMarkdown(
        {
          marked: {
            highlight: function(code, lang){
              const validLanguage = hljs.getLanguage(lang) ? lang : 'plaintext'
              return hljs.highlight(validLanguage, code).value
            },
            gfm: true,

          }
        }
      ),

    }
  }, 
  
  
  methods: {


    // 作成した新規アンケートを登録する
    async submit(){

      this.question.tags = this.tagsString.split(",")
      let newQuestion = this.question
      this.postRes = await Methods.postQuestion(newQuestion)
      this.visibleCreate = false
      this.visibleThanks = true

    },

    // Homeへ移動する
    goHome(){
      this.$router.push({path: "/"}) 
    },

    // 質問を追加する
    addItem(answerType){

      this.visibleItems = true
      this.questionCounter += 1

      let isMultipleAnswer = false
      if(answerType == this.MULTIPLE){
        isMultipleAnswer = true
        isFreeFormAnswer = false
      }
      let isFreeFormAnswer = false
      if(answerType == this.FREE_FORM){
        isMultipleAnswer = false
        isFreeFormAnswer = true
      }

      this.question.items.push({
        questionIndex : this.questionCounter,
        questionText : "",
        questionHTML : "",
        isMultipleAnswer : isMultipleAnswer,
        choiceItems : [{symbol: "1", text : ""}],
        isFreeFormAnswer : isFreeFormAnswer,
        isDelete : false,
      })
    },

    // 回答選択肢を追加する
    addAnswerItem(item){

      let number = (item.choiceItems.length + 1).toString()

      item.choiceItems.push({
        symbol : number,
        text : "",
      })

    },

    // 該当の質問を削除する
    deleteItem(item){

      item.isDelete = true
      // 該当の要素だけをのぞく
      this.question.items = this.question.items.filter((v) => {return v.isDelete == false})
      // indexを採番しなおす
      this.question.items.map((v, index) => v.questionIndex = index+1) 
      this.questionCounter -= 1

    },

    // マクーダウン形式のテキストをHTMLへ変換する
    convertMarkdownTextToHTML(item) {
      item.questionHTML = this.markdown(item.questionText)
    },

  },
}
</script>

<style src="highlightjs/styles/github-gist.css"></style>

