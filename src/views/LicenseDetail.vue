<template>
  <div class="modal" id="dlgDetail">
    <div class="modal__overlay"></div>
    <div class="modal__body" id="widthLicense">
      <div class="m-dialog">
        <div class="m-license-header">
          <div class="m-dialog-header">
            <h3 class="m-dialog-header-title">Thêm chứng từ ghi tăng</h3>
            <div class="m-icon" @click="btnCancel">
              <div class="icon-close"></div>
            </div>
          </div>
          <div class="bgLicense license-detail">
            <h4 class="m-dialog-content-title">Thông tin chứng từ</h4>
            <div class="m-dialog-content">
              <div class="row">
                <div class="m-dialog-col col-4 mg-right-16">
                  <label class="m-dialog-label m-dialog-label-license"
                    >Mã chứng từ <span class="requied">*</span></label
                  >
                  <div class="m-dialog-infor-enter">
                    <MISAInput
                      ref="licenseCode"
                      :tag="'LicenseCode'"
                      :placeholder="'Nhập mã chứng từ'"
                      :title="'Nhập mã chứng từ'"
                      :type="'text'"
                      :control="license.LicenseCode"
                      class="m-border"
                      maxLength="50"
                      @changeInput="changeInput"
                    />
                  </div>
                </div>
                <div class="m-dialog-col col-4 mg-right-16">
                  <label class="m-dialog-label m-dialog-label-license"
                    >Ngày bắt đầu sử dụng <span class="requied">*</span></label
                  >
                  <MISADatepicker
                    @getDate="(newValue) => (this.license.UseDate = newValue)"
                  />
                </div>
                <div class="m-dialog-col col-4">
                  <label class="m-dialog-label m-dialog-label-license"
                    >Ngày ghi tăng <span class="requied">*</span></label
                  >
                  <MISADatepicker
                    @getDate="
                      (newValue) => (this.license.WriteUpDate = newValue)
                    "
                  />
                </div>
              </div>
              <div class="row mg-top-16">
                <div class="m-dialog-col col-12">
                  <label class="m-dialog-label m-dialog-label-license"
                    >Ghi chú</label
                  >
                  <div class="m-dialog-infor-enter">
                    <MISAInput
                      :placeholder="'Nhập ghi chú'"
                      :tag="'Description'"
                      :title="'Nhập ghi chú'"
                      :control="license.Description"
                      :type="'text'"
                      class="m-border"
                      @changeInput="changeInput"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="m-license-body">
          <div class="bgLicense license-detail pb-20">
            <h4 class="m-dialog-content-title">Thông tin chi tiết</h4>
            <div class="m-license-feature">
              <div class="m-license-search">
                <div class="m-input-wrap col-4">
                  <div class="m-icon-24 mg-left-8 m-filter-icon">
                    <div class="filter-icon-search"></div>
                  </div>
                  <input
                    type="text"
                    ref="searchInput"
                    placeholder="Tìm kiếm theo mã, tên tài sản"
                    class="m-input m-font-style m-border"
                    @change="searchAsset"
                  />
                </div>
                <MISAButton
                  :textButton="'Chọn tài sản'"
                  :class="'m-button m-button-chose-asset'"
                  @click="btnChooseAsset"
                />
              </div>
            </div>
            <div class="grid" style="background-color:#fff;">
              <div class="outer">
                <table>
                  <thead>
                    <tr>
                      <th style="text-align: center; min-width: 46px">STT</th>
                      <th style="min-width: 130px; padding-left: 10px">
                        Mã tài sản
                      </th>
                      <th style="min-width: 130px">Tên tài sản</th>
                      <th style="min-width: 208px; padding-left: 20px">
                        Bộ phận sử dụng
                      </th>
                      <th class="text-right" style="min-width: 120px">
                        Nguyên giá
                      </th>
                      <th class="text-right" style="min-width: 140px">
                        Hao mòn năm
                      </th>
                      <th
                        class="text-right"
                        style="min-width: 130px; padding-right: 8px"
                      >
                        Giá trị còn lại
                      </th>
                    </tr>
                  </thead>
                  <MISALoading v-if="isLoading" />
                  <tbody id="tblAsset">
                    <tr
                      v-for="(asset, index) in arrayListAsset"
                      :key="asset.FixedAssetId"
                    >
                      <td style="text-align: center">{{ index + 1 }}</td>
                      <td style="padding-left: 10px">
                        {{ asset.FixedAssetCode }}
                      </td>
                      <td class="textLong" style="max-width: 130px">
                        {{ asset.FixedAssetName }}
                      </td>
                      <td
                        class="textLong"
                        style="max-width: 208px; padding-left: 20px"
                      >
                        {{ asset.DepartmentName }}
                      </td>
                      <td class="text-right">
                        {{ this.formatSalary(asset.Cost) }}
                      </td>
                      <td class="text-right">
                        {{ this.formatSalary(asset.Accumulated) }}
                      </td>
                      <td class="text-right" style="padding-right: 8px">
                        {{
                          this.formatSalary(
                            asset.Cost - asset.Accumulated < 0
                              ? 0
                              : asset.Cost - asset.Accumulated
                          )
                        }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div :class="[this.assetDetail.length == 0 ? 'visibility-none': '','m-table-container']" >
                <table style="width: 100%">
                  <tfoot>
                    <tr>
                      <td style="min-width: 518px"></td>
                      <td class="text-right text-bold" style="min-width: 120px">
                        {{ totalCost }}
                      </td>
                      <td class="text-right text-bold" style="min-width: 140px">
                        {{ totalAccumulate }}
                      </td>
                      <td
                        class="text-right text-bold"
                        style="min-width: 130px; padding-right: 12px"
                      >
                        {{ totalPriceExtra }}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div class="pagination">
                <p class="pagination-title">
                  Tổng số: <b>{{ this.assetDetail.length }}</b> bản ghi
                </p>
                <div class="padding-btn-wrap">
                  <MISACombobox
                    :tag="'dropdownPagination'"
                    :checkIsEmpty="'checkIsEmpty'"
                    @getComboSelected="getPageSize"
                  />
                  <!-- <span class="padding-sum">20</span>
                    <button class="icon-down mg-right-12 mg-left-8"></button> -->
                </div>
                <paginate
                  :page-count="totalPageSize"
                  :prev-link-class="'prev-link-class'"
                  :next-link-class="'next-link-class'"
                  :click-handler="clickCallback"
                  :prev-text="'Prev'"
                  v-model="this.pageIndex"
                  :next-text="'Next'"
                  :container-class="'pagination-btn'"
                >
                </paginate>
              </div>
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
    <DialogLicenseAsset
      v-if="isShowLicenseAsset"
      @btnClose="btnClose"
      @arrayAsset="arrayAsset"
    />
  </div>
</template>

<script>
import axios from "axios";
import Paginate from "vuejs-paginate-next";
import DialogLicenseAsset from "./DialogLicenseAsset.vue";
export default {
  name: "LicenseDetail",
  components: {
    DialogLicenseAsset,
    Paginate,
  },

  computed: {
    /**
     * Mô tả : Tính tổng nguyên giá
     * @param
     * @return tổng nguyên giá
     * Created by: QuyenNC
     * Created date: 14:44 09/06/2022
     */
    totalCost: function () {
      const totalCost = this.assetDetail.reduce(
        (initialValue, currentValue) => {
          return initialValue + currentValue.Cost;
        },
        0
      );
      return this.formatSalary(totalCost);
    },

    /**
     * Mô tả : Tính tổng hao mòn năm
     * @param
     * @return tổng hao mòn năm
     * Created by: QuyenNC
     * Created date: 14:44 09/06/2022
     */
    totalAccumulate: function () {
      const totalAccumulate = this.assetDetail.reduce(
        (initialValue, currentValue) => {
          return initialValue + currentValue.Accumulated;
        },
        0
      );
      return this.formatSalary(totalAccumulate);
    },

    /**
     * Mô tả : Tính tổng giá trị còn lại
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 15:00 09/06/2022
     */
    totalPriceExtra: function () {
      const totalPriceExtra = this.assetDetail.reduce(
        (initialValue, currentValue) => {
          return initialValue + (currentValue.Cost - currentValue.Accumulated);
        },
        0
      );
      return this.formatSalary(totalPriceExtra);
    },

    /**
     * Mô tả : Tính tổng số trang
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 14:59 09/06/2022
     */
    totalPageSize: function () {
      return Math.ceil(this.arraySearchAsset.length / this.pageSize);
    },
  },
  watch: {
    // arrayListAsset: function (newValue) {
    //   this.arraySearchAsset  = newValue;
    // }
  },
  props: ["licenseSelected", "formMode", "search"],
  mounted() {
    // focus vào ô lỗi đầu tiên
    this.$refs.licenseCode.setFocus();
    // Gán dữ liệu vào license
    this.license = this.licenseSelected;
    // Gán dữ liệu vào object mới
    this.assetObject = Object.assign({}, this.license);
  },
  methods: {
    /**
     * Mô tả : Lấy ra giá trị PageSize từ MISACombobox;
     * @param value: object khi emit từ MISACombobox;
     * @return
     * Created by: QuyenNC
     * Created date: 10:10 22/05/2022
     */
    getPageSize(value) {
      // Thay đổi giá trị pageSize
      this.pageSize = value.itemData.pageSize;

      this.pageIndex = 1;
      if (this.input != "") {
        this.calculateDataPage(this.arraySearchAsset);
      } else {
        this.calculateDataPage(this.assetDetail);
      }
      // Gọi hàm tính dữ liệu trên trang tiếp theo
    },
    /**
     * Mô tả : Tìm kiếm theo mã, tên tài sản
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 23:10 09/06/2022
     */
    searchAsset() {
      // Lấy giá trị input
      this.input = this.$refs.searchInput.value;
      console.log(this.assetDetail);
      let array = [];
      for (let item of this.assetDetail) {
        if (item.FixedAssetCode.toLowerCase().includes(this.input.toLowerCase())) {
          array.push(item);
        }
      }

      this.arrayListAsset = this.assetDetail.filter((element) => {
        return array.includes(element);
      });

      this.arraySearchAsset = [...this.arrayListAsset];

      console.log("Line 377", this.arraySearchAsset);
        this.pageIndex = 1;
      this.calculateDataPage(this.arraySearchAsset);

    
    },

    /**
     * Mô tả : Số bản ghi trên 1 trang đầu tiên khi nhận dữ liệu từ DialogLicenseAsset
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 23:12 09/06/2022
     */
    arrayAsset(arrayList) {
      // Ẩn form DialogLicenseAsset
      this.isShowLicenseAsset = false;
      //Lưu mảng đã chọn từ DialogLicenseAsset

      this.assetDetail = arrayList;

      this.arraySearchAsset = arrayList;
      // Nếu mảng nhận tự DialogLicenseAsset < pageSize trên 1 trang
      if (arrayList.length < this.pageSize) {
        // Lặp qua các phần tử để hiện lên giao diện
        for (let i = 0; i < arrayList.length; i++) {
          this.arrayListAsset.push(arrayList[i]);
        }
      }
      // Nếu mảng nhận tự DialogLicenseAsset > pageSize trên 1 trang
      else {
        for (let i = 0; i < this.pageSize; i++) {
          this.arrayListAsset.push(arrayList[i]);
        }
      }
    },

    /**
     * Mô tả : Tính dữ liệu bản ghi trên các trang tiếp theo
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 23:24 09/06/2022
     */
    calculateDataPage(array) {
      console.log("Line 406", array);
      this.arrayListAsset = [];
      // Tính ra vị trí hiện tại
      this.offset = (this.pageIndex - 1) * this.pageSize;
      console.log("Line 423", this.offset);
      // Lưu mảng đã ngắt bỏ
      var arrayAsset = array.slice(this.offset, this.offset + this.pageSize);
      console.log("Line 425",arrayAsset);
      // Duyệt qua các phần tử để hiện thị dữ liệu tiếp theo
      for (let i = 0; i < arrayAsset.length; i++) {
        this.arrayListAsset.push(arrayAsset[i]);
      }
      console.log("Line 429",this.arrayListAsset);
    },
    /**
     * Mô tả : Lấy ra số trang hiện tại khi click vào pagination (thư viện)
     * @param pageIndex: số trang hiện tại
     * @return
     * Created by: QuyenNC
     * Created date: 10:08 22/05/2022
     */
    async clickCallback(pageIndex) {
      console.log("Line 440",this.input);
      console.log(pageIndex);
      // Thay đối số trang.
      this.pageIndex = pageIndex;
      // Gọi hàm tính dữ liệu trên những trang tiếp theo
      if (this.input != "") {
        console.log("abc");
        this.calculateDataPage(this.arraySearchAsset);
      } else {
        console.log("bcd");
        this.calculateDataPage(this.assetDetail);
      }
    },
    /**
     * Mô tả : Ẩn form DialogLicenseAsset
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 09:11 09/06/2022
     */
    btnClose() {
      this.isShowLicenseAsset = false;
    },
    /**
     * Mô tả : Thay đổi nội dung từ v-model
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 17:33 08/06/2022
     */
    changeInput(content, tag) {
      this.license[tag] = content;
    },

    btnChooseAsset() {
      this.isShowLicenseAsset = true;
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
     * Mô tả : Format tiền về dạng(xx.xxx.xxx);
     * @param
     * @return Trả về tiền đã format
     * Created by: QuyenNC
     * Created date: 22:55 20/05/2022
     */
    formatSalary(salary) {
      const format = `${salary
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
      return format;
    },

    /**
     * Mô tả : Lưu dữ liệu vào database
     * @param
     * @return Lưu dữ liệu thành công hoặc thất bại
     * Created by: QuyenNC
     * Created date: 15:59 08/06/2022
     */
    btnSaveOnClick() {
      var me = this;
      var btnName = "btnClose";
      if (this.formMode == 1) {
        this.license.CreatedDate = new Date();
        this.license.ModifiedDate = new Date();
        axios
          .post("http://localhost:5062/api/v1/Licenses", this.license)
          .then(function () {
            me.$emit("toastMessage", "Lưu dữ liệu thành công");
            me.$emit("getData");
          })
          .catch(function (response) {
            console.log("Line 325", response.response.data);
            var statusCode = response.request.status;
            var data = response.response.data;
            me.checkValidateBackend(statusCode, data, btnName);
          });
      }
    },

    /**
     * Mô tả : xem có hủy bỏ thông báo hay không
     * Created by: QuyenNC
     * Created date: 17:21 27/04/2022
     */
    btnCancel() {
      // kiểm tra xem giá trị của 2 object có giống nhau không ?
      // Nếu không có sự thay đổi gì
      if (JSON.stringify(this.license) === JSON.stringify(this.assetObject)) {
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
  },
  // watch: {
  //   licenseSelected: function (newValue) {
  //     console.log("Line 304", newValue);
  //     this.license = newValue;
  //   },
  // },
  data() {
    return {
      license: {},
      // Ẩn hiện form LicenseDetail
      isShowLicenseAsset: false,

      arraySearchAsset: [],

      arrayListAsset: [],

      offset: 1,

      pageIndex: 1,

      pageSize: 2,

      assetDetail: [],

      input: "",

      // Lưu thông tin mảng asset từ DialogLicenseAsset
      // assetDetail: [
      //   {
      //     FixedAssetCode: "TS-1851",
      //     FixedAssetName: "Xe Toyota",
      //     DepartmentName: "Trung tam GDTX",
      //     Cost: 1000000,
      //     Accumulated: 20000,
      //   },
      //   {
      //     FixedAssetCode: "TS-1852",
      //     FixedAssetName: "Xe Toyota2",
      //     DepartmentName: "Trung tam GDTX2",
      //     Cost: 1000000,
      //     Accumulated: 20000,
      //   },
      //   {
      //     FixedAssetCode: "TS-1853",
      //     FixedAssetName: "Xe Toyota3",
      //     DepartmentName: "Trung tam GDTX3",
      //     Cost: 1000000,
      //     Accumulated: 20000,
      //   },
      //   {
      //     FixedAssetCode: "TS-1854",
      //     FixedAssetName: "Xe Toyota4",
      //     DepartmentName: "Trung tam GDTX4",
      //     Cost: 1000000,
      //     Accumulated: 20000,
      //   },
      //   {
      //     FixedAssetCode: "TS-1855",
      //     FixedAssetName: "Xe Toyota5",
      //     DepartmentName: "Trung tam GDTX5",
      //     Cost: 1000000,
      //     Accumulated: 20000,
      //   },
      // ],
    };
  },
};
</script>

<style scoped>
@import url("../css/license/licenseDetail.css");
.m-dialog-footer {
  margin-top: 0;
}

.m-dialog-content {
  background-color: #fff;
  padding: 16px;
  margin: 0;
}

.m-input-wrap {
  max-width: none;
}

.m-button-chose-asset {
  background-color: #fff;
  color: #000;
  width: 140px;
}

.outer {
  box-shadow: none;
}

table tfoot td {
  background-color: #f5f5f5;
}
</style>
