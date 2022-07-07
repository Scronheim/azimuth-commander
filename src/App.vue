<template>
  <v-app>
    <v-app-bar app dense v-if="isAuth">
      <v-tabs v-model="activeTab">
        <v-tab @click="refreshIndexPage">Главная</v-tab>
        <v-tab>Сеть</v-tab>
      </v-tabs>
    </v-app-bar>
    <v-main v-if="isAuth">
      <v-tabs-items v-model="activeTab">
        <v-tab-item>
          <v-card flat height="84vh">
            <v-card-text class="pa-0">
              <IndexPage/>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat height="84vh">
            <v-card-text class="pa-0">
              <NetworkSettings/>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-main>
    <v-dialog max-width="60%" persistent v-model="showConnectionForm">
      <v-card flat>
        <v-card-title>Форма подключения</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="10">
              <c-text-field label="IP" v-model="connection.ip"/>
            </v-col>
            <v-col>
              <c-text-field label="Порт" type="number" v-model.number="connection.port"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <c-text-field label="Логин" v-model="connection.login"/>
            </v-col>
            <v-col>
              <c-text-field label="Пароль" v-model.number="connection.password"/>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <c-btn-success @click="login">Войти</c-btn-success>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-footer app absolute inset padless v-if="isAuth">
      <FooterBlock/>
    </v-footer>
  </v-app>
</template>

<script>
const queryString = require('query-string')
import IndexPage from '@/components/pages/IndexPage'
import NetworkSettings from '@/components/pages/NetworkSettings'
import FooterBlock from '@/components/FooterBlock'
export default {
  name: 'App',
  components: {NetworkSettings, FooterBlock, IndexPage},
  mounted() {
    this.$vuetify.theme.dark = true
    if (this.args.length) {
      this.args.forEach((p) => {
        if (p.param === '--login') {
          this.connection.login = p.value
        } else if (p.param === '--password') {
          this.connection.password = p.value
        } else if (p.param === '--port') {
          this.connection.port = p.value
        } else if (p.param === '--ip') {
          this.connection.ip = p.value
        }
      })
    }
  },
  computed: {
    args() {
      const query = queryString.parse(global.location.search)
      return query['args'].split(',').map((a) => {
        const q = a.split('=')
        return {
          param: q[0],
          value: q[1]
        }
      })
    },
    showConnectionForm() {
      return !this.$store.getters.isAuth
    },
    isAuth() {
      return this.$store.getters.isAuth
    }
  },
  data: () => ({
    connection: {
      ip: '',
      port: 80,
      login: 'admin',
      password: '2360087',
    },
    activeTab: 1,
  }),
  methods: {
    async refreshIndexPage() {
      await this.$store.dispatch('getVmInfo')
      await this.$store.dispatch('getSystemInfo')
      await this.$store.dispatch('getModules')
      await this.$store.dispatch('getFlags')
      this.$toast.success('Данные обновлены')
    },
    login() {
      this.$store.dispatch('login', this.connection)
    }
  }
}
</script>

<style>
html {
  overflow: hidden;
}
</style>
