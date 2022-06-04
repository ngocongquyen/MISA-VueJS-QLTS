<template>
    <div class="right">
        <TheHeader />
        <TheContent />
    </div>
</template>

<style scoped>

</style>

<script>
import TheHeader from '../layout/TheHeader.vue' 
import TheContent from '../layout/TheContent.vue'
export default {
    name:"ThePageRight",
    components: {
        TheHeader,
        TheContent
    }
}
</script>
 