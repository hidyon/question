import Vue from 'vue'
import VueRouter from 'vue-router'
import homeComponent from './components/home.vue'
import questionComponent from './components/question.vue'
import questionEditorComponent from './components/questionEditor.vue'
import answerComponent from './components/answer.vue'


Vue.use(VueRouter)

const routes = [
  { path : '/', name: 'home', component: homeComponent },
  { path : '/questions/:id', name:'question',  component: questionComponent, props: true },
  { path : '/editNewQuestion', name:'editNewQuestion',  component: questionEditorComponent },
  { path : '/answers/:id', name:'answer',  component: answerComponent, props: true },
]

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


