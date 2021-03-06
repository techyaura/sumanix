import getters from './getters';
import mutations from './mutations';
import actions from './actions';

// initial state
const state = {
  token: '',
  user: {},
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
