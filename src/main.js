import Vue from 'vue';
import axios from 'axios';
import moment from 'moment';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import './assets/css/base.css';
import './assets/css/lists.css';
import './assets/css/bootstrap.min.css';
import './assets/css/font-awesome/css/font-awesome.min.css';
import './assets/css/prettyPhoto.css';
import './assets/css/fontello/css/fontello.css';
import './assets/css/style.css';
import './assets/css/skins/google.css';
import './assets/css/responsive.css';
import './assets/css/custom.css';
import requestHandler from './services/requestHandler';
import errorResponseHandler from './services/errorHandler';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.request.use(requestHandler, errorResponseHandler);

axios.interceptors.response.use(response => response, errorResponseHandler);

Vue.config.productionTip = true;
Vue.prototype.$http = axios;
Vue.prototype.$moment = moment;
Vue.prototype.$BASE_URL = process.env.VUE_APP_BASE_URL;
Vue.prototype.$vueEventBus = new Vue();

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
