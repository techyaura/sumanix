<template>
  <div>
    <div class="col-md-9">
      <AppAskQuestion/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AppAskQuestion from '@/components/AppAskQuestion.vue';
import { breadcrumbMixin } from '../mixins';

export default {
  name: 'AskQuestion',
  components: {
    AppAskQuestion,
  },
  mixins: [breadcrumbMixin],
  created() {
    document.title = this.title('Ask a Question');
  },
};
</script>
