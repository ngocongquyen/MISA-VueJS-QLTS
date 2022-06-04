<template>
   <div id="toast" :class="{'isToastMessage':toastMessage}">
      <div class="toast-message">
        <div class="m-icon-24 mg-left-15">
          <div class="icon-checked"></div>
        </div>
        <p class="mg-left-8">{{txtToastBody}}</p>
      </div>
    </div>
</template>

<script>
export default {
    name: "ToastMessage",
    props: ["toastMessage","txtToastBody"],
    components: {
      
    },
    data() {
      return {
        isToastMessage: false
      }
    }
}
</script>

<style>

</style>