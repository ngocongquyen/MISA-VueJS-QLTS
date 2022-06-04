<template>
  <div>
    <div class="content asset">
      <div class="filter-bar">
        <div class="filter-left">
          <div class="m-input-wrap">
            <div class="m-icon-24 mg-left-8 m-filter-icon">
              <div class="filter-icon-search"></div>
            </div>
            <input
              type="text"
              ref="searchInput"
              placeholder="Tìm kiếm tài sản"
              class="m-input m-font-style m-border"
              @input="searchAsset"
            />
          </div>

          <div class="m-combobox">
            <div class="m-input-combobox-wrap">
              <div class="m-icon-24 mg-left-8 m-filter-icon">
                <div class="icon-dropdown"></div>
              </div>
              <div class="m-combobox-filter">
                <MISACombobox
                  :tag="'FixedAssetCategoryCode'"
                  :nameCode="'nameFixedAssetCategory'"
                  :checkIsEmpty="'checkIsEmpty'"
                  :placeholder="'Nhập tên loại tài sản'"
                  :control="getFixedAssetCategoryName"
                  ref="FixedAssetCategoryCode"
                  @getComboSelected="getTypeAsset"
                  @changeCombobox="changeCombobox"
                  class="pg-left-20"
                />
              </div>
            </div>
          </div>

          <div class="m-combobox">
            <div class="m-input-combobox-wrap">
              <div class="m-icon-24 mg-left-8 m-filter-icon">
                <div class="icon-dropdown"></div>
              </div>
              <div class="m-combobox-filter">
                <MISACombobox
                  :tag="'DepartmentCode'"
                  :nameCode="'nameDepartment'"
                  :checkIsEmpty="'checkIsEmpty'"
                  :placeholder="'Nhập tên bộ phận sử dụng'"
                  ref="DepartmentCode"
                  :control="getDepartmentName"
                  @getComboSelected="getDepartment"
                  class="pg-left-20"
                  @changeCombobox="changeCombobox"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="filter-right">
          <MISAButton
            :class="'m-button m-button-icon'"
            id="btnAdd"
            @click="btnAddOnClick"
            :textButton="'+ Thêm tài sản'"
            v-shortkey="['ctrl', 'alt', 'a']"
            @shortkey="btnAddOnClick"
            
          >
          </MISAButton>
          <div class="filter-right-container">
            <div class="filter-right-wrap">
              <MISAButton :class="'filter-right-icon icon-excel'"></MISAButton>
            </div>
          </div>
          <div class="filter-right-container">
            <div
              class="filter-right-wrap"
              @click="showAlert"
              v-shortkey="['ctrl', 'shift']"
              @shortkey="showAlert"
            >
              <MISAButton :class="'filter-right-icon icon-delete'"></MISAButton>
            </div>
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
                <th style="padding-left: 25px; min-width: 180px">Mã tài sản</th>
                <th style="min-width: 170px">Tên tài sản</th>
                <th style="min-width: 160px;padding-left:20px">Loại tài sản</th>
                <th style="min-width: 160px; padding-left:20px">Bộ phận sử dụng</th>
                <th class="text-right" style="min-width: 60px">Số lượng</th>
                <th class="text-right" style="min-width: 120px">Nguyên giá</th>
                <th class="text-right" style="min-width: 120px">
                  HM/KH lũy kế
                </th>
                <th class="text-right" style="min-width: 120px">
                  Giá trị còn lại
                </th>
                <th class="text-center" style="min-width: 100px">Chức năng</th>
              </tr>
            </thead>
            <MISALoading v-if="isLoading" />
            <div class="textNoData" v-else-if="assets.length == 0">
              <div class="textBody">Không có dữ liệu</div>
            </div>
            <tbody id="tblasset" v-else>
              <tr
                v-for="(asset, index) in assets"
                :key="asset.FixedAssetId"
                @dblclick="showFormAssetDetail(asset)"
                @click="rowOnClickChecked($event, asset)"
              >
                <td>
                  <MISACheckbox :checked="assetList.includes(asset)" />
                </td>
                <td style="text-align: center">{{ index + 1 }}</td>
                <td style="padding-left: 25px">{{ asset.FixedAssetCode }}</td>
                <td class="textLong" style="max-width:170px"> {{ asset.FixedAssetName }}</td>
                <td class="textLong" style="max-width:160px;padding-left: 20px">
                  {{ asset.FixedAssetCategoryName }}
                </td>
                <td class="textLong" style="max-width:160px;padding-left: 20px">{{ asset.DepartmentName }}</td>
                <td class="text-right">{{ asset.Quantity }}</td>
                <td class="text-right">
                  {{ this.formatSalary(asset.Cost) }}
                </td>
                <td class="text-right">
                  {{ this.formatSalary(asset.Accumulated) }}
                </td>
                <td class="text-right">
                  {{
                    this.formatSalary(
                      asset.Cost - asset.Accumulated < 0
                        ? 0
                        : asset.Cost - asset.Accumulated
                    )
                  }}
                </td>
                <td class="text-center">
                  <div class="btn-feature">
                    <MISAButton
                      :class="'filter-right-icon icon-editing mg-right-16 edit'"
                      @click="showFormAssetDetail(asset)"
                    ></MISAButton>
                    <MISAButton
                      :class="'filter-right-icon icon-duplicate copy'"
                      @click="replication(asset)"
                    ></MISAButton>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <table style="position: absolute; bottom: 17px; width: 100%">
          <tfoot>
            <tr>
              <td>
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
              <td class="text-right text-bold" style="width: 60px">
                {{ totalQuantity }}
              </td>
              <td class="text-right text-bold" style="width: 120px">
                {{ totalCost }}
              </td>

              <td class="text-right text-bold" style="width: 120px">
                {{ totalAccumulate }}
              </td>
              <td class="text-right text-bold" style="width: 120px">
                {{ totalPriceExtra }}
              </td>
              <td style="width: 100px"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <!-- :isShow="isShowDialog" -->
    <!-- <LicenseDetail v-if="isShowDialog"/> -->
    <AssetDetail
      ref="assetDlg"
      v-if="isShowDialog"
      :formMode="formMode"
      :assetSelected="assetSelected"
      :newAssetCode="newAssetCode"
      :title="titlePage"
      :arrayAssetCode="arrayAssetCode"
      @btnCancel="toastAlert"
      @isShowAlert="isShowAlert"
      @toastMessage="toastMessage"
      @showDialog="showDialog"
      @showToastMessage="showToastMessage"
      @search="search"
      @getData="getData"
      v-shortkey="['esc']"
      @shortkey="theAction"
      @isFieldEmpty="isFieldEmpty"
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
/* eslint-disable */
import AssetDetail from "../../views/AssetDetail.vue";
// import MISACheckbox from "../base/MISACheckBox.vue";
import moment from "moment";
import axios from "axios";
// import MISAToastMessage from "../base/MISAToastMessage.vue";
// import MISAAlert from "../base/MISAAlert.vue";
// import MISAButton from "../base/MISAButton.vue";
// import MISALoading from "../base/MISALoading.vue";
// import MISACombobox from "../base/MISACombobox.vue";
import Paginate from "vuejs-paginate-next";

import LicenseDetail from "../../views/LicenseDetail.vue"
export default {
  name: "TheContent",
  components: {
    AssetDetail,
    // MISACheckbox,
    // MISAToastMessage,
    // MISAAlert,
    // MISAButton,
    // MISALoading,
    // MISACombobox,
    Paginate,
    LicenseDetail
  },

  beforeCreate() {},

  beforeUpdate() {},

  created() {
    this.search();
    this.getData();
  },

  beforeMount() {},

  mounted() {
    
  },

  updated() {},

  beforeUnmount() {},

  unmounted() {},
  props: [""],

  computed: {
    /**
     * Mô tả : Tính tổng số nguyên
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 15:12 23/05/2022
     */
    totalQuantity: function () {
      const totalQuantity = this.assets.reduce((currentValue, item) => {
        return currentValue + item.Quantity;
      }, 0);

      return this.formatSalary(totalQuantity);
    },

    /**
     * Mô tả : Tính tổng nguyên giá
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 15:13 23/05/2022
     */
    totalCost: function () {
      const totalCost = this.assets.reduce((currentValue, item) => {
        return currentValue + item.Cost;
      }, 0);
      return this.formatSalary(totalCost);
    },
    /**
     * Mô tả : Tính tổng lũy kế
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 15:13 23/05/2022
     */
    totalAccumulate: function () {
      const totalAccumulate = this.assets.reduce((currentValue, item) => {
        return currentValue + item.Accumulated;
      }, 0);
      return this.formatSalary(totalAccumulate);
    },

    /**
     * Mô tả : Tính tổng giá trị còn lại
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 15:13 23/05/2022
     */
    totalPriceExtra: function () {
      const totalPriceExtra = this.assets.reduce((currentValue, item) => {
        return currentValue + (item.Cost - item.Accumulated);
      }, 0);
      return this.formatSalary(totalPriceExtra);
    },
    totalPageSize: function () {
      return Math.ceil(this.totalRecordSearch / this.pageSize);
    },
  },

  methods: {
    /**
    * Mô tả : Xem name có giá trị hay không để thực hiện search
    * @param
    * @return
    * Created by: QuyenNC
    * Created date: 23:13 30/05/2022
    */
    async changeCombobox(name, tag) {
      if (tag === "DepartmentCode") {
        this.getDepartmentName = name;
      }
      else {
        this.getFixedAssetCategoryName = name;
      }
      await this.search();
    },
    /**
     * Mô tả : Lưu các trường rỗng từ bên AssetDetail.
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 22:21 29/05/2022
     */
    isFieldEmpty(array) {
      this.arrayEmpty = array;
    },
    /**
     * Mô tả : Chọc vào phương thức AssetDetail để focus
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 22:22 29/05/2022
     */
    focusError() {
      if (this.formMode === 1 || this.formMode === 0) {
        this.$refs.assetDlg.focusError(this.arrayEmpty);
      }
    },
    /**
     * Mô tả : Phím tắt esc để tắt form
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 11:22 23/05/2022
     */
    theAction() {
      this.showDialog(false);
    },
    /**
     * Mô tả : Lấy ra giá trị PageSize từ MISACombobox;
     * @param value: object khi emit từ MISACombobox;
     * @return
     * Created by: QuyenNC
     * Created date: 10:10 22/05/2022
     */
    async getPageSize(value) {
      // Thay đổi số sản phẩm trên 1 trang
      this.pageSize = value.itemData.pageSize;
      // gọi hàm tìm kiếm
      await this.search();
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
     * Mô tả : Lấy ra giá trị tên phòng ban từ MISACOmbobox
     * @param value - object khi emit từ MISACOmbobox
     * @return
     * Created by: QuyenNC
     * Created date: 22:31 21/05/2022
     */
    async getDepartment(value) {
      // Lấy ra tên bộ phận sử dụng
      this.getDepartmentName = value.itemData.DepartmentName;
      // gọi hàm tìm kiếm
      await this.search();
    },

    /**
     * Mô tả : Lấy ra giá trị tên loại tài sản từ MISACOmbobox
     * @param value - object khi emit từ MISACOmbobox
     * @return
     * Created by: QuyenNC
     * Created date: 22:31 21/05/2022
     */
    async getTypeAsset(value) {
      console.log("Line 458",value);
      // Lấy ra tên loại tài sản
      this.getFixedAssetCategoryName = value.itemData.FixedAssetCategoryName;
      // gọi hàm tìm kiếm
      await this.search();
    },

    /**
     * Mô tả : Lấy toàn bộ dữ liệu
     * @param
     * @return Danh sách dữ liệu
     * Created by: QuyenNC
     * Created date: 16:18 16/05/2022
     */
    async getData() {
      var me = this;
      // bật loading khi chưa có dữ liệu
      me.isLoadingData(true);
      // lay data trong axios
      await axios
        .get("http://localhost:5062/api/v1/FixedAssets")
        .then(function (res) {
          // tắt loading khi có dữ liệu trả về
          me.isLoadingData(false);
          // Tổng số bản ghi
          me.totalPage = res.data.length;
        })
        .catch(function (response) {
          console.log(response);
        });
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
      this.isLoadingData(true);
      await axios
        .get("http://localhost:5062/api/v1/FixedAssets/search", {
          params: {
            filter: me.changeValue,
            departmentName: me.getDepartmentName,
            fixedCategoryName: me.getFixedAssetCategoryName,
            pageIndex: me.pageIndex,
            pageSize: me.pageSize,
          },
        })
        .then(function (response) {
          // gán dữ liệu vào mảng assets
          me.assets = response.data.search;

          me.totalRecordSearch = response.data.totalRecord;
          // tắt loading khi có dữ liệu trả về
          me.isLoadingData(false);
        })
        .catch(function (response) {
          console.log(response);
        });
    },

    /**
     * Mô tả : Thực hiện lưu dữ liệu khi bấm nút lưu từ bên
     * MISAAlert emit lên cha rồi chọc vào phương thức con là AssetDetail.
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 23:42 22/05/2022
     */
    btnSave() {
      // chọc vào phương thức của con là AssetDetail thông qua ref.
      this.$refs.assetDlg.btnSaveOnClick();
      // Tắt alert
      this.isShowAlert(true);
    },

    /**
     * Mô tả : Nhân bản tài sản
     * @param
     * @return Nhân bản tài sản và tự động sinh mã
     * Created by: QuyenNC
     * Created date: 22:56 20/05/2022
     */
    async replication(asset) {
      // Thay đổi thông tin title trong AssetDetial
      this.titlePage = "Nhân bản tài sản";
      // formMode = 1 ( Thêm mới)
      this.formMode = this.enum.Add;
      var me = this;
      me.createNewAssetCode();
      // goi api lấy ra 1 bản ghi
      await axios
        .get(`http://localhost:5062/api/v1/FixedAssets/` + asset.FixedAssetId)
        .then(function (response) {
          console.log(response.data);
          // Gán dữ liệu vào assetSelected để bind vào AssetDetail

          me.assetSelected = response.data;
          // Hiện thị form AssetDetail
          me.showDialog(true);
          // Gọi hàm sinh mã mới
        })
        .catch(function (response) {
          console.log(response);
        });
    },

    /**
     * Mô tả : Reset lại from khi bâm thêm mới
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 23:54 22/05/2022
     */
    resetForm() {
      this.assetSelected = {
        FixedAssetName: "",
        DepartmentCode: "",
        DepartmentName: "",
        FixedAssetCategoryCode: "",
        FixedAssetCategoryName: "",
        Quantity: 0,
        Cost: 0,
        LifeTime: 0,
        DepreciationRate: 0,
        DepreciationPerYear: 0,
        TrackedYear: moment(new Date()).format("yy"),
        PurchaseDate: new Date(),
        UseDate: new Date(),
      };
    },

    /**
     * Mô tả : Hiện thị form alert và thực hiện xóa
     * Created by: QuyenNC
     * Created date: 16:14 27/04/2022
     */
    showAlert() {
      this.formMode = "";
      // Hiện hoặc tắt alert
      this.isAlert = !this.isAlert;
      // Nếu assetList có phần khi ta bấm check.
      if (this.assetList.length != 0) {
        // Nếu trong mảng có 1 phàn tử khi Goi hàm toastAlert kèm thông tin
        if (this.assetList.length === 1) {
          this.toastAlert(
            `Bạn có muốn xóa tài sản << ${this.assetList[0].FixedAssetCode} - ${this.assetList[0].FixedAssetName} >> ?`,
            "remove"
          );
        } else {
          this.toastAlert(
            this.assetList.length +
              " tài sản đã được chọn. Bạn có muốn xóa các tài sản này khỏi danh sách không?",
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
      // đưa formMode về rỗng khi xóa.
      var me = this;
      // Tắt alert
      this.isAlert = true;
      // Lấy ra 1 mảng danh sách các id
      for (var i = 0; i < this.assetList.length; i++) {
        this.arrayAssetId.push(this.assetList[i].FixedAssetId);
      }
      // Nếu mảng có 1 phần tử gọi api xóa 1
      if (this.arrayAssetId.length == 1) {
        await axios
          .delete(
            `http://localhost:5062/api/v1/FixedAssets/` + this.arrayAssetId[0]
          )
          .then(function () {
            // Loading lại dữ liệu
            me.search();

            me.getData();
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
          .delete("http://localhost:5062/api/v1/FixedAssets/deleteMultiple", {
            data: JSON.stringify(this.arrayAssetId),
            headers: {
              "content-type": "application/json",
            },
          })
          .then(function () {
            // Xóa dữ liệu trên UI
            // me.assets = me.assets.filter(function (asset) {
            //   return !me.assetList.includes(asset);
            // });
            me.search();
            me.getData();
            me.toastMessage("Xóa dữ liệu thành công");
          })
          .catch(function (response) {
            console.log(response);
            me.toastMessage("Xóa dữ liệu thất bại");
          });
      }
      this.assetList = [];
    },

    /**
     * Mô tả : Hiện thị dữ liêu trên form AssetDetail khi dblClick
     * @param asset object các phần tử
     * @return
     * Created by: QuyenNC
     * Created date: 00:14 23/05/2022
     */
    async showFormAssetDetail(asset) {
      // Sửa đổi tên trong AssetDetil
      this.titlePage = "Sửa tài sản";
      // formode = 2;
      this.formMode = this.enum.Edit;
      var me = this;
      // goi api lấy 1 bản ghi
      await axios
        .get(`http://localhost:5062/api/v1/FixedAssets/` + asset.FixedAssetId)
        .then(function (response) {
          // Gán dữ liệu vào assetSelected.
          me.assetSelected = response.data;
        })
        .catch(function (response) {
          console.log(response);
        });
      // hiện thị from AssetDetail
      this.showDialog(true);
    },

    /**
     * Mô tả : ktra xem có checkbox có hiện tất không
     * Created by: QuyenNC
     * Created date: 14:43 02/05/2022
     */
    closeCheckboxAll() {
      if (this.assetList.length !== this.assets.length) {
        this.isChecked = false;
      }
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
        this.assetList = [...this.assets];
      } else {
        this.assetList = [];
      }
    },
    /**
     * Mô tả : Kiểm tra xem có phần tử trong aray hay không ?
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 10:16 26/04/2022
     */

    rowOnClickChecked($event, asset) {
      // Kiểm tra xem có class edit k
      if ($event.target.classList.contains("edit")) {
        this.showFormAssetDetail(asset);
        // kiểm tra xem có class copy k;
      } else if ($event.target.classList.contains("copy")) {
        this.replication(asset);
        //
      } else {
        // kiểm tra xem array có phần tử đó chưa chưa có thì push vào mảng
        // Nếu true
        if (this.assetList.includes(asset)) {
          // Trả về vị trị phần tử đó trong mảng
          const index = this.assetList.indexOf(asset);
          // Xóa phần tử đó khỏi mảng
          this.assetList.splice(index, 1);

          // Nếu độ dài mảng mới k bằng mảng cũ thì tắt checkbox ô đầu tiên
          if (this.assetList.length !== this.assets.length) {
            this.isChecked = false;
          }
        }
        // Nếu chưa có thì push vào mảng
        else {
          this.assetList.push(asset);
          console.log("Line 717");
        }
      }
    },

    /**
     * Mô tả : Hiện thị form AssetDetail và mã nhân viên mới
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 16:06 25/04/2022
     */
    async btnAddOnClick() {
      // this.titlePage = "Thêm tài sản";
      // this.formMode = this.enum.Add;
      // reset lại form
      this.resetForm();
      // tự động sinh mã nhân viên mới
      await this.createNewAssetCode();
      // hiển thị form Dialog
      this.showDialog(true);
    },
    /**
     * Mô tả : Tự động sinh mã mới
     * @param
     * @return
     * Created by: QuyenNC
     * Created date: 15:59 03/05/2022
     */
    async createNewAssetCode() {
      var me = this;
      // Gọi api sinh mã mới
      await axios
        .get("http://localhost:5062/api/v1/FixedAssets/newAssetCode")
        .then(function (response) {
          // Gán dữ liệu vào ô mã tài sản
          me.assetSelected.FixedAssetCode = response.data;
        })
        .catch(function (response) {
          console.log(response);
        });
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
     * Mô tả : Đóng mở form AssetDetail
     * Created by: QuyenNC
     * Created date: 16:07 25/04/2022
     */

    showDialog(isShow) {
      this.isShowDialog = isShow;
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
  },

  data() {
    return {
      isShowMessage: false,
      fullName: "Nhan vien",
      isShowDialog: false,
      formMode: "",
      assetSelected: {
        FixedAssetCode: "",
        Cost: 0,
        DepreciationRate: 0,
        Quantity: 0,
        // PurchaseDate: new Date(),
        UseDate: new Date(),
        WearPerYear: 0,
        LifeTime: "",
      },
      assetList: [],
      newAssetCode: {},
      assets: [],
      isChecked: false,
      isAlert: true,
      title: "",
      enum: { Add: 1, Edit: 0 },
      titleAlert: "",

      //Alert
      typeAlert: "",

      //array assetCode
      arrayAssetCode: [],
      //loading
      isLoading: false,

      pageIndex: null,

      arrayAssetId: [],

      titlePage: "",

      //Xử lý search
      timeOut: null,

      changeValue: null,

      getDepartmentName: null,

      getFixedAssetCategoryName: null,

      totalPage: 0,

      pageSize: 20,

      arrayEmpty: [],

      totalRecordSearch: 0,
    };
  },
};
</script>
