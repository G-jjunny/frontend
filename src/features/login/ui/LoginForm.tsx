import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { authQueries } from '../api/queries';
import loginSchema, { type LoginSchemaType } from '../model/schema';

import RHFInput from './RHFinput';

import { userService } from '@/entities/user/api/service';
import { isSystemAccount } from '@/entities/user/model/role';
import { isApiError } from '@/shared/api/error';
import { Button } from '@/shared/components/ui/button';
import { Form } from '@/shared/components/ui/form';
import { ROUTES } from '@/shared/constants/routes';

const LoginForm = () => {
  const navigate = useNavigate();
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { mutate } = useMutation({
    ...authQueries.login,
    onSuccess: async () => {
      // 로그인 성공 -> 페이지 이동
      const user = await userService.me(); // 유저 정보 1회 요청
      toast.success('로그인에 성공했습니다');

      // 역할에 따른 리다이렉트
      if (isSystemAccount(user.position)) {
        void navigate(ROUTES.WORK_STATUS);
      } else {
        void navigate(ROUTES.ROOT);
      }
    },
    onError: (error) => {
      if (isApiError(error)) {
        // 여기서부터는 ApiError 타입으로 안전하게 접근 가능
        switch (error.status) {
          case 401:
            form.setError('username', {
              message: '아이디 또는 비밀번호가 올바르지 않습니다.',
            });
            form.setError('password', {
              message: '아이디 또는 비밀번호가 올바르지 않습니다.',
            });
            return;

          case 403:
            toast.error('접근 권한이 없습니다.');
            return;

          case 422:
            toast.error(error.message);
            return;

          case 500:
            toast.error('서버 오류가 발생했습니다.');
            return;

          default:
            toast.error(error.message ?? '알 수 없는 오류가 발생했습니다.');
            return;
        }
      }

      // ApiError 아닌 경우 (예: 네트워크 오류)
      toast.error('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    },
  });

  const onSubmit = (values: LoginSchemaType) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form
        id="login-form"
        onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
        className="flex flex-col gap-4"
      >
        {/* TODOS : RHFInput shared 레이어로 변경 */}
        <RHFInput form={form} name="username" placeholder="ID" />

        <RHFInput
          type="password"
          form={form}
          name="password"
          placeholder="Password"
          className="font-sans"
        />

        <Button type="submit" className="mt-2 w-full bg-mega">
          로그인
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
