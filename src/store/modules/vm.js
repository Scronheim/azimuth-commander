import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const vmModule = {
  state: {
    info: {
      dongleinfo: {},
    },
    system: {
      configpartinfo: {},
      datapartinfo: {},
      modules: {}
    },
    modules: {
      '0001-base.azt': {
        version: {},
      },
    },
    flags: [],
    peers: [],
  },
  mutations: {
    setVmInfo(state, payload) {
      state.info = payload
    },
    setSystemInfo(state, payload) {
      state.system = payload
    },
    setModules(state, payload) {
      state.modules = payload
    },
    setFlags(state, payload) {
      state.flags = payload
    },
    setPeers(state, payload) {
      state.peers = payload
    },
  },
  actions: {
    async permanentSaveSettings() {
      await axios.get('/api/savesettings')
      Vue.$toast.success('Настройки сохранены')
    },
    async getVmInfo({commit}) {
      const {data} = await axios.get('/api/info')
      commit('setVmInfo', data.data)
    },
    async getSystemInfo({commit}) {
      const {data} = await axios.get('/api/system')
      commit('setSystemInfo', data.data)
    },
    async getModules({commit}) {
      const {data} = await axios.get('/api/versions')
      commit('setModules', data)
    },
    async getFlags({commit}) {
      const {data} = await axios.get('/api/flags')
      commit('setFlags', data.data)
    },
    async getVmPeers({commit}) {
      const {data} = await axios.get('/peers/api/list')
      commit('setPeers', data.data)
    },
  },
  getters: {
    vmInfo: state => state.info,
    systemInfo: state => state.system,
    modules: function (state) {
      return Object.keys(state.modules).map((m) => {
        return {
          name: m,
          description: state.modules[m].description,
          version: state.modules[m].version,
        }
      })
    },
    flags: state => state.flags,
    peers: state => state.peers,
    diskTotalInGb: state => (state.system.disktotal / 1024 / 1024).toFixed(),
    diskFreeInGb: state => (state.system.diskfree / 1024 / 1024).toFixed(),
    percentOfFreeDiskSpace: state => ((state.system.diskfree/state.system.disktotal)*100).toFixed(1),
    dataPartIsCreated: state => state.system.datapartinfo.is_created,
    dataPartIsMounted: state => state.system.datapartinfo.is_mounted,
    configPartIsCreated: state => state.system.configpartinfo.is_created,
    configPartIsMounted: state => state.system.configpartinfo.is_mounted,
    memoryTotalInMb: state => (state.system.memtotal / 1024).toFixed(),
    memoryFreeInMb: state => (state.system.memfree / 1024).toFixed(),
  },
}
export default vmModule
