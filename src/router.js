import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Home from './views/Home.vue';
import Register from './views/Register.vue';
import EmailVerification from './views/EmailVerification.vue';
import Profile from './views/Profile.vue';
import ProfileUpdate from './views/ProfileUpdate.vue';
import QuestionUpdate from './views/QuestionUpdate.vue';
import AskQuestion from './views/AskQuestion.vue';
import QuestionDetail from './views/QuestionDetail.vue';
import changePassword from './views/changePassword.vue';
import Tag from './views/Tag.vue';
import requireAuth from './services/requireAuth';
import localStorageService from './services/localStorage';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter(to, from, next) {
        if (to.name === 'login' && localStorageService.getToken()) {
          return next(from.path);
        }
        return next();
      },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter(to, from, next) {
        if (to.name === 'register' && localStorageService.getToken()) {
          return next(from.path);
        }
        return next();
      },
    },
    {
      path: '/auth/account/user/:username/recover/:hash',
      name: 'resetPassword',
      component: Login,
    },
    {
      path: '/auth/user/:username/verify/:hash',
      name: 'emailVerification',
      component: EmailVerification,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: requireAuth,
    },
    {
      path: '/profile/update',
      name: 'profileUpdate',
      component: ProfileUpdate,
      beforeEnter: requireAuth,
    },
    {
      path: '/profile/password',
      name: 'password',
      component: changePassword,
      beforeEnter: requireAuth,
    },
    {
      path: '/addQuestion',
      name: 'addQuestion',
      component: AskQuestion,
      beforeEnter: requireAuth,
    },
    {
      path: '/question/:slug',
      name: 'questionDetail',
      component: QuestionDetail,
    },
    {
      path: '/question/update/:slug',
      name: 'questionUpdate',
      component: QuestionUpdate,
      beforeEnter: requireAuth,
    },
    {
      path: '/tags',
      name: 'tag',
      component: Tag,
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      props: route => ({ query: route.query.q }),
    },
    {
      path: '*',
      name: '404',
      component: () => import(/* webpackChunkName: "about" */ './views/404.vue'),
    },
    {
      path: '/questions/tagged/:slug',
      name: 'tagQuestion',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    // {
    //   path: '/services',
    //   name: 'service',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/Service.vue'),
    // },
    // {
    //   path: '/technologies',
    //   name: 'technology',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/Technology.vue'),
    // },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

// router.beforeResolve((to, from, next) => {
//   // If this isn't an initial page load.
//   if (to.name) {
//     // Start the route progress bar.
//     NProgress.start();
//   }
//   next();
// });

// router.afterEach((to, from) => {
//   // Complete the animation of the route progress bar.
//   NProgress.done();
// });

export default router;
