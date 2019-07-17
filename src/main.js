import Vue from 'vue'
import App from './App'
import AddProfile from './AddProfile'
import ProfileList from './ProfileList'
import Profile from './Profile'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vuex from 'vuex'
import axios from "axios"
//import VuexPersistence from 'vuex-persist'
import VueRouter from 'vue-router'

// const vuexLocal = new VuexPersistence({
//     storage: window.localStorage
// })

library.add(faExclamationTriangle)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Vuex)
Vue.use(VueRouter)

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
        },
        addProfile ({ commit }, { profile }) {
            
            if (!profile.slug) {
                throw "Slug is missing"
            }

            commit('addProfile', { profile })
        }
    },
    // plugins: [vuexLocal.plugin],
})

const routes = [
    { name: 'profile-new', path: '/new-profile', component: AddProfile },
    { name: 'profile', path: '/:id', component: Profile },
    { name: 'profile-list', path: '/', component: ProfileList }
]

const router = new VueRouter({
    routes // short for `routes: routes`
})

new Vue({
    store,
    router,
    render: h => h(App),
    mounted(){
        this.$store.dispatch('loadProfiles');
    }
}).$mount('#app')
