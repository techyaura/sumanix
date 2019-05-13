<template>
  <div class="col-md-12 t-int-ques">
    <div class="page-content page-content-user-profile">
      <div class="ph-item" v-if="spinner.status">
        <div class="ph-col-12">
          <div class="ph-picture"></div>
        </div>
        <div class="ph-col-12">
          <div class="ph-row">
            <div class="ph-col-12"></div>
          </div>
          <div class="ph-row">
            <div class="ph-col-12"></div>
          </div>
          <div class="ph-row">
            <div class="ph-col-12"></div>
          </div>
        </div>
      </div>
      <!-- <div>
        <button
          v-if="!spinner.status"
          @click="download"
          style="margin-bottom: 20px;"
          type="button"
          class="btn btn-success"
        >Download as PDF</button>
        <div id="editor"></div>
      </div> -->
      <div ref="content">
        <div class="jumbotron" v-if="!spinner.status">
          <h1>
            {{tag.name | capitalize}}
            <span style="font-size: 20px">Articles</span>
          </h1>
        </div>
        <div class="user-profile-widget">
          <div class="widget">
            <article
              itemscope
              itemtype="http://schema.org/Question"
              class="question question-type-normal"
              v-for="(item, index) in questions"
              v-bind:data="item"
              v-bind:key="item._id"
              
            >
            <router-link :to="{name: 'questionDetail', params: { slug: item.slug || item.name }}">

            
              <h2 itemprop="name">{{index + 1 + '. '}} {{item.name}}</h2>
              <div class="question-inner">
                <!-- <div class="clearfix"></div> -->
                <!-- <div class="question-desc" v-html="renderHtml(item)"></div> -->
              </div>
              </router-link>
            </article>
          </div>
          <br>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.t-int-ques {
  min-height: 400px;
}
.t-int-ques .question-desc {
  border: none !important;
  margin-bottom: 0;
  padding-bottom: 0;
}
.t-int-ques .question h2 {
  margin: 0px !important;
  margin-bottom: 20px !important;
}
.t-int-ques .question-inner {
  /* position: relative; */
  margin-left: 0px;
}

@media only screen and (max-width: 479px) {
  .t-int-ques .question-type-normal.question h2,
  .question-type-poll.question h2 {
    padding-top: 0px !important;
  }
}
</style>

<script>
import { mapGetters } from 'vuex';
import jsPDF from 'jspdf';
import { filterMixin, spinnerMixin, breadcrumbMixin } from '../../mixins';

export default {
  name: 'InterviewQuestion',
  mixins: [filterMixin, spinnerMixin, breadcrumbMixin],
  data() {
    return {
      questions: [],
      tag: {},
      slug: this.$route.params.slug,
    };
  },
  methods: {
    getQuestions() {
      const url = `${this.$BASE_URL}api/v1/question/interview/${this.slug}`;
      this.$http.get(url).then((response) => {
        const aggregate = response.data.data;
        this.questions = aggregate.questions;
        this.tag = aggregate.tag;
        this.spinner.status = false;
        document.title = this.title(`${this.tag.name} Interview Questions`);
      });
    },
    download() {
      if (this.token) {
        const doc = new jsPDF();
        let contentHtml = this.$refs.content.innerHTML;
        // remove image
        contentHtml = contentHtml.replace(/<img .*?>/g, '');
        doc.fromHTML(contentHtml, 15, 15, {
          width: 170,
        },
        () => {
          doc.save(`${this.$route.params.slug || 'sample'}-questions.pdf`);
        });
      } else {
        this.$router.push({
          name: 'login',
          query: { redirect: `/interview-questions/tag/${this.$route.params.slug}` },
        });
      }
    },
  },
  created() {
    this.getQuestions();
  },
  computed: {
    renderHtml() {
      return (item) => {
        if (Array.isArray(item.answer) && item.answer.length) {
          return item.answer[0].name;
        }
        return '';
      };
    },
    ...mapGetters({
      token: 'auth/getToken',
    }),
  },
};
</script>
