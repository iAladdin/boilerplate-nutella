import Loadable from 'react-loadable';

export default [
  {
    path: '/',
    component: Loadable({ loader: () => import('./containers/App'), loading: () => null }),
    routes: [
      {
        path: '/posts',
        component: Loadable({ loader: () => import('./containers/PostListPage'), loading: () => null }),
      },
      {
        component: Loadable({ loader: () => import('./components/NotFound'), loading: () => null }),
      },
    ],
  },
  {
    component: Loadable({ loader: () => import('./components/NotFound'), loading: () => null }),
  },
];
