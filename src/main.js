import Vue from 'vue';
import moment from 'moment';
import App from './App.vue';
import router from './router';
import store from './store/index';
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
import './plugins/axios';
import Default from './layouts/default.vue';
import BlogLayout from './layouts/blog.vue';
import ProfileLayout from './layouts/profile.vue';
import LoginLayout from './layouts/login.vue';

Vue.component('default-layout', Default);
Vue.component('blog-layout', BlogLayout);
Vue.component('profile-layout', ProfileLayout);
Vue.component('login-layout', LoginLayout);
Vue.config.productionTip = true;
Vue.prototype.$moment = moment;
Vue.prototype.$BASE_URL = process.env.VUE_APP_BASE_URL;
Vue.prototype.$vueEventBus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
