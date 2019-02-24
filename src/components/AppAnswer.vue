<template>
  <div id="respond" ref="answerEnd" class="comment-respond page-content clearfix t-answer">
    <!-- <div class="boxedtitle page-title">
      <h2>Leave a Answer</h2>
    </div>-->
    <form @submit.prevent="onLinkClicked" id="commentform" class="comment-form">
      <div id="respond-textarea">
        <p>
          <label class="required" for="comment">
            {{(updatedAnswer.name)? 'Update Answer': 'Your Answer'}}
            <span>*</span>
          </label>
          <vue-editor v-model="content" :editorToolbar="customToolbar"></vue-editor>
          <!-- <textarea
            id="comment"
            name="comment"
            aria-required="true"
            cols="58"
            rows="8"
            v-model="answer"
          ></textarea>-->
        </p>
      </div>
      <p class="form-submit" v-if="!this.updatedAnswer.answerId">
        <input
          v-bind:disabled="isPosting"
          name="submit"
          type="submit"
          id="submit"
          :value="isPosting ? 'Posting...': 'Post your answer'"
          class="button small color"
        >
      </p>
      <p class="form-submit" v-if="this.updatedAnswer.answerId">
        <input
          v-bind:disabled="isPosting"
          name="submit"
          type="submit"
          id="submit"
          :value="isPosting ? 'Updating...': 'Update your answer'"
          class="button small color"
        >
      </p>
    </form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import toast from '../services/toast';
import sessionMixin from '../mixins/sessionMixin';

export default {
  name: 'AppAnswer',
  components: {
    VueEditor,
  },
  mixins: [sessionMixin],
  props: ['question'],
  data() {
    return {
      updatedAnswer: {
        name: '',
        answerId: '',
      },
      content: '',
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        ['image', 'code-block'],
      ],
      isPosting: false,
    };
  },
  created() {
    this.$vueEventBus.$on('updateAnswer', (value) => {
      // var container = this.$refs.answerEnd;
      this.updatedAnswer = value;
      this.content = this.updatedAnswer.name;
      // window.scrollTo(0,container.scrollHeight);
      // container.scrollTop = container.scrollHeight;
      // console.log(value);
    });
  },
  methods: {
    onLinkClicked() {
      if (!this.session.isLoggedIn) {
        this.$router.push({
          name: 'login',
          query: { redirect: `/question/${this.$route.params.slug}` },
        });
      } else {
        this.handleSubmit();
      }
    },
    handleSubmit() {
      if (!this.content.trim()) {
        return false;
      }
      this.isPosting = true;
      if (this.updatedAnswer.answerId && this.updatedAnswer.name) {
        const postData = {
          name: this.content,
          aId: this.updatedAnswer.answerId,
        };
        return this.$http
          .put(
            `${this.$BASE_URL}api/v1/question/${this.question._id}/answer`,
            postData,
          )
          .then((response) => {
            const { message } = response.data;
            this.content = '';
            this.isPosting = false;
            this.updatedAnswer = {};
            toast.success(message);
            this.$vueEventBus.$emit('isReRenderAnswerList', true);
          });
      }
      const postData = {
        name: this.content,
      };
      return this.$http
        .post(
          `${this.$BASE_URL}api/v1/question/${this.question._id}/answer`,
          postData,
        )
        .then((response) => {
          const { message } = response.data;
          this.content = '';
          this.isPosting = false;
          toast.success(message);
          this.$vueEventBus.$emit('isReRenderAnswerList', true);
        });
    },
  },
};
</script>

<style scoped>
  .t-answer input.button{
    background-color: #2f3239 !important;
  }
</style>
