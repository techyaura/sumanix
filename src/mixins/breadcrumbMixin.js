const mixin = {
  methods: {
    title(value) {
      let title = value;
      if (!value) {
        title = 'techyaura-forum - Connect, Share & Learn';
        return title;
      }
      return `${title} - techyaura-forum`;
    },
  },
};
export default mixin;
