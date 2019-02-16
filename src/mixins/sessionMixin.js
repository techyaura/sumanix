import localStorageService from '../services/localStorage';

const mixin = {
  data() {
    return {
      session: {
        isLoggedIn: this.isLoggedIn(),
        user: this.getSession(),
      },
    };
  },
  methods: {
    isLoggedIn() {
      return !!this.getToken();
    },
    getToken() {
      return localStorageService.getToken();
    },
    getSession() {
      return localStorageService.getUser();
    },
  },
};

export default mixin;
