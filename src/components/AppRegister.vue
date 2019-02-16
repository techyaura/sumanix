<template>
  <div class="col-md-6">
    <div class="page-content">
      <h2>{{!popupMessage? 'Register': popupMessage}}</h2>
      <div v-if="!popupMessage" class="form-style form-style-3">
        <form @submit.prevent="handleSubmit">
          <Notifiation v-if="err" :err="err"/>
          <div class="form-inputs clearfix">
            <p class="login-text">
              <input type="email" placeholder="Your Email*" v-model="user.email">
              <i class="icon-envelope"></i>
            </p>
            <p class="login-password">
              <input placeholder="Password*" type="password" v-model="user.password">
              <i class="icon-lock"></i>
            </p>
            <p class="login-password">
              <input
                placeholder="Your Display Name"
                type="text"
                v-model="user.username"
                v-on:keyup="checkUsername"
              >
              <i class="icon-user"></i>
            </p>
          </div>
          <p class="form-submit login-submit">
            <input
              type="submit"
              :disabled="isSubmit || isCheckingUsername"
              :value="!isSubmit? 'Register' : 'Registering ...'"
              class="button color small login-submit submit"
            >
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Notifiation from '@/components/Message.vue';

export default {
  name: 'AppRegister',
  data() {
    return {
      err: '',
      isSubmit: false,
      isCheckingUsername: false,
      popupMessage: '',
      user: {
        email: '',
        password: '',
        username: '',
      },
    };
  },
  components: {
    Notifiation,
  },
  methods: {
    handleSubmit() {
      this.err = '';
      this.isSubmit = true;
      const postData = {
        email: this.user.email,
        password: this.user.password,
        username: this.user.username,
      };
      this.$http
        .post(`${this.$BASE_URL}api/v1/auth/register`, postData, {
          errorHandle: false,
        })
        .then((response) => {
          this.isSubmit = false;
          const { message } = response.data;
          this.popupMessage = message;
        })
        .catch((err) => {
          this.isSubmit = false;
          this.isCheckingUsername = false;
          this.err = err;
        });
    },
    checkUsername($event) {
      this.err = '';
      const username = $event.target.value;
      clearTimeout(this.debounce);
      if (username.trim()) {
        this.isCheckingUsername = true;
        this.debounce = setTimeout(() => {
          this.$http
            .post(
              `${this.$BASE_URL}api/v1/auth/username-offline`,
              { username },
              { errorHandle: false },
            )
            .then((response) => {
              this.isCheckingUsername = false;
              const { message, data } = response.data;
              if (!data) {
                this.user.username = '';
                this.err = message;
              }
            })
            .catch((err) => {
              this.isSubmit = false;
              this.isCheckingUsername = false;
              this.err = err;
            });
        }, 600);
      }
    },
  },
};
</script>
