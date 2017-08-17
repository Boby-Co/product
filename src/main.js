// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {sync} from 'vuex-router-sync'
import store from './vuex/store'
import axios from 'axios'
import $ from 'jquery/src/jquery'
import './assets/bootstrap/css/bootstrap.min.css'
import './assets/bootstrap/js/bootstrap.min'
import './style/base.css'
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()

Vue.prototype.$axios = axios;
Vue.config.productionTip = false

sync (store, router)
router.beforeEach (function (to, from, next) {
  store.commit ('UPDATE_LOADING', {isLoading: true})
  next ()
})

router.afterEach (function (to) {
  store.commit ('UPDATE_LOADING', {isLoading: false})
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
