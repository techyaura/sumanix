<template>
  <div class="row">
    <AppLogin v-if="isLogin && !isForget" @loginSwapEvent="showForgot"/>
    <AppForgot v-if="!isLogin && isForget" @loginSwapEvent="showForgot"/>
    <AppResetPassword v-if="!isLogin && !isForget" @loginSwapEvent="showForgot"/>
    <div class="col-md-6">
      <div class="page-content Register">
        <h2>Register Now</h2>
        <p>
          Create your
          <strong>SumaniX</strong> account. It's free and only takes a minute..
        </p>
        <router-link class="button color small signup" to="/register">Create an account</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import AppLogin from '@/components/AppLogin.vue';
import AppForgot from '@/components/AppForgot.vue';
import AppResetPassword from '@/components/AppResetPassword.vue';
import { breadcrumbMixin } from '../mixins';

export default {
  name: 'Login',
  components: {
    AppLogin,
    AppForgot,
    AppResetPassword,
  },
  mixins: [breadcrumbMixin],
  data() {
    return {
      isLogin: true,
      isForget: false,
      username: false,
      hash: false,
    };
  },
  methods: {
    showForgot(value) {
      this.isForget = value;
      this.isLogin = !value;
    },
  },
  created() {
    document.title = this.title('Login In');
    if (this.$route.params.username && this.$route.params.hash) {
      this.isLogin = false;
      this.isForget = false;
    }
  },
};
</script>
