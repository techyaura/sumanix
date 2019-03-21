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
    if (
      !this.session.isLoggedIn
      && !this.$route.params.slug
      && !this.$route.query.q
    ) {
      this.$store.dispatch('app/setHomePageStatus', {
        status: true,
      });
    }
    if (this.$route.query.q) {
      document.title = this.title(
        `Questions containing ${this.$route.query.q}`,
      );
    }
    if (this.$route.params.slug) {
      document.title = this.title(`${this.$route.params.slug} Questions`);
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch('app/setHomePageStatus', {
      status: false,
    });
    next();
  },
};
</script>
