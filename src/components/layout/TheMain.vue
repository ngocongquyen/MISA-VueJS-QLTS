<template>
  <div class="main">
    <TheNavbar />
    <div class="right">
      <TheHeader />
       <router-view></router-view>
    </div>
    <!-- <ThePageRight />
   -->
  </div>
</template>

<script>
/* eslint-disable */
import TheNavbar from "../layout/TheNavbar.vue";
import TheHeader from "../layout/TheHeader.vue";
import ThePageRight from "../layout/ThePageRight.vue";
export default {
  name: "TheMain",
  components: {
    TheNavbar,
    TheHeader,
    ThePageRight,
  },
};
</script>

<style scoped>
.main {
  display: flex;
}
</style>
