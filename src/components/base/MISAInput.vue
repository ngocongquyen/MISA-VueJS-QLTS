<template>
  <input
    ref="input"
    class="m-input"
    autocomplete="off"
    :class="{ 'm-input-error': isImport }"
    v-model="content"
    :placeholder="placeholder"
    :type="type"
    :title="title"
    @blur="validateInput"
    @input="changeInput"
  />
</template>

<script>
export default {
  mounted() {
    if (this.tag == "name") {
      this.content = "";
     } 
     //else if (this.type == "number") {
    //   this.content = 0;
    // }
  },
  props: ["title", "placeholder", "type", "control", "tag","fileName"],
  methods: {
    /**
    * Mô tả : Truyền vào cha giá trị nội dung để
    *  thay đổi dữ liệu và tên trong database trong AssetDetail
    * @param
    * @return
    * Created by: QuyenNC
    * Created date: 23:12 28/05/2022
    */
    changeInput() {
      this.field = this.tag;
      this.$emit("changeInput", this.content, this.field);
    },

    /**
    * Mô tả : Kiểm tra xem input có rỗng không.
    * @param
    * @return true - rỗng hiện đỏ false là không rỗng
    * Created by: QuyenNC
    * Created date: 23:05 20/05/2022
    */
    validateInput() {
      if (this.content === "") {
        this.isImport = true;
      } else {
        this.isImport = false;
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
    }
  },
  data() {
    return {
      isImport: false,
      content: 0,
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
