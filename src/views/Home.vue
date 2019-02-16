<template>
  <AppQuestion/>
</template>

<script>
import { sessionMixin, breadcrumbMixin } from '../mixins';
import AppQuestion from '@/components/AppQuestion.vue';

export default {
  name: 'home',
  components: {
    AppQuestion,
  },
  mixins: [sessionMixin, breadcrumbMixin],
  created() {
    document.title = this.title();
    if (!this.session.isLoggedIn && !this.$route.params.slug) {
      this.$vueEventBus.$emit('isHomePage', true);
    }
    if (this.$route.query.q) {
      document.title = this.title(`Questions containing ${this.$route.query.q}`);
    }
    if (this.$route.params.slug) {
      document.title = this.title(`${this.$route.params.slug} Questions`);
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$vueEventBus.$emit('isHomePage', false);
    next();
  },
  created(){
    console.log(`               
   SSSSSSSSSSSSSSS                                                                                 iiii  XXXXXXX       XXXXXXX
 SS:::::::::::::::S                                                                               i::::i X:::::X       X:::::X
S:::::SSSSSS::::::S                                                                                iiii  X:::::X       X:::::X
S:::::S     SSSSSSS                                                                                      X::::::X     X::::::X
S:::::S            uuuuuu    uuuuuu     mmmmmmm    mmmmmmm     aaaaaaaaaaaaa   nnnn  nnnnnnnn    iiiiiii XXX:::::X   X:::::XXX
S:::::S            u::::u    u::::u   mm:::::::m  m:::::::mm   a::::::::::::a  n:::nn::::::::nn  i:::::i    X:::::X X:::::X   
 S::::SSSS         u::::u    u::::u  m::::::::::mm::::::::::m  aaaaaaaaa:::::a n::::::::::::::nn  i::::i     X:::::X:::::X    
  SS::::::SSSSS    u::::u    u::::u  m::::::::::::::::::::::m           a::::a nn:::::::::::::::n i::::i      X:::::::::X     
    SSS::::::::SS  u::::u    u::::u  m:::::mmm::::::mmm:::::m    aaaaaaa:::::a   n:::::nnnn:::::n i::::i      X:::::::::X     
       SSSSSS::::S u::::u    u::::u  m::::m   m::::m   m::::m  aa::::::::::::a   n::::n    n::::n i::::i     X:::::X:::::X    
            S:::::Su::::u    u::::u  m::::m   m::::m   m::::m a::::aaaa::::::a   n::::n    n::::n i::::i    X:::::X X:::::X   
            S:::::Su:::::uuuu:::::u  m::::m   m::::m   m::::ma::::a    a:::::a   n::::n    n::::n i::::i XXX:::::X   X:::::XXX
SSSSSSS     S:::::Su:::::::::::::::uum::::m   m::::m   m::::ma::::a    a:::::a   n::::n    n::::ni::::::iX::::::X     X::::::X
S::::::SSSSSS:::::S u:::::::::::::::um::::m   m::::m   m::::ma:::::aaaa::::::a   n::::n    n::::ni::::::iX:::::X       X:::::X
S:::::::::::::::SS   uu::::::::uu:::um::::m   m::::m   m::::m a::::::::::aa:::a  n::::n    n::::ni::::::iX:::::X       X:::::X
 SSSSSSSSSSSSSSS       uuuuuuuu  uuuummmmmm   mmmmmm   mmmmmm  aaaaaaaaaa  aaaa  nnnnnn    nnnnnniiiiiiiiXXXXXXX       XXXXXXX`
    );
  }
};
</script>
