<template>
  <div class="home">
    <div class="container">
      <div class="search d-flex col-6">
        <input class="form-control me-2" type="text" placeholder="Search" aria-label="Search" v-model="searchKeyword" @keyup.enter="getPosts">
        <a class="btn btn-outline-success"  @click="getPosts">Search</a>
      </div>
      <a class="btn btn-outline-dark"  @click="sortingPosts">{{sortTitleBtn}}</a>
      <ul :class="[{blur : loadPost},'row d-lg-flex list-unstyled posts-list justify-content-start px-lg-0 mx-lg-0']" v-if="postsList">
        <li v-for="post in postsList" :key="post.title" class="col-lg-3 col-md-4 posts-list-item full-width p-3">
           <div class="posts-list-item-image">
            <router-link :to="{path: '/post/'+post.id+'/'+postLink(post.title), params: {id: post.id, title: post.title}}" class="read-more" v-if="post.imagePath">
                <img :src="imageLink(post.imagePath)" :alt="'Image ' + post.title" class="img-responsive w-100" width="400" height="225">

              </router-link>
            </div>
            <span class="hp-posts-cat">Author: {{post.user.username}}</span>
            <h4 class="mt-3">
              <router-link :to="{path: '/post/'+post.id+'/'+postLink(post.title), params: {id: post.id, title: post.title}}" class="read-more" >
                {{post.title}}
              </router-link>
            </h4>
            <router-link :to="{path: '/post/'+post.id+'/'+postLink(post.title), params: {id: post.id, title: post.title}}" class="read-more" >Read more ></router-link>
            <a href="" class="btn btn-secondary btn-sm" v-if="post.isOwner" @click="editPost(post.id)">Edit</a>
        </li>
      </ul>
      <nav aria-label="Page navigation" v-if="postsList && totalPages > 1">
        <ul class="pagination justify-content-center">
          <li class="page-item"><a class="page-link" href="#" @click.prevent="paginationClick(currentPage-1)">Previous</a></li>
          <li v-for="(number, index) in paginationPages" :key="number" :class="[{active: paginationCorrentPage(number)}, ' page-item']" @click.prevent="paginationClick(number)">
            <a class="page-link" href="#"> 
              <span>{{number}}</span>
            </a>
          </li>
          <li class="page-item" v-if="paginationPages.slice(-1) != totalPages-1">
            <a class="page-link"><span>...</span></a>
          </li>
          <li :class="[{active: paginationCorrentPage(totalPages)}, ' page-item']" >
          <a class="page-link" href="#" @click.prevent="paginationClick(totalPages)">  <span>{{totalPages}}</span></a>
          </li>
          <li class="page-item"><a class="page-link" href="#" @click.prevent="paginationClick(currentPage+1)">Next</a></li>
        </ul>
      </nav>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import Cookies from 'js-cookie';
export default {

  data() {
    return {
      LoginBtnShow: false,
      postsList: null,
      loadPost: false,
      postHref: '',
      totalPages: null,
      currentPage: 1,
      paginatonMaxPages: 7,
      paginationPages: [],
      searchKeyword: '',
      sortByTitle: false,
      sortTitleBtn: 'Sorting by title'
    }
  },
  mounted() {
    this.getPosts()
    this.paginationMaxSize()
  },
  methods: {
    getPosts: function () {
      this.loadPost = true

      let token = Cookies.get('X-CSRF-TOKEN')

      const config = {
              headers: { 
                  'access-control-allow-origin': '* ',
                  "Content-type": "application/json",
                  'Authorization': `Bearer ${token}` 
                  }
          }
        axios({
          method: 'get',
          url: process.env.VUE_APP_API_DOMAIN + process.env.VUE_APP_API_POSTS_URL + '?page='+this.currentPage+'&sortByTitle='+this.sortByTitle+'&keyword='+this.searchKeyword,
          config
        })
    
      .then(({data}) => {
        this.loadPost = false
        this.postsList = [...data.data]

        this.totalPages = data.total

        this.currentPage = data.currentPage

      })
      .catch(({message}) => {
                console.log('error: ' + message)
            })
    },
    sortingPosts: function(){
     
      if(this.sortByTitle){
        this.sortByTitle = false
        this.sortTitleBtn = 'Sorting by title'
      } else {
         this.sortByTitle = true
         this.sortTitleBtn = 'Default sorting'
      }
      this.getPosts()
    },
    isLogin() {
      if(Cookies.get('X-CSRF-TOKEN')) {
          this.LoginBtnShow = true
      }
    },
    editPost: function() {
      
    },
    postLink: function(title) {
      let href = title.replaceAll(' ', '-')
      return href.toLowerCase()
    },
    imageLink: function(url) {
      return process.env.VUE_APP_API_DOMAIN +'/'+ url
    },
    paginationMaxSize: function(){
      this.paginationPages = [ ...Array(this.paginatonMaxPages).keys() ].map( i => i+1)
    },
    paginationCorrentPage: function(index) {
      if(index == this.currentPage) {
        return true
      }
      return false
    },
    paginationClick: function(index, event) {
      if(index > this.totalPages || index < 1) {
        return
      }

      let number = (index == 0) ? 1 : index
      
      let newPages = [...Array(this.paginatonMaxPages-1).keys() ].map( i => i+number)
      newPages.unshift(number-1)

      if(newPages[0] + this.paginatonMaxPages >  this.totalPages) {
          newPages = [...Array(this.paginatonMaxPages).keys() ].map( i => i+this.totalPages - this.paginatonMaxPages)
      }

      if(newPages[0] <= 1) {
        newPages = [ ...Array(this.paginatonMaxPages).keys() ].map( i => i+1)
      }
      if (this.paginationPages.slice(-1) != this.totalPages) {
         this.paginationPages = [...newPages]
      }

      this.currentPage = number
      this.getPosts()
      this.loadPost = true
    }

  }
}
</script>
