// network methods
import axios from 'axios'
import CONF from '../config.json'

const baseURL = "http://" + CONF.BACKEND_DOMAIN + ":" + CONF.BACKEND_PORT 

export default {
  /**
   * backend-server からidで指定するアンケートを取得する
   * (backend-server)/api/questions/:id GETリクエストの仕様を確認すること
   *         
   */
  async getQuestionById (id) {
    const response = await axios({
      method: 'get',
      url: baseURL + '/api/questions/' + id
    })
    return response.data
  },
  /**
   * backend-server からアンケートの一覧を取得する
   * (backend-server)/api/questionsList GETリクエストの仕様を確認すること
   *         
   */
  async getQuestionsList () {
    const response = await axios({
      method: 'get',
      url: baseURL + '/api/questionsList'
    })
    return response.data
  },

  /**
   * backend-server へアンケートの回答を登録する
   * (backend-server)/api/questions/:id/answers POSTリクエストの仕様を確認すること
   *         
   */
  async postAnswer (id, postData) {
    const response = await axios({
      method: 'post',
      url: baseURL + '/api/questions/' + id + '/answers',
      data: postData
    })
    return response.data
  },
  /**
   * backend-server からアンケート結果を取得する
   * アンケートのidを指定すること
   * (backend-server)/api/questions/:id/answers/all GETリクエストの仕様を確認すること
   *         
   */
  async getAnswersAll (id, token) {
    const response = await axios({
      method: 'get',
      url: baseURL + "/api/questions/" + id + "/answers/all",
      headers: { 'Authorization': 'Bearer '+ token},
    })
    return response.data
  },
  /**
   * backend-server へアンケートを新規登録する
   * (backend-server)/api/createQuestion POSTリクエストの仕様を確認すること
   *         
   */
  async postQuestion (data) {
    const response = await axios({
      method: 'post',
      url: baseURL + '/api/createQuestion/', 
      data: data
    })
    return response.data
  },
}


