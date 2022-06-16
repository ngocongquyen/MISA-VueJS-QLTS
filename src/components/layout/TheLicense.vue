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
                ref="searchInput"
                type="text"
                placeholder="Tìm kiếm theo số chứng từ, nội dung"
                class="m-input m-font-style m-border"
                @input="searchLicense"
              />
            </div>
          </div>
          <div class="filter-right">
            <button
              class="icon-delete mg-right-20"
              style="display: none"
            ></button>
            <button class="icon-print mg-right-20 tooltip">
              <span class="tooltiptext">In</span>
            </button>

            <button
              class="icon-more"
              style="position: relative; top: 3px"
            ></button>
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
                  @click="rowOnClickChecked($event, license)"
                  @dblclick="updateLicenseDetail(license)"
                  :class="license.checked == true ? 'active-selected' : ''"
                >
                  <td>
                    <MISACheckbox :checked="license.checked" ref="checkAsset" />
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
                  <td class="text-right">
                    {{ this.formatSalary(license.Total) }}
                  </td>
                  <td style="padding-left: 20px">{{ license.Description }}</td>
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
                    {{totalCost}}
                  </td>
                  <td style="min-width: 500px"></td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div class="pagination">
            <p class="pagination-title">Tổng số: <b>{{this.totalData}}</b> bản ghi</p>
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
          <div
            class="bg-white"
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding-right: 12px;
            "
          >
            <h4 class="m-dialog-content-title">Thông tin chi tiết</h4>
            <button class="icon-zoom"></button>
          </div>
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
                  <tr
                    v-for="(licenseAsset, index) in licenseDetailAsset"
                    :key="licenseAsset.LicenseDetailId"
                  >
                    <td style="text-align: center">{{ index + 1 }}</td>
                    <td style="padding-left: 10px">
                      {{ licenseAsset.FixedAssetCode }}
                    </td>
                    <td class="textLong" style="max-width: 170px">
                      {{ licenseAsset.FixedAssetName }}
                    </td>
                    <td
                      class="textLong"
                      style="max-width: 160px; padding-left: 20px"
                    >
                      {{ licenseAsset.DepartmentName }}
                    </td>
                    <td class="text-right">
                      {{ this.formatSalary(licenseAsset.Cost) }}
                    </td>
                    <td class="text-right">
                      {{ this.formatSalary(licenseAsset.Accumulated) }}
                    </td>
                    <td class="text-right" style="padding-right: 8px">
                      {{
                        this.formatSalary(
                          licenseAsset.Cost - licenseAsset.Accumulated
                        )
                      }}
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
      :arrayAssetSelected="arrayAssetSelected"
      :titlePage="titlePage"
      @isShowAlert="isShowAlert"
      @toastMessage="toastMessage"
      @showDialog="showDialog"
      @getAssetFilterFromLicense="getAssetFilterFromLicense"
      @getData="getData"
      @search="search"
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
    this.search();
    this.getData();
  },
  computed: {
    /**
    * Mô tả : Tổng nguyên giá
    * @param
    * @return
    * Created by: QuyenNC
    * Created date: 10:17 16/06/2022
    */
    totalCost:function () {
        var totalCost = this.licenses.reduce((initialValue, currentValue)=> {
          return initialValue + currentValue.Total
        },0);
        return this.formatSalary(totalCost);
    },
    /**
    * Mô tả : Tổng số trang
    * @param
    * @return
    * Created by: QuyenNC
    * Created date: 10:17 16/06/2022
    */
    totalPageSize: function () {
      return Math.ceil(this.totalRecordSearch / this.pageSize);
    },
  },
  props: [""],
  methods: {
    async getPageSize(value) {
      // Thay đổi số sản phẩm trên 1 trang
      this.pageSize = value.itemData.pageSize;
      // Gán lại số trang về ban đầu khi thay đổi pageSize
      this.pageIndex = 1;
      // gọi hàm tìm kiếm
      await this.search();
    },
    /**
     * Mô tả : Hiện thị form alert và thực hiện xóa
     * Created by: QuyenNC
     * Created date: 16:14 27/04/2022
     */
    showAlert() {
      this.formMode = "";

      this.assetList = this.checkAssetList.filter((license) => {
        return license.checked == true;
      });

      // Hiện hoặc tắt alert
      this.isAlert = !this.isAlert;
      // Nếu assetList có phần khi ta bấm check.
      if (this.assetList.length != 0) {
        // Nếu trong mảng có 1 phàn tử khi Goi hàm toastAlert kèm thông tin
        if (this.assetList.length === 1) {
          this.toastAlert(
            `Bạn có muốn xóa chứng từ << ${this.assetList[0].LicenseCode}>>?`,
            "remove"
          );
        } else {
          this.toastAlert(
            this.assetList.length +
              " chứng từ đã được chọn. Bạn có muốn xóa các chứng từ này khỏi danh sách không?",
            "remove"
          );
        }
      }
      // Nếu arrayList rỗng.
      else {
        this.toastAlert(
          "Bạn chưa chọn sản phẩm nào để xóa. Vui lòng chọn sản phẩm bạn muốn xóa",
          "btnClose"
        );
      }
    },
    /**
     * Mô tả : Xoá dữ liệu
     * Created by: QuyenNC
     * Created date: 17:25 25/04/2022
     */
    async btnOnClickDelete() {
      console.log();
      // đưa formMode về rỗng khi xóa.
      var me = this;
      // Tắt alert
      this.isAlert = true;
      // Lấy ra 1 mảng danh sách các id
      this.arrayLicenseId = this.checkAssetList.filter((license) => {
        return license.checked == true;
      });
      console.log(this.arrayLicenseId);
      // Nếu mảng có 1 phần tử gọi api xóa 1
      if (this.arrayLicenseId.length == 1) {
        await axios
          .delete(
            `http://localhost:5062/api/v1/Licenses/` +
              this.arrayLicenseId[0].LicenseId
          )
          .then(function () {
            // Loading lại dữ liệu
            me.search();
            me.getData();
            me.getAssetFilterFromLicense(me.arrayLicenseId[0]);
            // Gọi đến hàm xử lý toastMessage
            me.toastMessage("Xóa dữ liệu thành công");
          })
          .catch(function (response) {
            console.log(response);
            me.toastMessage("Xóa dữ liệu thất bại");
          });
      }
      // Nếu mảng lớn hơn 1 thì gọi api xóa nhiều và truyền mảng id.
      else {
        await axios
          .delete("http://localhost:5062/api/v1/Licenses/deleteMultiple", {
            data: JSON.stringify(this.arrayLicenseId),
            headers: {
              "content-type": "application/json",
            },
          })
          .then(function () {
            me.search();
            me.getData();
            me.toastMessage("Xóa dữ liệu thành công");
          })
          .catch(function (response) {
            console.log(response);
            me.toastMessage("Xóa dữ liệu thất bại");
          });
      }
    },
    /**
     * Mô tả : Sửa chứng từ và chi tiết chứng từ
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 09:41 16/06/2022
     */
    async updateLicenseDetail(license) {
      // resetForm
      var me = this;
      this.formMode = 2;
      this.titlePage = 'Sửa chứng từ ghi tăng'
      // Tự động sinh mã mới
      // Hiện thị from LicenseDetail

      await axios
        .get("http://localhost:5062/api/v1/Licenses/" + license.LicenseId)
        .then(function (res) {
          console.log(res);
          me.licenseSelected = res.data;
          me.arrayAssetSelected = me.licenseDetailAsset;
        })
        .catch(function (res) {
          console.log(res);
        });
      this.isShowLicenseDetail = true;
      console.log(this.licenseDetailAsset);
    },
   
    /**
    * Mô tả : Lấy ra các tài sản theo chứng từ.
    * @param
    * @return
    * Created by: QuyenNC
    * Created date: 10:06 16/06/2022
    */
    getAssetFilterFromLicense(license) {
      var me = this;
      axios
        .get(
          "http://localhost:5062/api/v1/FixedAssets/getAssetFromLicense/" + license.LicenseId
        )
        .then(function (response) {
          me.licenseDetailAsset = response.data;
        })
        .catch(function (response) {
          console.log(response);
        });
    },

     /**
     * Mô tả : Kiểm tra xem có phần tử trong aray hay không ?
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 10:16 26/04/2022
     */
    rowOnClickChecked($event, license) {
      // Kiểm tra xem có class edit k
      if ($event.target.classList.contains("edit")) {
        this.updateLicenseDetail(license);
        // kiểm tra xem có class delete k;
      } else if ($event.target.classList.contains("delete")) {
        this.showAlert();
        //
      } else {
        if (license.checked == false) {
          this.checkAssetList.forEach((element) => {
            element.checked = false;
          });
          license.checked = true;
          this.getAssetFilterFromLicense(license);
        } else {
          license.checked = false;
          this.isChecked = false;
        }
      }
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
     * Mô tả : Set thời gian sau khi người dùng nhập xong chờ khoảng 1 giây và lấy ra giá trị
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 16:34 21/05/2022
     */
      searchLicense() {
      // clear timout
      clearTimeout(this.timeOut);
      // Lấy giá trị input
      this.changeValue = this.$refs.searchInput.value;

       this.pageIndex = 1;
      // đặt timeout và gọi hàm tìm kiếm
      this.timeOut = setTimeout(this.search, 1000);
    },

    /**
     * Mô tả : Tìm kiếm theo tên tài sản hoặc mã tài sản, tên bộ phận sử dụng, tên loại tài sản.
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 23:39 22/05/2022
     */
    async search() {
      var me = this;
      // bật loading khi chưa có dữ liệu trả về
      this.isLoadingData(true);
      await axios
        .get("http://localhost:5062/api/v1/Licenses/search", {
          params: {
            filter: me.changeValue,
            pageIndex: me.pageIndex,
            pageSize: me.pageSize,
          },
        })
        .then(function (response) {
          // gán dữ liệu vào mảng assets
          me.licenses = response.data.search;

          //Gán dữ liệu để duyệt xem kai nào đk check.
          me.checkAssetList = response.data.search;

          // Thêm checked vào các element
          response.data.search.forEach((element) => {
            element.checked = false;
          });

          me.totalRecordSearch = response.data.totalRecord;
          console.log(me.totalRecordSearch);
          // tắt loading khi có dữ liệu trả về
          me.isLoadingData(false);
        })
        .catch(function (response) {
          console.log(response);
        });
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
      // this.isLoadingData(true);
      // lay data trong axios
      await axios
        .get("http://localhost:5062/api/v1/Licenses")
        .then(function (res) {
          me.totalData = res.data.length;
          // // ẩn loading
          // me.isLoadingData(false);

          // me.checkAssetList = res.data;
          // // Thêm checked vào các element
          // res.data.forEach((element) => {
          //   element.checked = false;
          // });
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
        total: 0,
      };
      this.arrayAssetSelected = [];
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

      this.titlePage = 'Thêm chứng từ ghi tăng'
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
      // Lưu mảng array khi chọn chứng từ
      arrayAssetSelected: [],

      // Lọc dữ liệu
      changeValue:null,
      // Tổng số lượng bản ghi
      totalData: 0,
      // Tổng dữ liệu đê chia số trang
      totalRecordSearch:0,
      // Lưu mảng dữ liệu đầu vào
      licenses: [],
      // Mảng thông tin chi tiết về license
      licenseDetailAsset: [],
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
      pageSize: 20,
      //mảng chứa checked
      checkAssetList: [],
    };
  },
};
</script>

<style scoped>
@import url("../../css/license/license.css");
</style>
