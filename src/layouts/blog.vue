<template>
  <div id="wrap" class="grid_1200">
    <div class="t-header-blog">
      <div id="header-top">
        <section class="container clearfix">
          <nav class="header-top-nav">
            <ul>
              <li class="logoLink">
                <router-link to="/blogs">
                  techyaura-blogs
                  <!-- <span class="logo-version-tile">v1.0</span> -->
                  <span class="logo-version-tile">Blogs</span>
                </router-link>
              </li>
              <li class="anchor-link right-nv-header">
                <router-link to="/">Back to techyaura-forum</router-link>
              </li>
            </ul>
          </nav>
        </section>
      </div>
      <header id="header" class="index-no-box header_light"></header>
    </div>
    <section class="container main-content" style="min-height: 400px;">
      <slot/>
    </section>
    <AppFooter/>
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue';

export default {
  name: 'BlogLayout',
  components: {
    AppFooter,
  },
};
</script>
<style scoped>
.t-header-blog .dropdown-menu-custom {
  display: block;
}

.t-header-blog .dropdown-menu-custom li a {
  color: #262626;
}

.t-header-blog .dropdown-menu-custom li:hover {
  width: 100% !important;
  background-color: #f5f5f5;
}
.t-header-blog .header-top-nav li.logoLink {
  font-style: inherit;
  font-size: 20px !important;
  margin-right: 20px;
}

.t-header-blog .header-top-nav li {
  line-height: 60px !important;
}

.t-header-blog .header-search-panel {
  /* float: right; */
  float: none !important;
}
.t-header-blog .header-search input {
  width: 50% !important;
}
.t-header-blog .header-top-nav li::after {
  content: "";
}
.t-header-blog .right-auth-panel {
  float: right;
  position: relative;
  top: 10px;
}
.t-header-blog .right-auth-panel a {
  color: white;
  float: right;
  position: relative;
  /* top: 10px; */
  font-weight: bolder;
}
.t-header-blog .anchor-link {
  cursor: pointer;
  /* margin-left: 100px; */
  font-size: 14px;
  color: #fff;
}
.t-header-blog .header-top-nav li.logoLink:hover a {
  color: white;
}
/* #header-top {
  border-bottom: 2px solid #ccc;
} */
.t-header-blog .right-nv-header {
  float: right;
}
.t-header-blog .logo-version-tile {
  font-size: 10px;
}
.t-header-blog li.search-bar {
  width: 55% !important;
  text-align: center !important;
  padding: 0px 42px !important;
}
.t-header-blog li.search-bar input {
  text-align: center !important;
}
.t-header-blog .custom-header-logo .box_icon p {
  font-size: 20px !important;
}
.t-header-blog .section-warp-custom {
  padding: 30px 0 !important;
  background-color: #474c58;
}
.t-header-blog .ask-me .col-md-12 {
  padding-top: 0 !important;
}
.t-header-blog nav ul {
  margin-bottom: 0px !important;
}
.t-header-blog #header-top {
  height: 65px !important;
  background-color: #474c58;
}
.t-header-blog li.anchor-link a{
    color: #456FF1 !important;
}
@media only screen and (max-width: 479px) {
  .t-header-blog li.search-bar {
    width: 100% !important;
    float: none !important;
    padding: 0px 42px !important;
  }
  .t-header-blog #header-top {
    height: 180px !important;
  }
  .t-header-blog .header-top-nav li a {
    float: none !important;
  }
}
</style>
