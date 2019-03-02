<template>
  <div class="t-blog-detail">
    <div class="row">
      <div class="col-md-12">
        <article class="post single-post clearfix" v-if="spinner.status">
          <div class="post-inner">
            <Spinner
              :status="spinner.status"
              :color="spinner.color"
              :size="spinner.size"
              :depth="spinner.depth"
              :rotation="spinner.rotation"
              :speed="spinner.speed"
            />
          </div>
        </article>
        <article class="post single-post clearfix">
          <div class="post-inner">
            <!-- <div class="post-img">
              <a href="single_post.html">
                <img src="../ask-me/images/demo/posts/loneliness-1440x900.jpg" alt>
              </a>
            </div> -->
            <h2 class="post-title">
              <span class="post-type">
                <i class="icon-film"></i>
              </span>
              {{blog.title}}
            </h2>
            <div class="post-meta">
              <!-- <span class="meta-author">
                <i class="icon-user"></i>
                <a href="#">Administrator</a>
              </span> -->
              <span class="meta-date">
                <i class="icon-time"></i>
                {{timestamp(blog)}}
              </span>
              <span class="meta-categories">
                <i class="icon-suitcase"></i>
                <a
                  href="javascript:void()"
                  v-for="tag in blog.tags"
                  v-bind:data="tag"
                  v-bind:key="tag._id"
                >{{tag.name}}</a>
              </span>
              <!-- <span class="meta-comment">
                <i class="icon-comments-alt"></i>
                <a href="#">15 comments</a>
              </span>-->
            </div>
            <div class="post-content" v-html="blog.description"></div>
            <!-- End post-content -->
            <div class="clearfix"></div>
          </div>
          <!-- End post-inner -->
        </article>
        <!-- End article.post -->
        <!-- <div class="share-tags page-content">
          <div class="post-tags">
            <i class="icon-tags"></i>
            <a href="#">projects</a>,
            <a href="#">Portfolio</a>,
            <a href="#">Wordpress</a>,
            <a href="#">Html</a>,
            <a href="#">Css</a>,
            <a href="#">jQuery</a>,
            <a href="#">2code</a>,
            <a href="#">vbegy</a>
          </div>
          <div class="share-inside-warp">
            <ul>
              <li>
                <a href="#" original-title="Facebook">
                  <span class="icon_i">
                    <span
                      class="icon_square"
                      icon_size="20"
                      span_bg="#3b5997"
                      span_hover="#666"
                      style="height: 20px; width: 20px; font-size: 10px; line-height: 20px; background-color: rgb(59, 89, 151); border-style: solid;"
                    >
                      <i
                        i_color="#FFF"
                        class="social_icon-facebook"
                        style="color: rgb(255, 255, 255);"
                      ></i>
                    </span>
                  </span>
                </a>
                <a href="#" target="_blank">Facebook</a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <span class="icon_i">
                    <span
                      class="icon_square"
                      icon_size="20"
                      span_bg="#00baf0"
                      span_hover="#666"
                      style="height: 20px; width: 20px; font-size: 10px; line-height: 20px; background-color: rgb(0, 186, 240); border-style: solid;"
                    >
                      <i
                        i_color="#FFF"
                        class="social_icon-twitter"
                        style="color: rgb(255, 255, 255);"
                      ></i>
                    </span>
                  </span>
                </a>
                <a target="_blank" href="#">Twitter</a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <span class="icon_i">
                    <span
                      class="icon_square"
                      icon_size="20"
                      span_bg="#ca2c24"
                      span_hover="#666"
                      style="height: 20px; width: 20px; font-size: 10px; line-height: 20px; background-color: rgb(202, 44, 36); border-style: solid;"
                    >
                      <i
                        i_color="#FFF"
                        class="social_icon-gplus"
                        style="color: rgb(255, 255, 255);"
                      ></i>
                    </span>
                  </span>
                </a>
                <a href="#" target="_blank">Google plus</a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <span class="icon_i">
                    <span
                      class="icon_square"
                      icon_size="20"
                      span_bg="#e64281"
                      span_hover="#666"
                      style="height: 20px; width: 20px; font-size: 10px; line-height: 20px; background-color: rgb(230, 66, 129); border-style: solid;"
                    >
                      <i
                        i_color="#FFF"
                        class="social_icon-dribbble"
                        style="color: rgb(255, 255, 255);"
                      ></i>
                    </span>
                  </span>
                </a>
                <a href="#" target="_blank">Dribbble</a>
              </li>
              <li>
                <a target="_blank" href="#">
                  <span class="icon_i">
                    <span
                      class="icon_square"
                      icon_size="20"
                      span_bg="#c7151a"
                      span_hover="#666"
                      style="height: 20px; width: 20px; font-size: 10px; line-height: 20px; background-color: rgb(199, 21, 26); border-style: solid;"
                    >
                      <i i_color="#FFF" class="icon-pinterest" style="color: rgb(255, 255, 255);"></i>
                    </span>
                  </span>
                </a>
                <a href="#" target="_blank">Pinterest</a>
              </li>
            </ul>
            <span class="share-inside-f-arrow"></span>
            <span class="share-inside-l-arrow"></span>
          </div>
          <div class="share-inside">
            <i class="icon-share-alt"></i>Share
          </div>
          <div class="clearfix"></div>
        </div> -->
        <!-- End share-tags -->
        <!-- <div class="about-author clearfix">
          <div class="author-image">
            <a href="#" original-title="admin" class="tooltip-n">
            </a>
          </div>
          <div class="author-bio">
            <h4>About the Author</h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra auctor neque. Nullam lobortis, sapien vitae lobortis tristique.
          </div>
        </div> -->
        <!-- End about-author -->
        <!-- <div id="related-posts">
          <h2>Related Posts</h2>
          <ul class="related-posts">
            <li class="related-item">
              <h3>
                <a href="#">
                  <i class="icon-double-angle-right"></i>This is a Standard Post .
                </a>
              </h3>
            </li>
            <li class="related-item">
              <h3>
                <a href="#">
                  <i class="icon-double-angle-right"></i>Post Without Image .
                </a>
              </h3>
            </li>
            <li class="related-item">
              <h3>
                <a href="#">
                  <i class="icon-double-angle-right"></i>Beautiful Gallery Post .
                </a>
              </h3>
            </li>
            <li class="related-item">
              <h3>
                <a href="#">
                  <i class="icon-double-angle-right"></i>This Is A Video Post .
                </a>
              </h3>
            </li>
          </ul>
        </div> -->
        <!-- End related-posts -->
        <!-- <div id="commentlist" class="page-content">
          <div class="boxedtitle page-title">
            <h2>
              Comments (
              <span class="color">5</span> )
            </h2>
          </div>
          <VueDisqus
            shortname="https-www-sumanix-com"
            :identifier="blogId"
            v-bind:url="'/' + blogId"
          ></VueDisqus>
        </div> -->
        <!-- End page-content -->
        <!-- <div id="respond" class="comment-respond page-content clearfix">
          <div class="boxedtitle page-title">
            <h2>Leave a reply</h2>
          </div>
          <form action="#" method="post" id="commentform" class="comment-form">
            <div id="respond-inputs" class="clearfix">
              <p>
                <label class="required" for="comment_name">
                  Name
                  <span>*</span>
                </label>
                <input name="author" type="text" value id="comment_name" aria-required="true">
              </p>
              <p>
                <label class="required" for="comment_email">
                  E-Mail
                  <span>*</span>
                </label>
                <input name="email" type="text" value id="comment_email" aria-required="true">
              </p>
              <p class="last">
                <label class="required" for="comment_url">
                  Website
                  <span>*</span>
                </label>
                <input name="url" type="text" value id="comment_url">
              </p>
            </div>
            <div id="respond-textarea">
              <p>
                <label class="required" for="comment">
                  Comment
                  <span>*</span>
                </label>
                <textarea id="comment" name="comment" aria-required="true" cols="58" rows="10"></textarea>
              </p>
            </div>
            <p class="form-submit">
              <input
                name="submit"
                type="submit"
                id="submit"
                value="Post Comment"
                class="button small color"
              >
            </p>
          </form>
        </div>-->
        <!-- <div class="post-next-prev clearfix">
          <p class="prev-post">
            <a href="#">
              <i class="icon-double-angle-left"></i>&nbsp;Prev post
            </a>
          </p>
          <p class="next-post">
            <a href="#">
              Next post&nbsp;
              <i class="icon-double-angle-right"></i>
            </a>
          </p>
        </div> -->
        <!-- End post-next-prev -->
      </div>
      <!-- End main -->
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue';
// import VueDisqus from 'vue-disqus/src';
import { spinnerMixin, breadcrumbMixin } from '../../mixins';

export default {
  name: 'BlogDetail',
  data() {
    return {
      blogId: '',
      blog: {},
    };
  },
  components: {
    Spinner,
    // VueDisqus,
  },
  mixins: [spinnerMixin, breadcrumbMixin],
  methods: {
    getBlogById(blogId) {
      const url = `${this.$BASE_URL}api/v1/admin/blog/${blogId}`;
      this.$http.get(url).then((response) => {
        this.blog = response.data.data;
        this.spinner.status = false;
        document.title = this.title(this.blog.title);
      });
    },
  },
  created() {
    this.blogId = this.$route.params.slug;
    this.getBlogById(this.blogId);
  },
  computed: {
    timestamp() {
      return item => this.$moment(item.createdAt).fromNow();
    },
  },
};
</script>
