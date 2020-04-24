import axios from 'axios'
import Qs from 'qs'

function request(config) {
  const instance = axios.create({
    baseURL: "http://127.0.0.1:8083",
    timeout: 5000,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
  instance.interceptors.request.use(config => {
      if (localStorage.getItem('Authorization')) {
        config.headers.Authorization = localStorage.getItem('Authorization');
      }
      return config;
    }, error => {
      return Promise.reject(error);
    })

  return instance(config)
}

export {request, Qs}
