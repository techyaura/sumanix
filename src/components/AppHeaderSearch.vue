<template>
  <form class="form-style form-style-2 header-search-input" @submit.prevent="handleSubmit">
    <p style="padding-top:12px;">
      <input
        type="text"
        id="question_title"
        placeholder="Ask any question and you be sure find your answer ?"
        autocomplete="off"
        v-model="query"
      >
    </p>
  </form>
</template>

<script>
export default {
  name: 'AppHeaderSearch',
  created() {
    this.$vueEventBus.$on('isSearchQuery', (value) => {
      if (!value) {
        this.query = '';
      }
    });
  },
  data() {
    return {
      query: '',
    };
  },
  methods: {
    handleSubmit() {
      this.$router.push({ name: 'home', query: { q: this.query } });
    },
  },
};
</script>

<style>
/* .grid_1200 .ask-me .col-md-12 p input {
  margin-top: 0px !important;
} */
.header-search-input input[type="text"]{
  background: #ffff !important;
  /* padding: 9px !important;  */
}
.header-search-input input[type="text"]{
  line-height: 24px;
};
.header-search-input ::-webkit-input-placeholder {
  text-align: center;
}

.header-search-input :-moz-placeholder {
  /* Firefox 18- */
  text-align: center;
}

.header-search-input ::-moz-placeholder {
  /* Firefox 19+ */
  text-align: center;
}

.header-search-input :-ms-input-placeholder {
  text-align: center;
}
</style>
