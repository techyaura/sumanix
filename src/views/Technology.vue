<template>
  <div class="col-md-9">
    <div class="row">
      <div class="user-profile">
        <div class="col-md-12">
          <div class="page-content">
            <!-- <h2>What we do</h2> -->
            <div id="services" class="container-fluid text-center">
              <h2>Technologies</h2>
              <br>
              <div class="row slideanim slide">
                <div class="col-md-6">
                  <div class="progressbar-warp">
                    <span class="progressbar-title">Javascript 100%</span>
                    <div class="progressbar">
                      <div class="progressbar-percent" attr-percent="100" style="width: 100%;"></div>
                    </div>

                    <span class="progressbar-title">Angular 100%</span>
                    <div class="progressbar">
                      <div class="progressbar-percent" attr-percent="95" style="width: 100%;"></div>
                    </div>

                    <span class="progressbar-title">React Js 95%</span>
                    <div class="progressbar">
                      <div class="progressbar-percent" attr-percent="95" style="width: 95%;"></div>
                    </div>

                    <span class="progressbar-title">Vue Js 100%</span>
                    <div class="progressbar">
                      <div class="progressbar-percent" attr-percent="95" style="width: 100%;"></div>
                    </div>

                    <span class="progressbar-title">CSS 90%</span>
                    <div class="progressbar">
                      <div class="progressbar-percent" attr-percent="80" style="width: 90%;"></div>
                    </div>
                  </div>
                  <!-- End progressbar-warp -->
                </div>
                <div class="col-md-6">
                  <div class="progressbar-warp">
                    <span class="progressbar-title">Node Js 100%</span>
                    <div class="progressbar">
                      <div
                        class="progressbar-percent"
                        style="background-color: rgb(75, 76, 77); width: 100%;"
                        attr-percent="90"
                      ></div>
                    </div>

                    <span class="progressbar-title">Python 90%</span>
                    <div class="progressbar">
                      <div
                        class="progressbar-percent"
                        style="background-color: rgb(75, 76, 77); width: 90%;"
                        attr-percent="90"
                      ></div>
                    </div>

                    <span class="progressbar-title">Mongodb 100%</span>
                    <div class="progressbar">
                      <div
                        class="progressbar-percent"
                        style="background-color: rgb(75, 76, 77); width: 100%;"
                        attr-percent="90"
                      ></div>
                    </div>

                    <span class="progressbar-title">Graph QL 95%</span>
                    <div class="progressbar">
                      <div
                        class="progressbar-percent"
                        style="background-color: rgb(75, 76, 77); width: 95%;"
                        attr-percent="95"
                      ></div>
                    </div>

                    <span class="progressbar-title">Docker 100%</span>
                    <div class="progressbar">
                      <div
                        class="progressbar-percent"
                        style="background-color: rgb(75, 76, 77); width: 100%;"
                        attr-percent="95"
                      ></div>
                    </div>
                  </div>
                  <!-- End progressbar-warp -->
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
  name: 'AppTechnology',
  created() {
    document.title = this.title('Technologies');
  },
  mixins: [breadcrumbMixin],
};
</script>
