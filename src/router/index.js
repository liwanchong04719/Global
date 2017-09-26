import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Global from '@/components/Global';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hello',
      component: Hello,
    },
    {
      path: '/global',
      name: 'global',
      component: Global,
    },
  ],
});
