import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const videoSourcesModule = {
  state: {
    connectedGige: [],
    rtspServers: [],
    rtspClients: [],
  },
  mutations: {
    setConnectedGige(state, payload) {
      state.connectedGige = payload
    },
    setRtspServers(state, payload) {
      state.rtspServers = payload
    },
    setRtspClients(state, payload) {
      state.rtspClients = payload
    },
  },
  actions: {
    async getConnectedGige({commit}) {
      const {data} = await axios.get('/sources/api/gige/connected')
      commit('setConnectedGige', data.data.channels)
    },
    async getRtspServers({commit}) {
      const {data} = await axios.get('/sources/api/rtspserver/streams')
      commit('setRtspServers', data.data.streams)
    },
    async getRtspClients({commit}) {
      const {data} = await axios.get('/sources/api/rtsp/connected')
      commit('setRtspClients', data.data)
    },
  },
  getters: {
    connectedGige: state => state.connectedGige,
    rtspServers: state => state.rtspServers,
    rtspClients: function (state) {
      return Object.entries(state.rtspClients).map((c) => {
        return {
          name: c[0],
          info: c[1]
        }
      })
    },
  },
}
export default videoSourcesModule
