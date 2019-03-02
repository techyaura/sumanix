<template>
  <div>
    <div class="row">
      <Spinner
        :status="spinner.status"
        :color="spinner.color"
        :size="spinner.size"
        :depth="spinner.depth"
        :rotation="spinner.rotation"
        :speed="spinner.speed"
      />
      <div class="col-sm-6 col-md-4" v-for="item in blogs" v-bind:data="item" v-bind:key="item._id">
        <div class="thumbnail">
          <!-- <img src="..." alt="..."> -->
          <div class="caption">
            <router-link :to="'/blog/' + item.slug">
              <h3>{{item.title}}</h3>
            </router-link>
            <p>
              <!-- <a href="#" class="btn btn-primary" role="button">Button</a>
              <a href="#" class="btn btn-default" role="button">Button</a>-->
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue';
import { filterMixin, spinnerMixin, breadcrumbMixin } from '../../mixins';

export default {
  name: 'BlogList',
  data() {
    return {
      blogs: [],
      count: 0,
      offset: 1,
      limit: 10,
    };
  },
  components: {
    Spinner,
  },
  mixins: [filterMixin, spinnerMixin, breadcrumbMixin],
  methods: {
    truncateStr(str, len, ending) {
      return this.truncate(str, len, ending);
    },
    getBlogs() {
      let url = `${this.$BASE_URL}api/v1/admin/blog/?limit=${
        this.limit
      }&offset=${this.offset}`;
      if (this.queryParams) {
        url = `${url}&q=${this.queryParams}`;
      }
      this.$http.get(url).then((response) => {
        const aggregate = response.data.data[0];
        if (Array.isArray(aggregate.count) && aggregate.count.length) {
          this.count = aggregate.count[0].count;
          if (aggregate.blogs.length) {
            this.blogs = aggregate.blogs;
          }
        }
        this.spinner.status = false;
      });
    },
  },
  created() {
    this.getBlogs();
  },
  computed: {
    timestamp() {
      return item => this.$moment(item.createdAt).fromNow();
    },
  },
};
</script>
