<template>
  <div class="t-question-home">
    <div class="col-md-9">
      <div class="tabs-warp question-tab">
        <ul class="tabs" v-if="!slug">
          <!-- <li class="tab" v-if="slug">
            <a
              href="javascript:void(0)"
              v-bind:class="{ current: currentFilterFlag === '' }"
            >{{( slugCapitalize ) + ' Questions'}}</a>
          </li>-->

          <li class="tab" v-if="!slug">
            <a
              href="javascript:void(0)"
              v-bind:class="{ current: currentFilterFlag === 'recent' }"
              v-on:click="getFilteredQuestions('recent')"
            >Recent Questions</a>
          </li>

          <li class="tab" v-if="!slug">
            <a
              href="javascript:void(0)"
              v-bind:class="{ current: currentFilterFlag === 'mostViewed' }"
              v-on:click="getFilteredQuestions('mostViewed')"
            >Most Viewed</a>
          </li>
          <li class="tab" v-if="!slug">
            <a
              href="javascript:void(0)"
              v-bind:class="{ current: currentFilterFlag === 'unanswered' }"
              v-on:click="getFilteredQuestions('unanswered')"
            >No Answers</a>
          </li>
        </ul>
        <div class="tab-inner-warp">
          <div class="tab-inner">
            <!-- <Spinner
              :status="spinner.status"
              :color="spinner.color"
              :size="spinner.size"
              :depth="spinner.depth"
              :rotation="spinner.rotation"
              :speed="spinner.speed"
            />-->
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
              itemscope
              itemtype="http://schema.org/Question"
              class="question-custom-home question question-type-normal"
              v-for="item in questions"
              v-bind:data="item"
              v-bind:key="item._id"
            >
              <h2 itemprop="name">
                <router-link
                  :to="{name: 'questionDetail', params: { slug: item.slug || item.name }}"
                >{{item.name}}</router-link>
              </h2>
              <!-- <div itemscope itemtype="http://schema.org/Person" class="question-author" v-if="item.isAnonymous === true">
                <img itemprop="image" alt="anonymous" src="/img/profile/anonymous.svg" title="anonymous">
              </div>
              <div
                class="question-author"
                v-if="item.isAnonymous === false"
                itemprop="author"
                itemscope
                itemtype="http://schema.org/Person"
              >
                <router-link :to="'/@' + item.username[0]" >
                  <img
                    itemprop="image"
                    width="60"
                    height="60"
                    :src="'/img/profile/' + item.avatar[0]"
                    :alt="item.username[0]"
                    :title="item.username[0]"
                  >
                </router-link>
              </div>-->
              <div class="question-inner">
                <div class="clearfix"></div>
                <div class="question-details">
                  <AppClap :question="item"/>
                </div>
                <span class="question-category">
                  <!-- <span class="tagAdjust">
                    <i class="icon-suitcase"></i>
                  </span>-->
                  <router-link
                    class="anchor-space"
                    v-bind:to="{name: 'tagQuestion', params: {slug: tag.slug || tag.name}}"
                    v-for="tag in item.tags"
                    v-bind:data="tag"
                    v-bind:key="tag.slug"
                  >
                    <span class="label label-primary">{{tag.slug || tag.name}}</span>
                  </router-link>
                </span>
                <span class="question-comment">
                  <router-link
                    :to="{name: 'questionDetail', params: { slug: item.slug || item.name }}"
                  >
                    <i class="icon-comment"></i>
                    <span itemprop="answerCount">{{item.totalAnswers}}</span>
                    Answers
                  </router-link>
                </span>
                <span class="question-view">
                  <i class="icon-user"></i>
                  {{item.views}} Views
                </span>
                <span class="question-date">
                  <i class="icon-time"></i>
                  {{item.activityType? item.activityType + ' ': 'asked '}}
                  <time
                    itemprop="dateCreated"
                    :datetime="item.modifiedAt"
                  >{{timestamp(item)}}</time>
                  <span itemscope itemtype="http://schema.org/Person" class="person">
                    <router-link
                      :to="'/@' + computeUsername(item)"
                      itemprop="name"
                    >{{computeUsername(item)}}</router-link>
                  </span>
                </span>
                <div class="clearfix"></div>
              </div>
            </article>
            <article v-if="!questions.length && isLoaded">
              <h2>No questions found on the search criteria.</h2>
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

<style scoped>
.t-question-home .question-custom-home h2,
.question-inner {
  margin-left: 0px !important;
}
.t-question-home .question-custom-home .question-date {
  margin-left: 10px !important;
}

.t-question-home .question-custom-home h2 {
  font-size: 15px !important;
}
.t-question-home .question-custom-home h2 a {
  color: #6e727b !important;
}
.t-question-home question-custom-home .tagAdjust {
  float: left;
}
.t-question-home .question-date span.username a {
  color: #38cbcb !important;
}
.t-question-home question-custom-home .anchor-space {
  margin-left: 5px;
  /* border: 1px solid #ccc !important;
  padding: 2px 5px 2px 5px !important;
  border-radius: 4px !important;
  color: #7a27cc !important; */
}
.t-question-home span.person a {
  color: #456ff1 !important;
}
/* .-home h2 {
  margin: 0 0 30px 0px !important;
} */
/* .question-inner {
  margin-left: 0px !important;
} */
@media only screen and (max-width: 479px) {
  .t-question-home .question-type-normal.question h2,
  .question-type-poll.question h2 {
    padding-top: 0px !important;
  }
}
</style>

<script>
import Spinner from '@/components/Spinner.vue';
import { filterMixin, spinnerMixin, breadcrumbMixin } from '../mixins';
import AppClap from '@/components/AppClap.vue';

export default {
  name: 'AppQuestion',
  params: ['query'],
  components: {
    Spinner,
    AppClap,
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
        this.loadingText = 'Load More Questions';
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
        this.loadingText = 'Load More Questions';
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
        this.loadingText = 'Load More Questions';
        this.isLoaded = true;
        this.spinner.status = false;
      });
    },
    getFilteredQuestions(flag) {
      this.isLoaded = false;
      this.currentFilterFlag = flag;
      this.offset = 1;
      this.questions = [];
      document.title = this.title(`${flag} Questions`);
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
