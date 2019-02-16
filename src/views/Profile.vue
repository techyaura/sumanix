<template>
  <div class="col-md-12">
    <div class="row">
      <div class="user-profile user-profile-custom">
        <div class="col-md-12">
          <div class="page-content">
            <h2>About User</h2>
            <Spinner :status="spinner.status" :color="spinner.color" :size="spinner.size" :depth="spinner.depth" :rotation="spinner.rotation" :speed="spinner.speed"/>
             <router-link
              class="question-report"
              :to="{name: 'profileUpdate'}"
              v-if="!spinner.status"
              style="background-color: #898989"
              >
                Update Profile
              </router-link>
            <div class="user-profile-img" v-if="!spinner.status">
              <img width="60" height="60" :src="'/img/profile/' + user.avatar" :alt="user.avatar">
            </div>
            <div class="ul_list ul_list-icon-ok about-user" v-if="!spinner.status">
              <ul>
                <li>
                  <!-- <i class="icon-plus"></i>Registerd On: -->
                  <span>{{user.username}}</span>
                </li>
                <li>
                  <i class="icon-plus"></i>Registerd On:
                  <span>{{$moment(user.createdAt).format('MMMM Do YYYY')}}</span>
                </li>
                <li>
                  <i class="icon-map-marker"></i>Country :
                  <span>{{user.country? user.country: 'N/A'}}</span>
                </li>
              </ul>
            </div>
            <p>{{user.bio}}</p>
            <div class="clearfix"></div>
          </div>
        </div>
        <div class="col-md-12">
          <AppMyQuestion/>
        </div>
        <div class="col-md-12">
          <AppMyAnswer/>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue';
import AppMyQuestion from '@/components/AppMyQuestion.vue';
import AppMyAnswer from '@/components/AppMyAnswer.vue';
import { breadcrumbMixin, filterMixin, spinnerMixin } from '../mixins';

export default {
  name: 'Profile',
  components: {
    Spinner,
    AppMyQuestion,
    AppMyAnswer,
  },
  mixins: [filterMixin, spinnerMixin, breadcrumbMixin],
  data() {
    return {
      user: {},
    };
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
  methods: {
    profile() {
      this.$http.get(`${this.$BASE_URL}api/v1/auth/user`).then((response) => {
        this.user = response.data.data;
        document.title = this.title(`User ${this.user.username}`);
        this.spinner.status = false;
      });
    },
  },
  created() {
    this.profile();
  },
};
</script>

<style scoped>
  .user-profile-custom p {
    /* color: #848991; */
    font-size: 16px !important;
}
.user-profile-custom .question-report {
  right: 35px !important;
}
.user-question .question-type-main {
    right: 32px !important;
}
</style>
