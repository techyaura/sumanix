const getters = {
  getUser(state) {
    if (Object.prototype.hasOwnProperty.call(state, 'user') && Object.keys(state.user).length) {
      return state.user;
    }
    return {};
  },
  getToken(state) {
    return state.token;
  },
  getRefreshToken(state) {
    return state.refreshToken;
  },
  getTokenExpireTime(state) {
    return state.expiresIn;
  },
};

export default getters;
