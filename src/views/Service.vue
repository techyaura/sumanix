<template>
  <div class="col-md-9">
    <div class="row">
      <div class="user-profile">
        <div class="col-md-12">
          <div class="page-content">
            <!-- <h2>What we do</h2> -->
            <div id="services" class="container-fluid text-center">
              <h2>Our Services</h2>
              <br>
              <div class="row slideanim slide">
                <div class="col-md-4">
                  <div class="page-content page-shortcode">
                    <div class="box_icon">
                      <span class="t_center icon_i">
                        <span icon_size="120">
                          <i
                            i_color="#1abc9c"
                            i_hover="#34495e"
                            class="icon-tint color_default"
                            style="font-size: 60px; color: rgb(26, 188, 156);"
                          ></i>
                        </span>
                      </span>
                      <div class="t_center">
                        <h3>Buisness Consulting</h3>
                        <p>We provide end to end solutions from small to large scaled Applications.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="page-content page-shortcode">
                    <div class="box_icon">
                      <span class="t_center icon_i">
                        <span
                          icon_size="50"
                          span_bg="#1abc9c"
                          span_hover="#34495e"
                          class="icon_square"
                          style="height: 50px; width: 50px; font-size: 25px; line-height: 50px; background-color: rgb(26, 188, 156);"
                        >
                          <i class="icon-desktop"></i>
                        </span>
                      </span>
                      <div class="t_center">
                        <h3>Application Development</h3>
                        <p>We provide the latest techs for the application development.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="page-content page-shortcode">
                    <div class="box_icon">
                      <span class="t_center icon_i">
                        <span
                          class="icon_circle"
                          icon_size="50"
                          span_bg="#1abc9c"
                          span_hover="#34495e"
                          style="height: 50px; width: 50px; font-size: 25px; line-height: 50px; background-color: rgb(26, 188, 156);"
                        >
                          <i class="icon-bullhorn"></i>
                        </span>
                      </span>
                      <div class="t_center">
                        <h3>Quality Assurance</h3>
                        <p>Our team provides the automate testing for your app as well as with Manual Testing.</p>
                      </div>
                    </div>
                  </div>
                  <div class="clearfix gap"></div>
                </div>
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
  name: 'AppService',
  mixins: [breadcrumbMixin],
  created() {
    document.title = this.title('Services');
  },
};
</script>
