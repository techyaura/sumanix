<template>
  <div class="page-content ask-question t-askquestion">
    <div class="boxedtitle page-title">
      <h2>Add Blog</h2>
    </div>
    <p></p>
    <div class="form-style form-style-3" id="question-submit">
      <form @submit.prevent="handleSubmit">
        <Notifiation v-if="err" :err="err"/>
        <div class="form-inputs clearfix">
          <!-- <p>
            <input
              class="question-full-width no-background"
              type="checkbox"
              id="question-title"
              v-model="question.isAnonymous"
            >
            <span
              class="form-description label-description"
            >Do you want to ask question anonymously?</span>
          </p> -->
          <div class="auto">
            <div class="autocomplete-custom">
              <input
                ref="myInput"
                class="question-full-width no-background"
                type="text"
                id="myInput"
                v-model="question.title"
                autocomplete="off"
                placeholder="Title"
                maxlength="150"
              >
            </div>
            <br>
            <span class="form-description label-description">
              <span class="label-required">*</span>
              choose an appropriate title for the blog.
            </span>
          </div>
          <br>
        </div>
        <div id="form-textarea">
          <p>
            <vue-editor v-model="content"></vue-editor>
            <span
              class="form-description label-description"
            >Type the description thoroughly in detail (Optional) .</span>
          </p>
        </div>
        <p>
          <vue-tags-input
            class="tags-input"
            v-model="tag"
            :tags="tags"
            :autocomplete-items="autocompleteItems"
            :add-only-from-autocomplete="true"
            @tags-changed="update"
          />
          <span class="form-description label-description">
            <span class="label-required">*</span>Please choose suitable Keywords Ex :
            <span class="color">angular , react, docker</span> .
          </span>
        </p>
        <p v-if="!isUpdate" class="form-submit">
          <input
            :disabled="isSubmit"
            type="submit"
            id="publish-question"
            :value="!isSubmit ? 'Publish Your Blog' : 'Publishing ...'"
            class="button color small submit"
          >
        </p>
        <p v-if="isUpdate" class="form-submit">
          <input
            :disabled="isSubmit"
            type="submit"
            id="publish-question"
            :value="!isSubmit ? 'Update Your Blog' : 'Updating ...'"
            class="button color small submit"
          >
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
import { VueEditor } from 'vue2-editor';
import toast from '../../services/toast';
import { sidebarMixin, sessionMixin } from '../../mixins';
import Notifiation from '@/components/Message.vue';

export default {
  name: 'AppAddAndUpdateBlog',
  components: {
    VueTagsInput,
    VueEditor,
    Notifiation,
  },
  mixins: [sidebarMixin, sessionMixin],
  props: ['questionData'],
  data() {
    return {
      err: '',
      isUpdate: !!this.questionData,
      isSubmit: false,
      content: '',
      // customToolbar: [
      //   ['bold', 'italic', 'underline'],
      //   [{ header: 1 }, { header: 2 }], // custom button values
      //   [{ list: 'ordered' }, { list: 'bullet' }],
      //   [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      //   [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      //   ['image', 'code-block'],
      // ],
      // suggestionsQuestions: [],
      tag: '',
      tags: [],
      autocompleteItems: [],
      debounce: null,
      question: {
        title: '',
        description: '',
      },
    };
  },
  watch: {
    tag: 'initItems',
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    update(newTags) {
      this.autocompleteItems = [];
      this.tags = newTags;
    },
    initItems() {
      if (this.tag.length < 2) return;
      const url = `${this.$BASE_URL}api/v1/tag?q=${this.tag}`;
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.$http.get(url).then((response) => {
          this.autocompleteItems = response.data.data.map(a => ({
            text: a.tag,
            _id: a._id,
          }));
        });
      }, 600);
    },
    handleSubmit() {
      const tags = this.tags.map(tag => ({
        name: tag.text,
        _id: tag._id,
      }));
      const postData = {
        tags,
        title: this.question.title,
        description: this.content,
      };
      this.err = '';
      this.isSubmit = true;
      if (this.questionData) {
        this.$http
          .put(
            `${this.$BASE_URL}api/v1/admin/blog/${this.questionData._id}`,
            postData,
            {
              errorHandle: false,
            },
          )
          .then((response) => {
            const { message } = response.data;
            this.isSubmit = false;
            this.$router.push('/blog');
            toast.success(message);
          })
          .catch((err) => {
            this.isSubmit = false;
            this.err = err;
            this.scrollToTop();
          });
      } else {
        this.$http
          .post(`${this.$BASE_URL}api/v1/admin/blog`, postData, {
            errorHandle: false,
          })
          .then((response) => {
            const { message } = response.data;
            this.isSubmit = false;
            this.reRenderSidebar();
            this.$router.push('/blog');
            toast.success(message);
          })
          .catch((err) => {
            this.isSubmit = false;
            this.err = err;
            this.scrollToTop();
          });
      }
    },
  },
  created() {
    this.question.title = this.questionData ? this.questionData.title : '';
    this.content = this.questionData ? this.questionData.description : '';
    if (
      this.questionData
      && this.questionData.tags
      && this.questionData.tags.length
    ) {
      this.tags = this.questionData.tags.map(tag => ({
        text: tag.name,
        _id: tag._id,
      }));
    }
  },
};
</script>
<style>
.t-askquestion div.ti-autocomplete {
  position: relative !important;
}
.t-askquestion span.label-description {
  margin: 0px !important;
  font-size: 13px !important;
}
.t-askquestion .vue-tags-input {
  max-width: 100% !important;
}
.t-askquestion .question-full-width {
  width: 100% !important;
  background: none !important;
}
.t-askquestion .vue-tags-input input[type="text"] {
  background: none !important;
}
.t-askquestion .post-content {
  color: black !important;
}
.t-askquestion .ti-tags li.ti-tag {
  color: #39739d;
  background-color: #e1ecf4;
  border-color: #e1ecf4;
  margin: 0 2px 0;
  padding: 0 5px;
}
.t-askquestion .ti-selected-item {
  background-color: #8a8a8a !important;
}
.t-askquestion .label-required {
  color: red !important;
}
.t-askquestion #question-submit .form-inputs p {
  margin-bottom: 15px !important;
}
.t-askquestion #question-submit .submit {
  background-color: #2f3239 !important;
}

/*the container must be positioned relative:*/
.t-askquestion .autocomplete-custom {
  position: relative !important;
  display: inline-block !important;
  width: 100% !important;
}

.t-askquestion .autocomplete-custom-items {
  position: absolute !important;
  border: 1px solid #d4d4d4 !important;
  border-bottom: none !important;
  border-top: none !important;
  z-index: 99 !important;
  /*position the autocomplete items to be the same width as the container:*/
  top: 100% !important;
  left: 0 !important;
  right: 0 !important;
}

.t-askquestion .autocomplete-custom-items div {
  padding: 10px !important;
  cursor: pointer !important;
  background-color: #fff !important;
  border-bottom: 1px solid #d4d4d4 !important;
}

/*when hovering an item:*/
.t-askquestion .autocomplete-custom-items div:hover {
  background-color: #e9e9e9 !important;
}

/*when navigating through the items using the arrow keys:*/
.t-askquestion .autocomplete-custom-active {
  background-color: DodgerBlue !important;
  color: #ffffff !important;
}
</style>
