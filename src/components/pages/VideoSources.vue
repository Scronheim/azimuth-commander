<template>
  <v-container fluid>
    <template v-if="showVideoTemplate">
      <v-row>
        <v-col>
          <v-row>
            <v-col>
              <c-select label="Канал" :items="connectedGige" v-model="channel"/>
            </v-col>
            <v-col>
              <c-select label="FPS" :items="fpsDividers" v-model="fps"/>
            </v-col>
            <v-col>
              <c-select label="Качество" :items="qualityTypes" v-model="quality"/>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-img :src="videoSrc"/>
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <v-card flat>
        <v-card-title class="pt-0 pb-0">Genicam</v-card-title>
        <v-card-text>
          <v-data-table dense :headers="genicamHeaders" :items="$store.getters.connectedGige" hide-default-footer>
            <template v-slot:item.channelNumber="{index}">
              {{ index }}
            </template>
            <template v-slot:item.actions="{index}">
              <v-btn icon color="orange" @click="showVideo(index)">
                <v-icon>mdi-video</v-icon>
              </v-btn>
              <v-btn icon color="primary">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="error">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
      <v-card flat>
        <v-card-title class="pt-0 pb-0">RTSP серверы</v-card-title>
        <v-card-text>
          <v-data-table dense :headers="rtspServersHeaders" :items="$store.getters.rtspServers" hide-default-footer>
            <template v-slot:item.actions>
              <v-btn icon color="primary">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="error">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
      <v-card flat>
        <v-card-title class="pt-0 pb-0">RTSP клиенты</v-card-title>
        <v-card-text>
          <v-data-table dense :headers="rtspClientsHeaders" :items="$store.getters.rtspClients" hide-default-footer>
            <template v-slot:item.actions>
              <v-btn icon color="orange">
                <v-icon>mdi-video</v-icon>
              </v-btn>
              <v-btn icon color="primary">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="error">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </template>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: "VideoSources",
  mounted() {
    this.addKeyboardListener()
    this.$store.dispatch('getConnectedGige')
    this.$store.dispatch('getRtspServers')
    this.$store.dispatch('getRtspClients')
  },
  computed: {
    videoSrc() {
      if (this.fps !== 0) {
        return `${axios.defaults.baseURL}/video?channel=${this.channel - 1}&fps=${this.fps}&quality=${this.quality}&resize=2`
      }
      return `${axios.defaults.baseURL}/snapshot?channel=${this.channel - 1}&resize=2`
    },
    connectedGige() {
      return this.$store.getters.connectedGige.map((g, i) => {
        return i+1
      })
    }
  },
  data: () => ({
    genicamHeaders: [
      {text: '№ входа', align: 'start', sortable: false, value: 'channelNumber'},
      {text: 'Идентификатор', align: 'start', sortable: false, value: 'config.serial'},
      {text: 'Последний кадр, сек', align: 'start', sortable: false, value: 'status.from_last_frame'},
      {text: 'Выдержка', align: 'start', sortable: false, value: 'status.exposure'},
      {text: 'Усиление', align: 'start', sortable: false, value: 'status.gain'},
      {text: 'Яркость', align: 'start', sortable: false, value: 'status.target_brightness'},
      {text: 'Действия', width: '15%', align: 'start', sortable: false, value: 'actions'},
    ],
    rtspServersHeaders: [
      {text: 'Имя потока', align: 'start', sortable: false, value: 'name'},
      {text: 'Действия', width: '12%', align: 'start', sortable: false, value: 'actions'},
    ],
    rtspClientsHeaders: [
      {text: 'Имя', align: 'start', sortable: false, value: 'name'},
      {text: 'URL', align: 'start', sortable: false, value: 'info.url'},
      {text: 'Последний кадр, сек', align: 'start', sortable: false, value: 'info.status.from_last_timestamp'},
      {text: 'Отклонение', align: 'start', sortable: false, value: 'info.status.last_timestamps_diff'},
      {text: 'Принято пакетов', align: 'start', sortable: false, value: 'info.status.packets_received'},
      {text: 'Действия', width: '15%', align: 'start', sortable: false, value: 'actions'},
    ],
    showVideoTemplate: false,
    channel: 1,
    quality: 70,
    fps: 0,
    fpsDividers: [
      {text: 'Снимок', value: 0},
      {text: '25 к/с', value: 1},
      {text: '12.5 к/с', value: 2},
      {text: '6.25 к/с', value: 4},
      {text: '3.12 к/с', value: 8},
      {text: '2 к/с', value: 12},
      {text: '1 к/с', value: 25},
    ],
    qualityTypes: [
      {text: '90 (лучшее)', value: 90},
      {text: '70', value: 70},
      {text: '50', value: 50},
      {text: '30', value: 30},
      {text: '10', value: 10},
      {text: '5 (худшее)', value: 5},
    ]
  }),
  methods: {
    addKeyboardListener() {
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          this.showVideoTemplate = false
        }
      }, false);
    },
    showVideo(gigeIndex) {
      this.channel = gigeIndex + 1
      this.fps = 1
      this.showVideoTemplate = true
    }
  }
}
</script>

<style scoped lang="scss">

</style>
