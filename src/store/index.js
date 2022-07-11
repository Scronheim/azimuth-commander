import Vue from 'vue'
import Vuex from 'vuex'
import userModule from '@/store/modules/users'
import vmModule from '@/store/modules/vm'
import networkSettingsModule from '@/store/modules/networkSettings'
import videoSourcesModule from '@/store/modules/videoSources'

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
    setConnectionAuth(state, auth) {
      state.connection.auth = auth
    },
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
    networkSettingsModule,
    videoSourcesModule,
  },
})
