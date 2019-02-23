<template>
  <div>
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
      class="page-content page-content-cutom"
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
              <a :href="'/@' + answer.user[0].username" :title="answer.user[0].username">
                <img
                  itemprop="image"
                  width="60"
                  height="60"
                  :src="'/img/profile/'+ answer.user[0].avatar"
                >
              </a>
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
                  <a href="javascript:void(0);">
                    <span itemprop="name">{{answer.user[0].username}}</span>
                  </a>
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
                  class="question-report"
                  v-on:click="updateAnswer(answer)"
                  v-if="session.isLoggedIn && answer.user[0]._id === session.user._id"
                >Edit</a>
                <a
                  class="question-type-main question-type-main-custom1 link-cursor"
                  v-on:click="removeAnswer(answer._id)"
                  v-if="session.isLoggedIn && answer.user[0]._id === session.user._id"
                >DELETE</a>
              </div>
              <div class="text custom-text">
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

export default {
  name: 'AppAnswerList',
  components: { Spinner, AppClapAnswer },
  mixins: [sessionMixin, spinnerMixin],
  props: ['question'],
  data() {
    return {
      answers: [],
      session: {},
      spinner: {},
    };
  },
  methods: {
    list() {
      this.$http
        .get(`${this.$BASE_URL}api/v1/question/${this.question._id}/answer`)
        .then((response) => {
          this.answers = response.data.data;
          this.spinner.status = false;
        });
    },
    removeAnswer(answerId) {
      this.spinner.status = true;
      this.$http
        .delete(`${this.$BASE_URL}api/v1/answer/${answerId}`)
        .then(() => {
          this.list();
        });
    },
    updateAnswer(answer) {
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

<style>
.link-cursor {
  cursor: pointer;
}
.question-type-main-custom1 {
  background-color: #cccc !important;
  color: black !important;
}
.custom-text p {
  font-weight: 600 !important;
}
.page-content-cutom p {
  font-size: 15px !important;
}
</style>
