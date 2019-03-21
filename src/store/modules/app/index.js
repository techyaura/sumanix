import getters from './getters';
import mutations from './mutations';
import actions from './actions';

// initial state
const state = {
  isHomePageLand: false,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
