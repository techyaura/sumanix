const mixin = {
  methods: {
    title(value) {
      let title = value;
      if (!value) {
        title = 'Techyaura - Connect, Share & Learn';
        return title;
      }
      return `${title} - SumaniX`;
    },
  },
};
export default mixin;
