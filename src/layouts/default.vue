<template>
  <div id="wrap" class="grid_1200">
    <AppHeader/>
    <section class="container main-content">
      <slot/>
      <!-- <div>
        <AppSidebar/>
      </div> -->
    </section>
    <AppFooter/>
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue';
import AppHeader from '../components/AppHeader.vue';
// import AppSidebar from '../components/AppSidebar.vue';

export default {
  name: 'DefaultLayout',
  components: {
    AppFooter,
    AppHeader,
    // AppSidebar,
  },
};
</script>
