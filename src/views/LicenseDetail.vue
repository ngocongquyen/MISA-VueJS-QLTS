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
          <div class="bgLicense">
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
                      :fileName="'Mã tài sản'"
                      :tag="'FixedAssetCode'"
                      ref="txtAssetCode"
                      class="m-border"
                      @changeInput="changeInput"
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
          <div class="bgLicense">
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
                      <th>STT</th>
                      <th style="min-width: 100px">Mã tài sản</th>
                      <th style="min-width: 120px">Tên tài sản</th>
                      <th style="min-width: 160px; padding-left: 20px">
                        Bộ phận sử dụng
                      </th>
                      <th class="text-right" style="min-width: 120px">
                        Nguyên giá
                      </th>
                      <th class="text-right" style="min-width: 120px">
                        HM/KH lũy kế
                      </th>
                      <th
                        class="text-right"
                        style="min-width: 120px; padding-right: 4px"
                      >
                        Giá trị còn lại
                      </th>
                    </tr>
                  </thead>
                  <MISALoading v-if="isLoading" />
                  <tbody id="tblasset">
                    <tr>
                      <td style="text-align: center"></td>
                      <td style="padding-left: 25px"></td>
                      <td class="textLong" style="max-width: 170px"></td>
                      <td
                        class="textLong"
                        style="max-width: 160px; padding-left: 20px"
                      ></td>
                      <td class="text-right"></td>
                      <td class="text-right"></td>
                      <td class="text-right"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <table style="bottom: 17px; width: 100%; ">
                <tfoot>
                  <tr>
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
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import url("../css/license/licenseDetail.css");
.m-dialog-content {
  background-color: #fff;
  padding: 16px;
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
    background-color:#f5f5f5;
}
</style>
