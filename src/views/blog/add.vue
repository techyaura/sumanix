<template>
  <div>
    <div class="col-md-12">
      <AppAddAndUpdateBlog/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AppAddAndUpdateBlog from '@/components/blog/addAndUpdate.vue';
import { spinnerMixin, breadcrumbMixin } from '../../mixins';

export default {
  name: 'AddBlog',
  components: {
    AppAddAndUpdateBlog,
  },
  mixins: [spinnerMixin, breadcrumbMixin],
  created() {
    document.title = this.title('Add blog');
  },
};
</script>
