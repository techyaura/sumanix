<template>
<div class="row">
  <div class="col-md-12">
    <div class="row">
      <div class="user-profile">
        <div class="col-md-12">
          <div class="page-content">
            <h2>About Us</h2>
            <div class="info">
              <!-- <i class="icon-bullhorn"></i> -->
              <p>
                <span></span>
                <br>
                <span class="dropcap">SumaniX</span> is an online community platform for job aspirants & techs developers to learn, share their knowledge, and build their career.
                <br>
                <br>
                <Strong>Goal</Strong>:
                Our team has released SumaniX v1.0, targetting the Q/A platform for <b>v1.0</b> to enhance the user knowledge and expertise & build the platform.<br>
                So it's just begining, we are working on some ML models to make the platform enough useful for the tech developers and aspirants to learn & test their skills via ML. So you can expect the same in next big release <b>v2.0</b>.
                <br>
                <br>
                So we also want community support to post their feedbacks, bugs(if any) to make the platform more and more useful to the mass audience. To post any bugs/improvements/features requested <a href="https://github.com/sumanixinc/sumanix.com/issues/1" target="_blank"><b>Click here</b></a><br>

                <br>
                <Strong>Releases</Strong>:<br>
                One can track the Sumanix releases via <a target="_blank" href="https://github.com/sumanixinc/sumanix.com/releases"><b>GITHUB</b></a>, what we are working on & what is going to come next in the platform. So almost everything, can be tracked via releases.
                <br>
                <br>
                <Strong>Open Source</Strong>:<br>
                We also planning to make Sumanix, an open source <b>SOON..</b><br>
                The reason is that, SumaniX is a platform for its Users, So isn't be great to make it open source and let the devs and aspirants decide what they need & how it should be implemented.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import { breadcrumbMixin } from '../mixins';

export default {
  name: 'AppAbout',
  mixins: [breadcrumbMixin],
  created() {
    document.title = this.title('About Us');
  },
  beforeCreate() {
    this.$vueEventBus.$emit('isLoginPageLanding', true);
  },
  beforeRouteEnter: (to, from, next) => {
    next((vm) => {
      vm.$vueEventBus.$emit('isLoginPageLanding', true);
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$vueEventBus.$emit('isLoginPageLanding', false);
    next();
  },
};
</script>
