const mixin = {
  methods: {
    capitalize(value) {
      let input = value;
      if (!input) return '';
      input = input.toString();
      return input.charAt(0).toUpperCase() + input.slice(1);
    },
    truncate(str, length, ending) {
      let len = length;
      let end = ending;
      if (len == null) {
        len = 600;
      }
      if (end == null) {
        end = '...';
      }
      if (str.length > len) {
        return str.substring(0, len - end.length) + end;
      }
      return str;
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
