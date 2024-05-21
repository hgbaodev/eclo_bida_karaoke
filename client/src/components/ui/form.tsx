import type { Schema } from 'zod';
import { useEffect } from 'react';
import { useForm, SubmitHandler, UseFormReturn, UseFormProps, FieldValues, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type ServerErrors<T> = {
  [Property in keyof T]?: string;
};

type FormProps<TFormValues extends FieldValues> = {
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  useFormProps?: UseFormProps<TFormValues>;
  validationSchema?: Schema<TFormValues>;
  fieldErrors?: any[] | null;
  formError?: string | string[] | null | any;
  serverError?: ServerErrors<Partial<TFormValues>> | null;
  resetValues?: any | null;
  className?: string;
};

export const Form = <TFormValues extends Record<string, any> = Record<string, any>>({
  onSubmit,
  children,
  useFormProps,
  validationSchema,
  fieldErrors,
  formError,
  serverError,
  resetValues,
  className,
  ...formProps
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({
    ...useFormProps,
    ...(validationSchema && { resolver: zodResolver(validationSchema) }),
  });

  useEffect(() => {
    if (resetValues) {
      methods.reset(resetValues);
    }
  }, [resetValues, methods]);

  useEffect(() => {
    if (serverError) {
      Object.keys(serverError).forEach((field) => {
        methods.setError(field as Path<TFormValues>, {
          type: 'server',
          message: serverError[field as keyof TFormValues],
        });
      });
    }
  }, [serverError, methods]);

  // Watch for changes and clear server errors for fields that change
  useEffect(() => {
    const subscription = methods.watch((value, { name }) => {
      if (name && serverError && serverError[name as keyof TFormValues]) {
        methods.clearErrors(name as Path<TFormValues>);
      }
    });
    return () => subscription.unsubscribe();
  }, [methods, serverError]);

  const handleSubmit = async (data: TFormValues) => {
    const hasErrors = await methods.trigger();
    if (hasErrors) {
      onSubmit(data);
    }
  };

  return (
    <form noValidate onSubmit={methods.handleSubmit(handleSubmit)} {...formProps} className={className}>
      {children(methods)}
    </form>
  );
};
