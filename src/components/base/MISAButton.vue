<template>
    <button :class='classButton' ref="btnFocus">{{textButton}}</button>
</template>

<script>
export default {
    props: ["textButton","classButton"],
    methods: {
    setFocusBtn() {
        this.$refs.btnFocus.focus();
    }
}

}
</script>

<style>

</style>