<template>
  <div class="modal" id="dlgDetail">
    <div class="modal__overlay"></div>
    <div class="modal__body">
      <div class="m-dialog-header">
        <h3 class="m-dialog-header-title">Chọn tài sản ghi tăng</h3>
        <div class="m-icon">
          <div class="icon-close" @click="btnClose"></div>
        </div>
      </div>
      <div class="content-detail padding-16">
        <div class="row">
          <div class="col-8">
            <label class="m-dialog-label" for="">Bộ phận sử dụng</label>
            <input type="text" class="m-input m-border" disabled />
          </div>
        </div>
        <div style="height: 350px">
          <h4 style="margin: 10px 0">Nguyên giá</h4>
          <div class="row">
            <div class="col-8">
              <div class="row">
                <div class="col-8">
                  <label for="" class="mg-bottom-8">Nguồn hình thành</label>
                </div>
                <div class="col-4 mg-left-8">
                  <label for="" class="mg-bottom-8">Giá trị</label>
                </div>
              </div>
            </div>
          </div>
          <div class="row mg-top-4">
            <div class="col-8 mg-right-20">
              <div class="row">
                <div class="col-8">
                  <MISACombobox 
                     :tag="'sourceInformation'"
                     @getComboSelected="getValueBudget"
                  />
                    <span
                    class="fieldIsEmpty"
                    :class="this.isEmpty[1] == false ? 'visibility-none' : ''"
                    >Không được bỏ trống ô này</span
                  >
                </div>
                <div class="col-4 mg-left-8">
                  <MISAInput
                    :tag="'valueSalary'"
                    @getComboSelected="getValueBudget"
                    ref="valueSalary"
                    type="text"
                    :isRequired="true"
                    class="m-input m-border text-right"
                    @changeInput="changeInput"
                  />
                   <span
                    class="fieldIsEmpty"
                    :class="this.isEmpty[0] == false ? 'visibility-none' : ''"
                    >Không được bỏ trống ô này</span
                  >
                </div>
              </div>
            </div>
            <div class="col-4">
              <button class="icon-extra mg-right-20"></button>
              <button class="icon-minus"></button>
            </div>
          </div>
          <div class="row mg-top-4">
            <div class="col-8 mg-right-20">
              <div class="row">
                <div class="col-8">
                  <MISACombobox 
                    :tag="'sourceInformation'"
                  />
                   <span
                    class="fieldIsEmpty"
                    :class="this.isEmpty[1] == false ? 'visibility-none' : ''"
                    >Không được bỏ trống ô này</span
                  >
                </div>
                <div class="col-4 mg-left-8">
                  <MISAInput
                    type="text"
                    ref="valueSalary"
                    :isRequired="true"
                    class="m-input m-border text-right"
                    @blur="checkIsNull"
                  />
                  <span
                    class="fieldIsEmpty"
                    :class="this.isEmpty[0] == false ? 'visibility-none' : ''"
                    >Không được bỏ trống ô này</span
                  >
                </div>
              </div>
            </div>
            <div class="col-4">
              <button class="icon-extra mg-right-20"></button>
              <button class="icon-minus"></button>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-8 mg-right-20">
            <div class="row">
              <div class="col-8">
                <input value="Tổng" disabled class="m-input m-border" />
              </div>
              <div class="col-4 mg-left-8">
                <input
                  type="text"
                  value="1.000.000"
                  class="m-input m-border text-right"
                  disabled
                />
              </div>
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
          @click="btnSaveOnclick"
          v-shortkey="['ctrl', 's']"
          @shortkey="theAction"
        >
          Lưu
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DialogUpdateAsset",
  components: {},
  methods: {
    checkIsNull() {
      this.isEmpty[0] = this.$refs.valueSalary.isImport;
    },
    changeInput() {},
    btnClose() {
      this.$emit("btnClose");
    },
  },
  data() {
    return {
      isEmpty:[false,false],
    }
  },
};
</script>

<style></style>
