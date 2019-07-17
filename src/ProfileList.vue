<template>
    <div class="profile-list">
        <div class="header">
            <div class="search-form">
                <input v-model="filter" placeholder="Filter profiles by typing here" />
                <router-link :to="{path: '/new-profile'}">Add profile</router-link>
            </div>
            <h1>Profiles</h1>
        </div>
        <transition-group name="profile-list" tag="div">
            <ProfileCard v-for="profile in filteredProfiles" :key="profile.avatar" v-bind="profile" @deleteProfile="deleteProfile(profile)" />
        </transition-group>
    </div>
</template>

<script>
import ProfileCard from "./components/ProfileCard"

export default {
    components: {
        ProfileCard
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
            this.hideAddProfile()
        }
    }
};
</script>

<style lang="scss" scoped>
.profile-list {
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

    .profile-card {
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
