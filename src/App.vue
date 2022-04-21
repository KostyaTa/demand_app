<template>
  <HeaderSite></HeaderSite>
  <router-view class="content"></router-view>
    <FooterSite></FooterSite>
</template>
<script>
import HeaderSite from './components/HeaderSite.vue'
import FooterSite from './components/FooterSite.vue'
export default {
  components: { HeaderSite, FooterSite },

}
</script>
<style lang="scss">
	@import "./assets/scss/style.scss";
</style>
