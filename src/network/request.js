import axios from 'axios'
import Qs from 'qs'

function request(config) {
  const instance = axios.create({
    baseURL: "http://127.0.0.1:8083",
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
