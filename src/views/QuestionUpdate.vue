<template>
    <div>
        <div class="col-md-9">
         <Spinner :status="spinner.status" :color="spinner.color" :size="spinner.size" :depth="spinner.depth" :rotation="spinner.rotation" :speed="spinner.speed"/>
        <AppAskQuestion v-if="!spinner.status" v-bind:questionData="question"/>
    </div>
    </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue';
import AppAskQuestion from '@/components/AppAskQuestion.vue';
import spinnerMixin from '../mixins/spinnerMixin';

export default {
  name: 'questionUpdate',
  components: {
    AppAskQuestion,
    Spinner,
  },
  mixins: [spinnerMixin],
  data() {
    return {
      question: {},
    };
  },
  methods: {
    questionDetail(slug) {
      this.$http
        .get(`${this.$BASE_URL}api/v1/question/${slug}`, {
          errorHandle: false,
        })
        .then((response) => {
          this.question = response.data.data;
          this.spinner.status = false;
        })
        .catch(() => {
          this.$router.push('/404');
        });
    },
  },
  mounted() {
    if (this.$route.params.slug) {
      const { slug } = this.$route.params;
      this.questionDetail(slug);
    }
  },
};
</script>

<style>

</style>
