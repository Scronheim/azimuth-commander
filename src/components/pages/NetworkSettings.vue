<template>
  <v-container fluid class="pt-0">
    <v-row>
      <v-col cols="4">
        <v-card>
          <v-card-title>Сетевые мосты</v-card-title>
          <v-card-text>
            <v-treeview :items="bridges" activatable item-key="name" @update:active="setCurrent" return-object>
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
        <NetworkBridge v-if="currentItemIsBridge" :is-edit="isEdit" :bridge="currentItem" @changeIp="updateIp" @changeIpType="updateIpType"/>
        <NetworkAdapter v-else :is-edit="isEdit" :adapter="currentItem"/>
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
