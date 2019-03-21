// mutations
const mutations = {
  setHomePageStatus(state, payload) {
    state.isHomePageLand = payload.status;
  },
};

export default mutations;
