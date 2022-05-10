import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blogList: []
  },
  getters: {
    blogsLength(state){
      return state.blogList.length
    }
  },
  mutations: {
    addBlog(state, payload) {
      // 查看blogList中是否已经有了该元素
      let blog = state.blogList.find(function (item) {
        return payload.id === item.id;
      })
      if (blog) {
        blog.count++;
      } else {
        payload.count = 1;
        state.blogList.push(payload);
      }
    }
  },
  actions: {},
  modules: {}
})
