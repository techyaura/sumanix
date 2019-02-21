<template>
  <div class="page-content">
    <div class="boxedtitle page-title"><h2>My Questions ({{count}})</h2></div>
    <Spinner
      :status="spinner.status"
      :color="spinner.color"
      :size="spinner.size"
      :depth="spinner.depth"
      :rotation="spinner.rotation"
      :speed="spinner.speed"
    />
    <div class="user-questions">
      <article
        class="question user-question"
        v-for="question in questions"
        v-bind:data="question"
        v-bind:key="question._id"
      >
        <h3>
          <router-link
            :to="{name: 'questionDetail', params: { slug: question.slug }}"
          >{{question.name}}</router-link>
        </h3>
        <!-- <div class="question-report"> -->
        <a
          class="question-report link-cursor"
          v-if="session.isLoggedIn && session.user && session.user._id === question.uId"
          v-on:click="removeQuestion(question._id)"
        >DELETE</a>

        <!-- </div> -->
        <div class="question-type-main question-type-main-custom">
          <router-link
            v-if="session.isLoggedIn && session.user && session.user._id === question.uId"
            :to="{name: 'questionUpdate', params: { slug: question.slug }}"
          >EDIT</router-link>
        </div>

        <div class="question-content">
          <div class="question-bottom">
            <span class="question-category">
              <span class="tagAdjust">
                <i class="icon-suitcase"></i>
              </span>
              <router-link
                class="anchor-space q-tags"
                v-for="tag in question.tags"
                v-bind:data="tag"
                v-bind:key="tag.name"
                v-bind:to="{name: 'tagQuestion', params: {slug: tag.slug}}"
              >{{tag.name}}</router-link>
            </span>
            <span class="question-date">
              <i class="icon-time"></i>
              {{'asked ' + timestamp(question)}}
            </span>
            <span class="question-view">
              <i class="icon-user"></i>
              {{question.views + ' views'}}
            </span>
          </div>
        </div>
      </article>

    </div>
    <div>
      <v-pagination
        v-if = "count > this.limit"
        v-model="currentPage"
        :page-count="pageCount"
        :classes="bootstrapPaginationClasses"
        :labels="customLabels"
        @change="onChange"></v-pagination>
    </div>
    <br>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue';
import spinnerMixin from '../mixins/spinnerMixin';
import sessionMixin from '../mixins/sessionMixin';
import sidebarMixin from '../mixins/sidebarMixin';
import vPagination from '@/components/vue-plain-pagination.vue';

export default {
  name: 'AppMyQuestion',
  components: {
    Spinner,
    vPagination,
  },
  mixins: [spinnerMixin, sessionMixin, sidebarMixin],
  data() {
    return {
      questions: [],
      currentPage: 1,
      limit: 10,
      count: 0,
      pageCount: 0,
      bootstrapPaginationClasses: { // http://getbootstrap.com/docs/4.1/components/pagination/
        ul: 'pagination',
        li: 'page-item',
        liActive: 'active',
        liDisable: 'disabled',
        button: 'page-link',
      },
      customLabels: {
        first: 'First',
        prev: 'Previous',
        next: 'Next',
        last: 'Last',
      },
    };
  },
  methods: {
    onChange() {
      this.list();
    },
    list() {
      this.$http.get(`${this.$BASE_URL}api/v1/question/user?offset=${this.currentPage}&limit=${this.limit}`).then((response) => {
        this.questions = response.data.data;
        this.count = response.data.count;
        this.pageCount = Math.ceil(this.count / this.limit);
        this.spinner.status = false;
      });
    },
    removeQuestion(questionId) {
      this.spinner.status = true;
      this.$http
        .delete(`${this.$BASE_URL}api/v1/question/${questionId}`)
        .then(() => {
          this.list();
          this.reRenderSidebar();
        });
    },
  },
  created() {
    this.list();
  },
  computed: {
    timestamp() {
      return item => this.$moment(item.createdAt).fromNow();
    },
  },
};
</script>
<style>
.link-cursor {
  cursor: pointer;
}
.question-type-main-custom {
  margin-right: 70px !important;
  background-color: #cccc !important;
}
.user-question h3 a {
  color: black !important;
  font-size: 15px !important;
  font-weight: 500 !important;
}
</style>
