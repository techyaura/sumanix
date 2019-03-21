import Vue from 'vue';
import axios from 'axios';
import requestHandler from '../services/requestHandler';
import store from '../store/index';
import toast from '../services/toast';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.request.use(requestHandler);

axios.interceptors.response.use(response => response, (errorObj) => {
  const status = errorObj.response ? errorObj.response.status : null;
  if (status === 401) {
    return store.dispatch('auth/destroySession').then(() => {
      Vue.$router.push('/login');
    });
  }
  const error = { ...errorObj };
  let errMsg = 'Something went wrong, Please try after some time.';
  if (error.response) {
    const { errors: err } = error.response.data;
    if (err && Object.prototype.hasOwnProperty.call(err, 'errors') && err.errors !== undefined && err.errors !== 'undefined') {
      const errObj = err.errors;
      Object.keys(errObj).forEach((key) => {
        errMsg = `${errMsg + errObj[key].msg}\n`;
      });
    } else {
      errMsg = err[0].message;
    }
  }
  const newErrmsg = errMsg.replace(/"/g, '');
  errMsg = newErrmsg.charAt(0).toUpperCase() + newErrmsg.substr(1);
  // check for errorHandle config
  if (Object.prototype.hasOwnProperty.call(error.config, 'errorHandle') && error.config.errorHandle === false) {
    return Promise.reject(errMsg);
  }
  toast.error(errMsg);
  return Promise.reject(errMsg);
});


Vue.prototype.$http = axios;
