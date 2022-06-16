<template>
  <div id="frmLogin">
    <div class="login w-100 h-100">
      <div class="grid-login">
        <div class="half-ctn img-login"></div>
        <div class="half-ctn">
          <div class="main-login-ctn">
          
            <div class="logo"></div>
            <div class="logo-text">
              Đăng nhập để làm việc với <b>MISA QLTS</b>
            </div>
            <form @submit.prevent="submit" id="normal-login">
              <div class="grid-login-normal">
                <div class="username-login">
                  <MISAInput
                    id="iptUserName"
                    ref="userName"
                    :tag="'userName'"
                    class="input-login"
                    
                    placeholder="Username, email hoặc số điện thoại"
                    @focus="this.showError = false"
                    @changeInput="changeInput"
                  />
                </div>
                <div class="password-login">
                  <MISAInput
                    :tag="'passWord'"
                    ref="passWord"
                    id="iptPassword"
                    type="passWord"
                    
                    placeholder="Mật khẩu"
                    class="input-login"
                    @focus="this.showError = false"
                    @changeInput="changeInput"
                  />
                  <div class="eye on-eye"></div>
                </div>

                <div class="button-login" style="margin-top: 20px; margin-bottom:10px ">
                  <button type="submit" class="button button-text" id="login">
                    Đăng nhập
                  </button>
                </div>
              </div>
            </form>
              <div v-if="this.showError" class="wrong-login">
              <div style="text-align: left; font-weight: 700; color: red;">
                Sai tài khoản hoặc mật khẩu, vui lòng đăng nhập lại.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
import store from "../../router/store";
axios.defaults.withCredentials = true;
export default {
  methods: {
    ...mapActions(["login"]),
    /**
     * Mô tả: Hàm đăng nhập với userform, chuyển trang vào main, show màn hình sai tài khoản mật khẩu nếu cần
     * @param
     * @return
     * Created by: QUYENNC
     * Created date: 17:15 03/06/2022
     */
    async submit() {
      if (this.checkIsEmpty() == false) {
        const user = {
          username: this.form.userName,
          password: this.form.passWord,
        };
        await this.login(user);
        if (store.getters.isWrongPass == false) {
          this.$router.push("/asset");
          this.showError = false;
        } else {
          this.showError = true;
        }
      }
      else {
        for(let key of Object.entries(this.$refs)) {
          console.log(this.isFieldEmpty[0].toLowerCase());
          if(key[0].toLowerCase().includes(this.isFieldEmpty[0].toLowerCase())) {         
            this.$refs[key[0]].setFocus()
          }
        }

      }
    },

    /**
    * Mô tả : Thay đổi nội dung v-model
    * @param
    * @return
    * Created by: QuyenNC
    * Created date: 23:59 07/06/2022
    */
    changeInput(content, tag) {
      this.form[tag] = content;
    },

    /**
    * Mô tả : Check khi rỗng
    * @param
    * @return
    * Created by: QuyenNC
    * Created date: 00:00 08/06/2022
    */
    checkIsEmpty() {
      var check = false;
      this.isFieldEmpty = [];
      const object = this.form;
      for (let property in object) {
        if (object[property] == "") {
          this.isFieldEmpty.push(property);
          check = true;
        }
      }

      for (let key of Object.entries(this.$refs)) {
        for (let value of this.isFieldEmpty) {
          if (key[0].toLowerCase().includes(value.toLowerCase())) {
            this.$refs[key[0]].isImport = true;
          }
        }
      }
      return check;
    },
  },
  data() {
    return {
      form: {
        userName: "",
        passWord: "",
      },
      showError: false,

      isFieldEmpty: [],
    };
  },
};
</script>

<style scoped>
@import url(../../css/login.css);
</style>
