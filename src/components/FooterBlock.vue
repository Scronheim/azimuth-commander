<template>
  <v-container fluid>
    <v-row>
      <v-col cols="1" align-self="center">
        <v-sheet rounded
                 :color="$store.getters.isAuth ? 'success': 'error'"
                 height="30"
                 width="30"
                 :title="$store.getters.isAuth ? 'OK': 'Не подключен'"
        />
      </v-col>
      <v-col>
        <v-btn text>{{ $store.getters.me.login }} ({{ $store.getters.me.group }})</v-btn>
      </v-col>
      <v-col cols="6" class="white--text font-weight-bold" align-self="center">
        {{ dateTime.date }} {{ dateTime.time }} (+{{ dateTime.tz }})
      </v-col>
      <v-col>
        <c-btn-success @click="permanentSaveSettings">Сохранить настройки</c-btn-success>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: "FooterBlock",
  mounted() {
    this.startIntervalForDateTime()
  },
  data: () => ({
    dateTime: {
      date: '',
      time: '',
      tz: 5,
    },
  }),
  methods: {
    async startIntervalForDateTime() {
      setInterval(async () => {
        try {
          const {data} = await axios.get('/gettime')
          this.dateTime = data.data
        } catch (e) {
          this.$store.commit('setConnectionAuth', false)
        }
      }, 1000)
    },
    permanentSaveSettings() {
      this.$store.dispatch('permanentSaveSettings')
    }
  }
}
</script>

<style scoped>

</style>
