<template>
  <div class="modal" id="dlgDetail">
    <div class="modal__overlay"></div>
    <div class="modal__body" id="widthLicense">
      <div class="m-dialog">
        <div class="m-dialog-header" style="border-bottom: 1px solid #afafaf">
          <h3 class="m-dialog-header-title">Chọn tài sản ghi tăng</h3>
          <div class="m-icon">
            <div class="icon-close" @click="btnClose"></div>
          </div>
        </div>
        <div class="content-detail">
          <div class="filter-bar" style="display: block">
            <div class="m-input-wrap col-4">
              <div class="m-icon-24 mg-left-8 m-filter-icon">
                <div class="filter-icon-search"></div>
              </div>
              <input
                type="text"
                ref="searchInput"
                placeholder="Tìm kiếm theo Mã, tên tài sản"
                class="m-input m-font-style m-border"
                @change="searchAsset"
              />
            </div>
          </div>
          <div class="grid license-asset-detail">
            <div
              class="outer"
              ref="MainTable"
              @scroll="
                this.$refs.FooterTable.scrollLeft =
                  this.$refs.MainTable.scrollLeft
              "
            >
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
                    <th style="padding-left: 25px; min-width: 150px">
                      Mã tài sản
                    </th>
                    <th style="min-width: 140px">Tên tài sản</th>
                    <th style="min-width: 176px; padding-left: 20px">
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
                      style="min-width: 140px; padding-right: 8px"
                    >
                      Giá trị còn lại
                    </th>
                  </tr>
                </thead>
                <MISALoading v-if="isLoading" />
                <div class="textNoData" v-else-if="assets.length == 0">
                  <div class="textBody">Không có dữ liệu hiển thị</div>
                </div>
                <tbody id="tblasset" v-else>
                  <tr
                    v-for="(asset, index) in assets"
                    :key="asset.FixedAssetId"
                    @click="rowOnClickChecked(asset)"
                  >
                    <td>
                      <MISACheckbox :checked="asset.checked" ref="checkAsset" />
                    </td>
                    <td style="text-align: center">{{ index + 1 }}</td>
                    <td style="padding-left: 25px">
                      {{ asset.FixedAssetCode }}
                    </td>
                    <td class="textLong" style="max-width: 140px">
                      {{ asset.FixedAssetName }}
                    </td>
                    <td
                      class="textLong"
                      style="max-width: 160px; padding-left: 20px"
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
              <!-- </div> -->
            </div>
            <div
              class="m-table-container"
              ref="FooterTable"
              @scroll="
                this.$refs.MainTable.scrollLeft =
                  this.$refs.FooterTable.scrollLeft
              "
            >
              <table style="width: 100%">
                <tfoot>
                  <tr>
                    <td style="min-width: 745px">
                      <div class="pagination">
                        <p class="pagination-title">
                          Tổng số:
                          <b>{{ Number(this.totalRecordSearch) }}</b> bản ghi
                        </p>
                        <div class="padding-btn-wrap">
                          <MISACombobox
                            :tag="'dropdownPagination'"
                            :checkIsEmpty="'checkIsEmpty'"
                            :control="20"
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
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div class="m-dialog-footer" style="margin-top: 0">
            <button
              class="m-button m-button-delete mg-right-10"
              @click="btnCancel"
              v-shortkey="['ctrl', 'h']"
              @shortkey="btnCancel"
            >
              Hủy bỏ
            </button>
            <button
              class="m-button m-button-save"
              @click="btnAgree"
              v-shortkey="['ctrl', 's']"
              @shortkey="theAction"
            >
              Đồng ý
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Paginate from "vuejs-paginate-next";
export default {
  name: "DialogLicenseAsset",
  components: {
    Paginate,
  },
  props: ["arrayLicenseAsset", "isLoading", "totalNumberPage"],
  created() {
    // this.getData();
  },
  watch: {
    //  Khi có sự thay đổi thì thay đổi mảng tài sản
    arrayLicenseAsset: function (newValue) {
      this.assets = newValue;
    },
    //  Khi có sự thay đổi thì thay đổi mảng tổng số bản ghi
    totalNumberPage: function (newValue) {
      this.totalRecordSearch = newValue;
    },
  },
  mounted() {
    // mảng tài sản
    this.assets = this.arrayLicenseAsset;
    console.log(this.assets);
    // Tổng sô bản ghi
    this.totalRecordSearch = this.totalNumberPage;
    // focus vào ô input đầu tiên
    this.$refs.searchInput.focus();
  },

  computed: {
    // tổng số trang
    totalPageSize: function () {
      return Math.ceil(this.totalRecordSearch / this.pageSize);
    },
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
      // Thay đổi số sản phẩm trên 1 trang
      this.pageSize = value.itemData.pageSize;
      // Gán lại số trang về ban đầu khi thay đổi pageSize
      this.pageIndex = 1;

      this.$emit("changePageSize", this.pageSize, this.pageIndex);
    },
    /**
     * Mô tả : Gửi mảng đã chọn lên LicenseDetail
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 14:00 09/06/2022
     */
    btnAgree() {
      this.assetList=this.arrayLicenseAsset.filter((element) => {
        return element.checked == true;
      })
      this.$emit("arrayAsset", this.assetList);
    },

     /**
     * Mô tả : Kiểm tra xem có checked tất cả hay không
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 16:00 26/04/2022
     */
    isShowAllChecked() {
      // kiểm tra xem ô checkbox đầu tiên có check hay không
      this.isChecked = !this.isChecked;
      // Nếu bằng true thì add tất cả vào mảng assetList
      if (this.isChecked) {
        this.arrayLicenseAsset.filter((asset) => {
          return asset.checked == false ? (asset.checked = true) : null;
        });
        // this.assetList = [...this.assets];
      } else {
        this.arrayLicenseAsset.filter((asset) => {
          return asset.checked == true ? (asset.checked = false) : null;
        });
      }
    },
    /**
     * Mô tả : Tắt form DialogLicenseAsset
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 09:36 09/06/2022
     */
    btnClose() {
      this.$emit("btnClose");
    },

    /**
     * Mô tả : Set thời gian sau khi người dùng nhập xong chờ khoảng 1 giây và lấy ra giá trị
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 16:34 21/05/2022
     */
    searchAsset() {
      this.changeValue = this.$refs.searchInput.value;
      this.pageIndex = 1;
      this.$emit("searchFilter", this.changeValue, this.pageIndex);
      // clear timout
      // clearTimeout(this.timeOut);
      // // Lấy giá trị input
      // this.changeValue = this.$refs.searchInput.value;
      // // đặt timeout và gọi hàm tìm kiếm
      // this.timeOut = setTimeout(this.$emit("searchFilter",this.changeValue), 1000);
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

      this.$emit("changePageIndex", pageIndex);
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
    * Mô tả : Xem có check hay không
    * @param
    * @return
    * Created by: QuyenNC
    * Created date: 23:41 19/06/2022
    */
    rowOnClickChecked(asset) {
      if (asset.checked == false) {
        asset.checked = true;
      } else {
        asset.checked = false;
        this.isChecked = false;
      }
    },
  },
  data() {
    return {
      // Lưu dữ liệu
      assets: [],

      assetList: [],
      // Ẩn hiện loading
      // isLoading: false,
      // Tổng bản ghi
      totalPage: 0,
      // Số trang
      pageIndex: 1,
      // Tổng bản ghi
      totalRecordSearch: 0,
      // Số sản phẩm trên 1 trang
      pageSize: 20,
    };
  },
};
</script>

<style scoped>
.content-detail {
  width: 100%;
  height: calc(100% - 65px);
}
</style>
