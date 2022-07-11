<template>
  <v-card flat>
    <v-card-title>{{ isEdit ? 'Редактирование': 'Добавление' }} сетевого моста {{ bridge.name }}</v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <c-text-field label="Имя устройства" disabled :value="bridge.name"/>
        </v-col>
        <v-col>
          <c-text-field label="MAC адрес" disabled :value="bridge.mac"/>
        </v-col>
        <v-col>
          <c-text-field label="Линк" disabled :value="bridge.link"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <c-select label="Тип IP адреса" :items="ipAddressTypes" @change="$emit('changeIpType', $event)" :value="bridge.source"/>
        </v-col>
        <v-col>
          <c-text-field label="IP адрес" :value="bridge.address" @change="$emit('changeIp', $event)"/>
        </v-col>
        <v-col>
          <c-text-field label="Маска подсети" :value="bridge.netmask" @change="$emit('changeNetmask', $event)"/>
        </v-col>
        <v-col>
          <c-text-field label="Шлюз" :value="bridge.gateway" @change="$emit('changeGateway', $event)"/>
        </v-col>
      </v-row>
      <v-card-subtitle class="pl-0">DNS
        <v-btn icon color="success" @click="addDnsServer">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card-subtitle>
      <c-text-field v-for="(dns, index) in bridge['dns-nameservers']" :key="dns"
                    placeholder="Введите IP адрес"
                    :value="bridge['dns-nameservers'][index]"
                    @input="$emit('changeDnsServer', {index, value: $event})"
      >
        <template #append-outer>
          <v-btn icon color="error" @click="removeDnsServer(index)">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </template>
      </c-text-field>

    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "NetworkBridge",
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    bridge: {
      type: Object,
      required: true,
    }
  },
  data: () => ({
    ipAddressTypes: [
      {text: 'Статический', value: 'static'},
      {text: 'Динамический', value: 'dhcp'},
    ],
  }),
  methods: {
    removeDnsServer(index) {
      this.$emit('removeDnsServer', index)
    },
    addDnsServer() {
      this.$emit('addDnsServer')
    }
  }
}
</script>

<style scoped>

</style>
