import { lazy } from 'react';
const Details = lazy(() => import('../pages/Details'));
const Tables = lazy(() => import('../pages/Tables'));
const AddSurveyResult = lazy(() => import('../pages/Parish/AddSurveryResult'));
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
  },
  {
    path: '/add-survey-stats',
    title: 'Add Survey Result',
    component: AddSurveyResult,
  }
];

const routes = [...coreRoutes];
export default routes;
