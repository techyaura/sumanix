const mixin = {
  methods: {
    title(value) {
      let title = value;
      if (!value) {
        title = 'Interview-Questions - Connect, Share & Learn';
        return title;
      }
      return `${title} - Interview-Questions`;
    },
  },
};
export default mixin;
