import Vue from 'vue'
import Vuex from 'vuex'
import Login from './modules/login'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    login: Login
  }
})

export default store