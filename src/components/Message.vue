<template>
  <div v-if="errorMessage" class="err-essage" ref="error" :style="messageStyle">{{errorMessage}}</div>
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
      default: '#fff',
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
<style scoped>
.err-essage {
  margin-bottom: 10px;
  padding: 10px;
  color: red;
  border: 1px solid #ccc;
  font-size: 12px;
  background-color: #c04848;
}
</style>
