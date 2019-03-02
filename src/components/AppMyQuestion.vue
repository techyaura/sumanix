<template>
  <div class="page-content t-myquestion">
    <div class="boxedtitle page-title">
      <h2>Total Questions ({{count}})</h2>
    </div>
    <Spinner
      :status="spinner.status"
      :color="spinner.color"
      :size="spinner.size"
      :depth="spinner.depth"
      :rotation="spinner.rotation"
      :speed="spinner.speed"
    />
    <div class="user-questions">
      <AppModal v-show="isModalVisible" @close="closeModal" @action="trigger">
          <span slot="body">Are you sure to delete this question?</span>
        </AppModal>
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
         @click="showModal(question)"
        >DELETE</a>
        <!-- </div> -->
        <div
          class="question-type-main"
          v-if="session.isLoggedIn && session.user && session.user._id === question.uId"
        >
          <router-link :to="{name: 'questionUpdate', params: { slug: question.slug }}">EDIT</router-link>
        </div>
        <div class="question-content">
          <div class="question-bottom">
            <span class="question-category">
              <!-- <span class="tagAdjust">
                <i class="icon-suitcase"></i>
              </span> -->
              <router-link
                class="anchor-space"
                v-for="tag in question.tags"
                v-bind:data="tag"
                v-bind:key="tag.name"
                v-bind:to="{name: 'tagQuestion', params: {slug: tag.slug}}"
              ><span class="label label-primary">{{tag.slug || tag.name}}</span></router-link>
            </span>
            <span class="question-view">
              <i class="icon-user"></i>
              {{question.views + ' views'}}
            </span>
            <span class="question-date" style="padding-left: 10px;">
              <i class="icon-time"></i>
              {{'asked ' + timestamp(question)}}
            </span>
          </div>
        </div>
      </article>
    </div>
    <div>
      <v-pagination
        v-if="count > this.limit"
        v-model="currentPage"
        :page-count="pageCount"
        :classes="bootstrapPaginationClasses"
        :labels="customLabels"
        @change="onChange"
      ></v-pagination>
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
import AppModal from '@/components/AppModal.vue';

export default {
  name: 'AppMyQuestion',
  components: {
    Spinner,
    vPagination,
    AppModal,
  },
  mixins: [spinnerMixin, sessionMixin, sidebarMixin],
  data() {
    return {
      resourceId: '',
      isModalVisible: false,
      username: this.$route.params.username,
      questions: [],
      currentPage: 1,
      limit: 10,
      count: 0,
      pageCount: 0,
      bootstrapPaginationClasses: {
        // http://getbootstrap.com/docs/4.1/components/pagination/
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
    showModal(resource) {
      this.resourceId = resource._id;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    trigger() {
      this.isModalVisible = false;
      this.removeQuestion();
    },
    onChange() {
      this.list();
    },
    list() {
      this.$http
        .get(
          `${this.$BASE_URL}api/v1/question/user/${this.username}?offset=${
            this.currentPage
          }&limit=${this.limit}`,
        )
        .then((response) => {
          this.questions = response.data.data;
          this.count = response.data.count;
          this.pageCount = Math.ceil(this.count / this.limit);
          this.spinner.status = false;
        });
    },
    removeQuestion() {
      this.spinner.status = true;
      this.$http
        .delete(`${this.$BASE_URL}api/v1/question/${this.resourceId}`)
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
<style scoped>
.t-myquestion .question-type-main {
  margin-right: 70px !important;
  background-color: #cccc !important;
}
.t-myquestion .question-type-main a{
  color: #2f3239 !important;
}
.t-myquestion .question-type-main:hover{
  background-color: #456FF1 !important;
}
.t-myquestion h3 a {
  color: #6e727b !important;
}
.t-myquestion h3 a:hover {
  color: #456FF1 !important;
}
.t-myquestion .question {
  padding: 10px 20px 10px 20px !important;
}
.t-myquestion .boxedtitle.page-title h2 {
  margin-bottom:0px !important;
}
.t-myquestion h3 {
  font-size: 15px !important;
}
@media only screen and (max-width: 479px) {
  .t-myquestion .user-question h3 {
    margin-top: 0px !important;
    padding-top: 0px !important;
  }
}
</style>
