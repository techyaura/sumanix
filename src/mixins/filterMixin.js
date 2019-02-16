const mixin = {
  methods: {
    capitalize(value) {
      let input = value;
      if (!input) return '';
      input = input.toString();
      return input.charAt(0).toUpperCase() + input.slice(1);
    },
  },
  filters: {
    capitalize(value) {
      let input = value;
      if (!input) return '';
      input = input.toString();
      return input.charAt(0).toUpperCase() + input.slice(1);
    },
  },
};
export default mixin;
