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

            <div id="normal-login">
              <div class="grid-login-normal">
                <div class="username-login">
                  <input
                    ref="userName"
                    id="iptUserName"
                    class="input-login"
                    v-model="userName"
                    placeholder="Username, email hoặc số điện thoại"
                    @change="changInput"
                  />
                </div>
                <div class="password-login">
                  <input
                    ref="passWord"
                    v-model="passWord"
                    id="iptPassword"
                    type="password"
                    placeholder="Mật khẩu"
                    class="input-login"
                    @change="changInput"
                  />
                  <div class="eye on-eye"></div>
                </div>

                <div class="button-login" style="margin-top: 20px">
                  <router-link to="/trangchu">
                    <button class="button" id="login" @click="btnLogin">
                    Đăng nhập
                  </button>
                  </router-link>
                </div>
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
export default {
  name: "TheLogin",
  components: {},
  methods: {
   async btnLogin() {
    
      this.useLogin = {
        UserName : this.userName,
        Password : this.passWord
      }  
      const me = this;
      
      await axios
          .post("http://localhost:5062/api/v1/Users/login", me.useLogin,{
             withCredentials: true,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          })
          
          .then(function (response) {
            me.$store.commit("setIsAuthen",true);
            console.log(response);
          })
          .catch(function (response) {
            console.log(response);
          });
      },
    },
    data() {
      return {
        userName: '',
        passWord: "",
        useLogin: {},
      };
    },
};
</script>

<style scoped>
@import url(../../css/login.css);
</style>
