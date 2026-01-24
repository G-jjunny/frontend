import { createBrowserRouter, Navigate } from 'react-router';

import { ROUTES } from '../../shared/constants/routes';

import { AuthRoute } from './AuthRoute';

import {
  Communiity,
  DayoffPage,
  DayoffDetailPage,
  FreeboardPage,
  FreeBoardDetail,
  NoticePage,
  NoticeDetail,
  ShiftPage,
  ShiftDetailPage,
} from '@/pages/community';
import { HomePage } from '@/pages/home';
import TestPage from '@/pages/home/ui/TestPage';
import { LoginPage } from '@/pages/login';
import PayPage from '@/pages/payroll/PayPage';
import { WorkStatusPage } from '@/pages/work-status';
import { Layout } from '@/app/layouts/Layout';
import PublicLayout from '@/app/layouts/PublicLayout';

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: (
      <AuthRoute isPublic>
        <PublicLayout />
      </AuthRoute>
    ),
    children: [
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: '/test',
        element: <TestPage />,
      },
    ],
  },

  // Work Status - 시스템 계정 전용 (다른 계정도 접근 가능)
  {
    path: ROUTES.WORK_STATUS,
    element: (
      <AuthRoute allowSystem>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        index: true,
        element: <WorkStatusPage />,
      },
    ],
  },

  // Private routes - 크루/관리자만 접근 (시스템 계정 차단)
  {
    path: ROUTES.ROOT,
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.PAY,
        element: <PayPage />,
      },
      {
        path: ROUTES.COMMUNITY,
        element: <Communiity />,
        children: [
          {
            index: true,
            element: <Navigate to="notice" replace />,
          },
          {
            path: 'notice',
            children: [
              { index: true, element: <NoticePage /> },
              { path: ':id', element: <NoticeDetail /> },
            ],
          },
          {
            path: 'shift',
            children: [
              { index: true, element: <ShiftPage /> },
              { path: ':id', element: <ShiftDetailPage /> },
            ],
          },
          {
            path: 'dayoff',
            children: [
              { index: true, element: <DayoffPage /> },
              { path: ':id', element: <DayoffDetailPage /> },
            ],
          },
          {
            path: 'freeboard',
            children: [
              { index: true, element: <FreeboardPage /> },
              { path: ':id', element: <FreeBoardDetail /> },
            ],
          },
        ],
      },
      {
        path: ROUTES.WORK_STATUS,
        element: <WorkStatusPage />,
      },
    ],
  },
]);
