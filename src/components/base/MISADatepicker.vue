<template>
    <div class="datepicker-container">
        <Datepicker
        format="dd/MM/yyyy"
        selectText="Chọn"
        cancelText="Hủy"
        :enableTimePicker="false"
        :textInput="true"
        :maxDate="new Date()"
        v-model="date"
        autoApply
        @update:modelValue="selectDate"
        />
        <div class="datepicker-icon"></div>
    </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
// import {ref} from 'vue';

export default {
    components:{
        Datepicker
    },
    props: ['modelValue','control'],
    emits: ['update:modelValue'],
    methods:{
        selectDate(value){
            this.$emit('getDate',value);
        }
    },
    watch: {
        control:function(newValue){
            this.date = newValue;
        }
    },
    data() {
        return {
            date: new Date(),
            isAlert: false,
        }
    },
}
</script>

<style>

</style>