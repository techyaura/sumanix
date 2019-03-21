export default {
  setSession(payload) {
    localStorage.setItem('token', JSON.stringify(payload.token));
    localStorage.setItem('user', JSON.stringify(payload.user));
    return Promise.resolve(payload);
  },
  getSession() {
    let user = {};
    if (localStorage.token) {
      user = JSON.parse(localStorage.getItem('user'));
    }
    return Promise.resolve({
      user,
      token: localStorage.getItem('token'),
      expiresIn: localStorage.getItem('expiresIn'),
      refreshToken: localStorage.getItem('refreshToken'),
    });
  },
  destroySession() {
    localStorage.clear();
    return Promise.resolve(true);
  },
};
