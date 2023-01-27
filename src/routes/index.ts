import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.Welcome]: {
    component: asyncComponentLoader(() => import('@/display/pages/Welcome')),
    path: '/qa/bat/',
    title: 'Welcome',
  },
  [Pages.Chat]: {
    component: asyncComponentLoader(() => import('@/display/pages/Chat')),
    path: '/qa/bat/chat',
    title: 'Chat',
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/display/pages/NotFound')),
    path: '*',
  },
};

export default routes;
