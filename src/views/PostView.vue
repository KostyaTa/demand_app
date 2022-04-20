<template>
  <div class="post-wrap">
    <PostView :postId="$route.params.id"></PostView>
    <PostAnswers :postId="$route.params.id"></PostAnswers>
  </div>
</template>
<script>
import Post from '@/components/post/PostSingle.vue'
import Answers from '@/components/post/PostAnswers.vue'

export default {
  components:{
    'PostView' : Post,
    'PostAnswers' : Answers
  }
  
}
</script>
<style lang="">
  
</style>