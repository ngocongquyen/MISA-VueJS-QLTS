<template>
    <div class="header">
        <div class="header-left">
            <h3 class="header-title">Danh sách tài sản</h3>
        </div>
        <div class="header-right">
            <p>Sở tài chính</p>
            <button class="m-button-year">
                <span >Năm</span>
                <div class="header-right-wrap">
                    <p>{{new Date().getFullYear()}}</p>
                    <div class="header-right-icon header-right-icon-choose"></div>
                </div>
            </button>
            <div class="header-icon">
                <div class="m-icon-24 mg-right-20">
                    <div class="icon-notification"></div>
                </div>
                <div class="m-icon-24 mg-right-20">
                    <div class="icon-zoom"></div>
                </div>
                <div class="m-icon-24 mg-right-20">
                    <div class="icon-help"></div>
                </div>
               <div class="m-icon-24">
                    <div class="icon-user"></div>
                </div>
                
                <div class="mg-left-8 icon-down"></div>
               
            </div>
        </div>
    </div>
</template>

<style scoped></style>

<script>

export default {
  name: "TheHeader",
  components: {},
};
</script>
