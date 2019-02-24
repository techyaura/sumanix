<template>
  <div class="t-question">
    <Spinner
      :status="spinner.status"
      :color="spinner.color"
      :size="spinner.size"
      :depth="spinner.depth"
      :rotation="spinner.rotation"
      :speed="spinner.speed"
    />
    <div
      id="commentlist"
      class="page-content"
      v-if="!spinner.status && answers.length"
    >
      <div class="boxedtitle page-title">
        <h2>
          Answers (
          <span class="color">{{answers.length}}</span> )
        </h2>
      </div>
      <ol class="commentlist clearfix">
        <li
          class="comment"
          v-for="answer in answers"
          v-bind:data="answer"
          v-bind:key="answer._id"
          itemprop="suggestedAnswer"
          itemscope
          itemtype="http://schema.org/Answer"
        >
          <div class="comment-body comment-body-answered clearfix">
            <div class="avatar" itemprop="author" itemscope itemtype="http://schema.org/Person">
              <router-link :to="'/@' + answer.user[0].username" :title="answer.user[0].username">
                <img
                  itemprop="image"
                  width="60"
                  height="60"
                  :src="'/img/profile/'+ answer.user[0].avatar"
                >
              </router-link>
            </div>
            <AppClapAnswer v-if="!spinner.status" v-bind:answer="answer"/>
            <div class="comment-text">
              <div class="author clearfix">
                <div
                  class="comment-author"
                  itemprop="author"
                  itemscope
                  itemtype="http://schema.org/Person"
                >
                  <router-link :to="'/@' + answer.user[0].username">
                    <span itemprop="name">{{answer.user[0].username}}</span>
                  </router-link>
                </div>
                <div class="comment-meta">
                  <div class="date">
                    <i class="icon-time"></i>
                    <time
                      itemprop="dateCreated"
                      :datetime="answer.createdAt"
                    >{{$moment(answer.createdAt).fromNow()}}</time>
                  </div>
                </div>
                <a
                  v-if="session.isLoggedIn && answer.user[0]._id === session.user._id"
                  class="question-type-main link-cursor"
                  @click="showModal(answer)"
                >DELETE</a>
                <a
                  style="cursor:pointer"
                  class="question-report"
                  v-on:click="updateAnswer(answer)"
                  v-if="session.isLoggedIn && answer.user[0]._id === session.user._id"
                >Edit</a>
                <AppModal v-show="isModalVisible" @close="closeModal" @action="trigger">
                  <span slot="body">Are you sure to delete this answer?</span>
                </AppModal>
              </div>
              <div class="text">
                <p itemprop="text" class="post-content" v-html="answer.name"></p>
              </div>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import AppClapAnswer from '@/components/AppClapAnswer.vue';
import Spinner from '@/components/Spinner.vue';
import sessionMixin from '../mixins/sessionMixin';
import spinnerMixin from '../mixins/spinnerMixin';
import AppModal from '@/components/AppModal.vue';

export default {
  name: 'AppAnswerList',
  components: { Spinner, AppClapAnswer, AppModal },
  mixins: [sessionMixin, spinnerMixin],
  props: ['question'],
  data() {
    return {
      isModalVisible: false,
      resourceId: '',
      answers: [],
      session: {},
      spinner: {},
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
      this.removeAnswer();
    },
    list() {
      this.$http
        .get(`${this.$BASE_URL}api/v1/question/${this.question._id}/answer`)
        .then((response) => {
          this.answers = response.data.data;
          this.spinner.status = false;
        });
    },
    removeAnswer() {
      this.spinner.status = true;
      this.$http
        .delete(`${this.$BASE_URL}api/v1/answer/${this.resourceId}`)
        .then(() => {
          this.list();
        });
    },
    updateAnswer(answer) {
      window.scrollTo(0, document.body.scrollHeight);
      this.$vueEventBus.$emit('updateAnswer', {
        answerId: answer._id,
        name: answer.name,
      });
    },
  },
  created() {
    this.list();
    this.$vueEventBus.$on('isReRenderAnswerList', (value) => {
      if (value) {
        this.list();
      }
    });
  },
};
</script>

<style scoped>
.t-question .question-type-main {
  background-color: #cccc !important;
  color: black !important;
}
.t-question .text p {
  font-weight: 600 !important;
}
.t-question .page-content p {
  font-size: 15px !important;
}
</style>
