<template>
  <span v-if="question.points >= 0" class="question-favorite t-clap-question">
    <a href="javascript:void(0);" v-on:click="clap()" title="appreciate, if you like it!">
      <!-- <img src="/img/icons/clap.svg" style="width: 30px;"> -->
      
      <span>
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-heart fa-w-16"><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" class=""></path></svg>
      </span>
      <span itemprop="upvoteCount">{{votes()}}</span>
    </a>
  </span>
</template>

<script>
import sessionMixin from '../mixins/sessionMixin';

export default {
  name: 'AppClap',
  props: ['question'],
  data() {
    return {
      points: this.question.points || 0,
      questionId: this.question._id,
    };
  },
  mixins: [sessionMixin],
  methods: {
    clap() {
      if (!this.session.isLoggedIn) {
        this.$router.push({
          name: 'login',
          query: { redirect: `/question/${this.question.slug}` },
        });
        return false;
      }
      const postData = {};
      //   postData.voteType = 'CLAP';
      postData.bonusType = 'QBonus';
      return this.$http
        .put(
          `${this.$BASE_URL}api/v1/vote/question/${this.questionId}`,
          postData,
        )
        .then((response) => {
          this.points = response.data.data;
          // this.checkVote();
        });
    },
    // checkVote() {
    //   if (this.session.isLoggedIn) {
    //     this.$http
    //       .get(`${this.$BASE_URL}api/v1/question/${this.questionId}`)
    //       .then(response => {
    //           const { points } = response.data.data;
    //       });
    //   }
    // }
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
        return 0;
      };
    },
  },
};
</script>

<style scoped>
.t-clap-question a.disable-link {
  pointer-events: none;
  cursor: default;
}
.t-clap-question a.vote {
  color: green;
}
.t-clap-question a.devote {
  color: red;
}
.t-clap-question .single-question-vote-up,
.single-question-vote-down {
  font-size: 20px !important;
}
</style>
