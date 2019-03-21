<template>
  <div id="wrap" class="grid_1200">
    <AppHeader/>
    <section class="container main-content page-left-sidebar">
      <slot/>
    </section>
    <AppFooter/>
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue';
import AppHeader from '../components/AppHeader.vue';

export default {
  name: 'ProfileLayout',
  components: {
    AppFooter,
    AppHeader,
  },
};
</script>
