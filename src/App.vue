<template>
  <div id="app">
      <h1>Profiles</h1>
    <ProfilePage v-for="profile in profiles" :key="profile.avatar" v-bind="profile" />
  </div>
</template>

<script>
import ProfilePage from './components/ProfilePage.vue'
import axios from 'axios'

export default {
  components: {
    ProfilePage
  },
  data() {
      return {
          profiles: [],
      }
  },
  mounted() {
    axios.get('/assets/data/profiles.json')
        .then(response => {
            this.profiles = response.data
        })
  },
}
</script>

<style lang="scss" scoped>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
    max-width: 800px;
    margin: 60px auto;

    .profile-page {
        margin-bottom: 10px;
    }
}
</style>
