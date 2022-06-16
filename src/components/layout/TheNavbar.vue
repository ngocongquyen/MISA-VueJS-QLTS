<template>
  <div class="navbar" :class="{ 'w-66': isWidth }">
    <div class="navbar-header">
      <div class="icon-logo"></div>
      <h3 class="navbar-name-logo">MISA QLTS</h3>
    </div>
    <div class="navbar-content">
      <ul class="navbar-list">
        <!-- <li class="navbar-item">
          <div class="navbar-iem-icon-wrap">
            <div class="m-icon-24 mg-auto">
              <div class="icon-overview"></div>
            </div>
          </div>
          <div class="navbar-dropdown">
            <a href="" class="navbar-link">Tổng quan</a>
            <div class="m-icon-24">
              <div class="navbar-icon-down"></div>
            </div>
          </div>
        </li> -->
        <router-link
          class="navbar-item"
          active-class="navbar-link-selected"
          to="/asset"
          exact
        >
          <div class="navbar-iem-icon-wrap">
            <div class="m-icon-24 mg-auto">
              <div class="icon-asset"></div>
            </div>
          </div>
          <div class="navbar-dropdown">
            <a class="navbar-link">Tài sản</a>
            <!-- <div class="m-icon-24">
              <div class="navbar-icon-down"></div>
            </div> -->
          </div>
        </router-link>
        <router-link
          class="navbar-item"
          active-class="navbar-link-selected"
          to="/license"
        >
          <div class="navbar-iem-icon-wrap">
            <div class="m-icon-24 mg-auto">
              <div class="icon-license"></div>
            </div>
          </div>
          <div class="navbar-dropdown">
            <a class="navbar-link">Ghi tăng</a>
            <!-- <div class="m-icon-24">
              <div class="navbar-icon-down"></div>
            </div> -->
          </div>
        </router-link>
        <!-- <li class="navbar-item">
          <div class="navbar-iem-icon-wrap navbar-background">
            <div class="m-icon-24 mg-auto">
              <div class="icon-assetHT"></div>
            </div>
          </div>
          <div class="navbar-dropdown">
            <a href="" class="navbar-link">Tài sản HT-ĐB</a>
            <div class="m-icon-24">
              <div class="navbar-icon-down"></div>
            </div>
          </div>
        </li>

        <li class="navbar-item">
          <div class="navbar-iem-icon-wrap">
            <div class="m-icon-24 mg-auto">
              <div class="icon-tools"></div>
            </div>
          </div>
          <div class="navbar-dropdown">
            <a href="" class="navbar-link">Công cụ dụng cụ</a>
            <div class="m-icon-24">
              <div class="navbar-icon-down"></div>
            </div>
          </div>
        </li>
        <li class="navbar-item">
          <div class="navbar-iem-icon-wrap">
            <div class="m-icon-24 mg-auto">
              <div class="icon-category"></div>
            </div>
          </div>
          <div class="navbar-dropdown">
            <a href="" class="navbar-link">Danh mục</a>
            <div class="m-icon-24">
              <div class="navbar-icon-down"></div>
            </div>
          </div>
        </li>
        <li class="navbar-item">
          <div class="navbar-iem-icon-wrap">
            <div class="m-icon-24 mg-auto">
              <div class="icon-search"></div>
            </div>
          </div>
          <div class="navbar-dropdown">
            <a href="" class="navbar-link">Tra cứu</a>
            <div class="m-icon-24">
              <div class="navbar-icon-down"></div>
            </div>
          </div>
        </li>
        <li class="navbar-item">
          <div class="navbar-iem-icon-wrap">
            <div class="m-icon-24 mg-auto">
              <div class="icon-report"></div>
            </div>
          </div>
          <div class="navbar-dropdown">
            <a href="" class="navbar-link">Báo cáo</a>
            <div class="m-icon-24">
              <div class="navbar-icon-down"></div>
            </div>
          </div>
        </li> -->
      </ul>
    </div>
    <div class="navbar-footer">
      <button
        class="icon-toggle-prev"
        style="margin: auto 21px auto 0"
        @click="btnToggleOnClick"
        :class="{ 'icon-toggle-next': isIconToggle }"
      ></button>
    </div>
  </div>
</template>

<style scoped></style>

<script>
export default {
  name: "TheNavbar",
  props: [],
  mounted() {
    // const navbarLink = document.querySelectorAll(".navbar-item");

    // navbarLink.forEach((element) => {
     
    //     element.onclick = function () {
    //       if (!this.classList.contains(".router-link-exact-active")) {
    //         document
    //           .querySelector(".navbar-item.navbar-link-selected")
    //           .classList.remove("navbar-link-selected");
    //       }

    //       this.classList.add("navbar-link-selected");
    //     };
      
    // });
  },
  components: {},

  methods: {
    /**
     * Mô tả : đóng mở navbar
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 13:39 22/04/2022
     */
    btnToggleOnClick() {
      this.isWidth = !this.isWidth;
      this.$emit("isWidth", this.isWidth);
      if (this.isWidth === true) {
        document.querySelector(".navbar-name-logo").style.display = "none";
        var hideNavBar = document.querySelectorAll(".navbar-dropdown");
        for (let index = 0; index < hideNavBar.length; index++) {
          hideNavBar[index].style.display = "none";
        }
      } else {
        document.querySelector(".navbar-name-logo").style.display = "block";
        var showNavBar = document.querySelectorAll(".navbar-dropdown");
        for (let index = 0; index < showNavBar.length; index++) {
          showNavBar[index].style.display = "flex";
        }
      }
      this.isIconToggle = !this.isIconToggle;
    },
  },

  data() {
    return {
      isWidth: false,
      isIconToggle: false,
    };
  },
};
</script>
