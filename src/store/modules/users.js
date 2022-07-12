import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const usersModule = {
  state: {
    me: {},
  },
  mutations: {
    setMe(state, payload) {
      state.me = payload
    }
  },
  actions: {
    async getAboutMe({commit}) {
      const {data} = await axios.get('/users/api/about_me')
      commit('setMe', data.data)
    },
    async login({commit, dispatch}, payload) {
      const headers = new Headers()
      headers.set('Authorization', 'Basic ' + btoa(payload.login + ":" + payload.password))
      try {
        const {status, data} = await axios.get(`http://${payload.ip}/api/info`, {
          auth: {
            username: payload.login,
            password: payload.password
          }
        })
        if (status === 200) {
          axios.defaults.baseURL = `http://${payload.ip}`
          axios.defaults.withCredentials = true
          axios.defaults.auth = {
            username: payload.login,
            password: payload.password
          }
          // Vue.$toast.success('Вход выполнен')
          payload.auth = true
          commit('setConnection', payload)
          commit('setVmInfo', data.data)
          dispatch('getAboutMe')
          dispatch('getSystemInfo')
          dispatch('getModules')
          dispatch('getFlags')
        }
      } catch (e) {
        if (e.response.status === 401) {
          Vue.$toast.error('Неверные логин или пароль')
        }
      }
    }
  },
  getters: {
    me: state => state.me,
  },
}
export default usersModule
