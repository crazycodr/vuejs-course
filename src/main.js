import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vuex from 'vuex'
import axios from "axios"
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

library.add(faExclamationTriangle)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Vuex)

Vue.config.productionTip = false

const store = new Vuex.Store({
    state: {
        profiles: []
    },
    mutations: {
        setProfiles (state, {profiles}) {
            state.profiles = profiles
        },
        addProfile (state, {profile}) {
            state.profiles = [...state.profiles, profile]
        },
        removeProfile (state, {profile: deletedProfile}) {
            state.profiles = state.profiles.filter(profile => profile != deletedProfile)
        },
    },
    actions: {
        loadProfiles ({ commit }) {
            console.log('Loading')
            axios.get("/assets/data/profiles.json").then(response => {
                commit('setProfiles', {
                    profiles: response.data
                })
            }) 
        }
    },
    plugins: [vuexLocal.plugin],
})

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')
