import {
  Dashboard,
} from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    { path: 'dashboard',
      name: 'Dashboard',
      component: Dashboard,
      isIndex: true,
    },
  ],
};
