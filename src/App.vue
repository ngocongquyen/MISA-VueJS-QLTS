<template>
  <div>
    <router-view />
    <!-- <ThePageRight /> -->
  </div>
</template>

<script>
/* eslint-disable */
//1. import components muon su dung
import TheLogin from './components/layout/TheLogin.vue'
import TheNavbar from './components/layout/TheNavbar.vue'
import ThePageRight from './components/layout/ThePageRight.vue'

export default {
  name: 'App',
  components: {
    TheLogin,
    TheNavbar,
    // ThePageRight,
  }
}
</script>

<style>
  @import url(/src/css/main.css);
  /* .main {
    display: flex;
  } */
</style>
