<template>
  <div class="modal" id="dlgDetail" :class="{ 'ishow-dialog': isShow }">
    <div class="modal__overlay"></div>
    <div class="modal__body">
      <div class="m-dialog">
        <div class="m-dialog-header">
          <h3 class="m-dialog-header-title">{{ title }}</h3>
          <div class="m-icon" @click="btnCancel">
            <div class="icon-close"></div>
          </div>
        </div>
        <div class="m-dialog-content">
          <div class="row">
            <div class="m-dialog-col col-4 mg-right-16">
              <label class="m-dialog-label"
                >Mã tài sản <span class="requied">*</span></label
              >
              <div class="m-dialog-infor-enter">
                <MISAInput
                  :placeholder="'Nhập mã tài sản'"
                  :title="'Nhập mã tài sản'"
                  :type="'text'"
                  :fileName="'Mã tài sản'"
                  :isRequired="true"
                  :tag="'FixedAssetCode'"
                  ref="txtAssetCode"
                  :control="asset.FixedAssetCode"
                  class=""
                  @changeInput="changeInput"
                  maxLength="20"
                />
              </div>
            </div>
            <div class="m-dialog-col col-8">
              <label class="m-dialog-label"
                >Tên tài sản <span class="requied">*</span></label
              >
              <div class="m-dialog-infor-enter">
                <MISAInput
                  :placeholder="'Nhập tên tài sản'"
                  :title="'Nhập mã tài sản'"
                  :fileName="'Tên tài sản'"
                  :type="'text'"
                  :isRequired="true"
                  :tag="'FixedAssetName'"
                  ref="txtFixedAssetName"
                  :control="asset.FixedAssetName"
                  @changeInput="changeInput"
                  class=""
                  maxLength="255"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="m-dialog-col mg-top-16 col-4 mg-right-16">
              <label class="m-dialog-label"
                >Mã bộ phận sử dụng <span class="requied">*</span></label
              >
              <MISACombobox
                :tag="'DepartmentCode'"
                :placeholder="'Nhập mã bộ phận sử dụng'"
                :control="asset.DepartmentCode"
                :fileName="'Mã bộ phận sử dụng'"
                ref="DepartmentCode"
                @getComboSelected="getDepartment"
                @changeCombobox="changeCombobox"
                :maxLength="50"
              />
            </div>
            <div class="m-dialog-col mg-top-16 col-8">
              <label class="m-dialog-label">Tên bộ phận sử dụng </label>
              <div class="m-dialog-infor-enter">
                <input
                  type="text"
                  v-model="asset.DepartmentName"
                  class="m-input m-border"
                  disabled
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="m-dialog-col mg-top-16 col-4 mg-right-16">
              <label class="m-dialog-label"
                >Mã loại tài sản<span class="requied">*</span></label
              >
              <MISACombobox
                :tag="'FixedAssetCategoryCode'"
                :placeholder="'Nhập mã loại tài sản'"
                :fileName="'Mã loại tài sản'"
                ref="FixedAssetCategoryCode"
                :control="asset.FixedAssetCategoryCode"
                @getComboSelected="getTypeAsset"
                @changeCombobox="changeCombobox"
                :maxLength="50"
              />
            </div>
            <div class="m-dialog-col mg-top-16 col-8">
              <label class="m-dialog-label">Tên loại tài sản </label>
              <div class="m-dialog-infor-enter">
                <input
                  type="text"
                  v-model="asset.FixedAssetCategoryName"
                  class="m-input m-border"
                  disabled
                />
              </div>
            </div>
          </div>
          <div class="row mg-top-16">
            <div class="m-dialog-col col-4 mg-right-16">
              <label class="m-dialog-label"
                >Số lượng <span class="requied">*</span></label
              >
              <div class="m-dialog-combobox">
                <MISAInput
                  :title="'Nhập số lượng'"
                  maxLength="11"
                  :fileName="'Số lượng'"
                  :tag="'Quantity'"
                  ref="txtQuantity"
                  :isRequired="true"
                  :control="asset.Quantity"
                  @changeInput="changeInput"
                  @keypress="isNumber($event)"
                  @keyup="upAnDownQuantity($event)"
                  class="text-right  pg-rg-30"
                  min="0"
                />
                <div class="m-combobox-icon">
                  <button
                    class="icon-top mg-bottom-8"
                    @click="asset.Quantity++"
                  ></button>
                  <button
                    class="icon-down"
                    @click="asset.Quantity === 0 ? 0 : asset.Quantity--"
                  ></button>
                </div>
              </div>
            </div>
            <div class="m-dialog-co mg-right-16 col-4">
              <label class="m-dialog-label"
                >Nguyên giá <span class="requied">*</span></label
              >
              <!--    v-bind:value="price" -->
              <div class="m-dialog-infor-enter">
                <MISAInput
                  :placeholder="'Nhập nguyên giá'"
                  :title="'Nhập nguyên giá'"
                  :type="'text'"
                  :fileName="'Nguyên giá'"
                  :isRequired="true"
                  ref="txtCost"
                  :control="changeFormatPrice"
                  v-model="changeFormatPrice"
                  @changeInput="changeInput"
                  class=" text-right"
                  @keypress="isNumber($event)"
                  maxLength="25"
                />
              </div>
            </div>
            <div class="m-dialog-col col-4">
              <label class="m-dialog-label"
                >Số năm sử dụng <span class="requied">*</span></label
              >
              <div class="m-dialog-infor-enter">
                <MISAInput
                  :placeholder="'Nhập số năm sử dụng'"
                  :fileName="'Số năm sử dụng'"
                  :title="'Nhập số năm sử dụng'"
                  ref="txtLifeTime"
                  :tag="'LifeTime'"
                  :control="asset.LifeTime"
                  :isRequired="true"
                  @changeInput="changeInput"
                  maxLength="11"
                  class=" text-right"
                  @keypress="isNumber($event)"
                />
              </div>
            </div>
          </div>
          <div class="row mg-top-16">
            <div class="m-dialog-col col-4 mg-right-16">
              <label class="m-dialog-label"
                >Tỷ lệ hao mòn (%) <span class="requied">*</span></label
              >
              <div class="m-dialog-combobox">
                <!-- :control="asset.DepreciationRate" -->
                <MISAInput
                  :title="'Nhập tỷ lệ hao mòn'"
                  :fileName="'Tỷ lệ hao mòn'"
                  :type="'number'"
                  :tag="'DepreciationRate'"
                  :isRequired="true"
                  ref="txtDepreciationRate"
                  :control="changeDepreciationRate"
                  v-model="changeDepreciationRate"
                  @changeInput="changeInput"
                  @keypress="isNumber($event)"
                  class="text-right  pg-rg-30"
                />

                <button class="m-combobox-icon icon-top-down"></button>
              </div>
            </div>
            <div class="m-dialog-col mg-right-16 col-4">
              <label class="m-dialog-label"
                >Giá trị hao mòn năm <span class="requied">*</span></label
              >
              <div class="m-dialog-infor-enter">
                <MISAInput
                  :title="'Nhập giá trị hoa mòn năm'"
                  :type="'text'"
                  :isRequired="true"
                  :tag="'DepreciationPerYear'"
                  :fileName="'Giá trị hao mòn năm'"
                  ref="txtDepreciationPerYear"
                  v-model="updateWearRate"
                  :control="updateWearRate"
                  @changeInput="changeInput"
                  class=" text-right"
                  @keypress="isNumber($event)"
                />
              </div>
            </div>
            <div class="m-dialog-col col-4">
              <label class="m-dialog-label">Năm theo dõi </label>
              <div class="m-dialog-infor-enter">
                <input
                  type="text"
                  class="m-input text-right m-border"
                  v-model="asset.TrackedYear"
                  disabled
                />
              </div>
            </div>
          </div>
          <div class="row mg-top-16">
            <div class="m-dialog-col col-4 mg-right-16">
              <label class="m-dialog-label"
                >Ngày mua <span class="requied">*</span></label
              >
              <MISADatepicker
                @getDate="(newValue) => (this.asset.PurchaseDate = newValue)"
                :control="asset.PurchaseDate"
                :tag="'PurchaseDate'"
                :fileName="'Ngày mua'"
                ref="PurchaseDate"
              />
              <!-- <div class="datepicker-container">
                <Datepicker
                  :textInput="true"
                  id="datepicker"
                  ref="PurchaseDate"
                  v-model="asset.PurchaseDate"
                  selectText="Chọn"
                  :enableTimePicker="false"
                  cancelText="Đóng"
                  format="dd/MM/yyyy"
                ></Datepicker>
                <div class="datepicker-icon"></div>
              </div> -->
            </div>
            <div class="m-dialog-col col-4">
              <label class="m-dialog-label"
                >Ngày bắt đầu sử dụng <span class="requied">*</span></label
              >
              <MISADatepicker
                @getDate="(newValue) => (this.asset.UseDate = newValue)"
                :control="asset.UseDate"
                :tag="'UseDate'"
                :fileName="'Ngày bắt đầu sử dụng'"
                ref="UseDate"
              />
              <!-- <div class="datepicker-container">
                <Datepicker
                  class="input-datepicker"
                  :class="{ danger: !this.asset.UseDate }"
                  ref="UseDate"
                  v-model="asset.UseDate"
                  format="dd/MM/yyyy"
                  selectText="Chọn"
                  :enableTimePicker="false"
                  :textInput="true"
                  :maxDate="new Date()"
                  cancelText="Đóng"
                ></Datepicker>
                <div class="datepicker-icon"></div>
              </div> -->
            </div>
          </div>
        </div>
        <div class="m-dialog-footer">
          <button
            class="m-button m-button-delete mg-right-10"
            @click="btnCancel"
            v-shortkey="['ctrl', 'h']"
            @shortkey="btnCancel"
          >
            Hủy
          </button>
          <button
            class="m-button m-button-save"
            @click="btnSaveOnClick"
            v-shortkey="['ctrl', 's']"
            @shortkey="theAction"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>

    <MISAAlert :isAlert="isAlert" @focusError="focusError" />
  </div>
</template>

<style scoped></style>

<script>
import axios from "axios";
import moment from "moment";
// import MISACombobox from "../components/base/MISACombobox.vue";
// import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
// import MISAInput from "../components/base/MISAInput.vue";

// import Datepicker from 'vuejs3-datepicker';

export default {
  name: "AssetDetail",
  mounted() {
    // gán dữ liệu vào asset
    this.asset = this.assetSelected;
    // Gán dữ liệu vào object mới
    this.assetObject = Object.assign({}, this.asset);
    // focus vào ô đầu tiên
    this.$refs.txtAssetCode.setFocus();
  },
  components: {
    // MISACombobox,
    // Datepicker,
    // MISAInput,
  },

  computed: {
    /**
     * Mô tả : Thay đổi giá trị nguyên giá
     *@param
     * @return
     * Created by: QuyenNC
     * Created date: 13:49 04/05/2022
     */
    changeFormatPrice: {
      get() {
        return this.formatSalary(this.asset.Cost);
      },
      set(newValue) {
        newValue = newValue.toString().replaceAll(".", "");
        this.asset.Cost = newValue;
        this.asset.DepreciationPerYear =
          Math.floor(this.asset.DepreciationRate * this.asset.Cost) / 100;
        // this.formatPrice = newValue;
      },
    },

    /**
     * Mô tả : Thay đổi tỷ lệ hao mòn
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 08:27 23/05/2022
     */
    changeDepreciationRate: {
      get() {
        return this.asset.DepreciationRate;
      },
      set(newValue) {
        this.asset.DepreciationRate = newValue;
        this.asset.DepreciationPerYear =
          Math.floor(newValue * this.asset.Cost) / 100;
      },
    },
    /**
     * Mô tả : thay đổi giá trị tỷ lệ hao mòn năm
     * Created by: QuyenNC
     * Created date: 13:48 04/05/2022
     */
    updateWearRate: {
      get() {
        return this.formatSalary(this.asset.DepreciationPerYear);
      },
      set(newValue) {
        newValue = newValue.toString().replaceAll(".", "");
        this.asset.DepreciationPerYear = newValue;
      },
    },
  },

  props: [
    "isShow",
    "assetID",
    "formMode",
    "assetSelected",
    "newAssetCode",
    "title",
    "arrayAssetCode",
  ],

  methods: {
    /**
     * Mô tả : Thay đổi các giá trị tương ứng khi DepartmentCode rỗng và FixedAssetCategoryCode rỗng
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 16:25 03/06/2022
     */
    changeCombobox(code, tag) {
      if (tag === "DepartmentCode" && code === "") {
        this.asset.DepartmentCode = "";
        this.asset.DepartmentName = "";
      } else if (tag === "FixedAssetCategoryCode" && code === "") {
        this.asset.FixedAssetCategoryCode = "";
        this.asset.FixedAssetCategoryName = "";
        this.asset.LifeTime = "";
        this.asset.DepreciationRate = 0;
      }
    },
    /**
     * Mô tả : Tăng giảm số lượng bằng bàn phím.
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 23:44 23/05/2022
     */
    upAnDownQuantity($event) {
      switch ($event.keyCode) {
        case 38:
          this.asset.Quantity++;

          break;
        case 40:
          this.asset.Quantity === 0 ? 0 : this.asset.Quantity--;
          break;
        default:
          break;
      }
    },
    /**
     * Mô tả :binding dữ liệu từ MISAInput vào AssetDetail
     * @param content: nội dung thay dổi ô input
     * tag: Tên trong dataBase.
     * @return
     * Created by: QuyenNC
     * Created date: 13:50 04/05/2022
     */
    changeInput(content, tag) {
      // this.checkDuplicateAssetCode(content);
      this.asset[tag] = content;
    },

    /**
     * Mô tả : Kiểm tra mã tài sản có trùng không
     * Created by: QuyenNC
     * Created date: 09:47 02/05/2022
     */
    // checkDuplicateAssetCode(content) {
    //   if (content == this.assetObject.assetCode) {
    //     return true;
    //   } else if (this.arrayAssetCode.includes(content)) {
    //     alert("Trùng mã zui ne");
    //     return;
    //   }
    // },
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
      //}
    },
    /**
     * Mô tả : xem có hủy bỏ thông báo hay không
     * Created by: QuyenNC
     * Created date: 17:21 27/04/2022
     */
    btnCancel() {
      // kiểm tra xem giá trị của 2 object có giống nhau không ?
      // Nếu không có sự thay đổi gì
      if (JSON.stringify(this.asset) === JSON.stringify(this.assetObject)) {
        // hiện thị form alert
        this.$emit("isShowAlert", false);
        this.$emit(
          "btnCancel",
          "Bạn có muốn hủy bỏ khai báo này không",
          "cancel"
        );
      }
      // Nếu có sự thay đổi
      else {
        // hiện thị form alert
        this.$emit("isShowAlert", false);
        this.$emit(
          "btnCancel",
          "Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này không ?",
          "cancelChange"
        );
      }
    },

    /**
     * Mô tả : Lấy dữ liệu mã bộ phận sử dụng, tên bộ phận sử dụng từ combobox binding
     *  vào tên bộ phận sử dụng
     * Created by: QuyenNC
     * Created date: 16:08 27/04/2022
     */
    getDepartment(value) {
      this.asset.DepartmentCode = value.itemData.DepartmentCode;
      this.asset.DepartmentName = value.itemData.DepartmentName;
      this.asset.DepartmentId = value.itemData.DepartmentId;
      //}
    },

    /**
     * Mô tả : Lấy dữ liệu tên loại tài sản từ combobox binding
     * vào tên loại tài sản, tỷ lệ hao mòn, số năm sử dụng
     * Created by: QuyenNC
     * Created date: 16:10 27/04/2022
     */
    getTypeAsset(value) {
      this.asset.FixedAssetCategoryCode = value.itemData.FixedAssetCategoryCode;
      this.asset.FixedAssetCategoryName = value.itemData.FixedAssetCategoryName;
      this.asset.DepreciationRate = value.itemData.DepreciationRate * 100;
      this.asset.LifeTime = value.itemData.LifeTime;
      this.asset.FixedAssetCategoryId = value.itemData.FixedAssetCategoryId;

      this.asset.DepreciationPerYear =
        value.itemData.DepreciationRate * this.asset.Cost;
      this.$refs.txtLifeTime.isImport = false;
    },

    /**
     * Mô tả : Kiểm tra xem giá trị hao mòn có lớn hơn nguyên giá
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 09:03 23/05/2022
     */
    checkDepreciationPerYear() {
      if (
        Number(this.asset.DepreciationPerYear.toString().replaceAll(".", "")) >
        Number(this.asset.Cost)
      ) {
        return false;
      }
      return true;
    },

    /**
     * Mô tả : Kiểm tra xem tỷ lệ hao mòn có bằng 1/ số năm sử dụng
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 09:04 23/05/2022
     */
    checkDepreciationRate() {
      var check = false;
      if (this.asset.LifeTime == 0 && this.asset.DepreciationRate == 0) {
        check = true;
      } else {
        if (Number.isInteger(1 / this.asset.LifeTime)) {
          if (
            Number(this.asset.DepreciationRate) !=
            Number((1 / this.asset.LifeTime) * 100)
          ) {
            return check;
          } else {
            check = true;
          }
        } else {
          if (         
            Number(this.asset.DepreciationRate) !=
            Number(((1 / this.asset.LifeTime) * 100).toFixed(2))
          ) {
            console.log(Number(this.asset.DepreciationRate));
            console.log(Number(((1 / this.asset.LifeTime) * 100).toFixed(2)));
            return false;
          } else {
            check = true;
          }
        }
      }

      return check;
    },

    focusError(arrayError) {
      console.log(arrayError);
      if (arrayError.length > 0) {
        for (let key of Object.entries(this.$refs)) {
          // Duyệt qua các trường rỗng
          // Nếu có chứa thì chọc vào prop của MISAInput
          if (key[0].toLowerCase().includes(arrayError[0].toLowerCase())) {
            console.log(this.$refs[key[0]]);
            this.$refs[key[0]].setFocus();
          }
        }
      }
    },
    /**
     * Mô tả : Kiểm tra rỗng
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 09:04 23/05/2022
     */
    checkIsEmpty() {
      // Lấy các thuộc tính.
      const object = this.asset;
      console.log("this", this.asset);
      // chứa tên các lỗi khi rỗng.
      this.arrayContainsEmptyName = [];
      // chứa các trường rỗng.
      this.isFieldEmpty = [];
    
      var check = false;
      // Duyệt qua các trường
      for (let property in object) {
        // Nếu giá trị rỗng.
        if (object[property] === "") {
          // Lưu tên các thuộc tính
          this.isFieldEmpty.push(property);
          check = true;
        }
      }
      console.log("Line 362", this.isFieldEmpty);
      // Duyệt qua tất cả các ref
      for (let key of Object.entries(this.$refs)) {
        // Duyệt qua các trường rỗng
        for (let value of this.isFieldEmpty) {
          // value = value.toLowerCase();
          // Nếu có chứa thì chọc vào prop của MISAInput
          if (key[0].toLowerCase().includes(value.toLowerCase())) {
            console.log("Line 595", this.$refs[key[0]]);
            this.$refs[key[0]].isImport = true;
            this.arrayContainsEmptyName.push(" " + this.$refs[key[0]].fileName);
          }
        }
      }
      return check;
    },

    /**
     * Mô tả : Phím tắt ctrl S để lưu thông tin
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 11:23 23/05/2022
     */
    theAction() {
      this.btnSaveOnClick();
    },

    /**
     * Mô tả : Hàm xử lý chung khi lỗi validate tren TheContent
     * @param error : textBody btnName: tên nút.
     * @return
     * Created by: QuyenNC
     * Created date: 10:19 24/05/2022
     */
    checkShowAlert(error, btnName) {
      // Mở form alert
      this.$emit("isShowAlert", false);
      //
      this.$emit("btnCancel", (this.error = error), (this.btnName = btnName));
    },

    /**
     * Mô tả : Validate phía backend
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 10:35 24/05/2022
     */
    checkValidateBackend(statusCode, data, btnName) {
      switch (statusCode) {
        case 400:
          // Lấy dữ liệu
          var errorUserMsg = data.data.data[0];
          this.checkShowAlert(errorUserMsg, btnName);
          break;

        default:
          break;
      }
    },
    /**
     * Mô tả :  Lưu thông tin vào data
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 08:14 22/04/2022
     */
    async btnSaveOnClick() {
      console.log(this.formMode);
      const me = this;
      // Lấy ra năm ngày sử dụng
      var yearUseDate = moment(this.asset.UseDate).format("yy");
      // Tính giá trị lũy kế
      this.asset.Accumulated =
        ((this.asset.TrackedYear - yearUseDate) *
          this.asset.Cost *
          this.asset.DepreciationRate) /
        100;
      this.asset.DepreciationPerYear =
        this.asset.DepreciationPerYear.toString().replaceAll(".", "");

      // kiểm tra rỗng
      var check = this.checkIsEmpty();

      var errorBody;
      var btnName = "btnClose";
      // kiểm tra tỷ lệ hao mòn
      var checkValidateDepreciationRate = this.checkDepreciationRate();
      // kiểm tra giá trị hao mòn
      var checkDepreciationPerYear = this.checkDepreciationPerYear();
      if (this.isFieldEmpty.length > 0 && check == true) {
        errorBody = `Cần phải nhập thông tin <<${this.arrayContainsEmptyName}>>`;
        this.checkShowAlert(errorBody, btnName);
        // chọc vào phương thức của TheContent
        this.$emit("isFieldEmpty", this.isFieldEmpty, this.formMode);
        return true;
      } else if (checkValidateDepreciationRate == false) {
        errorBody = "Tỷ lệ hao mòn phải bằng 1/ Số năm sử dụng";
        this.checkShowAlert(errorBody, btnName);
        // this.$emit("isShowAlert", false);
        // this.$emit(
        //   "btnCancel",
        //   "Tỷ lệ hao mòn phải bằng 1/ Số năm sử dụng",
        //   "btnClose"
        // );
      } else if (checkDepreciationPerYear == false) {
        errorBody = "Hao mòn năm phải nhỏ hơn hoặc bằng nguyên giá";
        this.checkShowAlert(errorBody, btnName);
        // this.$emit("isShowAlert", false);
        // this.$emit(
        //   "btnCancel",
        //   "Hao mòn năm phải nhỏ hơn hoặc bằng nguyên giá",
        //   "btnClose"
        // );
      } else {
        // Thêm tài sản
        if (this.enum.Add == this.formMode) {
          this.asset.CreatedDate = new Date();
          this.asset.ModifiedDate = new Date();
          console.log("Line 748", this.asset.UseDate);
          console.log("Line 749", this.asset.PurchaseDate);
          await axios
            .post("http://localhost:5062/api/v1/FixedAssets", this.asset)
            .then((res) => {
              // chọc vào phương thức của TheContent để gọi và sửa thông tin
              me.$emit("toastMessage", "Lưu dữ liệu thành công");
              // chọc vào phương thức của TheContent load dữ liệu
              me.$emit("search");

              me.$emit("getData");

              //đưa ra thông báo thành công
              console.log(res);
            })
            .catch((response) => {
              console.log("Line 763", response.response.data);
              var statusCode = response.request.status;
              var data = response.response.data;
              me.checkValidateBackend(statusCode, data, btnName);

              //kiểm tra mã lỗi:
            });
        }
        // Sửa tài sản
        if (this.enum.Edit == this.formMode) {
          console.log("abc");
          this.asset.ModifiedDate = new Date();
          await axios
            .put(
              `http://localhost:5062/api/v1/FixedAssets/` +
                this.assetSelected.FixedAssetId,
              this.assetSelected
            )
            .then(function () {
              // chọc vào phương thức của TheContent để gọi và sửa thông tin
              me.$emit("toastMessage", "Sửa dữ liệu thành công");
              // reset lại data
              me.$emit("search");
            })
            .catch(function (response) {
              console.log("Line 787", response.response.data);
              var statusCode = response.request.status;
              var data = response.response.data;
              me.checkValidateBackend(statusCode, data, btnName);
            });
        }
      }
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
     * Mô tả : fotmat number
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 22:53 24/04/2022
     */
  },
  watch: {
    newAssetCode: function (newValue) {
      if (newValue) {
        this.asset.assetCode = newValue;
        //focus
        this.$refs.txtAssetCode.focus();
      }
    },
  },
  data() {
    return {
      isAlert: true,
      isImport: false,
      dateToday: moment(new Date()).format("MM/DD/YYYY"),
      yearToday: moment(new Date()).format("yy"),
      asset: {
        Cost: 0,
        DepreciationRate: 0,
        Quantity: 0,
        PurchaseDate: new Date(),
        UseDate: moment(new Date()).format("DD/MM/YYYY"),
        WearPerYear: 0,
        LifeTime: 0,
        DepartmentCode: "",
        DepreciationPerYear: 0,
      },
      enum: { Add: 1, Edit: 0 },
      //format price về giá trị ban đầu
      formatPrice: 0,

      //gán toàn bộ giá trị asset vào assetObject
      assetObject: {},

      //các giá trị để thay đổi v-model trong MiSAcombobox
      codePart: "",
      codeTypeAsset: "",

      //arrayIsEmpty
      isFieldEmpty: [],

      //array
      arrayContainsEmptyName: [],
      // check: false,

      // Lỗi validate nghiệp vụ
      error: "",

      // btnCheck
      btnName: "",
    };
  },
};
</script>
