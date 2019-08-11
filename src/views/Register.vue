<template>
  <div class="row">
    <AppRegister/>
    <!-- End col-md-6 -->
    <div class="col-md-6">
      <div class="page-content Register">
        <h2>Login Now</h2>
        <p><strong>techyaura-forum</strong> is an online community platform to learn, share their knowledge, and build their career.</p>
        <router-link class="button color small signup" to="/login">Login</router-link>
      </div>
      <!-- End page-content -->
    </div>
    <!-- End col-md-6 -->
  </div>
</template>

<script>
import AppRegister from '@/components/AppRegister.vue';
import { breadcrumbMixin } from '../mixins';

export default {
  name: 'Register',
  components: {
    AppRegister,
  },
  mixins: [breadcrumbMixin],
  // beforeCreate() {
  //   this.$vueEventBus.$emit("isLoginPageLanding", true);
  // },
  beforeRouteEnter: (to, from, next) => {
    next((vm) => {
      vm.$vueEventBus.$emit('isLoginPageLanding', true);
    });
    // access to component instance via `vm`
    // called before the route that renders this component is confirmed.
    // does NOT have access to `this` component instance,
    // because it has not been created yet when this guard is called!
  },
  beforeRouteLeave(to, from, next) {
    this.$vueEventBus.$emit('isLoginPageLanding', false);
    next();
    // next(vm => {
    //   vm.$vueEventBus.$emit('isLoginPageLanding', false);
    // })
    // access to component instance via `vm`
    //  this.$vueEventBus.$emit('isLoginPageLanding', false);
    //  next();
    // called when the route that renders this component is about to
    // be navigated away from.
    // has access to `this` component instance.
  },
  created() {
    document.title = this.title('Sign Up');
  },
};
</script>
