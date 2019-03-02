<template>
  <div class="page-content t-myanswer">
    <div class="boxedtitle page-title"><h2>Total Answers ({{count}})</h2></div>
    <Spinner
      :status="spinner.status"
      :color="spinner.color"
      :size="spinner.size"
      :depth="spinner.depth"
      :rotation="spinner.rotation"
      :speed="spinner.speed"
    />
    <div class="user-questions">
      <article
        class="question user-question"
        v-for="item in answers"
        v-bind:data="item"
        v-bind:key="item._id"
      >
        <h3>
          <!-- <span class="question-remove">
            <a href="#" original-title="remove the question" class="tooltip-n">
              <i class="icon-star"></i>
            </a>
          </span>-->
          <router-link :to="{name: 'questionDetail', params: { slug: item.slug }}">{{item.name}}</router-link>
        </h3>
        <div class="question-content">
          <div class="question-bottom">
            <!-- <div class="question-answered">
              <i class="icon-ok"></i>in progress
            </div>
            <span class="question-favorite">
              <i class="icon-star"></i>5
            </span>-->
            <span class="question-category">
              <!-- <span class="tagAdjust">
                <i class="icon-suitcase"></i>
              </span> -->
              <router-link
                class="anchor-space q-tags"
                v-bind:to="{name: 'tagQuestion', params: {slug: tag.slug || tag.name}}"
                v-for="tag in item.tags"
                v-bind:data="tag"
                v-bind:key="tag.name"
              >{{tag.name}}</router-link>
            </span>
            <!-- <span class="question-comment">
              <a href="#">
                <i class="icon-comment"></i>5 Answers
              </a>
            </span>-->
            <!-- <a class="question-reply" href="#">
              <i class="icon-reply"></i>Reply
            </a>-->
            <span class="question-view">
              <i class="icon-user"></i>
              {{item.views + ' views'}}
            </span>
            <span class="question-date" style="padding-left: 10px;">
              <i class="icon-time"></i>
              {{$moment(item.createdAt).fromNow()}}
            </span>
          </div>
        </div>
      </article>
    </div>
    <div>
      <v-pagination
        v-if = "count > this.limit"
        v-model="currentPage"
        :page-count="pageCount"
        :classes="bootstrapPaginationClasses"
        :labels="customLabels"
        @change="onChange">
        </v-pagination>
    </div>
    <br>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue';
import spinnerMixin from '../mixins/spinnerMixin';
import vPagination from '@/components/vue-plain-pagination.vue';

export default {
  name: 'AppMyAnswer',
  components: {
    Spinner,
    vPagination,
  },
  mixins: [spinnerMixin],
  data() {
    return {
      username: this.$route.params.username,
      questions: [],
      answers: [],
      currentPage: 1,
      limit: 10,
      count: 0,
      pageCount: 0,
      bootstrapPaginationClasses: { // http://getbootstrap.com/docs/4.1/components/pagination/
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
    onChange() {
      this.list();
    },
    list() {
      this.$http
        .get(`${this.$BASE_URL}api/v1/question/user/${this.username}/answer?offset=${this.currentPage}&limit=${this.limit}`)
        .then((response) => {
          if (Array.isArray(response.data.data) && response.data.data.length) {
            const aggregate = response.data.data[0];
            if (Array.isArray(aggregate.count) && aggregate.count.length) {
              this.count = aggregate.count[0].count;
              this.pageCount = Math.ceil(this.count / this.limit);
            }
            this.answers = aggregate.questions;
          }
          this.spinner.status = false;
        });
    },
  },
  created() {
    this.list();
  },
};
</script>
<style scoped>
.t-myanswer .question {
  padding: 10px 20px 10px 20px !important;
}
.t-myanswer .boxedtitle.page-title h2 {
  margin-bottom:0px !important;
}
.t-myanswer h3 {
  font-size: 15px !important;
}
.t-myanswer h3 a {
  color: #2f3239 !important;
}
.t-myanswer h3 a:hover {
  color: #456FF1 !important;
}
@media only screen and (max-width: 479px) {
  .t-myanswer .user-question h3 {
    margin-top: 0px !important;
    padding-top: 0px !important;
  }
}
</style>
