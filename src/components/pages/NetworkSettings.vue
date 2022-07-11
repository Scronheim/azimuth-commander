<template>
  <v-container fluid class="pt-0">
    <v-row>
      <v-col cols="4">
        <v-card flat>
          <v-card-title>Сетевые мосты</v-card-title>
          <v-card-text>
            <v-treeview style="cursor: pointer" :items="bridges" activatable item-key="name" @update:active="setCurrent" return-object>
              <template #label="{item}">
                {{ item.name }}
                <span v-if="item.link === 'up'" style="color: greenyellow">{{ item.link }}</span>
                <span v-else style="color: red">{{ item.link }}</span>
                ({{ item.mac }})
              </template>
            </v-treeview>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="currentItem.name">
        <NetworkBridge v-if="currentItemIsBridge"
                       :is-edit="isEdit"
                       :bridge="currentItem"
                       @changeIp="updateIp"
                       @changeIpType="updateIpType"
                       @changeDnsServer="updateDnsServer"
                       @addDnsServer="addDnsServer"
                       @removeDnsServer="removeDnsServer"
        />
        <NetworkAdapter v-else
                        :is-edit="isEdit"
                        :adapter="currentItem"
                        @changeAdapterBridge="updateAdapterBridge"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <c-btn-primary>Применить настройки</c-btn-primary>
        <c-btn-success class="ml-3">Сохранить настройки</c-btn-success>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NetworkBridge from '@/components/forms/NetworkBridge'
import NetworkAdapter from '@/components/forms/NetworkAdapter'
export default {
  name: "NetworkSettings",
  components: {NetworkAdapter, NetworkBridge},
  mounted() {
    this.$store.dispatch('getNetworkSettings')
  },
  computed: {
    currentItemIsBridge() {
      return !!this.currentItem.children
    },
    bridges() {
      return this.$store.getters.bridges.map((b) => {
        b.children = this.$store.getters.adapters.filter((a) => {
          return a.bridge_name === b.name
        })
        return b
      })
    }
  },
  data: () => ({
    isEdit: true,
    currentItem: {},
  }),
  methods: {
    updateAdapterBridge(bridgeName) {
      this.currentItem.bridge_name = bridgeName
    },
    removeDnsServer(index) {
      this.currentItem['dns-nameservers'].splice(index, 1)
    },
    addDnsServer() {
      if (!this.currentItem['dns-nameservers']) {
        this.$set(this.currentItem, 'dns-nameservers', [])
      }
      this.currentItem['dns-nameservers'].push('')
    },
    updateDnsServer(payload) {
      this.currentItem['dns-nameservers'][payload.index] = payload.value
    },
    updateIpType(type) {
      this.currentItem.source = type
    },
    updateIp(ip) {
      this.currentItem.address = ip
    },
    setCurrent(item) {
      if (item.length) {
        // means item is bridge
        this.currentItem = item[0]
      } else {
        this.currentItem = {}
      }
    }
  }
}
</script>

<style scoped>

</style>
