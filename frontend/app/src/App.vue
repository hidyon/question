<template>
  <div id="app">
   <v-app>

    <v-main>
      <v-container fluid >
      
      <!------------- header -------------------------->
        <v-toolbar color='indigo' dark>
          <v-toolbar-items>
            <v-btn text @click="toHome" ><v-icon small>mdi-home</v-icon> Question </v-btn>
          </v-toolbar-items>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn text @click="toEditNewQuestion" ><v-icon small>mdi-pencil </v-icon>  新規  </v-btn>
            <v-divider vertical></v-divider>
          </v-toolbar-items>
        </v-toolbar >

        <div>
          <img alt="page image" src="./assets/team.png" style="padding: 25px; width: 100%; object-fit: cover;">
        </div>

      <!------------- main  -------------------------->
        <router-view></router-view>

      <!------------- footer -------------------------->

        <v-footer color="indigo" app>
          <v-card-text class="py-2 white--text text-center">
            2020-xtech
          </v-card-text>
        </v-footer>
    
      </v-container >
    </v-main>
   </v-app>
  </div>
</template>

<script>

export default {

  name: 'App',

  data: () => ({
  }),

  methods: {

    // /へ移動
    toHome(){
      if(this.$route.path !== '/'){
        this.$router.push({name: 'home'})
      }
    },

    // /editNewQuestionへ移動
    toEditNewQuestion(){
      if(this.$route.path !== '/editNewQuestion'){
        this.$router.push({name: 'editNewQuestion'})
      }
    },


  }

}
</script>

<style>
</style>
