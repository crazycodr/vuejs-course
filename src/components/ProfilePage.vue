<template>
    <div class="profile-page">

        <img :src="avatar" />
        <div class="personal-data">
            <h1>{{ firstname }} {{ lastname }}</h1>

            <div class="date-of-birth">{{ dateOfBirth }}</div>

            <div class="tastes">
                <TasteList title="Movie tastes" :items="movies.map(a => a.name)" />
                <TasteList title="Musical tastes" :items="artists.map(a => a.name)" />
                <TasteList title="Food tastes" :sorted="false" :items="foods.map(a => a.type)" />
            </div>
        </div>
        
    </div>
</template>

<script>
import TasteList from './TasteList'

export default {
    components: {
        TasteList
    },
    props: {
        avatar: String,
        firstname: String,
        lastname: String,
        dateOfBirth: String,
        movies: Array,
        artists: Array,
        foods: Array,
    },
};
</script>

<style lang="scss" scoped>
.profile-page {
    background-color: #f1f1f1;
    display: flex;

    img {
        max-height: 200px;
        max-width: 200px;
        margin-right: 10px;
    }

    .personal-data {
        flex-grow: 1;
        padding: 10px 20px;

        h1 {
            margin: 0;
        }

        .tastes {
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>
