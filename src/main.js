import { createApp } from 'vue'
import App from './App.vue'
// import MISACheckBox from './components/base/MISACheckBox.vue'
import { registerLicense } from '@syncfusion/ej2-base';
import MISACheckbox from "./components/base/MISACheckBox";
import MISAToastMessage from "./components/base/MISAToastMessage.vue";
import MISAAlert from "./components/base/MISAAlert.vue";
import MISAButton from "./components/base/MISAButton.vue";
import MISALoading from "./components/base/MISALoading.vue";
import MISAInput from "./components/base/MISAInput.vue";
import MISACombobox from "./components/base/MISACombobox.vue";
import MISADatepicker from "./components/base/MISADatepicker.vue"
import router from "./router/index"
import store from "./router/store"

// Registering Syncfusion license key
registerLicense(
  'ORg4AjUWIQA/Gnt2VVhhQlFac1pJWnxLYVF2R2FJe1RwcF9CYkwgOX1dQl9hSXhTdEVnWXlbcHRVQmA='
);
const app = createApp(App);
app.use(require('vue3-shortkey'));
app.component("MISACheckbox",MISACheckbox);
app.component("MISAToastMessage",MISAToastMessage);
app.component("MISAAlert",MISAAlert);
app.component("MISAButton",MISAButton);
app.component("MISALoading",MISALoading);
app.component("MISACombobox",MISACombobox);
app.component("MISAInput",MISAInput);
app.component("MISADatepicker",MISADatepicker);


app.use(router);
app.use(store);

// app.component('MISACheckBox',MISACheckBox);
app.mount('#app');
