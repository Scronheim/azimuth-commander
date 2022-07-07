const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '/api*': {
        target: 'http://192.168.24.97',
        ws: true,
        changeOrigin: true,
      },
    },
  },
})
