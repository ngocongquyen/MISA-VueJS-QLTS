<template>
  <div class="control_wrapper" :class="{ 'm-input-error': isImport }">
    <ejs-combobox
      ref="input"
      v-model="content"
      :text="control"
      id="combobox"
      :dataSource="filterCategories"
      :fields="fields"
      :allowCustom="allowCustom"
      :maxLength="maxLength"
      @select="setValueSelected"
      allowFiltering="true"
      :placeholder="placeholder"
      :showClearButton="false"
      @focus="setFocus"
      @blur="validateInput"
      @change="changeCombobox"
    ></ejs-combobox>
    <span
      class="fieldIsEmpty"
      style="position: absolute; top: 100%; margin-top: 4px !important"
      v-if="
        this.tag == 'sourceInformation' &&
        this.isImport &&
        this.checkDupliCate == false
      "
      >Không được bỏ trống ô này</span
    >
    <!-- &&
        this.indexValue == this.index -->
    <span
      class="fieldIsEmpty"
      style="position: absolute; top: 100%; margin-top: 4px !important"
      v-else-if="this.tag == 'sourceInformation' && this.checkDupliCate == true"
      >Nguồn chi phí đã tồn tại</span
    >
  </div>
</template>

<script>
import { ComboBoxComponent } from "@syncfusion/ej2-vue-dropdowns";
import axios from "axios";
export default {
  props: [
    "tag",
    "placeholder",
    "control",
    "maxLength",
    "fileName",
    "nameCode",
    "checkIsEmpty",
    "index",
  ],

  components: {
    "ejs-combobox": ComboBoxComponent,
  },

  /**
   * Mô tả : Lấy dữ liệu loại tài sản, bộ phận sử dụng và phân trang
   * @param
   * @return
   * Created by: QuyenNC
   * Created date: 23:15 28/05/2022
   */
  async created() {
    var me = this;
    if (this.tag === "DepartmentCode") {
      await axios
        .get("http://localhost:5062/api/v1/Departments")
        .then(function (res) {
          me.arrayCombobox = res.data;
          if (me.nameCode == "nameDepartment") {
            me.fields = { text: "DepartmentName", value: "DepartmentId" };
          } else {
            me.fields = { text: "DepartmentCode", value: "DepartmentId" };
          }
        })
        .catch(function (res) {
          console.log(res);
        });
    } else if (this.tag === "FixedAssetCategoryCode") {
      await axios
        .get("http://localhost:5062/api/v1/FixedAssetCategories")
        .then(function (res) {
          me.arrayCombobox = res.data;
          if (me.nameCode == "nameFixedAssetCategory") {
            me.fields = {
              text: "FixedAssetCategoryName",
              value: "FixedAssetCategoryId",
            };
          } else {
            me.fields = {
              text: "FixedAssetCategoryCode",
              value: "FixedAssetCategoryId",
            };
          }
        })
        .catch(function (res) {
          console.log(res);
        });
    } else if (this.tag == "dropdownPagination") {
      this.content = "20";
      this.fields = {
        text: "pageSize",
        value: "id",
      };
    } else if (this.tag == "sourceInformation") {
      this.fields = {
        text: "budget",
        value: "id",
      };
    }
  },
  watch: {
    control: function (newValue) {
      this.content = newValue;
    },
  },

  mounted() {
    if (this.tag == "sourceInformation") {
      this.changeNameCombobox = this.control;
    }
  },
  methods: {
    /**
     * Mô tả : Quan sát sự thay đổi của Combobox để emit lên các ô MISACombobox
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 23:08 30/05/2022
     */
    changeCombobox($event) {
      // var changeNameCombobox = "";
      // Nếu tag = FixedAssetCategoryCode và nameCode = nameFixedAssetCategory
      // trong TheContent và giá trị không null,
      // Nếu không có nameCode thì thực hiện trong AssetDetail
      if (this.tag === "FixedAssetCategoryCode") {
        if (this.nameCode === "nameFixedAssetCategory") {
          if ($event.itemData != null) {
            this.changeNameCombobox = $event.itemData.FixedAssetCategoryName;
          } else {
            this.changeNameCombobox = "";
          }
        }
        // Nếu không có nameFixedAssetCategory
        else {
          if ($event.itemData != null) {
            this.changeNameCombobox = $event.itemData.FixedAssetCategoryCode;
          } else {
            this.changeNameCombobox = "";
          }
        }
      }
      if (this.tag === "DepartmentCode") {
        if (this.nameCode === "nameDepartment") {
          if ($event.itemData != null) {
            this.changeNameCombobox = $event.itemData.DepartmentName;
          } else {
            this.changeNameCombobox = "";
          }
        }
        // Nếu không có nameDepartment
        else {
          if ($event.itemData != null) {
            this.changeNameCombobox = $event.itemData.DepartmentCode;
          } else {
            this.changeNameCombobox = "";
          }
        }
      }
      if (this.tag === "sourceInformation") {
        if ($event.itemData != null) {
          this.changeNameCombobox = $event.itemData.budget;
        } else {
          this.changeNameCombobox = "";
        }
      }

      this.$emit("changeCombobox", this.changeNameCombobox, this.tag);
    },
    /**
     * Mô tả : Kiểm tra xem trong MISACombobox có checkIsEmpty không.
     * Nếu có và rỗng trả về true, false không rỗng
     * @param
     * @return true - rỗng , false - không rỗng
     * Created by: QuyenNC
     * Created date: 23:16 28/05/2022
     */
    validateInput() {
      if (this.checkIsEmpty != "checkIsEmpty") {
        if (this.changeNameCombobox == "") {
          this.isImport = true;
        } else {
          this.isImport = false;
        }
        // if (this.content === "" && this.optionSelected == null) {
        //   this.isImport = true;
        // } else {
        //   this.isImport = false;
        // }
      }
    },

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
     * Mô tả : Gửi lên cha các giá trị khi chọn 1 bản ghi.
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 23:19 28/05/2022
     */
    setValueSelected(option) {
      this.optionSelected = option;
      this.$emit("getComboSelected", option, this.index);
    },
  },
  computed: {
    /**
     * Mô tả : Lấy một mảng truyền vào dataSource.
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 23:20 20/05/2022
     */
    filterCategories() {
      var categories = null;
      if (this.tag == "DepartmentCode") {
        categories = this.arrayCombobox;
      } else if (this.tag == "FixedAssetCategoryCode") {
        categories = this.arrayCombobox;
      } else if (this.tag == "dropdownPagination") {
        categories = this.dropdownPagination;
      } else if (this.tag == "sourceInformation") {
        categories = this.sourceInformation;
      }

      return categories;
      // var search = this.optionSelected;
      // if (this.optionSelected == null) {
      //   return categories;
      // }
      // return categories.filter((cate) => {
      //   return cate.code.toLowerCase().includes(search.toLowerCase()) == true;
      // });
    },
  },
  data() {
    return {
      changeNameCombobox: "",
      arrayCombobox: [],
      content: "",
      fields: {},
      allowCustom: true,
      isShowDrop: true,
      optionSelected: null,
      isImport: false,
      checkDupliCate: false,
      dropdownPagination: [
        {
          id: 1,
          pageSize: 20,
        },
        {
          id: 2,
          pageSize: 30,
        },
        {
          id: 3,
          pageSize: 40,
        },
        {
          id: 4,
          pageSize: 50,
        },
        {
          id: 5,
          pageSize: 60,
        },
      ],

      sourceInformation: [
        {
          id: 1,
          budget: "Ngân sách Tỉnh",
        },
        {
          id: 2,
          budget: "Ngân sách Huyện",
        },
        {
          id: 3,
          budget: "Ngân sách Trung ương",
        },
      ],
      // categoriesPart: [
      //   {
      //     id: 1,
      //     code: "HCKT",
      //     name: "Hành chính kế toán",
      //   },
      //   {
      //     id: 2,
      //     code: "TK",
      //     name: "Thư ký",
      //   },
      //   {
      //     id: 3,
      //     code: "TCTH",
      //     name: "Tài chính tổng hợp",
      //   },
      // ],
      // categoriesAsset: [
      //   {
      //     id: 1,
      //     code: "MTXT",
      //     name: "Máy tính xách tay",
      //     wearRate: 2.5,
      //     yearsUse: 5,
      //   },
      //   {
      //     id: 2,
      //     code: "PC",
      //     name: "Máy tính để bàn",
      //     wearRate: 1.7,
      //     yearsUse: 10,
      //   },
      // ],
    };
  },
};
</script>

<style>
@import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
</style>
