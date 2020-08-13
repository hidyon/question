import Api from './index'

export default {
  /**
   * backend-server からidで指定するアンケートを取得する
   * (backend-server)/api/questions/:id GETリクエストの仕様を確認すること
   *         
   */
  async getQuestionById (id) {
    
    let response = await Api().get('/api/questions/' + id)
    let data = response.data
     
    return data
  },
  /**
   * backend-server からアンケートの一覧を取得する
   * (backend-server)/api/questionsList GETリクエストの仕様を確認すること
   *         
   */
  async getQuestionsList () {
    let response = await Api().get('/api/questionsList')
    let list = response.data
    return list
  },

  /**
   * backend-server へアンケートの回答を登録する
   * (backend-server)/api/questions/:id/answers POSTリクエストの仕様を確認すること
   *         
   */
  async postAnswer (id, postData) {
    let response = await Api().post('/api/questions/' + id + "/answers", postData)
    return response
  },
  /**
   * backend-server からアンケート結果を取得する
   * アンケートのidを指定すること
   * (backend-server)/api/questions/:id/answers/all GETリクエストの仕様を確認すること
   *         
   */
  async getAnswersAll (id) {
    let response = await Api().get('/api/questions/' + id + '/answers/all' )
    return response
  },
  /**
   * backend-server へアンケートを新規登録する
   * (backend-server)/api/createQuestion POSTリクエストの仕様を確認すること
   *         
   */
  async postQuestion (data) {
    let response = await Api().post('/api/createQuestion/', data)
    return response
  },
}
