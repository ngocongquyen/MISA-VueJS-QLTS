<template>
  <div class="header">
    <div class="header-left">
      <h3 class="header-title">Danh sách tài sản</h3>
    </div>
    <div class="header-right">
      <p>Sở tài chính</p>
      <button class="m-button-year">
        <span>Năm</span>
        <div class="header-right-wrap">
          <p>{{ new Date().getFullYear() }}</p>
          <div class="header-right-icon header-right-icon-choose"></div>
        </div>
      </button>
      <div class="header-icon">
        <div class="m-icon-24 mg-right-20">
          <div class="icon-notification"></div>
        </div>
        <div class="m-icon-24 mg-right-20">
          <div class="icon-zoom"></div>
        </div>
        <div class="m-icon-24 mg-right-20">
          <div class="icon-help"></div>
        </div>
        <div class="m-icon-24">
          <div class="icon-user"></div>
        </div>

        <div
          class="mg-left-8 icon-down"
          @click="this.isShowLogout = !this.isShowLogout"
        >
          <div
            @click="logoutBtn"
            v-if="this.isShowLogout"
            class="logout-btn m-button"
          >
            Đăng xuất
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script>
import { mapActions } from "vuex";
export default {
  name: "TheHeader",
  components: {},
  props: [""],
  methods: {
    ...mapActions(["logout"]),
    /**
     * Mô tả: Hàm đăng xuất, chuyển trang về login, call api ở store
     * @param
     * @return
     * Created by: QUYENNC
     * Created date: 17:14 03/06/2022
     */
    async logoutBtn() {
      this.$router.push("/");
      await this.logout();
    },
  },
  data() {
    return {
      isShowLogout: false,
    };
  },
};
</script>
