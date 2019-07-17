import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vuex from 'vuex'

library.add(faExclamationTriangle)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Vuex)

Vue.config.productionTip = false

const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
        state.count++
        }
    }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
