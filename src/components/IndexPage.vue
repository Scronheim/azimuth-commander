<template>
  <v-container fluid class="pt-0">
    <v-row no-gutters>
      <v-col cols="3">
        <v-list dense>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Имя</v-list-item-title>
              <v-list-item-subtitle>{{ vmInfo.complexname_ru }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Тип</v-list-item-title>
              <v-list-item-subtitle>{{ vmInfo.complextype }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Серийный номер</v-list-item-title>
              <v-list-item-subtitle>{{ vmInfo.dongleinfo.serial }} ({{ vmInfo.dongleinfo.unit_serial }})</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Комплектация</v-list-item-title>
              <v-list-item-subtitle>{{ vmInfo.dongleinfo.mod }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Пароль метролога</v-list-item-title>
              <v-list-item-subtitle>{{ vmInfo.dongleinfo.metrology_password }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Максимальное кол-во каналов</v-list-item-title>
              <v-list-item-subtitle>{{ vmInfo.dongleinfo.maxchannels }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Активные компоненты</v-list-item-title>
              <v-list-item-subtitle>{{ vmInfo.active_components.join(', ') }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Админ</v-list-item-title>
              <v-list-item-subtitle>
                <v-icon v-if="vmInfo.isadmin" color="success">mdi-check</v-icon>
                <v-icon v-else color="error">mdi-close</v-icon>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>В докере</v-list-item-title>
              <v-list-item-subtitle>
                <v-icon v-if="vmInfo.isdocker" color="success">mdi-check</v-icon>
                <v-icon v-else color="error">mdi-close</v-icon>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Jetson</v-list-item-title>
              <v-list-item-subtitle>
                <v-icon v-if="vmInfo.isjetson" color="success">mdi-check</v-icon>
                <v-icon v-else color="error">mdi-close</v-icon>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="3">
        <v-list dense>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Раздел с данными</v-list-item-title>
              <v-list-item-subtitle>
                Создан: <v-icon color="success" v-if="$store.getters.dataPartIsCreated">mdi-check</v-icon>
                <v-icon color="error" v-else>mdi-close</v-icon>
                <br/>
                Примонтирован: <v-icon color="success" v-if="$store.getters.dataPartIsMounted">mdi-check</v-icon>
                <v-icon color="error" v-else>mdi-close</v-icon>
                <br/>
                Путь: {{ $store.getters.systemInfo.datapartinfo.path }}<br/>
                Всего: {{ $store.getters.diskTotalInGb }}Gb<br/>
                Свободно: {{ $store.getters.diskFreeInGb }}Gb ({{ $store.getters.percentOfFreeDiskSpace }}%)<br/>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Раздел с настройками</v-list-item-title>
              <v-list-item-subtitle>
                Создан: <v-icon color="success" v-if="$store.getters.configPartIsCreated">mdi-check</v-icon>
                <v-icon color="error" v-else>mdi-close</v-icon>
                <br/>
                Примонтирован: <v-icon color="success" v-if="$store.getters.configPartIsMounted">mdi-check</v-icon>
                <v-icon color="error" v-else>mdi-close</v-icon><br/>
                Путь: {{ $store.getters.systemInfo.configpartinfo.path }}<br/>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Оперативная память</v-list-item-title>
              <v-list-item-subtitle>
                Всего: {{ $store.getters.memoryTotalInMb }}Mb<br/>
                Свободно: {{ $store.getters.memoryFreeInMb }}Mb<br/>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Включенные флаги</v-list-item-title>
              <v-list-item-subtitle>
                {{ flags }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col>
        <v-data-table
            style="overflow: scroll; height: 87vh"
            dense
            :items="modules"
            :headers="moduleHeaders"
            fixed-header
            hide-default-footer
            :items-per-page="-1"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "IndexPage",
  computed: {
    vmInfo() {
      return this.$store.getters.vmInfo
    },
    systemInfo() {
      return this.$store.getters.systemInfo
    },
    modules() {
      return this.$store.getters.modules
    },
    flags() {
      return this.$store.getters.flags.join(', ')
    },
  },
  data: () => ({
    moduleHeaders: [
      {text: 'Название', align: 'start', sortable: false, value: 'name'},
      {text: 'Версия', align: 'start', sortable: false, value: 'version.version'},
      {text: 'Версия ОС', align: 'start', sortable: false, value: 'version.release'},
      {text: 'Архитектура', align: 'start', sortable: false, value: 'version.arch'},
    ]
  }),
}
</script>

<style scoped>
th.sticky-header {
  position: sticky;
  top: 0;
}
.table {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>
