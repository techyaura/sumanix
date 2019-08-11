<template>
  <div class="t-header">
    <nav class="navbar navbar-default" v-bind:class="{ 'navbar-margin': isHomePageLand && !token}">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button
            type="button"
            class="navbar-toggle collapsed"
            aria-expanded="false"
            ref="mobile-nav-btn"
            @click="showMobileNav"
          >
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <!-- <a class="navbar-brand" href="#">Brand</a> -->
          <router-link to="/" class="navbar-brand" href="javascript:void(0)">
            Techyaura-Forum <span class="logo-version-tile">Q/A </span>
            <!-- <span class="logo-version-tile">v1.0</span> -->
          </router-link>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div
          class="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
          ref="mobileNavTarget"
        >
          <ul class="nav navbar-nav">
            <li>
              <a class="anchor-link" href="javascript:void(0)" v-on:click="onLinkClicked()">
                Ask Question
              </a>
            </li>
            <li>
              <router-link to="/tags">Tags</router-link>
            </li>
          </ul>
          <app-header-search/>
          <!-- <form class="navbar-form navbar-left">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Search">
          </div>
          </form>-->
          <ul class="nav navbar-nav navbar-right">
            <li v-show="!token">
              <router-link to="/login">Log In</router-link>
            </li>
            <li class="dropdown" v-show="token">
              <a
                href="javascript:void(0)"
                @click="showDropdown()"
                class="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {{user.username}}
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li @click="showDropdown()">
                  <router-link :to="'/@' + user.username">Profile</router-link>
                </li>
                <li>
                  <a href="javascript:void(0)" v-on:click="logout();">Log Out</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <!-- /.navbar-collapse -->
      </div>
      <!-- /.container-fluid -->
    </nav>

    <header id="header" class="index-no-box header_light" v-if="!isHomePageLand"></header>
    <!-- End header -->
    <div class="section-warp section-warp-custom ask-me" v-if="isHomePageLand && !token">
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
              <div class="clearfix"></div>
              <!-- <router-link to="/about" class="color button dark_button medium">About</router-link> -->
              <router-link style="margin: 20px;" to="/register" class="color button dark_button medium">Ask Question</router-link>
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
import { mapGetters } from 'vuex';
// import localStorageService from '../services/localStorage';
import AppHeaderSearch from './AppHeaderSearch.vue';

export default {
  name: 'AppHeader',
  components: {
    AppHeaderSearch,
  },
  // data() {
  //   return {
  //     isHomePageLand: false
  //   };
  // },
  // props: ['isLoggedIn', 'user'],
  // beforeCreate() {
  //   this.$vueEventBus.$on("isHomePage", value => {
  //     this.isHomePageLand = value;
  //   });
  // },
  methods: {
    logout() {
      this.showDropdown();
      this.$store.dispatch('auth/destroySession').then(() => {
        this.$router.push('/login');
      });
    },
    onLinkClicked() {
      if (!this.token) {
        this.$router.push({
          name: 'login',
          query: { redirect: '/addArticle' },
        });
      } else {
        this.$router.push('/addArticle');
      }
    },
    showDropdown() {
      const element = document.querySelector('.dropdown-menu');
      element.classList.toggle('dropdown-menu-custom');
    },
    showMobileNav() {
      this.$refs.mobileNavTarget.classList.toggle('in');
    },
  },
  computed: {
    ...mapGetters({
      user: 'auth/getUser',
      token: 'auth/getToken',
      isHomePageLand: 'app/getHomePageState',
    }),
  },
  created() {
    this.$store.dispatch('auth/fetchSession');
  },
};
</script>
<style scoped>
.t-header .dropdown-menu-custom {
  display: block;
}
.t-header .navbar {
  background-color: #474c58;
  border-radius: 0;
  border-color: #474c58;
  /* height: 70px; */
  margin-bottom: 40px;
}

.t-header .navbar-margin {
  margin-bottom: 0px !important;
}
.t-header .navbar ul li a,
a {
  color: #fff;
 font-size: 17px;
}
 .t-header a.navbar-brand {
  color: #fff;
  font-size: 27px;
}
.t-header a.navbar-brand span{
  font-size: 10px;
}
/*
.t-header .navbar-brand {
  padding-top: 20px;
}
.t-header .navbar-nav > li > a {
  padding-top: 20px;
} */
.t-header .dropdown-menu-custom li a {
  color: #5d4848 !important;
}
.t-header .custom-header-logo .box_icon p {
  font-size: 20px !important;
}
 .t-header .section-warp-custom {
  /* padding: 30px 0 !important; */
  background-color: #474c58;
}

.navbar-default .navbar-collapse, .navbar-default .navbar-form{
  border-color: none !important;
}
@media (min-width: 1200px) {
.grid_1200 .t-header .col-md-12 {
    padding-top: 0px;
}
}
</style>
