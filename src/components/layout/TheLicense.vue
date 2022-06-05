<template>
  <div class="content">
    <div class="content-title">
      <h3>Ghi tăng tài sản</h3>
      <div class="filter-right">
        <button class="m-button m-button-icon" id="btnAdd">Thêm</button>
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
                <th style="min-width: 180px;padding-left:25px">Số chứng từ</th>
                <th style="min-width: 160px">Ngày chứng từ</th>
                <th style="min-width: 170px;">
                  Ngày ghi tăng
                </th>
                <th class="text-right" style="min-width: 120px">Tổng nguyên giá</th>
                <th style="min-width: 530px; padding-left:20px">
                  Nội dung
                </th>
              </tr>
            </thead>
            <MISALoading v-if="isLoading" />
            <tbody id="tblasset">
              <tr
              v-for="(license) in licenses"
                :key="license.FixedAssetId"
              >
                 <td>
                  <MISACheckbox  />
                </td>
                <td style="text-align: center">1</td>
                <td style="padding-left: 25px;color:#1aa4c8;">GT000120</td>
                <td class="textLong" style="max-width: 170px">23/12/2021</td>
                <td
                  class="textLong"
                  style="max-width: 160px"
                >23/12/2021</td>
                <td class="text-right">45.0000.000</td>
                <td class="text-right"></td>
                <td class="text-right"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <table style="bottom: 17px; width: 100%">
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
import axios from "axios";
export default {
  name:"TheLicense",
  components: {

  },
  created() {
    this.getData();
  },
  props: [],
  methods: {
     async getData() {
      var me = this;

      // lay data trong axios
      await axios
        .get("http://localhost:5062/api/v1/FixedAssets")
        .then(function (res) {
          me.licenses = res.data
        })
        .catch(function (response) {
          console.log(response);
        });
    },
  },
  data() {
    return {
      licenses:[]
    }
  }
};
</script>

<style scoped>
@import url("../../css/license/license.css");
</style>
