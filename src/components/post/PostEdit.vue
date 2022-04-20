<template>
    <div>
        <div class="edit-post container" v-if="LoginBtnShow">
            <h1>Create Post</h1>
            <form @submit.prevent="createPost">
                <div class="mb-3">
                    <label for="postTitle" class="form-label">Title</label>
                    <input type="name" class="form-control" id="postTitle" name="postTitle" v-model="postTitle" required>
                </div>
                <div class="mb-3">
                    <label for="text" class="form-label">Text</label>
                    <textarea name="text" class="form-control text" placeholder="add your text" v-model="text" required></textarea>

                </div>
                <div class="mb-3">
                    <label for="file" class="form-label">Image</label>
                    <input type="file" class="form-control" id="file" name="file" @change="onFileChanged">
                </div>

                <button type="submit" class="btn btn-primary">Create</button>
            </form>
        </div>
        <div v-else>
            <h1>You can't edit post on this site</h1>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import Cookies from 'js-cookie';
export default {
    data() {
        return {
            LoginBtnShow: false,
            postTitle:'',
            text: '',
            file: ''
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
        isLogin() {
            if(Cookies.get('X-CSRF-TOKEN')) {
                this.LoginBtnShow = true
            }
        },
        createPost: function (){

            let data = {
                title: this.postTitle,
                text: this.text,
                imageId: this.file
            }
            let token = Cookies.get('X-CSRF-TOKEN')

            let config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            let apiUrl = process.env.VUE_APP_API_DOMAIN + process.env.VUE_APP_API_POSTS_URL
            axios.post(
                apiUrl,
                data,
                config
            )
             .then(({data}) => {
                 
                    console.log(data)
             })
             .catch(({message}) => {
                 console.log('error: '+message)
             })

        },
        onFileChanged: function(){
            
        }
    }
}
</script>
<style lang="">
    
</style>