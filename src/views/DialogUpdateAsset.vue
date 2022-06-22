<template>
  <div class="modal" id="dlgDetail">
    <div class="modal__overlay"></div>
    <div class="modal__body">
      <div class="m-dialog-header">
        <h3 class="m-dialog-header-title">
          Sửa tài sản {{ this.asset.FixedAssetName }}
        </h3>
        <div class="m-icon">
          <div class="icon-close tooltip" @click="btnClose">
            <span class="tooltiptext">Hủy bỏ</span>
          </div>
        </div>
      </div>
      <div class="content-detail padding-16">
        <div class="row">
          <div class="col-8">
            <label class="m-dialog-label" for="">Bộ phận sử dụng</label>
            <input
              type="text"
              v-model="asset.DepartmentName"
              class="m-input m-border"
              disabled
            />
          </div>
        </div>
        <div>
          <h4 style="margin: 10px 0">Nguyên giá</h4>
          <div class="row">
            <div class="col-8">
              <div class="row">
                <div class="col-8">
                  <label for="" class="mg-bottom-8">Nguồn hình thành</label>
                </div>
                <div class="col-4 mg-left-8">
                  <label for="" class="mg-bottom-8">Giá trị</label>
                </div>
              </div>
            </div>
          </div>
          <div class="content-grid" style="height: 180px; overflow-y: auto">
            <div
              class="row mg-top-4"
              style="align-items: unset"
              v-for="(row, index) in this.arrayRow"
              :key="index"
            >
              <div class="col-8 mg-right-20">
                <div class="row" style="align-items: unset">
                  <div class="col-8">
                    <!-- :indexValue="indexValue"
                      :checkDupliCate="checkDupliCate" -->
                    <MISACombobox
                      :tag="'sourceInformation'"
                      :control="row.budget"
                      :index="index"
                      ref="valueBudget"
                      @getComboSelected="getValueBudget"
                    />
                  </div>
                  <div class="col-4 mg-left-8 m-text-right">
                    <!-- <input class="text-right" v-model="row.valueSalary" /> -->
                    <MISALicenseInput
                      :tag="'valueSalary'"
                      ref="valueSalary"
                      type="text"
                      :control="row.valueSalary"
                      :modelValue="formatSalary(row.valueSalary)"
                      @update:modelValue="
                        (newValue) =>
                          (row.valueSalary = newValue
                            .toString()
                            .replaceAll('.', ''))
                      "
                      :isRequired="true"
                      class="text-right"
                      @changeInput="changeInput"
                      @keypress="isNumber($event)"
                    />
                  </div>
                </div>
              </div>
              <div class="col-4" style="margin-top: 10px">
                <button
                  class="icon-extra mg-right-20 tooltip"
                  @click="insertRow"
                >
                  <span class="tooltiptext">Thêm nguồn chi phí</span>
                </button>
                <button
                  v-if="this.arrayRow.length > 1"
                  class="icon-minus tooltip"
                  @click="deleteRow(row)"
                >
                  <span class="tooltiptext">Bỏ nguồn chi phí</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-8 mg-right-20">
            <div class="row">
              <div class="col-8">
                <input value="Tổng" disabled class="m-input m-border" />
              </div>
              <div class="col-4 mg-left-8">
                <input
                  type="text"
                  v-model="total"
                  class="m-input m-border text-right"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="m-dialog-footer">
        <button class="m-button m-button-delete mg-right-10" @click="btnClose">
          Hủy
        </button>
        <button class="m-button m-button-save" @click="btnSaveOnclick">
          Lưu
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  name: "DialogUpdateAsset",
  components: {},
  props: ["licenseDetailSelected", "index"],
  mounted() {
    // Gán giá trị từ api được gọi để hiện thị lên giao diện
    this.asset = this.licenseDetailSelected;
    console.log("Line 141", this.asset);
    // Nếu giá trị trả về mà có trường DetailJson khác null
    if (this.asset.DetailJson != null) {
      // đưa vào mảng trong v-for.
      this.arrayRow = JSON.parse(this.asset.DetailJson);
    }
  },
  computed: {
    /**
     * Mô tả : Tính tổng giá trị
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 23:23 19/06/2022
     */
    total: function () {
      var total = this.arrayRow.reduce((initialValue, currentValue) => {
        return initialValue + Number(currentValue.valueSalary);
      }, 0);
      return this.formatSalary(total);
    },
  },
  methods: {
    /**
     * Mô tả : Kiểm tra xem các ô input và combobox có rỗng không.
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 23:24 19/06/2022
     */
    checkIsEmpty() {
      var check = false;
      // Lấy ra một mảng các ref trong input
      var arrayInput = this.$refs.valueSalary;
      // Lấy ra một mảng các ref trong combobox
      var arrayCombobox = this.$refs.valueBudget;
      // Lọc ra các ô input rỗng
      var checkEmptyInput = arrayInput.filter((element) => {
        return element.content == ""
          ? (element.isImport = true)
          : (element.isImport = false);
      });
      // Lọc ra các ô combobox rỗng
      var checkEmptyCombobox = arrayCombobox.filter((element) => {
        return element.changeNameCombobox == ""
          ? (element.isImport = true)
          : (element.isImport = false);
      });
      if (checkEmptyInput.length > 0 || checkEmptyCombobox.length > 0) {
        check = true;
      }
      return check;
    },
    /**
     * Mô tả : Kiểm tra xem giá trị ô combobox có t
     * rùng với giá trị ô combobox trước đó không
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 23:26 19/06/2022
     */
    checkDuplicateCombobox() {
      var check = false;
      var array = [];
      // Lấy ra mảng các giá trị combobox
      var nameBudget = this.arrayRow.map((item) => {
        return item.budget;
      });

      // Lưu mảng các giá trị trung nhau
      for (var i = 0; i < nameBudget.length; i++) {
        if (nameBudget.indexOf(nameBudget[i]) != i) {
          array.push(i);
        }
      }
      if (array.length > 0) {
        // Duyệt qua các giá trị trùng nhau để hiện đỏ
        array.forEach((element) => {
          this.$refs.valueBudget[element].checkDupliCate = true;
          this.$refs.valueBudget[element].isImport = true;
        });
        check = true;
      }

      return check;
    },
    /**
     * Mô tả : Lấy giá trị từ MISACombobox.
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 23:26 19/06/2022
     */
    getValueBudget(value, index) {
      this.arrayRow[index].budget = value.itemData.budget;
    },

    /**
     * Mô tả : chỉ được nhập số
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 22:40 24/04/2022
     */
    isNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      }
    },
    /**
     * Mô tả : format price về dạng (xx.xxx.xxx);
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 14:24 30/04/2022
     */
    formatSalary(salary) {
      const format = `${salary
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
      return format;
    },
    /**
     * Mô tả : Sửa đổi giá trị DetailJson trong Database
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 23:28 19/06/2022
     */
    btnSaveOnclick() {
      // Kiểm tra xem các trường có rỗng không
      if (this.checkIsEmpty() == true) {
        return 0;
      // Kiểm tra có trùng combobox
      } else if (this.checkDuplicateCombobox() == true) {
        return 0;
      } else {
        if (this.asset.LicenseDetailId != null) {
          var update = {
            // Đưa mảng về chuỗi JSON để gửi lên database
            DetailJson: JSON.stringify(this.arrayRow),
            FixedAssetId: this.asset.FixedAssetId,
            LicenseId: this.asset.LicenseId,
          };
          var me = this;
          axios
            .put(
              "http://localhost:5062/api/v1/LicenseDetails/" +
                this.asset.LicenseDetailId,
              update
            )
            .then(function (res) {
              console.log(res);
              me.$emit("btnClose");
            })
            .catch(function (res) {
              console.log(res);
            });
        }
        else {
          var updateDetailJson = { 
            DetailJson: JSON.stringify(this.arrayRow),
            FixedAssetId: this.asset.FixedAssetId,};
            
          this.$emit("updateDetailJson",updateDetailJson)
          this.$emit("btnClose");
        }
      }
    },

    // Thêm dòng mới
    insertRow() {
      this.arrayRow.push({
        valueSalary: "",
        budget: "",
      });
    },

    // Xóa dòng
    deleteRow(row) {
      var index = this.arrayRow.indexOf(row);
      this.arrayRow.splice(index, 1);
    },

    // Tắt form.
    btnClose() {
      this.$emit("btnClose");
    },
  },
  data() {
    return {
      // Lưu các giá trị khi gọi api
      asset: {},
      // Lưu mảng ban đầu
      arrayDefault: [],
      // Khởi tạo mảng ban đầu.
      arrayRow: [
        {
          valueSalary: "",
          budget: "",
        },
      ],
    };
  },
};
</script>

<style></style>
