<template>
  <v-card>
    <v-card-title>{{ isEdit ? 'Редактирование': 'Добавление' }} сетевого моста</v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <c-text-field label="Имя устройства" readonly :value="bridge.name"/>
        </v-col>
        <v-col>
          <c-text-field label="MAC адрес" readonly :value="bridge.mac"/>
        </v-col>
        <v-col>
          <c-text-field label="Линк" readonly :value="bridge.link"/>
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
      <v-card-subtitle class="pl-0">DNS <v-btn icon><v-icon>mdi-plus</v-icon></v-btn></v-card-subtitle>

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
  })
}
</script>

<style scoped>

</style>
