import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import workStatusSchema, { type WorkStatusSchemaType } from '../model/schema';
import { BUTTON_LABELS, WORK_STATUS_ACTIONS } from '../model/status';

import type { WorkAction } from '@/entities/work-status/api/dto';

import { workStatusService } from '@/entities/work-status/api/service';
import { isApiError } from '@/shared/api/error';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Form } from '@/shared/components/ui/form';
import RHFInput from '@/shared/components/ui/RHFInput';

const WorkStatusForm = () => {
  const [currentAction, setCurrentAction] = useState<WorkAction | null>(null);

  const form = useForm({
    resolver: zodResolver(workStatusSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  // 단일 mutation으로 통합
  const { mutate, isPending } = useMutation({
    mutationFn: ({ action, data }: { action: WorkAction; data: WorkStatusSchemaType }) =>
      workStatusService.changeStatus(action, data),
    onSuccess: (_, variables) => {
      toast.success(`${BUTTON_LABELS[variables.action]} 처리되었습니다.`);
      form.reset();
      setCurrentAction(null);
    },
    onError: (error) => {
      if (isApiError(error)) {
        form.setError('username', {
          message: `${error.message}`,
        });
        form.setError('password', {
          message: `${error.message}`,
        });
      }
      console.log(error);
      setCurrentAction(null);
    },
  });

  // 공통 핸들러
  const handleAction = (action: WorkAction) => {
    return form.handleSubmit((values) => {
      setCurrentAction(action);
      mutate({ action, data: values });
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>관리자님 환영합니다</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Form {...form}>
          <form id="work-status-form" className=" flex flex-col gap-2">
            <div className=" flex gap-2">
              <RHFInput
                form={form}
                name="username"
                placeholder="ID"
                disabled={isPending}
                label="아이디"
              />
              <RHFInput
                form={form}
                name="password"
                placeholder="PASSWORD"
                type="password"
                disabled={isPending}
                label="패스워드"
              />
            </div>
          </form>
        </Form>
        <div className=" flex gap-3">
          {WORK_STATUS_ACTIONS.map(({ action, label, buttonVariant, icon: Icon }) => (
            <Button
              key={action}
              onClick={(e) => void handleAction(action)(e)}
              disabled={isPending}
              variant={buttonVariant}
              size="transparent"
              className="flex-1"
            >
              <div className="flex flex-col justify-center items-center gap-1">
                <Icon />
                {isPending && currentAction === action ? '처리 중...' : label}
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkStatusForm;
