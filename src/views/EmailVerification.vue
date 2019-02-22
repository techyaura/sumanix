<template>
  <div class="col-md-9">
    <div class="row">
      <div class="user-profile">
        <div class="col-md-12">
          <div class="page-content">{{message}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import toast from '../services/toast';

export default {
  name: 'AppEmailVerification',
  data() {
    return {
      username: '',
      hash: '',
      message: '',
    };
  },
  created() {
    const { username, hash } = this.$route.params;
    this.$http
      .get(
        `${
          this.$BASE_URL
        }api/v1/auth/user/verification?username=${username}&hash=${hash}`, { errorHandle: false },
      )
      .then((response) => {
        const { token, data, message } = response.data;
        localStorage.setItem('accessToken', JSON.stringify(token));
        localStorage.setItem('user', JSON.stringify(data));
        this.$vueEventBus.$emit('isLoggedIn', true);
        toast.success(message);
        this.$router.push(`/@${username}`);
      })
      .catch(() => {
        this.$router.push('/profile');
      });
  },
};
</script>

<style>
</style>
