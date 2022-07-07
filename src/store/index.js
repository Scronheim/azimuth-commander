import Vue from 'vue'
import Vuex from 'vuex'
import userModule from '@/store/modules/users'
import vmModule from '@/store/modules/vm'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    connection: {
      auth: false,
      ip: '',
      port: 80,
      login: '',
      password: '',
    },
  },
  mutations: {
    setConnection(state, params) {
      state.connection = params
    }
  },
  actions: {
  },
  getters: {
    isAuth: state => state.connection.auth,
    connection: state => state.connection
  },
  modules: {
    userModule,
    vmModule,
  },
})
