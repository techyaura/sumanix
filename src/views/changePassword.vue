<template>
   <div class="page-content t-password">
      <div class="boxedtitle page-title">
        <h2>Change Password</h2>
      </div>
      <div class="form-style form-style-4 form-style-4-custom">
        <form @submit.prevent="handleSubmit">
          <Notifiation v-if="err" :err="err"/>
          <div class="form-inputs clearfix">
            <p>
              <label class="required">
                Password
                <span>*</span>
              </label>
              <input
                placeholder="*********"
                autocomplete="off"
                type="password"
                v-model="user.password">
            </p>
          </div>
          <p class="form-submit">
            <input
              :disabled="isSubmit"
              type="submit"
              :value="!isSubmit? 'Save': 'Saving ...'"
              class="button color small login-submit submit"
            >
          </p>
        </form>
      </div>
    </div>
</template>

<script>
import Notifiation from '@/components/Message.vue';
import toast from '../services/toast';

export default {
  name: 'ChangePassword',
  components: {
    Notifiation,
  },
  beforeCreate() {
    this.$vueEventBus.$emit('isLoginPageLanding', true);
  },
  beforeRouteEnter: (to, from, next) => {
    next((vm) => {
      vm.$vueEventBus.$emit('isLoginPageLanding', true);
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$vueEventBus.$emit('isLoginPageLanding', false);
    next();
  },
  data() {
    return {
      isSubmit: false,
      err: '',
      user: {
        password: '',
      },
    };
  },
  methods: {
    handleSubmit() {
      this.isSubmit = true;
      this.err = '';
      const postData = {};
      if (this.user.password) {
        postData.password = this.user.password;
      }
      this.$http
        .put(`${this.$BASE_URL}api/v1/auth/user/changePassword`, postData, {
          errorHandle: false,
        })
        .then((response) => {
          const { message } = response.data;
          this.isSubmit = false;
          toast.success(message);
          // this.$router.push('/profile');
        })
        .catch((err) => {
          this.isSubmit = false;
          this.err = err;
        });
    },
  },
};
</script>

<style scoped>
.t-password .form-style-4 .form-inputs p {
  width: 100% !important;
}
.t-password .form-style-4 input.submit {
  width: 21% !important;
  float: none !important;
}
.t-password .form-style-4 input {
  color: #756464 !important;
}
.t-password input.button {
  background-color: #2f3239 !important;
}
</style>
