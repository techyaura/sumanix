<template>
  <form class="navbar-form navbar-left" @submit.prevent="handleSubmit">
    <div class="form-group">
      <input
        type="text"
        id="question_title"
        placeholder="Search Techyaura"
        autocomplete="off"
        v-model="query"
        class="form-control"
      >
    </div>
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
      this.$vueEventBus.$emit('isHomePage', false);
      this.$router.push({ name: 'home', query: { q: this.query } });
    },
  },
};
</script>

<style scoped>
/* .grid_1200 .ask-me .col-md-12 p input {
  margin-top: 0px !important;
} */
.navbar-form input[type="text"] {
  background: #ffff !important;
  /* line-height: 24px;
  margin-bottom: 0px; */
}

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

.navbar-form {
  margin-top: 0px;
  margin-bottom: 0px;
  width: 42%;
  padding-top: 7px !important;
  border-top: 0;
  border-bottom: 0;
}
 .navbar-form .form-group {
  width: 100%;
}
.navbar-form .form-group input {
  width: 75%;
  margin-bottom: 7px !important;
}

@media (max-width: 425px) {
  .navbar-form {
    width: 100%;
     margin-bottom: 0px !important;
  }
}

@media only screen and (min-width: 426px) and (max-width: 768px) {
  .navbar-form {
    width: 20%;
  }
  /* .navbar-form .form-group input {
    margin-bottom: 0px !important;
  } */
}
</style>
