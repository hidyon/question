// backend server との通信に axiosを利用する
// methods.jsに通信種類ごとのメソッドを定義しておく

import axios from 'axios'
import CONF from '../config.json'

export default () => {
  return axios.create({
    // backend server のbaseURLを指定する
    baseURL: "http://" + CONF.BACKEND_DOMAIN + ":" + CONF.BACKEND_PORT
  })
}
