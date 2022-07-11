<template>
  <v-card flat>
    <v-card-title>{{ isEdit ? 'Редактирование': 'Добавление' }} сетевого адаптера {{ adapter.name }}</v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <c-select label="Сетевой мост" :items="bridges" item-text="name" item-value="name" :value="adapter.bridge_name" @change="changeAdapterBridge"/>
        </v-col>
        <v-col>
          <c-text-field label="MAC" readonly :value="adapter.mac"/>
        </v-col>
        <v-col>
          <c-text-field label="Линк" readonly :value="adapter.link"/>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "NetworkAdapter",
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    adapter: {
      type: Object,
      required: true,
    }
  },
  computed: {
    bridges() {
      return this.$store.getters.bridges
    }
  },
  methods: {
    changeAdapterBridge(bridge) {
      this.$emit('changeAdapterBridge', bridge)
    }
  }
}
</script>

<style scoped>

</style>
