
const mixin = {
  methods: {
    reRenderSidebar(slug) {
      this.$vueEventBus.$emit('reRenderSidebar', slug);
    },
  },
};
export default mixin;
