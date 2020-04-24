import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{
      userName:"",
      roleName:localStorage.getItem('roleName') ? localStorage.getItem('roleName') : '',
      isAuth: localStorage.getItem("isAuth") ? localStorage.getItem("isAuth") : false,
      Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    }
  },
  mutations: {
    changeLogin (state, user) {
      state.user.Authorization = user.Authorization;
      state.user.userName = user.username;
      state.user.isAuth = true;
      state.user.roleName = user.roleName;
      localStorage.setItem('Authorization', user.Authorization);
      localStorage.setItem('username', user.username);
      localStorage.setItem('roleName', user.roleName);
      localStorage.setItem('isAuth', 'true');
    }
  },
  actions: {
  },
  modules: {
  }
})
