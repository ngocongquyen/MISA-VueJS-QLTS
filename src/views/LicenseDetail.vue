<template>
  <div class="modal" id="dlgDetail">
    <div class="modal__overlay"></div>
    <div class="modal__body" id="widthLicense">
      <div class="m-dialog">
        <div class="m-license-header">
          <div class="m-dialog-header">
            <h3 class="m-dialog-header-title" style="font-size: 18px">
              Thêm chứng từ ghi tăng
            </h3>
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
                      :placeholder="'Nhập mã tài sản'"
                      :title="'Nhập mã tài sản'"
                      :type="'text'"
                      class="m-border"
                      maxLength="20"
                    />
                  </div>
                </div>
                <div class="m-dialog-col col-4 mg-right-16">
                  <label class="m-dialog-label m-dialog-label-license"
                    >Ngày bắt đầu sử dụng <span class="requied">*</span></label
                  >
                  <MISADatepicker
                    @getDate="(newValue) => (this.asset.UseDate = newValue)"
                  />
                </div>
                <div class="m-dialog-col col-4">
                  <label class="m-dialog-label m-dialog-label-license"
                    >Ngày ghi tăng <span class="requied">*</span></label
                  >
                  <MISADatepicker
                    @getDate="(newValue) => (this.asset.UseDate = newValue)"
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
                      :placeholder="'Nhập mã tài sản'"
                      :title="'Nhập mã tài sản'"
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
                    @input="searchAsset"
                  />
                </div>
                <MISAButton
                  :textButton="'Chọn tài sản'"
                  :class="'m-button m-button-chose-asset'"
                />
              </div>
            </div>
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
                  <MISALoading v-if="isLoading" />
                  <tbody id="tblAsset">
                    <tr>
                      <td style="text-align: center">1</td>
                      <td style="padding-left: 10px">TS-1851</td>
                      <td class="textLong" style="max-width: 170px">
                        Xe Toyota
                      </td>
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
                      <td class="textLong" style="max-width: 170px">
                        Xe Toyota
                      </td>
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
                      <td class="textLong" style="max-width: 170px">
                        Xe Toyota
                      </td>
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
                      <td class="textLong" style="max-width: 170px">
                        Xe Toyota
                      </td>
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
                      <td class="textLong" style="max-width: 170px">
                        Xe Toyota
                      </td>
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
                      <td class="text-right text-bold" style="min-width: 120px">
                        3.80.000.000
                      </td>
                      <td class="text-right text-bold" style="min-width: 140px">
                        10.000.000
                      </td>
                      <td
                        class="text-right text-bold"
                        style="min-width: 130px; padding-right: 12px"
                      >
                        10.000.000
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div class="pagination">
                <p class="pagination-title">Tổng số: <b>110</b> bản ghi</p>
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
  </div>
</template>

<script>
export default {
  name: "LicenseDetail",
  components: {},
  prop: [],
  methods: {
    btnCancel() {
      this.$emit("btnCancel");
    },
  },
  data() {
    return {};
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
