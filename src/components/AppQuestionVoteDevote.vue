<template>
  <span>
     <span class="single-question-vote-result">{{votes()}}</span>
        <ul class="single-question-vote">
          <li>
            <a href="javascript:void(0)" class="single-question-vote-down" title="Dislike" @click="vote($event, -1)" v-bind:class="{'disable-link devote': voteType < 0}">
              <i class="icon-thumbs-down"></i>
            </a>
          </li>
          <li>
            <a href="javascript:void(0)" class="single-question-vote-up" title="Like"  @click="vote($event, 1)"  v-bind:class="{'disable-link vote': voteType > 0}">
              <i class="icon-thumbs-up"></i>
            </a>
          </li>
        </ul>
  </span>
</template>

<script>
import sessionMixin from '../mixins/sessionMixin';

export default {
  name: 'AppQuestionVoteDevote',
  props: ['question'],
  data() {
    return {
      points: this.question.points || 0,
      questionId: this.question._id,
      voteType: '',
    };
  },
  mixins: [sessionMixin],
  methods: {
    vote(e, value) {
      if (!this.session.isLoggedIn) {
        this.$router.push({
          name: 'login',
          query: { redirect: `/question/${this.question.slug}` },
        });
        return false;
      }
      const postData = {};
      postData.voteType = value;
      postData.bonusType = 'QBonus';
      return this.$http
        .put(`${this.$BASE_URL}api/v1/vote/question/${this.questionId}`, postData)
        .then((response) => {
          this.points = response.data.data;
          this.checkVote();
        });
    },
    checkVote() {
      if (this.session.isLoggedIn) {
        this.$http
          .get(`${this.$BASE_URL}api/v1/vote/question/${this.questionId}`)
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
        } if (this.points < 0) {
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
   color: green;
}
a.devote {
  color: red;
}
.single-question-vote-up, .single-question-vote-down{
  font-size: 20px !important;
}
</style>
