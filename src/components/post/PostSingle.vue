<template>
    <div class="post-wrap" v-if="postInfo" >
        <div class="post container" v-for="post in postInfo" :key="post.title">
        <h1>{{post.title}}</h1>
        <div v-if="post.imagePath" class="img-wrap">
            <img :src="imgUrl(post.imagePath)" :alt="'Image '+post.title" width="1300" height="730">
        </div>
        
        <div class="post-meta row" v-if="user">
            <span class="col-auto">Author: {{user.username}}</span>
            <span class="col-auto">Date: {{post.createdAt}}</span>
        </div>
        <div class="content">
            <p>{{post.text}}</p>
        </div>
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
            console.log(config)
                axios({
                    method: 'get',
                    url: process.env.VUE_APP_API_DOMAIN + process.env.VUE_APP_API_POSTS_URL + '/'+this.postId,
                    config
                })
                .then((data) => {
                    console.log(data)
                    this.postInfo = data.data
                    this.user = data.data.user
                })
                .catch(({message}) => {
                    console.log('error: ' + message)
                })
            }
        },
        imgUrl: function (apiImageUrl) {
        if(!apiImageUrl) {
            return
        }
        let domain = process.env.VUE_APP_API_DOMAIN
        
        return process.env.VUE_APP_API_DOMAIN + apiImageUrl
        }
    }
}
</script>
<style lang="">
    
</style>