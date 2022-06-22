<template>
  <div style="width: 100%">
    <input
      ref="input"
      class="m-input m-border"
      autocomplete="off"
      :value="modelValue"
      :class="{ 'm-input-error': isImport }"
      :placeholder="placeholder"
      :type="type"
      :title="title"
      :maxlength="maxlength"
      @blur="validateInput"
      @input="bindingDataInput"
    />
    <span
      class="fieldIsEmpty"
      style="opacity: 0"
      :class="{ showOpacity: this.isImport }"
      v-if="this.tag == 'valueSalary'"
      >{{ nameValue }} Không được bỏ trống ô này</span
    >

    <span
      class="fieldIsEmpty"
      style="position: absolute"
      v-else-if="this.tag == 'LicenseCode' && this.isImport"
      >Mã chứng từ không được phép để trống</span
    >
  </div>
</template>

<script>
export default {
  mounted() {
    this.content = this.control;
    // if (this.tag == "name") {
    //   this.content = "";
    // }
    // if (this.control == 0) {
    //   this.content = 0;
    // }
  },
  props: [
    "title",
    "placeholder",
    "type",
    "control",
    "tag",
    "fileName",
    "isRequired",
    "nameValue",
    "modelValue",
    "maxlength"
  ],
  emits: ["update:modelValue"],
  methods: {
    /**
     * Mô tả: Hàm emit dữ liệu từ input lên form, theo dạng tên trường - dữ liệu
     * @param field: tên trường được truyền vào từ cha
     * Created by: nbtin
     * Created date: 23:20 23/05/2022
     */
    bindingDataInput($event) {
      this.$emit("update:modelValue", $event.target.value);
    },
    // /**
    //  * Mô tả : Truyền vào cha giá trị nội dung để
    //  *  thay đổi dữ liệu và tên trong database trong AssetDetail
    //  * @param
    //  * @return
    //  * Created by: QuyenNC
    //  * Created date: 23:12 28/05/2022
    //  */
    // changeInput() {
    //   this.field = this.tag;
    //   this.$emit("changeInput", this.content, this.field, this.index);
    // },

    /**
     * Mô tả : Kiểm tra xem input có rỗng không.
     * @param
     * @return true - rỗng hiện đỏ false là không rỗng
     * Created by: QuyenNC
     * Created date: 23:05 20/05/2022
     */
    validateInput() {
      if (this.isRequired == true) {
        if (this.content === "") {
          this.isImport = true;
        } else {
          this.isImport = false;
        }
      }
    },

    /**
     * Mô tả : Set focus cho input
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 23:07 20/05/2022
     */
    setFocus() {
      this.$refs.input.focus();
    },
  },
  data() {
    return {
      isImport: false,
      content: "",
      field: "",
    };
  },
  watch: {
    /**
     * Mô tả : Theo dõi sự thay đổi của nội dung khi control thay đổi
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 23:07 20/05/2022
     */
    control: function (newValue) {
      this.content = newValue;
    },
  },
};
</script>

<style></style>
