import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth/index';
import app from './modules/app/index';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    app,
    auth,
  },
  strict: debug,
  // plugins: debug ? [createLogger()] : []
});
