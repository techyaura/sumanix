class localStorageService {
  static getToken() {
    if (localStorage.getItem('accessToken')) {
      return JSON.parse(localStorage.getItem('accessToken'));
    }
    return null;
  }

  static getUser() {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'));
    }
    return null;
  }

  static destroySession() {
    localStorage.clear();
    return Promise.resolve(true);
  }
}

export default localStorageService;
