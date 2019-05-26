<template>
  <div>
    <footer id="footer">
      <section class="container">
        <div class="row">
          <div class="col-md-4">
            <div class="widget widget_contact">
              <h3 class="widget_title">Who We Are ?</h3>
              <p>We are team of people's working on latest & next generation techs for working independently.</p>
              <ul>
                <!-- <li>
                  <span>Address :</span>
                  Ask Me Network, 33 Street, syada Zeinab, Cairo, Egypt.
                </li>-->
                <!-- <li>
                  <span>Support :</span>Support Telephone No : (+2)01111011110
                </li>-->
                <li>Support Email Account : sumanixinc@gmail.com</li>
              </ul>
            </div>
          </div>
          <div class="col-md-2">
            <div class="widget">
              <h3 class="widget_title">Quick Links</h3>
              <ul>
                <li>
                  <router-link to="/">Home</router-link>
                </li>
                <!-- <li>
                  <router-link to="/blogs">Blogs</router-link>
                </li> -->
                <!-- <li>
                   <router-link to="/about">About</router-link>
                </li> -->
                <li>
                  <a href="https://github.com/sumanixinc/sumanix.com/issues/1"  target="_blank">Feedback</a>
                </li>
                <!-- <li>
                  <a href="ask_question.html">Ask Question</a>
                </li>-->
                <!-- <li>
                   <router-link to="/about">About</router-link>
                </li>
                <li>
                  <router-link to="/about">About</router-link>
                </li>
                <li>
                   <router-link to="/about">About</router-link>
                </li>
                <li>
                   <router-link to="/about">About</router-link>
                </li>-->
                <!-- <li>
                  <router-link to="/about">About</router-link>
                </li>
                <li>
                  <router-link to="/services">Services</router-link>
                </li>
                <li>
                  <router-link to="/technologies">Technologies</router-link>
                </li> -->
                <!-- <li>
                  <router-link to="/">Contact Us</router-link>
                </li>-->
                <!-- <li>
                   <router-link to="/">FAQS</router-link>
                </li>-->
              </ul>
            </div>
          </div>
          <!-- <div class="col-md-3">
            <div class="widget">
              <h3 class="widget_title">Popular Questions</h3>
              <ul class="related-posts">
                <li class="related-item">
                  <h3>
                    <a href="#">This is my first Question</a>
                  </h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lorem quam.</p>
                  <div class="clear"></div>
                  <span>Feb 22, 2014</span>
                </li>
                <li class="related-item">
                  <h3>
                    <a href="#">This Is My Second Poll Question</a>
                  </h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lorem quam.</p>
                  <div class="clear"></div>
                  <span>Feb 22, 2014</span>
                </li>
              </ul>
            </div>
          </div>-->
          <div class="col-md-3">
            <!-- <div class="widget widget_twitter">
              <h3 class="widget_title">What we offer</h3>
              <div class="tweet_1">
                <router-link to="/services">Services</router-link>
              </div>
              <br>
              <div class="tweet_1">
                <router-link to="/technologies">Technologies</router-link>
              </div>
            </div> -->
          </div>
        </div>
        <!-- End row -->
      </section>
      <!-- End container -->
    </footer>
    <!-- End footer -->
    <footer id="footer-bottom">
      <section class="container">
        <div class="copyrights f_left">
          Copyright © 2019
          <a href="javascript:void">SumaniX</a>
        </div>
        <div class="social_icons f_right">
          <ul>
            <li class="twitter">
              <a original-title="Twitter" target = "_blank" class="tooltip-n" href="https://twitter.com/sumanixinc">
                <i class="social_icon-twitter font17"></i>
              </a>
            </li>
            <li class="facebook">
              <a original-title="Facebook"  target = "_blank" class="tooltip-n" href="https://www.facebook.com/sumanixinc">
                <i class="social_icon-facebook font17"></i>
              </a>
            </li>
            <!-- <li class="gplus">
              <a original-title="Google plus" class="tooltip-n" href="#">
                <i class="social_icon-gplus font17"></i>
              </a>
            </li>
            <li class="youtube">
              <a original-title="Youtube" class="tooltip-n" href="#">
                <i class="social_icon-youtube font17"></i>
              </a>
            </li>
            <li class="skype">
              <a original-title="Skype" class="tooltip-n" href="skype:#?call">
                <i class="social_icon-skype font17"></i>
              </a>
            </li>
            <li class="flickr">
              <a original-title="Flickr" class="tooltip-n" href="#">
                <i class="social_icon-flickr font17"></i>
              </a>
            </li>
            <li class="rss">
              <a original-title="Rss" class="tooltip-n" href="#">
                <i class="social_icon-rss font17"></i>
              </a>
            </li>-->
          </ul>
        </div>
        <!-- End social_icons -->
      </section>
      <!-- End container -->
    </footer>
    <!-- End footer-bottom -->
  </div>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>
<style>
#footer .widget h3.widget_title {
    font-size: 15px !important;
}
</style>
