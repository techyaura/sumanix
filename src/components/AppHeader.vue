<template>
  <div class="t-header">
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
                <i class="icon-pencil" style="color: #fff !important;"></i>Ask Question
              </a>
            </li>
            <li class="anchor-link">
              <router-link to="/tags">Tags</router-link>
            </li>
            <li class="anchor-link search-bar">
              <AppHeaderSearch></AppHeaderSearch>
            </li>
            <li class="dropdown anchor-link right-nv-header" v-show="!isLoggedInFlag">
               <router-link to="/login">Log In</router-link>
            </li>
            <li class="dropdown anchor-link right-nv-header" v-show="isLoggedInFlag">
              <a class="dropdown-toggle" data-toggle="dropdown" href="javascript:void(0);" @click="showDropdown()">{{username}}<span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li @click="showDropdown()">
                  <router-link :to="'/@' + username">Profile</router-link>
                </li>
                <li>
                  <a href="javascript:void(0)" v-on:click="logout();">Log Out</a>
                </li>
              </ul>
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
    <header
      id="header"
      class="index-no-box header_light"
      v-if="!isHomePageLand  && (isLoggedInFlag || !isLoggedInFlag)"
    ></header>
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
            <div class="col-md-12 header-button">
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
      username: (this.user) ? this.user.username : '',
      //  profileRoute: `/@${  this.user.username}`,
    };
  },
  props: ['isLoggedIn', 'user'],
  beforeCreate() {
    this.$vueEventBus.$on('isLoggedIn', (value) => {
      this.isLoggedInFlag = value;
      this.username = localStorageService.getUser().username || '';
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
      this.showDropdown();
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
    showDropdown() {
      const element = document.querySelector('.dropdown-menu');
      element.classList.toggle('dropdown-menu-custom');
    },
  },
};
</script>
<style scoped>
.t-header .dropdown-menu-custom{
  display: block
}

.t-header .dropdown-menu-custom li a{
  color: #262626;
}

.t-header .dropdown-menu-custom li:hover{
  width: 100% !important;
  background-color: #f5f5f5;
}
.t-header .header-top-nav li.logoLink {
  font-style: inherit;
  font-size: 20px !important;
  margin-right: 20px;
}

.t-header .header-top-nav li {
  line-height: 60px !important;
}

.t-header .header-search-panel {
  /* float: right; */
  float: none !important;
}
.t-header .header-search input {
  width: 50% !important;
}
.t-header .header-top-nav li::after {
  content: "";
}
.t-header .right-auth-panel {
  float: right;
  position: relative;
  top: 10px;
}
.t-header .right-auth-panel a {
  color: white;
  float: right;
  position: relative;
  /* top: 10px; */
  font-weight: bolder;
}
.t-header .anchor-link {
  cursor: pointer;
  /* margin-left: 100px; */
  font-size: 14px;
  color: #fff;
}
.t-header .header-top-nav li.logoLink:hover a {
  color: white;
}
/* #header-top {
  border-bottom: 2px solid #ccc;
} */
.t-header .right-nv-header {
  float: right;
}
.t-header .logo-version-tile {
  font-size: 10px;
}
.t-header li.search-bar {
  width: 55% !important;
  text-align: center !important;
  padding: 0px 42px !important;
}
.t-header li.search-bar input {
  text-align: center !important;
}
.t-header .custom-header-logo .box_icon p {
  font-size: 20px !important;
}
.t-header .section-warp-custom {
  padding: 30px 0 !important;
  background-color: #474c58;
}
.t-header .ask-me .col-md-12 {
  padding-top: 0 !important;
}
.t-header nav ul{
  margin-bottom: 0px !important;
}
.t-header #header-top {
  height: 65px !important;
  background-color: #474c58;
}
ul li a:hover {
    color: #fff !important;
}
/* .header-button a,a:hover{
  background-color: #898989 !important;
} */
@media only screen and (max-width: 479px) {
  .t-header li.search-bar {
    width: 100% !important;
    float: none !important;
    padding: 0px 42px !important;
  }
  .t-header #header-top {
    height: 180px !important;
  }
  .t-header .header-top-nav li a{
    float: none !important;
  }
}
</style>
