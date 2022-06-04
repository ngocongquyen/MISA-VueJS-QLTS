<template>
  <div class="alert" :class="{ isAlert: isAlert }">
    <div class="alert-wrap">
      <div class="m-icon-24">
        <div class="icon-warning"></div>
      </div>
      <p class="alert-text">{{ alertBody }}</p>
    </div>
    <!-- Thông báo khi xóa -->
    <div class="btn-alert-feature" v-if="typeAlert == 'remove'">
      <MISAButton
        :class="'m-button m-btn-no'"
        @click="btnNoDelete"
        :textButton="'Không'"
        v-shortkey="['ctrl', 'k']"
        @shortkey="btnNoDelete"
      ></MISAButton>
      <MISAButton
        :class="'m-button m-btn-delete'"
         ref="btnFocus"
        @click="btnDeleteData"
        :textButton="'Xóa'"
        v-shortkey="['ctrl', 'x']"
        @shortkey="btnDeleteData"
      ></MISAButton>
    </div>
    <!-- Thông báo khi hủy và không có sự thay dổi gì -->
    <div class="btn-alert-feature" v-else-if="typeAlert == 'cancel'">
      <MISAButton
        :class="'m-button m-btn-no'"
        @click="btnNoDelete"
        :textButton="'Không'"
        v-shortkey="['ctrl', 'k']"
        @shortkey="btnNoDelete"
      ></MISAButton>
      <MISAButton
        :class="'m-button m-btn-delete'"
        
        @click="btnCancel"
        :textButton="'Hủy Bỏ'"
        v-shortkey="['ctrl', 'alt', 'h']"
        @shortkey="btnCancel"
      ></MISAButton>
    </div>
    <div class="btn-alert-feature" v-else-if="typeAlert == 'cancelChange'">
      <MISAButton
        :class="'m-button m-btn-no'"
        @click="btnCancel"
        :textButton="'Hủy bỏ'"
        v-shortkey="['ctrl', 'alt', 'h']"
        @shortkey="btnCancel"
      ></MISAButton>
      <MISAButton
        :class="'m-button m-btn-no-save'"
        @click="btnNoDelete"
        :textButton="'Không lưu'"
        v-shortkey="['ctrl', 'k']"
        @shortkey="btnNoDelete"
      ></MISAButton>
      <MISAButton
        :class="'m-button m-button-save'"
        @click="btnSave"
        :textButton="'Lưu'"
        v-shortkey="['ctrl', 's']"
        @shortkey="btnSave"
      ></MISAButton>
    </div>
    <div class="btn-alert-feature" v-else-if="typeAlert == 'btnClose'">
      <MISAButton
        :class="'m-button m-button-save'"
        @click="btnNoDelete"
        :textButton="'Đóng'"
        v-shortkey="['ctrl', 'd']"
        @shortkey="btnNoDelete"
      ></MISAButton>
    </div>
  </div>
</template>

<script>
import MISAButton from "./MISAButton.vue";
export default {
  name: "MISAAlert",
  components: {
    MISAButton,
  },
  mounted() {
    // this.$refs.btn.setFocusBtn();
  },
  props: ["isAlert", "alertBody", "typeAlert"],
  watch: {
    isAlert: function (newValue) {
      if (newValue == false && this.typeAlert=="remove") {
        this.$nextTick(() => {
          this.$refs.btnFocus.setFocusBtn();
        });
      }
    },
  },
  methods: {
    /**
     * Mô tả : Thực hiện tính năng xóa dữ liệu gọi lên pthuc của TheContent.
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 22:57 20/05/2022
     */
    btnDeleteData() {
      this.$emit("btnDeleteData");
    },

    /**
     * Mô tả : Tắt form AssetDetail, Tắt alert và resetForm
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 22:59 20/05/2022
     */
    btnCancel() {
      // tắt form AssetDetail
      this.$emit("showDialog", false);
      // Tắt alert
      this.$emit("isShowAlert", true);
      // resetForm
      this.$emit("resetForm");
    },

    /**
     * Mô tả : Tắt alert
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 23:04 20/05/2022
     */
    btnNoDelete() {
      this.$emit("focusError");
      this.$emit("isShowAlert", true);
    },

    /**
     * Mô tả : Lưu thông tin vào database
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 23:04 20/05/2022
     */
    btnSave() {
      this.$emit("btnSave");
    },
  },
  data() {
    return {};
  },
};
</script>

<style></style>
