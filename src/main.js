import "bootstrap/dist/css/bootstrap.min.css"
import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import Store from './store.js'
import App from './App.vue'
import router from './router'
import "bootstrap"

createApp(App)
.use(router)
.use(VueAxios, axios, Vuex)
.use(Store)
.mount('#app')

import "bootstrap/dist/js/bootstrap.js"