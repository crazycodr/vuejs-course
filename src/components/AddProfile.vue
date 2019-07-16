<template>
    <div class="add-profile">
        <div class="form">
            <div class="avatar">
                <img class="avatar-img" :src="avatarSource" />
            </div>
            <div class="personal-data">
                <div class="field">
                    <label>Avatar (url)</label>
                    <input type="url" placeholder="Please paste the url to the avatar of the profile" v-model="avatar" />
                </div>
                <div class="field">
                    <label>First name</label>
                    <input placeholder="Please type the first name" v-model="firstname" />
                </div>
                <div class="field">
                    <label>Last name</label>
                    <input placeholder="Please type the last name" v-model="lastname" />
                </div>
                <div class="field">
                    <label>Date of birth</label>
                    <input type="date" placeholder="Please select the birth date" v-model="dateOfBirth" />
                </div>
                <div class="buttons">
                    <button @click="saveProfile">Save</button>
                    <button @click="cancelProfile">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NoAvatar from '../assets/images/no-avatar.png'

export default {
    data(){
        return {
            avatar: "",
            firstname: "",
            lastname: "",
            dateOfBirth: null,
            movies: [],
            artists: [],
            foods: [],
        }
    },
    computed: {
        avatarSource() {
            if (this.avatar == "") {
                return NoAvatar
            }
            return this.avatar
        }
    },
    methods: {
        saveProfile(){
            this.$emit('saveProfile', {
                avatar: this.avatar,
                firstname: this.firstname,
                lastname: this.lastname,
                dateOfBirth: this.dateOfBirth,
                movies: this.movies,
                artists: this.artists,
                foods: this.foods,
            })
        },
        cancelProfile(){
            this.$emit('cancelProfile')
        },
    }
}
</script>

<style lang="scss" scoped>
.add-profile {
    background-color: #f1f1f1;
    background: url('../assets/images/background.png');
    border: 3px solid #eaeaea;
    border-radius: 10px;

    .form {
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

            .field {
                padding: 10px 0px;
                display: flex;
                align-items: center;

                label {
                    font-weight: bold;
                    margin-right: 10px;
                }

                input {
                    flex-grow: 1;
                    font-size: 18px;
                    padding: 5px;
                    outline: none;
                }
            }

            .buttons {
                float: right;
            }
        }
    }
}
</style>
