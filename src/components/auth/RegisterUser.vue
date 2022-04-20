<template>
    <div class="register container">
        <form @submit.prevent="validationForm">
            <div class="mb-3">
                <label for="name" class="form-label">Your Name</label>
                <input type="name" class="form-control" id="name" name="name" v-model="name" required aria-describedby="emailHelp">

            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" name="email" v-model="email" required aria-describedby="emailHelp">

            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password" v-model="password" required >
            </div>

            <div class="mb-3">
                <label for="repeatPassword" class="form-label">Password</label>
                <input type="password" class="form-control" id="repeatPassword" name="repeatPassword" v-model="repeatPassword" required >
                <p v-if="errorsForm.repeatPassword">Password not matched</p>
            </div>

            <button type="submit" class="btn btn-primary">Registrate</button>
            <div v-if="errorsForm" class="error-form form-text"><p v-for="error in errors" :key="error">{{error}}</p></div>
        </form>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            name: '',
            email: '',
            password: null,
            repeatPassword: '',
            errorsForm: false,
            errors: []
        }
    },
    methods: {
        validationForm: function (e) {
			this.errors = [];

            if (!this.name) {
				this.errors.push('Please write your name');
				this.errorsForm = true;
			}

			if (!this.validEmail(this.email)) {
				this.errors.push('Please write corect e-mail')
				this.errorsForm = true;
			}

            if(!this.password){
               this.errors.push('Password is required')
               this.errorsForm = true;
            }

            if (this.password.length < 8 ){
                this.errors.push('Password is too short. Minimum length is 8 symbols')
                this.errorsForm = true;
                console.log(this.password.length)
            }
            if(!this.password.match(/[A-Z]/g)) {
                this.errors.push('Password must have one large letter')
                this.errorsForm = true;
                
            }

             if(this.repeatPassword !==  this.password) {
                this.errors.push('Password must have one large letter')
                this.errorsForm = true;
            }


			if (!this.errors.length) {
				this.errorsForm  = false;

			    return this.RegistrateUser();

			}
			
		},
        
        validEmail: function (email) {
			let checkEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return checkEmail.test(email);
		},

        RegistrateUser: function() {
            let data = {
                name: this.name,
                email: this.email,
                password: this.password,
                password_confirmation: this.repeatPassword
            }
            let apiUrl = process.env.VUE_APP_API_DOMAIN + process.env.VUE_APP_API_USER_REGISTER_URL

             axios.post(apiUrl, data)

             .then(({data}) => {
                 
                this.$store.dispatch('LogIn') 

                this.$router.push({ name: 'home'})
             })
             .catch(({messages}) => {
                 console.log(messages)
             })
        }

    },
}
</script>
