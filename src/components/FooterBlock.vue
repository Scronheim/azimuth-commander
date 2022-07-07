<template>
  <v-card class="flex" color="#272727">
    <v-card-text>
      <v-row>
        <v-col cols="9" class="white--text font-weight-bold" align-self="center">
          {{ dateTime.date }} {{ dateTime.time }} (+{{ dateTime.tz }})
        </v-col>
        <v-col>
          <c-btn-success @click="permanentSaveSettings">Сохранить настройки</c-btn-success>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
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
        const {data} = await axios.get('/gettime')
        this.dateTime = data.data
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
