<template>
  <v-container fluid class="pt-0">
    <v-row no-gutters v-for="source in sources" :key="source.url">
      <v-col v-for="lane in source.lanes" :key="lane.channel_id" :cols="4">
        <v-card flat>
          <v-card-subtitle v-if="lane.place.retiring_direction">
            {{ lane.channel_id }} {{ lane.place.name }}<br>
            Попутное направление: {{ lane.place.retiring_direction }}<br>
            <!-- встречное по отношению к камере, т.е. те машинки которые едут "навстречу" камере -->
            Встречное направление: {{ lane.place.direction }}
          </v-card-subtitle>
          <v-card-subtitle v-else class="font-weight-bold pa-0">{{ lane.channel_id }} {{ lane.place.name }} - {{ lane.place.direction }}</v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col>
                <v-img @click="openBigImageDialog(lane.vehicles[0].image)" v-if="lane.vehicles[0].image" :src="`data:image/jpeg;base64,${lane.vehicles[0].image}`"/>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="bigImageDialog">
      <v-card-text>
        <v-img :src="`data:image/jpeg;base64,${bigImageSrc}`"/>
      </v-card-text>
    </v-dialog>
  </v-container>
</template>

<script>
// import {EventSourcePolyfill} from 'event-source-polyfill'
import {fetchEventSource} from '@microsoft/fetch-event-source'
import _ from 'lodash'
import axios from 'axios'
export default {
  name: "Monitoring",
  mounted() {
    this.$store.dispatch('getVmPeers')
    this.getSources()
  },
  data: () => ({
    bigImageSrc: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
    bigImageDialog: false,
    sources: [],
  }),
  methods: {
    openBigImageDialog(src) {
      this.bigImageSrc = src
      this.bigImageDialog = true
    },
    async fillSource(source) {
      let baseUrl
      const {data} = await axios.get(source.base_url+'/controlzoneshd/api/config')
      const config = data.data
      let laneChannelId = 1
      for (const channel of config.channels) {
        if ((channel.lanes === undefined) || (channel.lanes.length<=1)) {
          source.lanes.push({
            channel_id: laneChannelId,
            vehicles: [
              {},
              {},
              {},
            ],
            place: Object.assign({}, config.main.place, channel.place),
          })
          const {data} = await axios.get(source.base_url+'/api/amts/last3/'+laneChannelId)
          for (const d of data.data.reverse()) {
            source.lanes[d.channel_id-1].vehicles.unshift(d)
            if (source.lanes[d.channel_id-1].vehicles.length>3) {
              source.lanes[d.channel_id - 1].vehicles.pop()
            }
          }
          laneChannelId++
          continue
        }
        for (const [i, lane] of channel.lanes.entries()) {
          if (i === 0) {
            continue
          }
          source.lanes.push({
            channel_id: laneChannelId,
            vehicles: [
              {},
              {},
              {},
            ],
            place: Object.assign({}, config.main.place, channel.place, lane.place),
          })
          const {data} = await axios.get(source.base_url+'/api/amts/last3/'+laneChannelId)
          for (const d of data.data.reverse()) {
            source.lanes[d.channel_id-1].vehicles.unshift(d)
            if (source.lanes[d.channel_id-1].vehicles.length>3) {
              source.lanes[d.channel_id - 1].vehicles.pop()
            }
          }
          laneChannelId++
        }
      }
      if (source.base_url !== '') {
        baseUrl = source.base_url
      } else {
        baseUrl = axios.defaults.baseURL
      }
      const basicAuthToken = btoa(`${this.$store.getters.connection.login}:${this.$store.getters.connection.password}`)
      source.eventsource = new fetchEventSource(baseUrl+'/api/stream/amts', {
        headers: {
          Authorization: `Basic ${basicAuthToken}`
        },
        onmessage(event) {
          const data = JSON.parse(event.data)
          if (_.isEmpty(data)) return
          if ((data.event !== undefined) && (data.event !== 'vehicle_passed')) {
            return
          }

          source.lanes[data.channel_id-1].vehicles.unshift(data)
          if (source.lanes[data.channel_id-1].vehicles.length>3) {
            source.lanes[data.channel_id - 1].vehicles.pop()
          }
        },
        onerror(error) {
          console.log(error)
        }
      })

      source.eventsource.onerror = () => {
        console.log(source, 'error')
      }
    },
    getSources() {
      this.sources.push({
        base_url: '',
        url: '/api/stream/amts',
        lanes: [],
      })
      for (const p of this.$store.getters.peers) {
        if (!p.connect_proxy) {
          continue
        }
        this.sources.push({
          base_url: '/peers/proxy/'+ p.name,
          lanes: [],
        })
      }
      for (const source of this.sources) {
        this.fillSource(source)
      }
    }
  },
}
</script>

<style scoped>

</style>
