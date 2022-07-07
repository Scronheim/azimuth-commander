<template>
  <v-card>
    <v-card-title>{{ isEdit ? 'Редактирование': 'Добавление' }} сетевого адаптера</v-card-title>
    <v-card-text>
      {{ adapter }}
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
  }
}
</script>

<style scoped>

</style>
