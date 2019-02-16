<template>
  <div>
    <div id="header-top">
      <section class="container clearfix">
        <nav class="header-top-nav">
          <ul>
            <li class="logoLink">
              <router-link to="/">
                SumaniX
                <span class="logo-version-tile">v1.0</span>
              </router-link>
            </li>
            <li>
              <a class="anchor-link" v-on:click="onLinkClicked()">
                <i class="icon-pencil"></i>Ask Question
              </a>
            </li>
            <li class="anchor-link">
              <router-link to="/tags">Tags</router-link>
            </li>
            <li class="anchor-link search-bar">
              <AppHeaderSearch></AppHeaderSearch>
            </li>
            <li class="anchor-link right-nv-header">
              <a v-show="isLoggedInFlag" href="javascript:void(0)" v-on:click="logout();">Log Out</a>
              <router-link v-show="!isLoggedInFlag" to="/login">Log In</router-link>
            </li>
            <li class="anchor-link right-nv-header">
              <router-link v-show="isLoggedInFlag" to="/profile">Profile</router-link>
            </li>
            <!-- <li class="anchor-link right-nv-header">
              <router-link to="/about">About Us</router-link>
            </li>-->
          </ul>
        </nav>
        <!-- <div class="header-search header-search-panel">
          <div class="right-auth-panel">
            <router-link v-show="!isLoggedInFlag" to="/login">
              <i class="icon-user"></i>Login Area
            </router-link>
            <a href="javascript:void(0)" v-show="isLoggedInFlag" v-on:click="logout();">Log out</a>
          </div>
        </div>-->
      </section>
      <!-- End container -->
    </div>

    <!-- End header-top -->
    <header id="header" class="index-no-box header_light" v-if="!isHomePageLand  && (isLoggedInFlag || !isLoggedInFlag)"></header>
    <!-- End header -->
    <div class="section-warp section-warp-custom ask-me" v-if="isHomePageLand && !isLoggedInFlag">
      <div class="container clearfix custom-header-logo">
        <div
          class="box_icon box_warp box_no_border box_no_background"
          box_border="transparent"
          box_background="transparent"
          box_color="#FFF"
          style="background-color: transparent; border-color: transparent; color: rgb(255, 255, 255);"
        >
          <div class="row">
            <div class="col-md-12">
              <h2>Connect, Share & Learn</h2>
              <p>SumaniX is an online community platform for job aspirants & techs developers to learn, share their knowledge, and build their career.</p>
              <div class="clearfix"></div>
              <router-link to="/about" class="color button dark_button medium">About</router-link>
              <router-link to="/register" class="color button dark_button medium">Join Now</router-link>
            </div>
          </div>
          <!-- End row -->
        </div>
        <!-- End box_icon -->
      </div>
      <!-- End container -->
    </div>
  </div>
</template>

<script>
import localStorageService from '../services/localStorage';
import AppHeaderSearch from './AppHeaderSearch.vue';

export default {
  name: 'AppHeader',
  components: {
    AppHeaderSearch,
  },
  data() {
    return {
      isLoggedInFlag: this.isLoggedIn || false,
      isHomePageLand: false,
    };
  },
  props: ['isLoggedIn'],
  beforeCreate() {
    this.$vueEventBus.$on('isLoggedIn', (value) => {
      this.isLoggedInFlag = value;
      this.$emit('logout', true);
    });
    this.$vueEventBus.$on('isHomePage', (value) => {
      this.isHomePageLand = value;
    });
  },
  watch: {
    isLoggedInFlag(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.isLoggedInFlag = newVal;
      }
    },
  },
  methods: {
    logout() {
      localStorageService.destroySession().then(() => {
        this.isLoggedInFlag = false;
        // this.$emit('logout', false);
        this.$router.push('/');
      });
    },
    onLinkClicked() {
      if (!this.isLoggedInFlag) {
        this.$router.push({
          name: 'login',
          query: { redirect: '/addQuestion' },
        });
      } else {
        this.$router.push('/addQuestion');
      }
    },
  },
};
</script>
<style scoped>
.header-top-nav li.logoLink {
  font-style: inherit;
  font-size: 20px !important;
  margin-right: 20px;
}

.header-top-nav li {
  line-height: 60px !important;
}

.header-search-panel {
  /* float: right; */
  float: none !important;
}
.header-search input {
  width: 50% !important;
}
.header-top-nav li::after {
  content: "";
}
.right-auth-panel {
  float: right;
  position: relative;
  top: 10px;
}
.right-auth-panel a {
  color: white;
  float: right;
  position: relative;
  /* top: 10px; */
  font-weight: bolder;
}
.anchor-link {
  cursor: pointer;
  /* margin-left: 100px; */
  font-size: 14px;
}
.header-top-nav li.logoLink:hover a {
  color: white;
}
/* #header-top {
  border-bottom: 2px solid #ccc;
} */
.right-nv-header {
  float: right;
}
.logo-version-tile {
  font-size: 10px;
}
li.search-bar {
  width: 60% !important;
  text-align: center !important;
  padding: 0px 42px !important;
}
li.search-bar input {
  text-align: center !important;
}
.custom-header-logo .box_icon p {
  font-size: 20px !important;
}
.section-warp-custom {
    padding: 30px 0 !important;
}
.ask-me .col-md-12 {
    padding-top: 0 !important;
}
#header-top {
    height: 65px !important;
}
@media only screen and (max-width: 479px) {
  li.search-bar {
    width: 100% !important;
    float: none !important;
    padding: 0px 42px !important;
  }
  #header-top {
    height: 180px !important;
}
}
</style>
