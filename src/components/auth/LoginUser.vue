<template>
    <div class="login">
        <form @submit.prevent="submit">
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" name="email" v-model="email" required aria-describedby="emailHelp">
                
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" ame="password" v-model="password" required>
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
            <div v-if="errorLogin" class="error-form form-text">Email or Password not correct</div>
        </form>
    </div>
    
</template>
<script>

import axios from 'axios'
import Cookies from 'js-cookie';
export default {

    data() {
        return {
            email: '',
            password: '',
            errorLogin: false
        }
    },
    methods: {
        submit: function () {
            if(this.errorLogin) {
                this.errorLogin = false
            }

            this.sent()
        },

        sent: function () {

            let user = {
                email: this.email,
                password: this.password
            }
            let apiUrl = process.env.VUE_APP_API_DOMAIN + process.env.VUE_APP_API_USER_LOGIN_URL

            axios.post(apiUrl, user)
            
            .then(({data}) => {
                let token = data.data.token
                this.$store.dispatch('LogIn', token) 
                this.$router.push({ name: 'home'})

            })
            .catch(({data}) => {
                this.errorLogin = true
            })
        }
    }
}
</script>
<style lang="scss">
    form {
        max-width: 450px;
        margin: 0 auto;
        padding-top: 2rem;
    }
</style>