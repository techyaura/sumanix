<template>
  <aside class="col-md-3 sidebar t-sidebar">
    <div class="widget widget_tag_cloud">
      <h3 class="widget_title">Tags</h3>
      <Spinner
        :status="spinner.status"
        :color="spinner.color"
        :size="spinner.size"
        :depth="spinner.depth"
        :rotation="spinner.rotation"
        :speed="spinner.speed"
      />
      <router-link
        v-for="item in tags"
        v-bind:data="item"
        v-bind:key="item.tag"
        :to="{name: 'tagQuestion', params: {slug: item.slug}}"
      >{{item.slug}}</router-link>
      <router-link class="more-tag-link" v-if ="tags.length === 10" :to="{name: 'tag'}">More ...</router-link>
    </div>

    <div class="widget">
      <h3 class="widget_title">Popular Questions</h3>
      <Spinner
        :status="spinner.status"
        :color="spinner.color"
        :size="spinner.size"
        :depth="spinner.depth"
        :rotation="spinner.rotation"
        :speed="spinner.speed"
      />
      <ul class="related-posts">
        <li
          class="related-item"
          v-for="item in popularQuestions"
          v-bind:data="item"
          v-bind:key="item._id"
        >
          <h3>
            <router-link :to="{name: 'questionDetail', params: { slug: item.slug }}">{{item.name}}</router-link>
          </h3>
          <!-- <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> -->
          <div class="clear"></div>
          <!-- <span>Feb 22, 2014</span> -->
        </li>
      </ul>
    </div>
  </aside>
  <!-- End sidebar -->
</template>

<script>
import Spinner from '@/components/Spinner.vue';
import spinnerMixin from '../mixins/spinnerMixin';

export default {
  name: 'AppSidebar',
  components: {
    Spinner,
  },
  mixins: [spinnerMixin],
  data() {
    return {
      tags: [],
      popularQuestions: [],
    };
  },
  mounted() {
    this.init();
    this.listenForUpdate();
  },
  methods: {
    listenForUpdate() {
      this.$vueEventBus.$on('reRenderSidebar', () => {
        this.init();
      });
    },
    init() {
      this.getTags();
      this.mostViewed();
    },
    getTags() {
      this.$http.get(`${this.$BASE_URL}api/v1/tag/question`, { errorHandle: false }).then((response) => {
        this.tags = response.data.data;
        this.spinner.status = false;
      });
    },
    mostViewed() {
      this.$http
        .get(`${this.$BASE_URL}api/v1/question/mostViewed`, { errorHandle: false })
        .then((response) => {
          this.popularQuestions = response.data.data;
          this.spinner.status = false;
        });
    },
  },
  filters: {
    capitalize(value) {
      let input = value;
      if (!input) return '';
      input = input.toString();
      return input.charAt(0).toUpperCase() + input.slice(1);
    },
  },
};
</script>
<style>
/* .t-sidebar .more-tag-link{
  background-color: #ccc !important;
} */
.t-sidebar .widget_tag_cloud a{
  color: #38CBCB !important;
  background-color: white;
}
.t-sidebar ul.related-posts li h3 a{
   color: #6e727b !important;
}
</style>
