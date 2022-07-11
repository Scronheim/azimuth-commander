<template>
  <v-container fluid class="pt-0">
    <v-alert type="warning">
      Внимание! Неверные настройки климат-контроля могут привести
      к невозможности запуска вычислительного модуля или его повреждению.
      Перед изменением настроек внимательно изучите <a target="_blank" href="http://artifacts.lan/artifacts//documents/Пользовательская%20документация/Азимут%204/Руководство%20оператора/master/latest/Руководство%20оператора.pdf">Руководство по эксплуатации</a>
    </v-alert>
    <v-row no-gutters>
      <v-col cols="2">
        <v-list dense>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Дата/время</v-list-item-title>
              <v-list-item-subtitle>{{ status.Datetime }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>T1</v-list-item-title>
              <v-list-item-subtitle>{{ status.T1 }} °C</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>T2</v-list-item-title>
              <v-list-item-subtitle>{{ status.T2 }} °C</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>T3</v-list-item-title>
              <v-list-item-subtitle>{{ status.T3 }} °C</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Напряжение</v-list-item-title>
              <v-list-item-subtitle>{{ status.U }} В</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Вентилятор</v-list-item-title>
              <v-list-item-subtitle>{{ status.Cooler }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Нагреватель</v-list-item-title>
              <v-list-item-subtitle>{{ status.Heater }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col>
        <v-card flat>
          <v-card-title>Настройки нагревателя</v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <c-text-field label="Температура отключения" v-model="settings.HToff" suffix="°C"/>
              </v-col>
              <v-col>
                <c-text-field label="Температура включения" v-model="settings.HTon" suffix="°C"/>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card flat>
          <v-card-title class="pt-0">Настройки вентилятора</v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <c-text-field label="Температура отключения" v-model="settings.VToff" suffix="°C"/>
              </v-col>
              <v-col>
                <c-text-field label="Температура включения" v-model="settings.VTon" suffix="°C"/>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card flat>
          <v-card-title>Настройки нагрузки</v-card-title>
          <v-card-text>
            <v-checkbox dense label="Контролировать температуру" v-model="settings.Tcontrol"/>
            <v-row>
              <v-col>
                <c-text-field label="Нижний предел откл. по темп." v-model="settings.Toffmin" suffix="°C"/>
              </v-col>
              <v-col>
                <c-text-field label="Верхний предел откл. по темп." v-model="settings.Toffmax" suffix="°C"/>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <c-text-field label="Нижний предел вкл. по темп." v-model="settings.Tonmin" suffix="°C"/>
              </v-col>
              <v-col>
                <c-text-field label="Верхний предел вкл. по темп." v-model="settings.Tonmax" suffix="°C"/>
              </v-col>
            </v-row>
            <v-divider class="ma-3"/>
            <v-checkbox dense label="Контролировать напряжение" v-model="settings.Ucontrol"/>
            <v-row>
              <v-col>
                <c-text-field label="Нижний предел откл. по темп." v-model="settings.Uoffmin" suffix="°C"/>
              </v-col>
              <v-col>
                <c-text-field label="Верхний предел откл. по темп." v-model="settings.Uoffmax" suffix="°C"/>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <c-text-field label="Нижний предел вкл. по темп." v-model="settings.Tonmin" suffix="°C"/>
              </v-col>
              <v-col>
                <c-text-field label="Верхний предел вкл. по темп." v-model="settings.Tonmax" suffix="°C"/>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "ClimateStatus",
  mounted() {
    this.getClimateStatus()
    this.getClimateSettings()
  },
  data: () => ({
    status: {},
    settings: {},
  }),
  methods: {
    async getClimateStatus() {
      const {data} = await axios.get('/climat/api/status')
      this.status = data.data
    },
    async getClimateSettings() {
      const {data} = await axios.get('/climat/api/settings')
      this.settings = data.data
    },
  }
}
</script>

<style scoped>

</style>
