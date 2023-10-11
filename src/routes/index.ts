import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.Welcome]: {
    component: asyncComponentLoader(() => import('@/display/pages/Welcome')),
    path: `/`,
    title: 'Welcome',
  },
  [Pages.Chat]: {
    component: asyncComponentLoader(() => import('@/display/pages/Chat')),
    path: `/chat`,
    title: 'Chat',
  },
  [Pages.SetTask]: {
    component: asyncComponentLoader(() => import('@/display/pages/SetTask')),
    path: `/set-task`,
    title: 'Set Task',
  },
  [Pages.History]: {
    component: asyncComponentLoader(() => import('@/display/pages/History')),
    path: `/history`,
    title: 'History',
  },
  [Pages.AuthCallback]: {
    component: asyncComponentLoader(() => import('@/display/pages/AuthCallback')),
    path: `/auth/callback`,
    title: 'Auth Callback',
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/display/pages/NotFound')),
    path: '*',
  },
};

export default routes;
