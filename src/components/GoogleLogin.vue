<template>
  <div id="google-signin-button">google</div>
</template>

<script src="https://apis.google.com/js/platform.js" async defer></script>
<script>
export default {
  name: "googleLogin",
  mounted() {
    // gapi.signin2.render("google-signin-button", {
    //   onsuccess: this.onSignIn
    // });
  },
  methods: {
    onSignIn(user) {
      const profile = user.getBasicProfile();
      console.log(profile);
    },
    loadGapi() {
      const jsElm = document.createElement("script");
      // set the type attribute
      jsElm.type = "application/javascript";
      // make the script element load file
      jsElm.src = "https://apis.google.com/js/platform.js";
      jsElm.setAttribute("defer", "");
      jsElm.setAttribute("async", "");
      // finally insert the element to the body element in order to load the script
      document.body.appendChild(jsElm);
      let firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(firstScriptTag, firstScriptTag);
      this.renderGoogleLogin();
    },
    renderGoogleLogin() {
      gapi.signin2.render("google-signin-button", {
        onsuccess: this.onSignIn
      });
    }
  },
  mounted() {
    this.loadGapi();
  }
};
</script>
