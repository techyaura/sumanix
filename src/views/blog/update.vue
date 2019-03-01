<template>
  <div>
    <div class="col-md-12">
      <AppAddAndUpdateBlog v-if="!spinner.status" v-bind:questionData="blog"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AppAddAndUpdateBlog from '@/components/blog/addAndUpdate.vue';
import { spinnerMixin, breadcrumbMixin } from '../../mixins';

export default {
  name: 'UpdateBlog',
  components: {
    AppAddAndUpdateBlog,
  },
  mixins: [spinnerMixin, breadcrumbMixin],
  data() {
    return {
      blog: {},
    };
  },
  methods: {
    getBlogById(blogId) {
      const url = `${this.$BASE_URL}api/v1/admin/blog/${blogId}`;
      this.$http.get(url)
        .then((response) => {
          this.blog = response.data.data;
          this.spinner.status = false;
        });
    },
  },
  created() {
    this.getBlogById(this.$route.params.slug);
  },
};
</script>
