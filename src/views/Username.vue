<template>
  <div class="row t-profile-parent">
    <div class="col-md-9">
      <div class="row">
        <router-view></router-view>
      </div>
    </div>
    <div class="col-md-3">
      <aside class="sidebar">
        <div class="widget widget_menu" style="width: 263px; top: 185px; bottom: auto;">
          <ul>
            <li>
              <router-link :to="'/@'+ username">
                <i class="icon-bullhorn"></i>
                Profile
              </router-link>
              <!-- <a href="#accordions">
              <i class="icon-reorder"></i>Profile
              </a>-->
            </li>
            <li v-if="session && session.user && session.user.username === username">
              <router-link :to="route.update">
                <i class="icon-reorder"></i>
                Update Profile
              </router-link>
            </li>

            <!-- <li>
              <router-link :to="route.answer">
                <i class="icon-table"></i>
                  Answers
              </router-link>
            </li> -->
            <li v-if="session && session.user && session.user.username === username">
              <router-link :to="route.password">
                <i class="icon-link"></i>
                Change Password
              </router-link>
            </li>
             <li>
              <router-link :to="route.question">
                <i class="icon-tasks"></i>
                  Questions
              </router-link>
            </li>
            <!-- <li><a href="#buttons"><i class="icon-link"></i>Change Password</a></li> -->
            <!-- <li><a href="#testimonial"><i class="icon-tasks"></i>My Questions</a></li>
            <li><a href="#audio"><i class="icon-table"></i>My Answers</a></li>-->
            <!-- <li><a href="#dropcaps"><i class="icon-bold"></i>Dropcaps</a></li>
          <li><a href="#blockquote"><i class="icon-quote-left"></i>Blockquote</a></li>
          <li><a href="#icons"><i class="icon-star-empty"></i>Icons</a></li>
          <li><a href="#contact"><i class="icon-envelope"></i>Contact Forms</a></li>
          <li><a href="#bullet"><i class="icon-list"></i>Bullet and Lists</a></li>
          <li><a href="#progess"><i class="icon-tasks"></i>Progess Bars</a></li>
          <li><a href="#slideShow"><i class="icon-picture"></i>SlideShow</a></li>
          <li><a href="#video"><i class="icon-film"></i>video</a></li>
            <li><a href="#columns"><i class="icon-table"></i>Columns</a></li>-->
          </ul>
        </div>
        <!-- End widget_menu -->
      </aside>
    </div>
  </div>
</template>

<script>
// import Spinner from '@/components/Spinner.vue';
// import AppMyQuestion from '@/components/AppMyQuestion.vue';
// import AppMyAnswer from '@/components/AppMyAnswer.vue';
import {
  breadcrumbMixin, filterMixin, spinnerMixin, sessionMixin,
} from '../mixins';

export default {
  name: 'Username',
  mixins: [filterMixin, spinnerMixin, breadcrumbMixin, sessionMixin],
  data() {
    return {
      user: {},
      route: {
        update: `/@${this.$route.params.username}/profile/update`,
        password: `/@${this.$route.params.username}/profile/password`,
        question: `/@${this.$route.params.username}/question`,
        answer: `/@${this.$route.params.username}/answer`,
      },
      username: this.$route.params.username,
    };
  },
};
</script>
<style scoped>
.t-profile-parent .router-link-exact-active{
  background-color:#456FF1;
  color: #fff;
}
/* .t-profile-parent .router-link-exact-active:hover{
  color: #ddd;
} */
@media only screen and (max-width: 479px) {
  .t-profile-parent .row{
    margin-right: 0px !important;
    margin-left: 0px !important;
  }
  .t-profile-parent .col-md-9{
    float: none !important;
  }
}
</style>
