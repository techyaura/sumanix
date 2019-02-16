<template>
  <span>
    <div class="comment-vote">
      <ul class="question-vote">
        <li>
          <a
            href="javascript:void(0)"
            class="question-vote-up"
            title="Like"
            @click="vote($event, 1)"
            v-bind:class="{'disable-link vote': voteType > 0}"
          >
            <!-- <i class="icon-thumbs-down"></i> -->
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            class="question-vote-down"
            title="DisLike"
            @click="vote($event, -1)"
            v-bind:class="{'disable-link devote': voteType < 0}"
          >
            <!-- <i class="icon-thumbs-up"></i> -->
          </a>
        </li>
      </ul>
    </div>
    <span class="question-vote-result">{{votes()}}</span>
  </span>
</template>

<script>
import sessionMixin from '../mixins/sessionMixin';

export default {
  name: 'AppAnswerVoteDevote',
  props: ['answer'],
  data() {
    return {
      points: this.answer.points || 0,
      questionId: this.answer.qId,
      answerId: this.answer._id,
      voteType: '',
    };
  },
  mixins: [sessionMixin],
  methods: {
    vote(e, value) {
      if (!this.session.isLoggedIn) {
        this.$router.push({
          name: 'login',
          // query: { redirect: `/question/${this.question.slug}` },
        });
        return false;
      }
      const postData = {};
      postData.voteType = value;
      postData.bonusType = 'ABonus';
      postData.qId = this.questionId;
      return this.$http
        .put(
          `${this.$BASE_URL}api/v1/vote/answer/${this.answerId}`,
          postData,
        )
        .then((response) => {
          this.points = response.data.data;
          this.checkVote();
        });
    },
    checkVote() {
      if (this.session.isLoggedIn) {
        this.$http
          .get(`${this.$BASE_URL}api/v1/vote/answer/${this.answerId}`)
          .then((response) => {
            this.voteType = response.data.data;
          });
      }
    },
  },
  computed: {
    votes() {
      return () => {
        if (this.points > 0) {
          return `+ ${this.points}`;
        }
        if (this.points < 0) {
          return `${this.points}`;
        }
        return '';
      };
    },
  },
  created() {
    this.checkVote();
  },
};
</script>

<style scoped>
a.disable-link {
  pointer-events: none;
  cursor: default;
}
a.vote {
  color: green !important;
}
a.devote {
  color: red !important;
}
.question-vote-up, .comment-vote-up, .question-vote-down, .comment-vote-down{
  height: 20px !important;
}
</style>
