/**
 *
 * / (Home）ページを表示するveu コンポーネント
 *
 * アンケートを取得しリストで表示することができる
 * リストをクリックすると該当問題を表示するページヘ移動できる（表示を切り替える） 
 *
 */

<template>
  <div class="home">

       <v-data-table
         :headers="headers"
         :items="list"
         :items-per-page="10"
       >
         <template v-slot:item.action1="{item}">
           <v-icon small @click=toQuestion(item)>
             mdi-pencil
           </v-icon>
         </template>
         <template v-slot:item.action3="{item}">
           <v-icon v-if='item.isPublicAnswer' small @click=toAnswers(item)>
             mdi-glasses
           </v-icon>
           <v-icon v-else small @click=toAnswers(item)>
             mdi-key
           </v-icon>
         </template>
       </v-data-table>
  </div>
</template>

<script>

import Methods from '@/api/methods'

export default {

  name: 'home',

  data: () => {

    return {

      // 問題のリスト
      list: [],

      // v-table-data のヘッダー
      headers: [
        { text: "タイトル", value: "title" },
        { text: "回答数", value: "answerCounter" },
        { text: "回答", value: "action1" },
        { text: "結果", value: "action3" },
      ],
      

    }
  },

  created: function ()  {

    const questionId = this.$route.query.id
    if(questionId != null){
      // baseURL/?id=xxxxでアクセスした場合は、直接アンケート回答ページヘ遷移させる 
      this.$router.push({path: '/questions/' + questionId})
    }else{
      // アンケートリストを取得する
      this.getList()
    }
  },
    
  methods: {

    // リストを取得する
    async getList() {
      
      this.list  = await Methods.getQuestionsList()

    },

    // 該当のアンケート表示ページへ移動する
    toQuestion(item) {
      
      const selected_id = item._id
      this.$router.push({path: '/questions/' + selected_id})
      
    },
    // 該当のアンケート集計ページへ移動する
    async toAnswers(item) {

      const selected_id = item._id
      this.$router.push({path: '/answers/' + selected_id})

    },
    


  }
}
</script>

<style>
</style>
