<template>
  <div class="col-md-12 t-tags">
    <div class="page-content page-content-user-profile">
      <div class="user-profile-widget">
        <Spinner
          :status="spinner.status"
          :color="spinner.color"
          :size="spinner.size"
          :depth="spinner.depth"
          :rotation="spinner.rotation"
          :speed="spinner.speed"
        />
        <div class="widget widget_social">
          <h3 class="widget_title" style="margin-bottom: 50px;">Tags</h3>
          <ul>
            <li class="facebook-fans" v-for="item in tags" v-bind:data="item" v-bind:key="item.tag">
              <router-link class="" :to="{name: 'tagQuestion', params: {slug: item.tag}}">
                <!-- <strong> -->
                  <small> {{item.slug}}</small>
                <!-- </strong> -->

              </router-link>
              <span class="count">X  {{item.count}}</span>
            </li>
          </ul>
        </div>
        <br>
      </div>
      <!-- End user-profile-widget -->
    </div>
    <!-- End page-content -->
  </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue';
import { filterMixin, spinnerMixin, breadcrumbMixin } from '../mixins';

export default {
  name: 'AppTag',
  components: {
    Spinner,
  },
  mixins: [filterMixin, spinnerMixin, breadcrumbMixin],
  created() {
    document.title = this.title('Tags');
  },
  data() {
    return {
      tags: [],
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
  mounted() {
    this.getTags();
  },
  methods: {
    getTags() {
      this.$http.get(`${this.$BASE_URL}api/v1/tag/question`).then((response) => {
        this.tags = response.data.data;
        this.spinner.status = false;
      });
    },
  },
};
</script>

<style scoped>
 .t-tags .widget_social ul li {
  /* width: 20% !important;
  padding-right: 10px !important;
  height: 35px !important; */
      width: 20% !important;
    /* padding-right: 10px !important; */
    height: 50px !important;
    border-bottom: 1px solid #ccc;
    margin-left: 40px;
}
 .t-tags .widget_social ul li span.count{
  color: black;
  padding-top: 5px;
  font-size: 10px;
}
.t-tags .widget_social li.facebook-fans a {
  background-color: #456FF1;
  /* padding-bottom: 10px !important; */
  float: left;
  padding: 5px;
}
@media only screen and (max-width: 479px) {
  .t-tags .widget_social ul li {
    width: 100% !important;
  }
}
</style>
