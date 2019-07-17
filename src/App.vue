<template>
    <div id="app">
        <div class="header">
            <div class="search-form">
                <input v-model="filter" placeholder="Filter profiles by typing here" />
                <button @click="showAddProfile">Add profile</button>
            </div>
            <h1>Profiles</h1>
        </div>
        <AddProfile class="add-profile" v-if="addingProfile" @saveProfile="saveProfile" @cancelProfile="hideAddProfile" />
        <transition-group name="profile-list" tag="div">
            <ProfilePage v-for="profile in filteredProfiles" :key="profile.avatar" v-bind="profile" @deleteProfile="deleteProfile(profile)" />
        </transition-group>
    </div>
</template>

<script>
import AddProfile from "./components/AddProfile"
import ProfilePage from "./components/ProfilePage"

export default {
    components: {
        ProfilePage, AddProfile
    },
    data() {
        return {
            filter: "",
            addingProfile: false,
        };
    },
    computed: {
        filteredProfiles(){
            return this.$store.state.profiles.filter(profile => {
                const fullname = (profile.firstname + ' ' + profile.lastname).toLowerCase()
                return fullname.indexOf(this.filter.toLowerCase()) != -1
            })
        }
    },
    methods: {
        deleteProfile(deletedProfile) {
            this.$store.commit('removeProfile', deletedProfile)
        },
        hideAddProfile() {
            this.addingProfile = false
        },
        showAddProfile() {
            this.addingProfile = true
        },
        saveProfile(payload) {
            this.$store.commit('addProfile', { profile: payload })
            this.hideAddProfile()
        }
    },
    mounted() {
        this.$store.dispatch('loadProfiles')
    }
};
</script>

<style lang="scss" scoped>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    max-width: 800px;
    margin: 60px auto;

    .header {
        .search-form {
            float: right;

            input {
                font-size: 18px;
                width: 400px;
                padding: 5px;
                outline: none;
            }
        }
    }

    .add-profile {
        margin-bottom: 20px;
    }

    .profile-page {
        margin-bottom: 10px;
    }

    .profile-list-enter-active, .profile-list-leave-active {
        transition: all 1s;
    }

    .profile-list-enter, .profile-list-leave-to {
        opacity: 0;
    }
}
</style>
