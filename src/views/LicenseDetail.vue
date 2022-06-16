<template>
  <div class="modal" id="dlgDetail">
    <div class="modal__overlay"></div>
    <div class="modal__body" id="widthLicense">
      <div class="m-dialog">
        <div class="m-license-header">
          <div class="m-dialog-header">
            <h3 class="m-dialog-header-title">{{this.titlePage}}</h3>
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
                      :isRequired="true"
                      maxLength="50"
                      @blur="checkIsNull"
                      @changeInput="changeInput"
                    />
                    <span
                      class="fieldIsEmpty"
                      :class="this.isEmpty[0] == false ? 'visibility-none' : ''"
                      >Mã chứng từ không được phép để trống</span
                    >
                  </div>
                </div>
                <div class="m-dialog-col col-4 mg-right-16">
                  <label class="m-dialog-label m-dialog-label-license"
                    >Ngày bắt đầu sử dụng <span class="requied">*</span></label
                  >
                  <MISADatepicker
                    ref="UseDate"
                    @getDate="(newValue) => (this.license.UseDate = newValue)"
                    :nameValue="'Ngày sử dụng'"
                  />
                  <span
                    class="fieldIsEmpty"
                    :class="this.isEmpty[2] == false ? 'visibility-none' : ''"
                    >không trống</span
                  >
                </div>
                <div class="m-dialog-col col-4">
                  <label class="m-dialog-label m-dialog-label-license"
                    >Ngày ghi tăng <span class="requied">*</span></label
                  >
                  <MISADatepicker
                    @getDate="
                      (newValue) => (this.license.WriteUpDate = newValue)
                    "
                    :nameValue="'Ngày ghi tăng'"
                  />
                  <span
                    class="fieldIsEmpty"
                    :class="this.isEmpty[2] == false ? 'visibility-none' : ''"
                    >không trống</span
                  >
                </div>
              </div>
              <div class="row mg-top-4">
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
            <div class="grid" style="background-color: #fff">
              <div class="outer">
                <table>
                  <thead style="z-index: 1">
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
                      @dblclick="btnUpdateAsset"
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
                      <td
                        class="text-right"
                        style="padding-right: 8px; position: relative"
                      >
                        {{
                          this.formatSalary(
                            asset.Cost - asset.Accumulated < 0
                              ? 0
                              : asset.Cost - asset.Accumulated
                          )
                        }}
                        <div
                          class="btn-feature"
                          style="position: absolute; top: 8px; right: 20px"
                        >
                          <div class="m-icon-24 mg-right-16 btn-feature-color">
                            <button
                              class="filter-right-icon icon-editing edit tooltip"
                            >
                              <span class="tooltiptext">Sửa tài sản</span>
                            </button>
                          </div>
                          <div class="m-icon-24 btn-feature-color">
                            <button
                              class="filter-right-icon icon-delete delete tooltip"
                              style="margin: 0"
                              @click="btnDeleteLicenseAsset(asset)"
                            >
                              <span class="tooltiptext">Xóa tài sản</span>
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                :class="[
                  this.assetDetail.length == 0 ? 'visibility-none' : '',
                  'm-table-container',
                ]"
              >
                <table style="width: 100%">
                  <tfoot>
                    <tr>
                      <td style="min-width: 518px"></td>
                      <td class="text-right text-bold" style="min-width: 120px">
                        {{ this.formatSalary(totalCost) }}
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
                  v-model="this.pageIndexFE"
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
      ref="licenseAsset"
      v-if="isShowLicenseAsset"
      :arrayLicenseAsset="arrayLicenseAsset"
      :isLoading="isLoading"
      :totalNumberPage="totalNumberPage"
      @changePageIndex="changePageIndex"
      @changePageSize="changePageSize"
      @searchFilter="searchFilter"
      @btnClose="btnClose"
      @arrayAsset="arrayAsset"
    />
    <DialogUpdateAsset v-if="isShowUpdateAsset" @btnClose="btnClose" />
  </div>
</template>

<script>
import axios from "axios";
import Paginate from "vuejs-paginate-next";
import DialogLicenseAsset from "./DialogLicenseAsset.vue";
import DialogUpdateAsset from "./DialogUpdateAsset.vue";
export default {
  name: "LicenseDetail",
  components: {
    DialogLicenseAsset,
    Paginate,
    DialogUpdateAsset,
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
      return totalCost;
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
      return Math.ceil(this.arraySearchAsset.length / this.pageSizeFE);
    },
  },
  watch: {},
  props: ["licenseSelected", "formMode", "arrayAssetSelected","titlePage"],
  mounted() {
    // focus vào ô lỗi đầu tiên
    this.$refs.licenseCode.setFocus();
    // Gán dữ liệu vào license
    this.license = this.licenseSelected;
    // Gán dữ liệu vào object mới
    this.assetObject = Object.assign({}, this.license);
    //Lưu mảng đã chọn từ DialogLicenseAsset không thay đổi khi search
    this.assetDetail = this.arrayAssetSelected;

    this.arrayListAsset = this.arrayAssetSelected;

    this.arraySearchAsset = this.arrayAssetSelected;

    this.arrayAssetInitial = this.arrayAssetSelected;
    this.calculateDataPage(this.arraySearchAsset);
  },
  methods: {
    checkIsNull() {
      this.isEmpty[0] = this.$refs.licenseCode.isImport;
    },
    /**
     * Mô tả : Hiện thị  hoặc tắt form DialogUpdateAsset
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 14:14 12/06/2022
     */
    btnUpdateAsset() {
      this.isShowUpdateAsset = true;
    },
    /**
     * Mô tả : Lấy ra giá trị PageSize từ MISACombobox;
     * @param value: object khi emit từ MISACombobox;
     * @return
     * Created by: QuyenNC
     * Created date: 10:10 22/05/2022
     */
    getPageSize(value) {
      // Thay đổi giá trị pageSize
      this.pageSizeFE = value.itemData.pageSize;
      // đưa về số trang đầu tiên
      this.pageIndexFE = 1;
      // if (this.input != "") {
      //   this.calculateDataPage(this.arraySearchAsset);
      // } else {
      this.calculateDataPage(this.assetDetail);
      //}
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

      // Lưu các giá trị thỏa mãn khi search
      let array = [];
      for (let item of this.assetDetail) {
        if (
          item.FixedAssetCode.toLowerCase().includes(this.input.toLowerCase())
        ) {
          array.push(item);
        }
      }
      // Lọc qua các phần tử thỏa mãn để hiện lên giao diện
      this.arrayListAsset = this.assetDetail.filter((element) => {
        return array.includes(element);
      });

      // Lưu lại các giá trị thỏa mãn để tính lại tổng số trang
      this.arraySearchAsset = [...this.arrayListAsset];

      // Đưa về trang ban đầu
      this.pageIndexFE = 1;
      // Gọi hàm lại dữ liệu
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
      // this.arrayListAsset = [];
      // Ẩn form DialogLicenseAsset
      this.isShowLicenseAsset = false;
      //Lưu mảng đã chọn từ DialogLicenseAsset không thay đổi khi search
      this.assetDetail = this.assetDetail.concat(arrayList);

      // Lưu mảng đã chọn từ DialogLicenseAsset và lưu sự thay đổi
      this.arraySearchAsset = this.assetDetail;
      // Gọi hàm tính dữ liệu
      this.calculateDataPage(this.arraySearchAsset);
      // Nếu mảng nhận tự DialogLicenseAsset < pageSizeFE trên 1 trang
      // if (arrayList.length < this.pageSizeFE) {
      //   // Lặp qua các phần tử để hiện lên giao diện
      //   for (let i = 0; i < arrayList.length; i++) {
      //     // Hiện các phần tử lên giao diện lên giao diện
      //     this.arrayListAsset.push(arrayList[i]);
      //   }
      // }
      // // Nếu mảng nhận tự DialogLicenseAsset > pageSizeFE trên 1 trang
      // else {
      //   for (let i = 0; i < this.pageSizeFE; i++) {
      //     // Hiện các phần tử lên giao diện lên giao diện
      //     this.arrayListAsset.push(arrayList[i]);
      //   }
      // }
    },

    /**
     * Mô tả : Xóa dữ liệu
     * @param
     * @return Bản ghi đã bị xóa
     * Created by: QuyenNC
     * Created date: 10:55 14/06/2022
     */
    btnDeleteLicenseAsset(asset) {
      // lọc dữ liệu
      this.assetDetail = this.assetDetail.filter((item) => {
        return item.FixedAssetId != asset.FixedAssetId;
      });
      // chia lại phân trang
      this.arraySearchAsset = this.assetDetail;

      this.pageIndexFE = 1;
      // Gọi hàm tính lại dữ liệu
      this.calculateDataPage(this.arraySearchAsset);
      if (this.formMode == 2) {
        // var me = this;
        axios
          .delete(
            "http://localhost:5062/api/v1/LicenseDetails/" +
              asset.LicenseDetailId
          )
          .then(function (response) {
            console.log(response);
            //  me.$emit("toastMessage", "Xóa dữ liệu thành công");
          })
          .catch(function (response) {
            console.log(response);
          });
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
      // Xóa các dữ liệu đã lưu trước đó.
      this.arrayListAsset = [];
      // Tính ra vị trí hiện tại
      this.offset = (this.pageIndexFE - 1) * this.pageSizeFE;

      // Lưu mảng đã ngắt bỏ
      var arrayAsset = array.slice(this.offset, this.offset + this.pageSizeFE);
      // Duyệt qua các phần tử để hiện thị dữ liệu tiếp theo
      for (let i = 0; i < arrayAsset.length; i++) {
        // Hiện thị lên giao diện
        this.arrayListAsset.push(arrayAsset[i]);
      }
    },
    /**
     * Mô tả : Lấy ra số trang hiện tại khi click vào pagination (thư viện)
     * @param pageIndexFE: số trang hiện tại
     * @return
     * Created by: QuyenNC
     * Created date: 10:08 22/05/2022
     */
    async clickCallback(pageIndex) {
      // Thay đối số trang.
      this.pageIndexFE = pageIndex;
      console.log("Line 525", this.pageIndexFE);
      // Gọi hàm tính dữ liệu trên những trang tiếp theo
      // if (this.input != "") {
      this.calculateDataPage(this.arraySearchAsset);
      // } else {

      //   this.calculateDataPage(this.assetDetail);
      // }
    },
    /**
     * Mô tả : Đóng form
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 09:11 09/06/2022
     */
    btnClose() {
      // Ẩn form DialogLicenseAsset
      this.isShowLicenseAsset = false;
      // Ẩn form DialogUpdateAsset
      this.isShowUpdateAsset = false;
    },
    /**
     * Mô tả : Thay đổi nội dung từ v-model
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 17:33 08/06/2022
     */
    changeInput(content, tag) {
      // thay đổi lai các giá trị
      this.license[tag] = content;
    },
    /**
    * Mô tả : đưa về trang ban đầu và search
    * @param
    * @return
    * Created by: QuyenNC
    * Created date: 14:59 16/06/2022
    */
    async searchFilter(filter, pageIndex) {
      // tìm kiếm
      this.filter = filter;
      // đưa về trang ban đầu
      this.pageIndex = pageIndex;
      // Gọi hàm search
      await this.search();
    },
    /**
    * Mô tả : Thay đổi giá tị pageSize và đưa về trang đầu tiên
    * @param
    * @return
    * Created by: QuyenNC
    * Created date: 15:03 16/06/2022
    */
    async changePageSize(pageSize, pageIndex) {
      this.pageSize = pageSize;
      this.pageIndex = pageIndex;
      await this.search();
    },
    /**
    * Mô tả : Thay đối số trang
    * @param
    * @return
    * Created by: QuyenNC
    * Created date: 15:04 16/06/2022
    */
    async changePageIndex(pageIndex) {
      this.pageIndex = pageIndex;
      await this.search();
    },
    /**
    * Mô tả : Phân trang dữ liệu khi có hoặc không có mảng các ID
    * @param
    * @return
    * Created by: QuyenNC
    * Created date: 15:06 16/06/2022
    */
    async search() {
      var me = this;
      const transformRequestOptions = (params) => {
        let options = "";
        for (const key in params) {
          if (typeof params[key] !== "object" && params[key]) {
            options += `${key}=${params[key]}&`;
          } else if (
            typeof params[key] === "object" &&
            params[key] &&
            params[key].length
          ) {
            params[key].forEach((el) => {
              options += `${key}=${el}&`;
            });
          }
        }
        return options ? options.slice(0, -1) : options;
      };
      this.isLoading = true;
      await axios
        .get("http://localhost:5062/api/v1/FixedAssets/licenseAsset", {
          params: {
            FixedAssetID: me.arrayFixedAssetID,
            pageIndex: me.pageIndex,
            pageSize: me.pageSize,
            filter: me.filter,
          },
          paramsSerializer: (params) => transformRequestOptions(params),
        })
        .then(function (response) {
          me.arrayLicenseAsset = response.data.search;
          me.totalNumberPage = response.data.totalRecord;
          me.isLoading = false;
        })
        .catch(function (response) {
          console.log(response);
        });
      // }
    },

    /**
    * Mô tả : Chọn các tài sản
    * @param
    * @return
    * Created by: QuyenNC
    * Created date: 15:07 16/06/2022
    */
    async btnChooseAsset() {
      console.log("Line 626", this.assetDetail);
      // Hiện thị DialogLicenseAsset
      this.isShowLicenseAsset = true;
      // if (this.assetDetail.length > 0) {
      this.arrayFixedAssetID = this.assetDetail.map((item) => {
        return item.FixedAssetId;
      });

      await this.search();
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
      /* eslint-disable */
      var me = this;
      var btnName = "btnClose";
      var errorBody = "";
      this.license.total = this.totalCost;
      this.license.CreatedDate = new Date();
      this.license.ModifiedDate = new Date();

      console.log(this.license.total);
      if (this.formMode == 1) {
        if (this.assetDetail.length == 0) {
          errorBody = "Chọn ít nhất 1 tài sản";
          this.checkShowAlert(errorBody, btnName);
        } else {
          var licenseInsert = {
            license: this.license,
            licenseAssetDetail: me.assetDetail.map((item) => {
              return {
                FixedAssetId: item.FixedAssetId,
              };
            }),
          };

          axios
            .post(
              "http://localhost:5062/api/v1/LicenseDetails/multiData",
              licenseInsert
            )
            .then(function (response) {
              console.log(response);
              me.$emit("toastMessage", "Lưu dữ liệu thành công");
              me.$emit("getData");
              me.$emit("search");
            })
            .catch(function (response) {
              console.log("Line 325", response.response.data);
              var statusCode = response.request.status;
              var data = response.response.data;
              me.checkValidateBackend(statusCode, data, btnName);
            });
        }
      }
      if (this.formMode == 2) {
        var arrayFilter = this.assetDetail.filter((element) => {
          return !this.arrayAssetInitial.includes(element);
        });
        var licenseInsert = {
          license: this.license,
          licenseAssetDetail: arrayFilter.map((item) => {
            return {
              FixedAssetId: item.FixedAssetId,
            };
          }),
        };

        axios
          .put(
            "http://localhost:5062/api/v1/LicenseDetails/multiData/" +
              me.license.LicenseId,
            licenseInsert
          )
          .then(function (res) {
            console.log(res);
            me.$emit("toastMessage", "Sửa dữ liệu thành công");
            me.$emit("search");
            me.$emit("getAssetFilterFromLicense",me.license);
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
      arrayAssetInitial: [],
      isEmpty: [false, false, false],

      arrayFixedAssetID: [],

      arrayLicenseAsset: [],
      // Ẩn hiện from DialogUpdateAsset
      isShowUpdateAsset: false,
      license: {},

      licenseDetail: {},
      // Ẩn hiện form LicenseDetail
      isShowLicenseAsset: false,

      arraySearchAsset: [],

      arrayListAsset: [],

      filter: null,

      offset: 1,

      pageIndex: 1,

      pageSize: 20,

      pageIndexFE: 1,

      pageSizeFE: 2,

      totalNumberPage: 0,

      assetDetail: [],

      isLoading: false,

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
