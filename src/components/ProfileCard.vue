<template>
    <div class="profile-card">
        <button class="delete" @click="deleteProfile">
            Delete
        </button>
        <div class="card-content">
            <div class="avatar">
                <img class="avatar-img" :src="avatar" />
            </div>
            <div class="personal-data">
                <h1><router-link :to="{name: 'profile', params: {id: slug}}">{{ firstname }} {{ lastname }}</router-link></h1>

                <div class="date-of-birth">
                    {{ dateOfBirthHuman }} - {{age}} years old (
                        <VueCountdown :interval="60 * 60 * 1000" :time="nextBirthdayInMilliseconds">
                            <template slot-scope="props">Next birthday: {{ props.days }} days</template>
                        </VueCountdown>
                    )
                </div>

                <div class="tastes">
                    <TasteList v-if="movies.length" :maxItems="2" title="Movie tastes" :items="movies.map(a => a.name)" />
                    <TasteList v-if="artists.length" :maxItems="2" title="Musical tastes" :items="artists.map(a => a.name)" />
                    <TasteList v-if="foods.length" :maxItems="2" title="Food tastes" :sorted="false" :items="foods.map(a => a.type)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TasteList from './TasteList'
import moment from 'moment'
import VueCountdown from '@chenfengyuan/vue-countdown'

export default {
    components: {
        TasteList, VueCountdown
    },
    props: {
        slug: String,
        avatar: String,
        firstname: String,
        lastname: String,
        dateOfBirth: String,
        movies: {
            type: Array,
            default(){ return [] },
        },
        artists: {
            type: Array,
            default(){ return [] },
        },
        foods: {
            type: Array,
            default(){ return [] },
        }
    },
    computed: {
        dateOfBirthHuman(){
            return moment(this.dateOfBirth).format('MMMM Do, YYYY')
        },
        age(){
            return moment().diff(this.dateOfBirth, 'years')
        },
        nextBirthdayInMilliseconds(){
            const now = moment()
            const nextBirthday = moment(this.dateOfBirth).year(now.year())
            if (nextBirthday.isBefore(now)) {
                nextBirthday.add(1, 'year')
            }
            return moment.duration(nextBirthday.diff(now)).asMilliseconds()
        }
    },
    methods: {
        deleteProfile(){
            if (confirm('Are you sure you want to delete this profile?')) {
                this.$emit('deleteProfile')
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.profile-card {
    background-color: #f1f1f1;
    background: url('../assets/images/background.png');
    border: 3px solid #eaeaea;
    border-radius: 10px;

    button.delete {
        float: right;
        margin: 5px 5px 0 0;
    }

    .card-content {
        display: flex;

        .avatar {
            width: 200px;
            height: 200px;

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
                display: flex;

                .taste-list:not(:last-child) {
                    margin-right: 20px;
                }
            }
        }
    }
}
</style>
