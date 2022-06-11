<template>
  <div>
    <div class="content">
      <div class="content-title">
        <h3>Ghi tăng tài sản</h3>
        <div class="filter-right" style="align-item: center">
          <button
            class="m-button m-button-icon"
            id="btnAdd"
            @click="showLicenseDetail"
            style="width: 100px"
          >
            Thêm
          </button>
          <div class="license-icon-wrap mg-left-15">
            <div class="icon-horizontal mg-left-right"></div>
            <div class="license-icon-down mg-left-right"></div>
          </div>
        </div>
      </div>
      <div class="content-body license">
        <div class="filter-bar bg-white">
          <div class="filter-left">
            <div class="m-input-wrap" id="m-license-input">
              <div class="m-icon-24 mg-left-8 m-filter-icon">
                <div class="filter-icon-search"></div>
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm theo số chứng từ, nội dung"
                class="m-input m-font-style m-border"
              />
            </div>
          </div>
        </div>
        <div class="grid">
          <div class="outer">
            <table>
              <thead>
                <tr>
                  <th>
                    <MISACheckbox
                      @click="isShowAllChecked"
                      :checked="isChecked"
                    />
                  </th>
                  <th>STT</th>
                  <th style="min-width: 180px; padding-left: 25px">
                    Số chứng từ
                  </th>
                  <th style="min-width: 160px; text-align: center">
                    Ngày chứng từ
                  </th>
                  <th style="min-width: 170px; text-align: center">
                    Ngày ghi tăng
                  </th>
                  <th class="text-right" style="min-width: 120px">
                    Tổng nguyên giá
                  </th>
                  <th style="min-width: 430px; padding-left: 20px">Nội dung</th>
                  <th class="text-center" style="min-width: 70px"></th>
                </tr>
              </thead>
              <MISALoading v-if="isLoading" />
              <tbody id="tblasset">
                <tr
                  v-for="(license, index) in licenses"
                  :key="license.FixedAssetId"
                >
                  <td>
                    <MISACheckbox />
                  </td>
                  <td style="text-align: center">{{ index + 1 }}</td>
                  <td style="padding-left: 25px; color: #1aa4c8">
                    {{ license.LicenseCode }}
                  </td>
                  <td class="text-center" style="max-width: 170px">
                    {{ this.formatDate(license.UseDate) }}
                  </td>
                  <td class="text-center" style="max-width: 160px">
                    {{ this.formatDate(license.WriteUpDate) }}
                  </td>
                  <td class="text-right">{{ license.Total }}</td>
                  <td class="text-right"></td>
                  <td class="text-center">
                    <div class="btn-feature">
                      <button
                        class="filter-right-icon icon-editing mg-right-16 edit tooltip"
                      >
                        <span class="tooltiptext">Sửa chứng từ</span></button
                      ><button
                        class="filter-right-icon icon-delete delete tooltip"
                      >
                        <span class="tooltiptext">Xóa chứng từ</span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="m-table-container">
            <table style="width: 100%">
              <tfoot>
                <tr>
                  <td style="min-width: 584px"></td>
                  <td class="text-right text-bold" style="min-width: 120px">
                    3.80.000.000
                  </td>
                  <td style="min-width: 500px"></td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div class="pagination">
            <p class="pagination-title">Tổng số: <b>10</b> bản ghi</p>
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
              :next-text="'Next'"
              v-model="this.pageIndex"
              :container-class="'pagination-btn'"
            >
            </paginate>
          </div>
        </div>
      </div>
      <div class="m-license-body">
        <div class="bgLicense license-detail" style="padding: 0 23px 0 20px">
          <h4 class="m-dialog-content-title bg-white">Thông tin chi tiết</h4>
          <div class="m-license-feature"></div>
          <div class="grid">
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
                <!--v-if-->
                <tbody id="tblAsset">
                  <tr>
                    <td style="text-align: center">1</td>
                    <td style="padding-left: 10px">TS-1851</td>
                    <td class="textLong" style="max-width: 170px">Xe Toyota</td>
                    <td
                      class="textLong"
                      style="max-width: 160px; padding-left: 20px"
                    >
                      Trung tam GDTX
                    </td>
                    <td class="text-right">101.000.000</td>
                    <td class="text-right">6.000.000</td>
                    <td class="text-right" style="padding-right: 8px">
                      40.000.000
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align: center">1</td>
                    <td style="padding-left: 10px">TS-1851</td>
                    <td class="textLong" style="max-width: 170px">Xe Toyota</td>
                    <td
                      class="textLong"
                      style="max-width: 160px; padding-left: 20px"
                    >
                      Trung tam GDTX
                    </td>
                    <td class="text-right">101.000.000</td>
                    <td class="text-right">6.000.000</td>
                    <td class="text-right" style="padding-right: 8px">
                      40.000.000
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align: center">1</td>
                    <td style="padding-left: 10px">TS-1851</td>
                    <td class="textLong" style="max-width: 170px">Xe Toyota</td>
                    <td
                      class="textLong"
                      style="max-width: 160px; padding-left: 20px"
                    >
                      Trung tam GDTX
                    </td>
                    <td class="text-right">101.000.000</td>
                    <td class="text-right">6.000.000</td>
                    <td class="text-right" style="padding-right: 8px">
                      40.000.000
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align: center">1</td>
                    <td style="padding-left: 10px">TS-1851</td>
                    <td class="textLong" style="max-width: 170px">Xe Toyota</td>
                    <td
                      class="textLong"
                      style="max-width: 160px; padding-left: 20px"
                    >
                      Trung tam GDTX
                    </td>
                    <td class="text-right">101.000.000</td>
                    <td class="text-right">6.000.000</td>
                    <td class="text-right" style="padding-right: 8px">
                      40.000.000
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align: center">1</td>
                    <td style="padding-left: 10px">TS-1851</td>
                    <td class="textLong" style="max-width: 170px">Xe Toyota</td>
                    <td
                      class="textLong"
                      style="max-width: 160px; padding-left: 20px"
                    >
                      Trung tam GDTX
                    </td>
                    <td class="text-right">101.000.000</td>
                    <td class="text-right">6.000.000</td>
                    <td class="text-right" style="padding-right: 8px">
                      40.000.000
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="m-table-container">
              <table style="width: 100%">
                <tfoot>
                  <tr>
                    <td style="min-width: 518px"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LicenseDetail
      v-if="isShowLicenseDetail"
      :licenseSelected="licenseSelected"
      :formMode="formMode"
      @isShowAlert="isShowAlert"
      @toastMessage="toastMessage"
      @showDialog="showDialog"
      @getData="getData"
      @btnCancel="toastAlert"
    />

    <MISAToastMessage v-if="isShowMessage" :txtToastBody="title" />

    <MISAAlert
      :alertBody="titleAlert"
      :typeAlert="typeAlert"
      :isAlert="isAlert"
      @showDialog="showDialog"
      @btnDeleteData="btnOnClickDelete"
      @isShowAlert="isShowAlert"
      @resetForm="resetForm"
      @btnSave="btnSave"
      @focusError="focusError"
    />
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import Paginate from "vuejs-paginate-next";
import LicenseDetail from "../../views/LicenseDetail.vue";
export default {
  name: "TheLicense",
  components: {
    LicenseDetail,
    Paginate,
  },
  created() {
    this.getData();
  },
  computed: {
    totalPageSize: function () {
      return Math.ceil(this.licenses.length / this.pageSize);
    },
  },
  props: [""],
  methods: {
    /**
     * Mô tả : Lấy ra số trang hiện tại khi click vào pagination (thư viện)
     * @param pageIndex: số trang hiện tại
     * @return
     * Created by: QuyenNC
     * Created date: 10:08 22/05/2022
     */
    async clickCallback(pageIndex) {
      // Thay đối số trang.
      this.pageIndex = pageIndex;
      await this.search();
    },
    /**
     * Mô tả : format date
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 15:38 08/06/2022
     */
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    /**
     * Mô tả : Lấy dữ liệu
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 15:39 08/06/2022
     */
    async getData() {
      var me = this;
      // loading khi chưa có dữ liệu
      this.isLoadingData(true);
      // lay data trong axios
      await axios
        .get("http://localhost:5062/api/v1/Licenses")
        .then(function (res) {
          me.licenses = res.data;
          // ẩn loading
          me.isLoadingData(false);
        })
        .catch(function (response) {
          console.log(response);
        });
    },

    /**
     * Mô tả : resetForm về ban đầu
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 15:39 08/06/2022
     */
    resetForm() {
      this.licenseSelected = {
        LicenseCode: "",
        UseDate: new Date(),
        WriteUpDate: new Date(),
        Description: "",
      };
    },

    /**
     * Mô tả : Hiệm thị form LicenseDetail
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 14:48 07/06/2022
     */
    async showLicenseDetail() {
      // resetForm
      this.resetForm();

      this.formMode = 1;
      // Tự động sinh mã mới
      await this.createNewAssetCode();
      // Hiện thị from LicenseDetail
      this.isShowLicenseDetail = true;
    },

    /**
     * Mô tả : Hàm sinh mã mới
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 14:22 08/06/2022
     */
    async createNewAssetCode() {
      var me = this;
      // Gọi api sinh mã mới
      await axios
        .get("http://localhost:5062/api/v1/Licenses/NewCode")
        .then(function (response) {
          // Gán dữ liệu vào ô mã tài sản
          me.licenseSelected.LicenseCode = response.data;
        })
        .catch(function (response) {
          console.log(response);
        });
    },

    /**
     * Mô tả : Hàm xử lý toastMessage trong MISAToastMessage
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 00:00 23/05/2022
     */
    toastMessage(title) {
      // Tắt form AssetDetail
      this.showDialog(false);
      // Hiện thị ToastMessage
      this.showToastMessage(true);
      // Thay đổi nội dung body trong MISAToastMessage
      this.title = title;
      // Sau 3 giây tắt ToastMessage
      setTimeout(() => {
        this.showToastMessage(false);
      }, 3000);
    },

    /**
     * Mô tả : Loading
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 00:09 23/05/2022
     */
    isLoadingData(isLoading) {
      this.isLoading = isLoading;
    },

    /**
     * Mô tả : Ẩn hiện thông báo thành công
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 23:06 25/04/2022
     */
    showToastMessage(isShow) {
      this.isShowMessage = isShow;
    },

    /**
     * Mô tả : Đóng mở form AssetDetail
     * Created by: QuyenNC
     * Created date: 16:07 25/04/2022
     */

    showDialog(isShow) {
      this.isShowLicenseDetail = isShow;
    },

    /**
     * Mô tả : Hàm xử lý toast Alert
     * @param title - nội dung text muốn truyền vào trong MISAAlert,
     * typeAlert: tên loại để xét xem là mấy button trong MISAAlert
     * @return
     * Created by: QuyenNC
     * Created date: 08:53 22/05/2022
     */
    toastAlert(title, typeAlert) {
      this.titleAlert = title;
      this.typeAlert = typeAlert;
    },

    /**
     * Mô tả : Hiện thị alert cảnh báo
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 23:05 25/04/2022
     */
    isShowAlert(alert) {
      this.isAlert = alert;
    },
  },
  data() {
    return {
      // Lưu mảng dữ liệu đầu vào
      licenses: [],
      // Ẩn hiệm form LicenseDetail
      isShowLicenseDetail: false,

      licenseSelected: {
        LicenseCode: "",
      },
      // Ẩn hiện loading
      isLoading: false,

      // 1: thêm mới 2: sửa
      formMode: "",

      // Ẩn hiện toastMessage
      isShowMessage: false,
      // Ẩn hiện alert
      isAlert: true,

      // thông tin alert
      titleAlert: "",
      typeAlert: "",

      // phân trang
      // Số trang
      pageIndex: 1,
      // Số bản ghi trên 1 trang
      pageSize: 2,
    };
  },
};
</script>

<style scoped>
@import url("../../css/license/license.css");
</style>
