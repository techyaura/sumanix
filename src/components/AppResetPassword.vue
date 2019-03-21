<template>
  <div class="col-md-6">
    <div class="page-content" v-if="showScreen">
      <h2>Reset Password</h2>
      <div class="form-style form-style-3">
        <form @submit.prevent="handleSubmit">
          <Notifiation v-if="err" :err="err"/>
          <div class="form-inputs clearfix">
            <!-- <p class="login-text">
              <input type="email" value="Email" placeholder="Email" v-model="user.email">
              <i class="icon-user"></i>
            </p>-->
            <p class="login-password">
              <input placeholder="Password" type="password" value="Password" v-model="password">
              <i class="icon-lock"></i>
            </p>
          </div>
          <p class="form-submit login-submit">
            <input
              :disabled="isSubmit"
              :value="!isSubmit? 'Change Password' : 'Updating Password ...'"
              type="submit"
              class="button color small login-submit submit"
            >
          </p>
          <div class="rememberme"></div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import toast from '../services/toast';
import Notifiation from '@/components/Message.vue';

export default {
  name: 'AppResetPassword',
  data() {
    return {
      err: '',
      isSubmit: false,
      showScreen: false,
      password: '',
    };
  },
  components: {
    Notifiation,
  },
  methods: {
    checkAuthentication(username, hash) {
      this.$http
        .get(
          `${
            this.$BASE_URL
          }api/v1/auth/forgotPassword?username=${username}&hash=${hash}`,
          { errorHandle: false },
        )
        .then((response) => {
          const { message } = response.data;
          toast.success(message);
          this.showScreen = true;
        })
        .catch((err) => {
          toast.error(err);
        });
    },
    handleSubmit() {
      if (!this.password.trim()) {
        return false;
      }
      this.err = '';
      this.isSubmit = true;
      const postData = {
        password: this.password,
        username: this.$route.params.username,
        hash: this.$route.params.hash,
      };
      return this.$http
        .post(`${this.$BASE_URL}api/v1/auth/user/resetPassword`, postData, {
          errorHandle: false,
        })
        .then((response) => {
          const { token, data: user, message } = response.data;
          this.isSubmit = false;
          this.$store
            .dispatch('auth/saveSession', {
              token,
              user,
            })
            .then(() => {
              toast.success(message);
              this.$router.push('/');
            });
        })
        .catch((err) => {
          this.err = err;
          this.isSubmit = false;
        });
    },
  },
  created() {
    if (this.$route.params.username && this.$route.params.hash) {
      this.showScreen = true;
    }
  },
};
</script>

<style>
</style>
