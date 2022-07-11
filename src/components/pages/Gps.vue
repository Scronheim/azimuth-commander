<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <v-simple-table dense>
          <thead>
            <tr>
              <th>Параметр</th>
              <th>Значение</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Дата, время (UTC)</td>
              <td>{{ gpsData.utcdatetime }}</td>
            </tr>
            <tr>
              <td>Широта</td>
              <td>{{ gpsData.lat }}</td>
            </tr>
            <tr>
              <td>Долгота</td>
              <td>{{ gpsData.lon }}</td>
            </tr>
            <tr>
              <td>Спутников в слежении</td>
              <td>{{ gpsData.telemetry.tracking_sat_count }}</td>
            </tr>
            <tr>
              <td>Спутников в решении</td>
              <td>{{ gpsData.telemetry.using_sat_count }}</td>
            </tr>
            <tr>
              <td>Средний с/ш, дБ</td>
              <td>{{ averageSnr }}</td>
            </tr>
            <tr>
              <td>PDOP</td>
              <td>{{ gpsData.pdop }}</td>
            </tr>
            <tr>
              <td>HDOP</td>
              <td>{{ gpsData.hdop }}</td>
            </tr>
            <tr>
              <td>VDOP</td>
              <td>{{ gpsData.vdop }}</td>
            </tr>
            <tr>
              <td>Режим</td>
              <td>{{ gpsStatuses[gpsData.telemetry.resolve_enabled + gpsData.telemetry.diff_mode*2] }}</td>
            </tr>
            <tr>
              <td>Фиксация координат</td>
              <td>{{ gpsData.configuration.fixed_coords_mode ? 'Вкл': 'Выкл' }}</td>
            </tr>
            <tr>
              <td>Версия ПО модуля</td>
              <td>{{ gpsData.version }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
      <v-col>
        <yandex-map :settings="mapSettings" :coords="[gpsData.lat, gpsData.lon]" style="width: 100%; height: 100%;">
          <ymap-marker marker-id="point" :coords="[gpsData.lat, gpsData.lon]"/>
        </yandex-map>
<!--        <v-simple-table dense>-->
<!--          <thead>-->
<!--            <tr>-->
<!--              <th>№ п/п</th>-->
<!--              <th>ID спутника</th>-->
<!--              <th>с/ш, дБ</th>-->
<!--            </tr>-->
<!--          </thead>-->
<!--          <tbody>-->
<!--            <tr v-for="(sat, index) in gpsData.satellites" :key="index">-->
<!--              <td>{{ index + 1 }}</td>-->
<!--              <td>{{ sat.num }}</td>-->
<!--              <td>{{ sat.snr }}</td>-->
<!--            </tr>-->
<!--          </tbody>-->
<!--        </v-simple-table>-->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import { yandexMap, ymapMarker} from 'vue-yandex-maps'

export default {
  name: "Gps",
  components: { yandexMap, ymapMarker},
  mounted() {
    this.startIntervalForGpsData()
  },
  computed: {
    averageSnr() {
      const inTracking = this.gpsData.satellites.filter(s => s.snr !== 0).length
      return (this.gpsData.satellites.reduce((accum, item) => accum + item.snr, 0) / inTracking).toFixed(2)
    }
  },
  data: () => ({
    mapSettings: {
      apiKey: 'e02d9176-258e-41b0-9e19-33e346bc7f41',
      lang: 'ru_RU',
      coordorder: 'latlong',
      enterprise: false,
      version: '2.1'
    },
    interval: null,
    gpsStatuses: [
      'Координаты недоступны',
      'GPS SPS',
      'Дифференциальный GPS',
      'GPS PPS',
      'RTK',
      'Float RTK',
      'Экстраполяция координат',
      'Режим ручного ввода',
      'Режим симулятора'
    ],
    gpsData: {
      lat: 57.9804,
      lon: 56.1934,
      configuration: {},
      satellites: [],
      telemetry: {},
    },
  }),
  methods: {
    async startIntervalForGpsData() {
      this.interval = setInterval(async () => {
        const {data} = await axios.get('/gpsdata')
        this.gpsData = data.data
      }, 1000)
    },
  },

}
</script>

<style scoped>

</style>
