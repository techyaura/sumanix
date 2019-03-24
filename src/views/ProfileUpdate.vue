<template>
  <div class="page-content t-profile-update">
    <div class="boxedtitle page-title">
      <h2>Update Profile</h2>
      <!-- <router-link
              class="question-report"
              :to="{name: 'password'}"
              v-if="!spinner.status"
              style="background-color: #898989"
              >
                Change Password
      </router-link>-->
    </div>
    <Spinner
      :status="spinner.status"
      :color="spinner.color"
      :size="spinner.size"
      :depth="spinner.depth"
      :rotation="spinner.rotation"
      :speed="spinner.speed"
    />
    <div class="form-style form-style-4" v-if="!spinner.status">
      <form @submit.prevent="handleSubmit">
        <Notifiation v-if="err" :err="err"/>
        <div class="form-inputs clearfix">
          <p style="width:100% !important">
            <label class="required">Select Profile Picture</label>
            <span>
              <input v-model="user.avatar" type="radio" value="funkyhe.svg" @change="avatar">
              <span class="user-profile-img">
                <img
                  width="60"
                  height="60"
                  src="/img/profile/funkyhe.svg"
                  value="S"
                  alt="profile-pic"
                >
              </span>
            </span>
            <span>
              <input v-model="user.avatar" type="radio" value="buisness.svg" @change="avatar">
              <span class="user-profile-img">
                <img width="60" height="60" src="/img/profile/buisness.svg" alt="profile-pic">
              </span>
            </span>
            <span>
              <input v-model="user.avatar" type="radio" value="cool.svg" @change="avatar">
              <span class="user-profile-img">
                <img width="60" height="60" src="/img/profile/cool.svg" alt="profile-pic">
              </span>
            </span>
            <span>
              <input v-model="user.avatar" type="radio" value="funkyshe.svg" @change="avatar">
              <span class="user-profile-img">
                <img width="60" height="60" src="/img/profile/funkyshe.svg" alt="profile-pic">
              </span>
            </span>
            <span>
              <input v-model="user.avatar" type="radio" value="professional.svg" @change="avatar">
              <span class="user-profile-img">
                <img width="60" height="60" src="/img/profile/professional.svg" alt="profile-pic">
              </span>
            </span>
            <span>
              <input v-model="user.avatar" type="radio" value="stylish.svg" @change="avatar">
              <span class="user-profile-img">
                <img width="60" height="60" src="/img/profile/stylish.svg" alt="profile-pic">
              </span>
            </span>
          </p>
          <p>
            <label class="required">
              Username
              <span>*</span>
            </label>
            <input
              class="custom-input"
              type="text"
              v-model="user.username"
              v-on:keyup="checkUsername"
            >
          </p>
          <p>
            <label class="required">
              E-Mail
              <span>*</span>
            </label>
            <input class="custom-input" type="email" v-model="user.email">
          </p>
          <p>
            <label>First Name</label>
            <input class="custom-input" type="text" v-model="user.firstname">
          </p>
          <p>
            <label>Last Name</label>
            <input class="custom-input" type="text" v-model="user.lastname">
          </p>

          <p style="width: 100%;">
            <label>About Yourself</label>
            <textarea class="custom-input" cols="58" rows="8" v-model="user.bio"></textarea>
          </p>
        </div>
        <p class="form-submit">
          <input
            :disabled="isSubmit"
            type="submit"
            :value="!isSubmit? 'Save': 'Saving ...'"
            class="button color small login-submit submit"
          >
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import Notifiation from '@/components/Message.vue';
import Spinner from '@/components/Spinner.vue';
// import VueTagsInput from "@johmun/vue-tags-input";
import toast from '../services/toast';
import spinnerMixin from '../mixins/spinnerMixin';

export default {
  name: 'ProfileUpdate',
  components: {
    Spinner,
    Notifiation,
    // VueTagsInput
  },
  mixins: [spinnerMixin],
  data() {
    return {
      isSubmit: false,
      err: '',
      user: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        bio: '',
        avatar: 'funkyhe.svg',
      },
      // tag: "",
      // tags: [],
      // autocompleteItems: [],
      // debounce: null,
      isChecking: false,
    };
  },
  // watch: {
  //   tag: "initItems"
  // },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    avatar($event) {
      const { value } = $event.target;
      this.user.avatar = value;
    },
    checkUsername($event) {
      const username = $event.target.value;
      clearTimeout(this.debounce);
      if (username.trim()) {
        this.err = '';
        this.debounce = setTimeout(() => {
          this.$http
            .post(
              `${this.$BASE_URL}api/v1/auth/username`,
              { username },
              {
                errorHandle: false,
              },
            )
            .then((response) => {
              const { message, data } = response.data;
              if (!data) {
                this.isSubmit = false;
                this.user.username = '';
                this.err = message;
              }
            })
            .catch((err) => {
              this.isSubmit = false;
              this.err = err;
              this.scrollToTop();
            });
        }, 600);
      }
    },
    profile() {
      this.$http.get(`${this.$BASE_URL}api/v1/auth/user`).then((response) => {
        this.user = response.data.data;
        if (this.user && this.user.tags && this.user.tags.length) {
          this.tags = this.user.tags.map(tag => ({
            text: tag.name,
            _id: tag._id,
          }));
        }
        this.spinner.status = false;
      });
    },
    // update(newTags) {
    //   this.autocompleteItems = [];
    //   this.tags = newTags;
    // },
    // initItems() {
    //   if (this.tag.length < 2) return;
    //   const url = `${this.$BASE_URL}api/v1/tag?q=${this.tag}`;
    //   clearTimeout(this.debounce);
    //   this.debounce = setTimeout(() => {
    //     this.$http.get(url).then(response => {
    //       this.autocompleteItems = response.data.data.map(a => ({
    //         text: a.tag,
    //         _id: a._id
    //       }));
    //     });
    //   }, 600);
    // },
    handleSubmit() {
      this.isSubmit = true;
      this.err = '';
      const postData = {};
      // if (this.tags) {
      //   postData.tags = this.tags.map(tag => ({
      //     name: tag.text,
      //     _id: tag._id
      //   }));
      // }
      if (this.user.firstname) {
        postData.firstname = this.user.firstname;
      }
      if (this.user.bio) {
        postData.bio = this.user.bio;
      }
      if (this.user.lastname) {
        postData.lastname = this.user.lastname;
      }
      if (this.user.username) {
        postData.username = this.user.username;
      }
      if (this.user.email) {
        postData.email = this.user.email;
      }
      postData.avatar = this.user.avatar;
      this.$http
        .put(`${this.$BASE_URL}api/v1/auth/user`, postData, {
          errorHandle: false,
        })
        .then((response) => {
          const { message, data } = response.data;
          this.isSubmit = false;
          this.$store.dispatch('auth/updateUsername', {
            type: 'AUTH_UPDATE_USERNAME',
            payload: {
              username: data.username,
            },
          }).then(() => {
            toast.success(message);
            this.$router.push(`/@${data.username}`);
          });
        })
        .catch((err) => {
          this.isSubmit = false;
          this.err = err;
          this.scrollToTop();
        });
    },
  },
  mounted() {
    this.profile();
  },
};
</script>

<style scoped>
.t-profile-update .form-style-4 .form-inputs p {
  width: 100% !important;
}
.t-profile-update .form-style-4 input.submit {
  width: 21% !important;
  float: none !important;
}
.t-profile-update .form-style-4 .custom-input {
  color: #756464 !important;
}
/* .t-profile-update .form-style-4 input.button{
  background-color: #2f3239 !important;
} */
</style>
