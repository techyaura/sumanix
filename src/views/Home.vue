<template>
  <AppQuestion/>
</template>

<script>
import { sessionMixin, breadcrumbMixin } from '../mixins';
import AppQuestion from '@/components/AppQuestion.vue';

export default {
  name: 'home',
  components: {
    AppQuestion,
  },
  mixins: [sessionMixin, breadcrumbMixin],
  created() {
    document.title = this.title();
    if (!this.session.isLoggedIn && !this.$route.params.slug) {
      this.$vueEventBus.$emit('isHomePage', true);
    }
    if (this.$route.query.q) {
      document.title = this.title(`Questions containing ${this.$route.query.q}`);
    }
    if (this.$route.params.slug) {
      document.title = this.title(`${this.$route.params.slug} Questions`);
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$vueEventBus.$emit('isHomePage', false);
    next();
  },
};
</script>
