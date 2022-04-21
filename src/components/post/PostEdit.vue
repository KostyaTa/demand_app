<template>
    <div>
        <div class="edit-post container" v-if="LoginBtnShow">
            <h1>Create Post</h1>
            <form @submit.prevent="createPost" name="uploadForm">
                <div class="mb-3">
                    <label for="postTitle" class="form-label">Title</label>
                    <input type="name" class="form-control" id="postTitle" name="postTitle" v-model="postTitle">
                </div>
                <div class="mb-3">
                    <label for="text" class="form-label">Text</label>
                    <textarea name="text" class="form-control text" placeholder="add your text" v-model="text"></textarea>

                </div>
                <div class="mb-3">
                   
                    <div class="row align-items-end">
                        <div class="col-auto">
                            <label for="uploadFile" class="form-label">Image</label>
                            <input type="file" class="form-control" id="uploadFile" name="uploadFile" @change="onFileSelected"> 
                        </div>
                        <div class="col-auto">
                            <a  class="btn btn-primary" @click="uplodaImage">Upload Image</a>
                            </div>
                        <p v-if="uploadetMessage">{{uploadetMessage}}</p>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary">Create post</button>
                <p v-if="createdMessage">{{createdMessage}}</p>
            </form>
        </div>
        <div v-else>
            <h1>You can't edit post on this site</h1>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import Cookies from 'js-cookie'
export default {
    data() {
        return {
            LoginBtnShow: false,
            postTitle: null,
            text: null,
            imageId: null,
            selectedImage: null,
            uploadetMessage:null,
            token: null,
            createdMessage: false
        }
    },
    watch: {
        '$route' () {
            this.isLogin()
        }
    },
    mounted() {
      this.isLogin()
      this.token = Cookies.get('X-CSRF-TOKEN')
    },
    methods: {
        isLogin() {
            if(Cookies.get('X-CSRF-TOKEN')) {
                this.LoginBtnShow = true
            }
        },
        createPost: function (){
            if( !this.postTitle ) {
                 this.createdMessage = 'Title Can not be empty'
                 return
            }

             if( !this.text ) {
                 this.createdMessage = 'Text Can not be empty'
                 return
            }

            if(this.selectedImage) {
                this.createdMessage = 'Upload a photo first please'
                 return
            }

            
            let data = {
                title: this.postTitle,
                text: this.text,
                imageId: this.imageId,
            }

            let config = {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            }
            let apiUrl = process.env.VUE_APP_API_DOMAIN + process.env.VUE_APP_API_POSTS_URL
            axios.post(
                apiUrl,
                data,
                config
            )
            .then(({data}) => {
                 
                    this.createdMessage = 'Post Created'
                    setTimeout(() => {
                        this.postTitle = null
                        this.text = null
                        this.imageId = null
                        this.selectedImage= null
                        this.uploadetMessage = null
                        this.createdMessage = null

                        document.getElementById("uploadFile").value=null

                    }, 1500);
             })
             .catch(({message}) => {

                 this.createdMessage = message
             })

        },
        onFileSelected: function(event){
            this.selectedImage = event.target.files[0]
        },
        uplodaImage: function() {
            let token = Cookies.get('X-CSRF-TOKEN')
            let fileData = new FormData()

            let uploadTime = new Date()

            fileData.append('image', this.selectedImage);
            fileData.append('title', this.postTitle);
            fileData.append('description', this.postTitle);
            fileData.append('uploadTime', uploadTime);

            if( !this.selectedImage ) {
                 this.uploadetMessage = 'Please select Image'
                 return
            }

            let config = {
                headers: {
                    'content-type': 'multipart/form-data; boundary=${uploadForm._boundary}',
                    
                    'Authorization': `Bearer ${token}`
                }
            }

            let apiUrl = process.env.VUE_APP_API_DOMAIN + '/api/v1/images'

             axios.post(apiUrl, fileData, config)

             .then(({data}) => {
 
                 this.imageId = data.data.imageId

                 this.uploadetMessage = 'Image uploaded'

                 this.selectedImage= null

                document.getElementById("uploadFile").value=null
             })
            .catch(({message}) => {
                 this.uploadetMessage = message
             })

        }
    }
}
</script>
<style lang="">
    
</style>