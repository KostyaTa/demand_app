<template>
  <header-site></header-site>
  <router-view/>
</template>
<script>
import HeaderSite from './components/HeaderSite.vue'
import Header from './components/HeaderSite.vue'
export default {
  components: { HeaderSite },
    comments: {
      'header-site' : Header
    }
}
</script>
<style lang="scss">
	@import "./assets/scss/style.scss";
</style>
