<template>
  <div class="main">
    <TheNavbar @isWidth="isWidth"/>
    <div class="right" :style="this.resizeWidth == true ? 'width: calc(100% - 66px)' : 'width: calc(100% - 220px)'" >
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
  methods: {
    isWidth(isWidth) {
      this.resizeWidth = isWidth;
    }
  },
  data() {
    return {
      resizeWidth : false,
    }
  },
};
</script>

<style scoped>
.main {
  display: flex;
}
</style>
