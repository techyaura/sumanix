<template>
  <div class="col-md-9 t-question-detail" itemscope
      itemtype="http://schema.org/QAPage">
    <Spinner
      :status="spinner.status"
      :color="spinner.color"
      :size="spinner.size"
      :depth="spinner.depth"
      :rotation="spinner.rotation"
      :speed="spinner.speed"
    />
    <article
      itemscope
      itemtype="http://schema.org/Question"
      class="question single-question question-type-normal"
      v-if="!spinner.status"
    >
      <h2 itemprop="name">
        <a href="javascript:void(0)">{{question.name}}</a>
      </h2>
      <!-- <a
        class="question-report link-cursor"
        v-on:click="removeQuestion(question._id)"
        v-if="session.isLoggedIn && question.uId === session.user._id"
      >DELETE</a>
      <div
        v-if="session.isLoggedIn && question.uId === session.user._id"
        class="question-type-main question-type-main-custom1"
      >
        <router-link :to="{name: 'questionUpdate', params: { slug: question.slug }}">EDIT</router-link>
      </div> -->
      <div class="question-inner">
        <div class="clearfix"></div>
        <div class="question-desc">
          <p itemprop="text" class="post-content" v-html="question.description"></p>
        </div>
        <span class="question-category">
          <span class="question-date">
            <i class="icon-time"></i>
            <time
              itemprop="dateCreated"
              :datetime="question.modifiedAt"
            >{{'asked ' + timestamp(question)}}</time>
          </span>
          <!-- <span class="tagAdjust">
            <i class="icon-suitcase"></i>
          </span> -->
          <router-link
            itemprop="keywords"
            class="anchor-space q-tags"
            v-bind:to="{name: 'tagQuestion', params: {slug: tag.slug}}"
            v-for="tag in question.tags"
            v-bind:data="tag"
            v-bind:key="tag.name"
          >{{tag.name}}</router-link>
        </span>
        <span class="question-view">
          <i class="icon-user"></i>
          {{question.views + ' views'}}
        </span>
        <span style="float:right">
          <AppClap :question="question"/>
        </span>

        <div class="clearfix"></div>
      </div>
    </article>
    <div>
      <AppAnswerList v-if="!spinner.status && isValid" v-bind:question="question"/>
    </div>

    <div>
      <AppAnswer v-if="!spinner.status && isValid" v-bind:question="question"/>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue';
import AppAnswerList from '@/components/AppAnswerList.vue';
import AppAnswer from '@/components/AppAnswer.vue';
import AppClap from '@/components/AppClap.vue';
import {
  spinnerMixin,
  sidebarMixin,
  sessionMixin,
  breadcrumbMixin,
} from '../mixins';

export default {
  name: 'QuestionDetail',
  props: ['slug'],
  components: {
    Spinner,
    AppAnswerList,
    AppAnswer,
    AppClap,
  },
  mixins: [spinnerMixin, sidebarMixin, sessionMixin, breadcrumbMixin],
  data() {
    return {
      isValid: false,
      question: {
        totalAnswers: '',
        views: '',
      },
      recommendations: [],
    };
  },
  methods: {
    updateView(slug) {
      this.$http
        .get(`${this.$BASE_URL}api/v1/question/${slug}/views`, {
          errorHandle: false,
        })
        .then((response) => {
          this.views = response.data.data;
        });
    },
    removeQuestion(questionId) {
      this.spinner.status = true;
      this.$http
        .delete(`${this.$BASE_URL}api/v1/question/${questionId}`)
        .then(() => {
          this.$router.push('/profile');
        });
    },
    questionDetail(slug) {
      this.$http
        .get(`${this.$BASE_URL}api/v1/question/${slug}`, { errorHandle: false })
        .then((response) => {
          this.isValid = true;
          this.question = response.data.data;
          document.title = this.title(`${this.question.name}`);
          this.spinner.status = false;
        })
        .catch(() => {
          this.$router.push('/404');
        });
    },
    getRecommendations(slug) {
      this.$http
        .get(`${this.$BASE_URL}api/v1/question/${slug}/recommendations`)
        .then((response) => {
          this.recommendations = response.data.data;
          this.spinner.status = false;
        });
    },
  },
  created() {
    if (this.$route.params.slug) {
      const { slug } = this.$route.params;
      this.updateView(slug);
      this.questionDetail(slug);
      this.reRenderSidebar(slug);
      // this.getRecommendations(slug);
    }
  },
  computed: {
    timestamp() {
      return item => this.$moment(item.createdAt).fromNow();
    },
  },
};
</script>

<style scoped>
.t-question-detail .question h2 {
  margin-bottom: 0 !important;
}
.t-question-detail .question-desc {
  padding-bottom: 0px !important;
}
@media only screen and (max-width: 479px) {
  .t-question-detail .single-question.question h2 {
    margin-top: 0px !important;
  }
}
</style>
