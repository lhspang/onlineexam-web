import axios from 'axios'
import Qs from 'qs'

function request(config) {
  const instance = axios.create({
    //wb中运行
    baseURL: "http://127.0.0.1:8083",
    //本地部署
    // baseURL: "http://127.0.0.1/api",
    //服务器部署
    // baseURL: "https://oe.sens.fun/api",
    timeout: 5000,
  })
  instance.interceptors.request.use(config => {
    let url = config.url;
    if (url.indexOf('login') !== -1 || url.indexOf('register') !== -1 || url.indexOf('captcha') !== -1) {
      return config;
    } else {
      config.headers.Authorization = JSON.parse(sessionStorage.getItem('store')).user.Authorization;
      return config;
    }
  }, error => {
    return Promise.reject(error);
  })
  return instance(config)
}

export {request, Qs}
