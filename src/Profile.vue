<template>
    <div class="profile">
        <div class="header">
            <router-link class="back-link" :to="{name: 'profile-list'}">Back to profiles</router-link>
            <h1>Profile of {{ profile.firstname }} {{ profile.lastname }}</h1>
        </div>
        <div class="profile-content">
            <div class="avatar">
                <img class="avatar-img" :src="profile.avatar" />
            </div>
            <div class="personal-data">
                <div class="date-of-birth">
                    <div><strong>Born on: </strong> {{ dateOfBirthHuman }}</div>
                    <div><strong>Age: </strong> {{ age }}</div>
                    <div><strong>Next birthday: </strong> <VueCountdown v-if="profile.dateOfBirth != null" :interval="60 * 60 * 1000" :time="nextBirthdayInMilliseconds">
                            <template slot-scope="props">Next birthday: {{ props.days }} days</template>
                        </VueCountdown></div>
                </div>
                <div class="tastes">
                    <h2>Movies she likes</h2>
                    <ul>
                        <li v-for="movie in profile.movies" :key="movie.name">{{movie.name}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TasteList from './components/TasteList'
import moment from 'moment'
import VueCountdown from '@chenfengyuan/vue-countdown'

export default {
    components: {
        TasteList, VueCountdown
    },
    computed: {
        profile() {
            return Object.assign({
                slug: "",
                avatar: "",
                firstname: "",
                lastname: "",
                dateOfBirth: null,
                movies: [],
                artists: [],
                foods: [],
            }, this.$store.state.profiles.filter(profile => profile.slug == this.$route.params.id)[0])
        },
        dateOfBirthHuman(){
            return moment(this.profile.dateOfBirth).format('MMMM Do, YYYY')
        },
        age(){
            return moment().diff(this.profile.dateOfBirth, 'years')
        },
        nextBirthdayInMilliseconds(){
            const now = moment()
            const nextBirthday = moment(this.profile.dateOfBirth).year(now.year())
            if (nextBirthday.isBefore(now)) {
                nextBirthday.add(1, 'year')
            }
            return moment.duration(nextBirthday.diff(now)).asMilliseconds()
        }
    }
};
</script>

<style lang="scss" scoped>
.profile {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100vh;
    background: url('assets/images/background.png');
    color: #2c3e50;
    max-width: 960px;
    margin: 0 auto;
    padding: 20px;

    .header {

        h1 {
            padding: 20px 0;
            margin: 0;
        }

        .back-link {
            float: right;
        }
    }

    .profile-content {
        display: flex;

        .avatar {
            width: 300px;
            height: 300px;

            img {
                object-fit: cover;
                height: 100%;
                width: 100%;
                border-radius: 10px 0px 0px 10px;
            }
        }

        .personal-data {
            flex-grow: 1;
            padding: 10px 20px;

            h1 {
                margin: 0;
            }

            .date-of-birth {
                font-style: italic;
            }

            .tastes {
            }
        }
    }
}
</style>
