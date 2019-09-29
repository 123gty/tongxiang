import Vue from 'vue'
import vuex from 'vuex'
import tab from './modules/tab'
Vue.use(vuex)
const store = new vuex.Store({
  modules: {
    tab
  }
})
export default store
