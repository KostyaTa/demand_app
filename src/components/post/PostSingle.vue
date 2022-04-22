<template>
    <div class="post-wrap" v-if="postInfo" >
        <div class="post container">
        <h1>{{postInfo.title}}</h1>
        <div v-if="postInfo.imagePath" class="img-wrap">
            <img :src="imgUrl(postInfo.imagePath)" :alt="'Image '+postInfo.title" width="1300" height="730">
        </div>
        
        <div class="post-meta row" v-if="user">
            <span class="col-auto">Author: {{user.username}}</span>
            <span class="col-auto">Date: {{postInfo.createdAt}}</span>
        </div>
        <div class="content">
            <p>{{postInfo.text}}</p>
        </div>
        <router-link 
                    :to="{path: '/post-edit', 
                    query: {id: postId}}" 
                    v-if="postInfo.isOwner" class="btn btn-secondary btn-sm" 
                >Edit >
            </router-link>
        </div>
         
    </div>
</template>
<script>
import axios from 'axios'
import Cookies from 'js-cookie';

export default {
    props: {
        postId: String
    },
    
    data() {
        return {
            postInfo: null,
            user: '',
            ShowPost: false
        }
    },
    mounted() {
        this.getPost()
        
    },
    methods: {
       getPost(){
         if(this.postId) {
            let token = Cookies.get('X-CSRF-TOKEN')
            
            const config = {
                headers: { 
                    "Content-type": "application/json",
                    'Authorization': `Bearer ${token}` }
            };

                 fetch( process.env.VUE_APP_API_DOMAIN + process.env.VUE_APP_API_POSTS_URL + '/'+this.postId,
                    {
                        method: 'GET',
                        headers: config.headers
                        },
                    )
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {

                        this.postInfo = data.data
                        this.user = data.data.user
                    })
                    .catch((message) => {
                        console.log('error: ' + message)
                    });
            }
        },
        imgUrl: function (apiImageUrl) {
            if(!apiImageUrl) {
                return
            }
            
            return process.env.VUE_APP_API_DOMAIN + apiImageUrl
        }
    }
}
</script>
<style lang="">
    
</style>