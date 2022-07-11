const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '/video*': {
        target: 'http://172.17.23.17',
        ws: true,
        changeOrigin: true,
      },
    },
  },
})
