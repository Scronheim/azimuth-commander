import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const networkSettingsModule = {
  state: {
    settings: {
      interfaces: {
        adapters: [],
        bridges: [],
        vlans: [],
      }
    }
  },
  mutations: {
    setSettings(state, payload) {
      state.settings = payload
    },
  },
  actions: {
    async getNetworkSettings({commit}) {
      const {data} = await axios.get('/networks/network_adapters/settings')
      commit('setSettings', data.data)
    },
  },
  getters: {
    networkSettings: state => state.settings,
    bridges: state => state.settings.interfaces.bridges,
    adapters: state => state.settings.interfaces.adapters,
  },
}
export default networkSettingsModule
