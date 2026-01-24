import { Navigate } from 'react-router';

import { ROUTES } from '../../shared/constants/routes';

import type { PropsWithChildren } from 'react';

import { isSystemAccount } from '@/entities/user/model/role';
import { useAuthStore } from '@/shared/model/authStore';

interface AuthRouteProps extends PropsWithChildren {
  isPublic?: boolean;
  requireAdmin?: boolean; // 관리자 전용 페이지
  allowSystem?: boolean; // 시스템 계정 접근 허용
}

export const AuthRoute = ({ isPublic, requireAdmin, allowSystem, children }: AuthRouteProps) => {
  // const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthenticated = true; // TODO: 임시로 true 설정, 나중에 원복
  const user = useAuthStore((state) => state.user);

  // 로그인 안 한 경우
  if (!isPublic && !isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // 로그인한 상태에서 public 페이지 접근 시
  if (isPublic && isAuthenticated && user) {
    // 시스템 계정은 work-status로 리다이렉트
    if (isSystemAccount(user.position)) {
      return <Navigate to={ROUTES.WORK_STATUS} replace />;
    }
    // 일반 유저는 메인으로
    return <Navigate to={ROUTES.ROOT} replace />;
  }

  // 인증된 상태에서 권한 체크
  if (isAuthenticated && user) {
    const userIsSystem = isSystemAccount(user.position);

    // 시스템 계정은 work-status만 접근 가능
    if (userIsSystem && !allowSystem) {
      return <Navigate to={ROUTES.WORK_STATUS} replace />;
    }

    // 관리자 전용 페이지에 일반 유저 접근 시
    if (requireAdmin && user.position !== '관리자') {
      return <Navigate to={ROUTES.ROOT} replace />;
    }
  }

  return <>{children}</>;
};
