import { lazy } from 'react';
const Details = lazy(() => import('../pages/Details'));
const Tables = lazy(() => import('../pages/Tables'));
const coreRoutes = [
  {
    path: '/results',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/results/:code',
    title: 'Details',
    component: Details,
  }
];

const routes = [...coreRoutes];
export default routes;
