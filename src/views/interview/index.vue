<template>
  <router-view></router-view>
</template>

<script>
// import Spinner from '@/components/Spinner.vue';
// import AppMyQuestion from '@/components/AppMyQuestion.vue';
// import AppMyAnswer from '@/components/AppMyAnswer.vue';
// import {
//   breadcrumbMixin, filterMixin, spinnerMixin, sessionMixin,
// } from '../mixins';

export default {
  name: 'Interview',
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
};
</script>
