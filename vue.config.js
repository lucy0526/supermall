module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}


// const {
//   defineConfig
// } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   resolve: {
//     alias: {
//       'assert': '@/asserts',
//       'common': '@/common',
//       'components': '@/components',
//       'network': '@/network',
//       'views': '@/views',
//     }
//   }
// })
