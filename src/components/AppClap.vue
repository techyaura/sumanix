<template>
  <span v-if="question.points >= 0" class="question-favorite">
    <a href="javascript:void(0);" v-on:click="clap()" title="clap if you like it!">
      <img src="/img/icons/clap.svg" style="width: 30px;">
      <span itemprop="upvoteCount">{{votes()}}</span>
    </a>
  </span>
</template>

<script>
import sessionMixin from "../mixins/sessionMixin";

export default {
  name: "AppClap",
  props: ["question"],
  data() {
    return {
      points: this.question.points || 0,
      questionId: this.question._id,
    };
  },
  mixins: [sessionMixin],
  methods: {
    clap(e, value) {
      if (!this.session.isLoggedIn) {
        this.$router.push({
          name: "login",
          query: { redirect: `/question/${this.question.slug}` }
        });
        return false;
      }
      const postData = {};
    //   postData.voteType = 'CLAP';
      postData.bonusType = "QBonus";
      return this.$http
        .put(
          `${this.$BASE_URL}api/v1/vote/question/${this.questionId}`,
          postData
        )
        .then(response => {
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
    }
  }
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
.single-question-vote-up,
.single-question-vote-down {
  font-size: 20px !important;
}
</style>
