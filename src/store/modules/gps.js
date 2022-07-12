import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const gpsModule = {
  state: {
    gpsData: {
      lat: 57.9804,
      lon: 56.1934,
      configuration: {},
      satellites: [],
      telemetry: {},
    },
    gpsDataIntervalId: null,
  },
  mutations: {
    setGpsData(state, payload) {
      state.gpsData = payload
    },
    setGpsDataIntervalId(state, id) {
      state.gpsDataIntervalId = id
    },
    clearGpsDataIntervalId(state) {
      clearInterval(state.gpsDataIntervalId)
    }
  },
  actions: {
    async startIntervalForGpsData({commit}) {
      commit('setGpsDataIntervalId', setInterval(async () => {
        try {
          const {data} = await axios.get('/gpsdata')
          commit('setGpsData', data.data)
        } catch (e) {
          console.log(e)
          commit('clearGpsDataIntervalId')
        }
      }, 1000))
    },
  },
  getters: {
    gpsData: state => state.gpsData,
  },
}
export default gpsModule
