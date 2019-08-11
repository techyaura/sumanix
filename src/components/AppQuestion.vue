<template>
  <div class="t-question-home">
    <div class="col-md-12">
      <div class="tabs-warp question-tab">
        <ul class="tabs" v-if="!slug">
          <li class="tab" v-if="!slug">
            <a
              href="javascript:void(0)"
              v-bind:class="{ current: currentFilterFlag === 'recent' }"
              v-on:click="getFilteredQuestions('recent')"
            >Recent Articles</a>
          </li>

          <li class="tab" v-if="!slug">
            <a
              href="javascript:void(0)"
              v-bind:class="{ current: currentFilterFlag === 'mostViewed' }"
              v-on:click="getFilteredQuestions('mostViewed')"
            >Most Viewed</a>
          </li>
        </ul>
        <div class="tab-inner-warp">
          <div class="tab-inner">
            <div v-if="spinner.status">
              <article>
                <div class="ph-item">
                  <div class="ph-col-12">
                    <div class="ph-row">
                      <div class="ph-col-12 big"></div>
                      <div class="ph-col-2"></div>
                      <div class="ph-col-2 empty"></div>
                      <div class="ph-col-2"></div>
                      <div class="ph-col-2 empty"></div>
                      <div class="ph-col-2"></div>
                    </div>
                  </div>
                </div>
              </article>
              <article>
                <div class="ph-item">
                  <div class="ph-col-12">
                    <div class="ph-row">
                      <div class="ph-col-12 big"></div>
                      <div class="ph-col-2"></div>
                      <div class="ph-col-2 empty"></div>
                      <div class="ph-col-2"></div>
                      <div class="ph-col-2 empty"></div>
                      <div class="ph-col-2"></div>
                    </div>
                  </div>
                </div>
              </article>
              <article>
                <div class="ph-item">
                  <div class="ph-col-12">
                    <div class="ph-row">
                      <div class="ph-col-12 big"></div>
                      <div class="ph-col-2"></div>
                      <div class="ph-col-2 empty"></div>
                      <div class="ph-col-2"></div>
                      <div class="ph-col-2 empty"></div>
                      <div class="ph-col-2"></div>
                    </div>
                  </div>
                </div>
              </article>
              <article>
                <div class="ph-item">
                  <div class="ph-col-12">
                    <div class="ph-row">
                      <div class="ph-col-12 big"></div>
                      <div class="ph-col-2"></div>
                      <div class="ph-col-2 empty"></div>
                      <div class="ph-col-2"></div>
                      <div class="ph-col-2 empty"></div>
                      <div class="ph-col-2"></div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
            <article
              class="question question-type-normal"
              v-for="item in questions"
              v-bind:data="item"
              v-bind:key="item._id"
            >
              <h2 itemprop="name" style="    font-weight: 600;">
                <router-link
                  style="color: #6e727b"
                  :to="{name: 'questionDetail', params: { slug: item.slug || item.name }}"
                >{{item.name}}</router-link>
              </h2>
              <!-- <a class="question-report" href="#">Report</a>
              <div class="question-type-main">
                <i class="icon-question-sign"></i>Question
              </div>-->
              <div class="question-author">
                <router-link :to="'/@' + item.username[0]" class="question-author-img tooltip-n">
                  <img
                    itemprop="image"
                    width="60"
                    height="60"
                    :src="'/img/profile/' + item.avatar[0]"
                    :alt="item.username[0]"
                    :title="item.username[0]"
                  >
                </router-link>
              </div>
              <div class="question-inner">
                <div class="clearfix"></div>
                <p
                  style="font-size: 15px; font-family: inherit"
                  class="question-desc"
                  v-html="truncateStr(item.answers[0] && item.answers[0].name ? item.answers[0].name: '')"
                ></p>
                <!-- <div class="question-details">
                  <span class="question-answered question-answered-done">
                    <i class="icon-ok"></i>solved
                  </span>
                  <span class="question-favorite">
                    <i class="icon-star"></i>5
                  </span>
                </div>-->
                <span class="question-category">
                  <router-link
                    class="label label-primary"
                    v-bind:to="{name: 'tagQuestion', params: {slug: tag.slug || tag.name}}"
                    v-for="tag in item.tags"
                    v-bind:data="tag"
                    v-bind:key="tag.slug"
                  >{{tag.slug || tag.name}}</router-link>
                </span>
                <span class="question-date">
                  <i class="icon-time"></i>
                  <time itemprop="dateCreated" :datetime="item.modifiedAt">{{timestamp(item)}}</time>
                </span>
                <!-- <span class="question-comment">
                  <a href="#">
                    <i class="icon-comment"></i>5 Answer
                  </a>
                </span>-->
                <span class="question-view">
                  <i class="icon-user"></i>
                  {{item.views}} views
                </span>
                <div class="clearfix"></div>
              </div>
            </article>
            <a
              v-show="count > questions.length"
              href="javascript:void(0)"
              v-on:click="loadMore()"
              class="load-questions"
            >
              <i class="icon-refresh" v-if="isLoading"></i>
              {{loadingText}}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.t-question-home .question-inner span.question-category a{
      background-color: #ccc;
    margin-right: 7px;
}
.t-question-home
.question-desc h2,
.question-desc span,
.question-desc strong {
  margin: 0 !important;
  font-size: inherit !important;
  color: #848991 !important;
  padding: 0 !important;
  font-weight: normal !important;
}
.t-question-home .question-desc pre {
  display: none;
}
</style>

<script>
import { filterMixin, spinnerMixin, breadcrumbMixin } from '../mixins';
// import AppClap from '@/components/AppClap.vue';

export default {
  name: 'AppQuestion',
  params: ['query'],
  components: {
    // AppClap,
  },
  mixins: [filterMixin, spinnerMixin, breadcrumbMixin],
  data() {
    return {
      placeHolder: [1, 2, 3, 4, 5],
      isLoading: false,
      isLoaded: false,
      loadingText: 'Load More Questions',
      count: 0,
      offset: 1,
      limit: 40,
      currentFilterFlag: 'recent',
      isEditAllow: false,
      questions: [],
      slug: this.$route.params.slug,
      slugCapitalize: '',
      isEventEmitted: false,
      queryParams: this.$route.query.q || '',
    };
  },
  methods: {
    getAnsweredQuestions() {
      this.isLoading = true;
      this.loadingText = 'Loading...';
      let url = `${this.$BASE_URL}api/v1/question/answered?limit=${
        this.limit
      }&offset=${this.offset}`;
      if (this.slug) {
        url = `${url}&q=${this.slug}`;
      }
      if (this.queryParams) {
        url = `${url}&q=${this.queryParams}`;
      }
      if (this.currentFilterFlag) {
        url = `${url}&flag=${this.currentFilterFlag}`;
      }
      this.$http.get(url).then((response) => {
        const aggregate = response.data.data[0];
        if (Array.isArray(aggregate.count) && aggregate.count.length) {
          this.count = aggregate.count[0].count;
          this.questions = this.questions.concat(aggregate.questions);
        } else {
          this.count = 0;
          this.questions = [];
        }
        this.isLoading = false;
        this.loadingText = 'Load More Articles';
        this.isLoaded = true;
        this.spinner.status = false;
      });
    },
    getUnansweredQuestions() {
      this.isLoading = true;
      this.loadingText = 'Loading...';
      let url = `${this.$BASE_URL}api/v1/question/unanswered?limit=${
        this.limit
      }&offset=${this.offset}`;
      if (this.slug) {
        url = `${url}&q=${this.slug}`;
      }
      if (this.queryParams) {
        url = `${url}&q=${this.queryParams}`;
      }
      if (this.currentFilterFlag) {
        url = `${url}&flag=${this.currentFilterFlag}`;
      }
      this.$http.get(url).then((response) => {
        const aggregate = response.data.data[0];
        if (Array.isArray(aggregate.count) && aggregate.count.length) {
          this.count = aggregate.count[0].count;
          this.questions = this.questions.concat(aggregate.questions);
        }
        this.isLoading = false;
        this.loadingText = 'Load More Articles';
        this.isLoaded = true;
        this.spinner.status = false;
      });
    },
    getQuestions() {
      this.isLoading = true;
      this.loadingText = 'Loading...';
      let url = `${this.$BASE_URL}api/v1/question/?limit=${this.limit}&offset=${
        this.offset
      }`;
      if (this.slug) {
        url = `${url}&q=${this.slug}`;
      }
      if (this.queryParams) {
        url = `${url}&q=${this.queryParams}`;
      }
      if (this.currentFilterFlag) {
        url = `${url}&flag=${this.currentFilterFlag}`;
      }
      this.$http.get(url).then((response) => {
        const aggregate = response.data.data[0];
        if (Array.isArray(aggregate.count) && aggregate.count.length) {
          this.count = aggregate.count[0].count;
          if (aggregate.questions.length) {
            this.questions = this.questions.concat(aggregate.questions);
          }
        }
        this.isLoading = false;
        this.loadingText = 'Load More Articles';
        this.isLoaded = true;
        this.spinner.status = false;
      });
    },
    getFilteredQuestions(flag) {
      this.isLoaded = false;
      this.currentFilterFlag = flag;
      this.offset = 1;
      this.questions = [];
      document.title = this.title(`${flag} Articles`);
      if (flag && (flag === 'recent' || flag === 'mostViewed')) {
        this.getQuestions();
      } else if (flag === 'unanswered') {
        this.getUnansweredQuestions();
      } else if (flag === 'answered') {
        this.getAnsweredQuestions();
      }
    },
    loadMore() {
      this.isLoaded = false;
      this.isLoading = true;
      this.offset = this.offset + 1;
      if (
        this.currentFilterFlag
        && (this.currentFilterFlag === 'recent'
          || this.currentFilterFlag === 'mostViewed')
      ) {
        this.getQuestions();
      } else if (this.currentFilterFlag === 'unanswered') {
        this.getUnansweredQuestions();
      } else if (this.currentFilterFlag === 'answered') {
        this.getAnsweredQuestions();
      }
    },
  },
  created() {
    if (!this.queryParams) {
      this.$vueEventBus.$emit('isSearchQuery', false);
    }
    this.getQuestions();
    if (this.slug) {
      this.slugCapitalize = this.capitalize(this.slug);
      this.currentFilterFlag = '';
    }
  },
  computed: {
    truncateStr() {
      return (item) => {
        if (item) {
          item = item.replace(/<br>/g, '');
          // return this.truncate(item, 500, "<b style='font-size:20px; font-style: italic'> See More...</b>");
          return this.truncate(item, 500, '...');
        }
        return '';
      };
    },
    timestamp() {
      return (item) => {
        if (Object.prototype.hasOwnProperty.call(item, 'modifiedAt')) {
          return this.$moment(item.modifiedAt).fromNow();
        }
        return this.$moment(item.updatedAt).fromNow();
      };
    },
    computeUsername() {
      return (item) => {
        if (Array.isArray(item.activityOwner) && item.activityOwner.length) {
          return item.activityOwner[0];
        }
        return item.username[0];
      };
    },
  },
};
</script>
