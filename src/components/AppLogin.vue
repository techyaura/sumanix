<template>
  <div class="col-md-6">
    <div class="page-content">
      <h2>Login</h2>
      <div class="form-style form-style-3">
        <form @submit.prevent="handleSubmit">
          <Notifiation v-if="err" :err="err"/>
          <div class="form-inputs clearfix">
            <p class="login-text">
              <input type="email" value="Email" placeholder="Email" v-model="user.email">
              <i class="icon-envelope"></i>
            </p>
            <p class="login-password">
              <input
                placeholder="Password"
                type="password"
                value="Password"
                v-model="user.password"
              >
              <i class="icon-lock"></i>
              <a href="javascript:void(0);" v-on:click="showForgot(true)">Forget</a>
            </p>
          </div>
          <p class="form-submit login-submit">
            <input
              :disabled="isSubmit"
              :value="!isSubmit? 'Log in' : 'Logging In ...'"
              type="submit"
              class="button color small login-submit submit">
          </p>
          <div class="rememberme"></div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Notifiation from '@/components/Message.vue';
import toast from '../services/toast';

export default {
  name: 'AppLogin',
  data() {
    return {
      err: '',
      isSubmit: false,
      user: {
        email: '',
        password: '',
      },
    };
  },
  components: {
    Notifiation,
  },
  methods: {
    showForgot(value) {
      this.$emit('loginSwapEvent', value);
    },
    handleSubmit() {
      this.err = '';
      this.isSubmit = true;
      const postData = {
        email: this.user.email,
        password: this.user.password,
      };
      this.$http
        .post(`${this.$BASE_URL}api/v1/auth/login`, postData, {
          errorHandle: false,
        })
        .then((response) => {
          this.isSubmit = false;
          const { token, data, message } = response.data;
          localStorage.setItem('accessToken', JSON.stringify(token));
          localStorage.setItem('user', JSON.stringify(data));
          this.$vueEventBus.$emit('isLoggedIn', true);
          this.$router.push(this.$route.query.redirect || '/');
          toast.success(message);
        })
        .catch((err) => {
          this.isSubmit = false;
          this.err = err;
        });
    },
  },
};
</script>
