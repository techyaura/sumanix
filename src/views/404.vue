<template>
  <div class="row">
    <section class="container main-content">
      <div class="row">
        <div class="col-md-12">
          <div class="error_404">
            <div>
              <h2>404</h2>
              <h3>Page not Found</h3>
            </div>
            <div class="clearfix"></div>
            <br>
            <router-link class="button large color margin_0" :to="{name: 'home'}">Home page</router-link>
          </div>
        </div>
        <!-- End main -->
      </div>
      <!-- End row -->
    </section>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>
