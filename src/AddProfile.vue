<template>
    <div class="add-profile">
        <div class="form">
            <div class="avatar">
                <img class="avatar-img" :class="{ hasError: this.fieldErrors.avatar || false }" :src="avatarSource" />
            </div>
            <div class="personal-data">
                <form 
                    ref="profileForm" 
                    @submit.prevent="saveProfile"
                    @change="handleChange"
                    @invalid.capture.prevent="handleInvalid"
                >

                    <FormField label="Key (slug)" :errorMessage="fieldErrors.slug">
                        <input
                            name="slug"
                            :class="{ hasError: this.fieldErrors.slug || false }" 
                            type="text"
                            required
                            placeholder="Please paste the key/slug of the profile"
                            v-model="slug"
                        />
                    </FormField>

                    <FormField label="Avatar" :errorMessage="fieldErrors.avatar">
                        <input
                            name="avatar"
                            :class="{ hasError: this.fieldErrors.avatar || false }" 
                            type="url"
                            required
                            placeholder="Please paste the url to the avatar of the profile"
                            v-model="avatar"
                        />
                    </FormField>

                    <FormField label="First name" :errorMessage="fieldErrors.firstname">
                        <input 
                            name="firstname" 
                            :class="{ hasError: this.fieldErrors.firstname || false }" 
                            required 
                            placeholder="Please type the first name" 
                            v-model="firstname" 
                        />
                    </FormField>

                    <FormField label="Last name" :errorMessage="fieldErrors.lastname">
                        <input 
                            name="lastname" 
                            :class="{ hasError: this.fieldErrors.lastname || false }" 
                            required 
                            placeholder="Please type the last name" 
                            v-model="lastname" 
                        />
                    </FormField>

                    <FormField label="Date of birth" :errorMessage="fieldErrors.dateOfBirth">
                        <input 
                            name="dateOfBirth"
                            :class="{ hasError: this.fieldErrors.dateOfBirth || false }"  
                            type="date" 
                            required 
                            placeholder="Please select the birth date" 
                            v-model="dateOfBirth"
                        />
                    </FormField>

                    <div class="buttons">
                        <button type="submit">Save</button>
                        <button type="button" @click="cancelProfile">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import NoAvatar from './assets/images/no-avatar.png'
import FormField from './components/FormField'

export default {
    components: {
        FormField
    },
    data(){
        return {
            slug: "",
            avatar: "",
            firstname: "",
            lastname: "",
            dateOfBirth: null,
            movies: [],
            artists: [],
            foods: [],
            fieldErrors: {},
        }
    },
    computed: {
        avatarSource() {
            if (this.avatar == "" || this.fieldErrors.avatar) {
                return NoAvatar
            }
            return this.avatar
        },
        avatarFieldClasses(){
            return {
                
            }
        }
    },
    methods: {
        saveProfile(){
            if (this.$refs.profileForm.checkValidity()) {
                
                this.$store.dispatch('addProfile', { profile: {
                    slug: this.slug,
                    avatar: this.avatar,
                    firstname: this.firstname,
                    lastname: this.lastname,
                    dateOfBirth: this.dateOfBirth,
                    movies: this.movies,
                    artists: this.artists,
                    foods: this.foods,
                }})

                this.$router.push('/' + this.slug)

            } else {
                this.$refs.profileForm.reportValidity()
            }
        },
        cancelProfile(){
            this.$router.push('/')
        },
        handleChange(event){
            this.fieldErrors = {
                ...this.fieldErrors,
                [event.target.name]: ""
            };
        },
        handleInvalid(event){
            this.fieldErrors = {
                ...this.fieldErrors,
                [event.target.name]: this.getProperMessage(event)
            }
        },
        getProperMessage(event){
            switch(event.target.name) {
                case 'avatar':
                    console.log(event)
                    switch(event.target.validationMessage){
                        case 'Please enter a URL.':
                            return 'This avatar\'s URL is invalid'
                        case 'Please fill in this field.':
                            return 'Please provide a link (URL) to an image on the Internet'
                    }
            }
            return event.target.validationMessage
        },
    }
}
</script>

<style lang="scss" scoped>
.add-profile {
    background-color: #f1f1f1;
    background: url('assets/images/background.png');
    border: 3px solid #eaeaea;
    border-radius: 10px;

    .avatar {
        img.hasError {
            background-color: rgba(255, 0, 0, 0.25);
        }
    }

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

            .buttons {
                float: right;
            }
        }
    }
}
</style>
