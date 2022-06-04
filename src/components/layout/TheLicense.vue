<template>
  <div class="content">
    <div class="content-title">
      <h3>Ghi tăng tài sản</h3>
      <div class="filter-right">
        <button class="m-button m-button-icon" id="btnAdd">Thêm</button>
      </div>
    </div>
    <div class="content-body">
      <div class="filter-bar bg-white">
        <div class="filter-left">
          <div class="m-input-wrap " id="m-license-input">
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
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import url("../../css/license/license.css");
</style>
