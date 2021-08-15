import { createRouter, createWebHistory } from 'vue-router';

import MainPage from '@/pages/MainPage';
import PostsPage from '@/pages/PostsPage';
import AboutPage from '@/pages/AboutPage';
import SinglePostPage from '@/pages/SinglePostPage';
import PostsPageWithStore from '@/pages/PostsPageWithStore';

const routes = [
  {
    path: '/',
    component: MainPage,
  },
  {
    path: '/posts',
    component: PostsPage,
  },
  {
    path: '/about',
    component: AboutPage,
  },
  {
    path: '/posts/:id',
    component: SinglePostPage,
  },
  {
    path: '/store',
    component: PostsPageWithStore,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
