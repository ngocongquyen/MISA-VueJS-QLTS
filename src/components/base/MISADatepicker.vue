<template>
  <div class="datepicker-container">
    <Datepicker
      ref="input"
      format="dd/MM/yyyy"
      selectText="Chọn"
      cancelText="Hủy"
      :enableTimePicker="false"
      :textInput="true"
      :maxDate="new Date()"
      v-model="date"
      @blur="validateInput"
      autoApply
      @focus="setFocus"
      :inputClassName="this.date === null ? 'm-input-error' : 'dp-custom-input'"
      @update:modelValue="selectDate"
    />
    <div class="datepicker-icon"></div>
    <span class="fieldIsEmpty" v-if="this.isImport" >{{this.nameValue}} không được phép để trống</span>
  </div>
</template>

<script>
import Datepicker from "@vuepic/vue-datepicker";
// import {ref} from 'vue';

export default {
  components: {
    Datepicker,
  },
  props: ["modelValue", "control", "tag", "fileName","nameValue","isRequired"],
  emits: ["update:modelValue"],
  methods: {
    /**
     * Mô tả : Focus vào ô input
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 21:41 30/05/2022
     */
    setFocus() {
      this.$refs.input.$el.focus();
    },
    /**
     * Mô tả : Mô tả code
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 16:32 05/06/2022
     */
    selectDate(value) {
      this.$emit("getDate", value);
    },
    /**
     * Mô tả : Kiểm tra xem input có rỗng không.
     * @param
     * @return true - rỗng hiện đỏ false là không rỗng
     * Created by: QuyenNC
     * Created date: 23:05 20/05/2022
     */

    validateInput() {
      if (this.date === null) {
        this.isImport = true;
      } else {
        this.isImport = false;
      }
    },
  },

  watch: {
    control: function (newValue) {
      this.date = newValue;
    },
  },

  data() {
    return {
      date: new Date(),
      isAlert: false,
      isImport: false,
    };
  },
};
</script>

<style>
.dp-custom-input {
  border: 1px solid #afafaf;
}
</style>
