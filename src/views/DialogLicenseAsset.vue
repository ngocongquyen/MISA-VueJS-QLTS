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
                @input="searchAsset"
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
                    @dblclick="showFormAssetDetail(asset)"
                    @click="rowOnClickChecked(asset)"
                  >
                    <td>
                      <MISACheckbox :checked="assetList.includes(asset)" />
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
                          Tổng số: <b>{{ Number(this.totalPage) }}</b> bản ghi
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
                          :next-text="'Next'"
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
import axios from "axios";
import Paginate from "vuejs-paginate-next";
export default {
  name: "DialogLicenseAsset",
  components: {
    Paginate,
  },
  props: [],
  created() {
    this.getData();

    this.search();
  },
  mounted() {
    this.$refs.searchInput.focus();
  },

  computed: {
    totalPageSize: function () {
      return Math.ceil(this.totalRecordSearch / this.pageSize);
    },
  },
  methods: {
    /**
    * Mô tả : Gửi mảng đã chọn lên LicenseDetail
    * @param
    * @return
    * Created by: QuyenNC
    * Created date: 14:00 09/06/2022
    */
    btnAgree() {
      this.$emit("arrayAsset",this.assetList);
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
      // clear timout
      clearTimeout(this.timeOut);
      // Lấy giá trị input
      this.changeValue = this.$refs.searchInput.value;
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
      this.isLoading = true;
      await axios
        .get("http://localhost:5062/api/v1/FixedAssets/search", {
          params: {
            filter: me.changeValue,
            pageIndex: me.pageIndex,
            pageSize: me.pageSize,
          },
        })
        .then(function (response) {
          // gán dữ liệu vào mảng assets
          me.assets = response.data.search;

          me.totalRecordSearch = response.data.totalRecord;
          // tắt loading khi có dữ liệu trả về
          me.isLoading = false;
        })
        .catch(function (response) {
          console.log(response);
        });
    },

    /**
     * Mô tả : Hàm Lấy dữ liệu
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 22:06 08/06/2022
     */
    getData() {
      var me = this;
      axios
        .get("http://localhost:5062/api/v1/FixedAssets")
        .then(function (res) {
          me.totalPage = res.data.length;
        })
        .catch(function (err) {
          console.log(err);
        });
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

    rowOnClickChecked(asset) {
      if(this.assetList.includes(asset)) {
        let index = this.assetList.indexOf(asset);

        this.assetList.splice(index, 1);
      }
      
      else {
        this.assetList.push(asset);
      }
    },
  },
  data() {
    return {
      // Lưu dữ liệu
      assets: [],

      assetList: [],
      // Ẩn hiện loading
      isLoading: false,
      // Tổng bản ghi
      totalPage: 0,
      // Số trang
      pageIndex: null,
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
