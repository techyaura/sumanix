<template>
  <div id="wrap" class="grid_1200">
    <AppHeader v-bind:isLoggedIn="session.isLoggedIn" v-bind:user="session.user"/>
    <section
      class="container main-content"
      v-bind:class="{ 'page-left-sidebar': isProfileSidebar }"
    >
      <!-- <div class="row"> -->
      <router-view :key="$route.fullPath"></router-view>
      <div v-if="!isLoginPage">
        <AppSidebar/>
        <!-- </div> -->
      </div>
    </section>
    <AppFooter/>
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue';
import AppHeader from '../components/AppHeader.vue';
import AppSidebar from '../components/AppSidebar.vue';
import sessionMixin from '../mixins/sessionMixin';

export default {
  name: 'DefaultLayout',
  components: {
    AppFooter,
    AppHeader,
    AppSidebar,
  },
  mixins: [sessionMixin],
  beforeCreate() {
    this.$vueEventBus.$on('isLoginPageLanding', (value) => {
      this.isLoginPage = value;
    });
    this.$vueEventBus.$on('isProfileSidebar', (value) => {
      this.isProfileSidebar = value;
    });
  },
  data() {
    return {
      isLoginPage: false,
      isProfileSidebar: false,
    };
  },
  beforeRouteLeave(to, from, next) {
    this.$vueEventBus.$emit('isProfileSidebar', false);
    next();
  },
  // ,
  // methods: {
  //   onLogoutChild(value) {
  //     this.session.user.isLoggedIn = value;
  //   },
  // },
};
</script>
