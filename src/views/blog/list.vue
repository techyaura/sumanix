<template>
  <div class="row">
    <div class="col-md-12">
      <Spinner
        :status="spinner.status"
        :color="spinner.color"
        :size="spinner.size"
        :depth="spinner.depth"
        :rotation="spinner.rotation"
        :speed="spinner.speed"
      />
      <article
      class="post blog_2 clearfix"
      v-for="item in blogs"
      v-bind:data="item"
      v-bind:key="item._id"
      >
        <div class="post-inner">
          <h2 class="post-title">
            <span class="post-type">
              <i class="icon-picture"></i>
            </span>
            <!-- <a href="single_post.html">This is a Standard Post.</a> -->
            <router-link :to="'/blog/' + item.slug">{{item.title}}</router-link>
          </h2>
          <div class="post-img">
            <a href="single_post.html">
              <!-- <img src="/images/demo/posts/loneliness-1440x900.jpg" alt> -->
            </a>
          </div>
          <div class="post-meta">
            <!-- <span class="meta-author">
              <i class="icon-user"></i>
              <a href="#">Administrator</a>
            </span> -->
            <span class="meta-date">
              <i class="icon-time"></i>
              {{timestamp(item)}}
            </span>
            <span class="meta-categories">
              <i class="icon-suitcase"></i>
              <a
                href="javascript:void()"
                v-for="tag in item.tags"
                v-bind:data="tag"
                v-bind:key="tag._id"
              >{{tag.name}}</a>
            </span>
            <!-- <span class="meta-comment">
              <i class="icon-comments-alt"></i>
              <a href="#">15 comments</a>
            </span> -->
          </div>
          <div class="post-content" v-html="truncateStr(item.description, 600, 'more...')">

          </div>
          <!-- End post-content -->
        </div>
        <!-- End post-inner -->
      </article>
      <!-- End article.post -->
      <!-- <div class="pagination">
        <a href="#" class="prev-button">
          <i class="icon-angle-left"></i>
        </a>
        <span class="current">1</span>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <span>...</span>
        <a href="#">11</a>
        <a href="#">12</a>
        <a href="#">13</a>
        <a href="#" class="next-button">
          <i class="icon-angle-right"></i>
        </a>
      </div> -->
      <!-- End pagination -->
    </div>
    <!-- End main -->
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
      let url = `${this.$BASE_URL}api/v1/admin/blog/?limit=${this.limit}&offset=${
        this.offset
      }`;
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
