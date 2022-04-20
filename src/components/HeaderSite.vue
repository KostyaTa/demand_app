<template >

    <header class="navbar navbar-expand-lg navbar-light bg-light ">
        <div class="container d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
            logo
        </a>

        <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li><router-link to="/" class="nav-link px-2 link-dark">Home</router-link></li>
            <li v-if="LoginBtnShow"><router-link to="/post-edit" class="nav-link px-2 link-dark">Create Post</router-link></li>
        </ul>

        <div class="col-md-3 text-end">
            <router-link to="/login" class="btn btn-outline-primary me-2" v-if="!LoginBtnShow">Login</router-link>

            <a class="btn  btn-outline-info me-2" v-if="LoginBtnShow" @click="logOut">Log Out</a>

             <router-link to="/register" class="btn btn-primary" v-if="!LoginBtnShow">Sign-up</router-link>
        </div>
        </div>
        
    </header>


</template>
<script>
import axios from 'axios'
import Cookies from 'js-cookie';

export default {
    data() {
        return {
            LoginBtnShow: false
        }
    },
    watch: {
        '$route' () {
            this.isLogin()
        }
    },
    mounted() {
      this.isLogin()
    },
    methods: {
        logOut: function() {
            const data = {
                token : this.$store.state.token
            }

             axios.put('http://localhost/api/v1/auth/login')
            
            .then(() => {
                this.$store.dispatch('logOut') 
                this.LoginBtnShow = false
            })
            .catch(({response}) => {

                console.log(response)
            })
        },
        isLogin() {
            if(Cookies.get('X-CSRF-TOKEN')) {
                this.LoginBtnShow = true
            }
        }
    }
}
</script>
<style lang="">
    
</style>