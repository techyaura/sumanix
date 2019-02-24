<template>
  <div class="col-md-6">
    <div class="page-content">
      <h2>{{!popupMessage? 'Forgot Password': popupMessage}}</h2>
      <div v-if="!popupMessage" class="form-style form-style-3">
        <form @submit.prevent="handleSubmit">
          <Notifiation v-if="err" :err="err"/>
          <div class="form-inputs clearfix">
            <p class="login-password">
              <input type="email" value="Email" placeholder="Email" v-model="email">
              <i class="icon-user"></i>
              <a href="javascript:void(0);" v-on:click="showForgot(false)">Back to login</a>
            </p>
          </div>
          <p class="form-submit login-submit">
            <input
            :disabled="isSubmit"
            :value="!isSubmit? 'Send Recovery Email' : 'Sending ...'"
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

export default {
  name: 'AppForgot',
  data() {
    return {
      err: '',
      isSubmit: false,
      email: '',
      popupMessage: '',
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
        email: this.email,
      };
      this.$http
        .post(`${this.$BASE_URL}api/v1/auth/forgotpassword`, postData, {
          errorHandle: false,
        })
        .then((response) => {
          this.popupMessage = response.data.message;
          this.isSubmit = false;
        })
        .catch((err) => {
          this.err = err;
          this.isSubmit = false;
        });
    },
  },
};
</script>
