import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Home from './views/Home.vue';
import Register from './views/Register.vue';
import EmailVerification from './views/EmailVerification.vue';
import Profile from './views/Profile.vue';
import Username from './views/Username.vue';
import ProfileUpdate from './views/ProfileUpdate.vue';
import QuestionUpdate from './views/QuestionUpdate.vue';
import AskQuestion from './views/AskQuestion.vue';
import QuestionDetail from './views/QuestionDetail.vue';
import changePassword from './views/changePassword.vue';
import Tag from './views/Tag.vue';
import requireAuth from './services/requireAuth';
import localStorageService from './services/localStorage';
import AppMyQuestion from '@/components/AppMyQuestion.vue';
import AppMyAnswer from '@/components/AppMyAnswer.vue';

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
      path: '/@:username',
      component: Username,
      children: [
        {
          path: '/',
          component: Profile,
        },
        {
          path: 'profile/update',
          component: ProfileUpdate,
          beforeEnter: requireAuth,
        },
        {
          path: 'profile/password',
          component: changePassword,
          beforeEnter: requireAuth,
        },
        {
          path: 'question',
          component: AppMyQuestion,
        },
        {
          path: 'answer',
          component: AppMyAnswer,
        },
      ],
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
      path: '/questions/tagged/:slug',
      name: 'tagQuestion',
      component: Home,
    },
    {
      path: '/blog',
      component: () => import(/* webpackChunkName: "about" */ './views/blog/index.vue'),
      children: [
        {
          path: '/',
          component: () => import(/* webpackChunkName: "about" */ './views/blog/list.vue'),
          meta: {
            layout: 'blog',
          },
        },
        {
          path: 'add',
          component: () => import(/* webpackChunkName: "about" */ './views/blog/add.vue'),
          meta: {
            layout: 'blog',
          },
          beforeEnter: requireAuth,
        },
        {
          path: 'update/:slug',
          component: () => import(/* webpackChunkName: "about" */ './views/blog/update.vue'),
          beforeEnter: requireAuth,
          meta: {
            layout: 'blog',
          },
        },
        {
          path: ':slug',
          component: () => import(/* webpackChunkName: "about" */ './views/blog/detail.vue'),
          meta: {
            layout: 'blog',
          },
        },
      ],
    },
    {
      path: '*',
      name: '404',
      component: () => import(/* webpackChunkName: "about" */ './views/404.vue'),
    },
    {
      path: '/about',
      name: 'about',
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
