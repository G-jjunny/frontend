import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import workStatusSchema, { type WorkStatusSchemaType } from '../model/schema';
import { BUTTON_ACTIONS, BUTTON_LABELS, STATUS_TYPES } from '../model/status';

import type { WorkAction } from '@/entities/work-status/api/dto';

import { workStatusService } from '@/entities/work-status/api/service';
import { isApiError } from '@/shared/api/error';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Form } from '@/shared/components/ui/form';
import RHFInput from '@/shared/components/ui/RHFInput';

interface WorkStatusFormProps {
  type: (typeof STATUS_TYPES)[keyof typeof STATUS_TYPES];
}

const WorkStatusForm = ({ type }: WorkStatusFormProps) => {
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
    return form.handleSubmit((values: WorkStatusSchemaType) => {
      mutate({ action, data: values });
    });
  };

  const primaryAction = BUTTON_ACTIONS[type].PRIMARY;
  const secondaryAction = BUTTON_ACTIONS[type].SECONDARY;

  return (
    <Card>
      <CardHeader>
        <CardTitle>관리자님 환영합니다</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Form {...form}>
          <form id="work-status-form" className=" flex flex-col gap-2">
            <RHFInput form={form} name="username" placeholder="ID" disabled={isPending} />
            <RHFInput
              form={form}
              name="password"
              placeholder="PASSWORD"
              type="password"
              disabled={isPending}
            />
          </form>
        </Form>

        <Button
          className="w-full"
          onClick={(e) => void handleAction(primaryAction)(e)}
          disabled={isPending}
        >
          {isPending && currentAction === primaryAction
            ? '처리 중...'
            : BUTTON_LABELS[primaryAction]}
        </Button>
        <Button
          className="w-full"
          onClick={(e) => void handleAction(secondaryAction)(e)}
          variant="secondary"
          disabled={isPending}
        >
          {isPending && currentAction === secondaryAction
            ? '처리 중...'
            : BUTTON_LABELS[secondaryAction]}
        </Button>
      </CardContent>
    </Card>
  );
};

export default WorkStatusForm;
