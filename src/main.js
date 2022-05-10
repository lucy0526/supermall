import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 给vue原型添加一个新的属性，用于监听公共事件
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
