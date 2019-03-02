<template>
  <div v-if="errorMessage" class="alert alert-danger" role="alert" ref="error" :style="messageStyle">
     <strong>{{errorMessage}}</strong>
    </div>
</template>

<script>
export default {
  name: 'Notifiation',
  data() {
    return {
      errorMessage: this.err,
      timeOut: 5000,
    };
  },
  props: {
    err: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '#a94442',
    },
    borderColor: {
      type: String,
      default: '#ccc',
    },
  },
  methods: {
    hideError() {
      setTimeout(() => {
        this.$refs.error.style.display = 'none';
        this.errorMessage = '';
      }, this.timeOut);
    },
  },
  computed: {
    messageStyle() {
      return {
        color: this.color,
      };
    },
  },
  created() {
    if (this.errorMessage) {
      this.hideError();
    }
  },
};
</script>
