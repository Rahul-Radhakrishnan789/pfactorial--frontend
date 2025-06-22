import { useForm, type UseFormProps, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType, type ZodTypeAny, z } from 'zod';

type SubmitHandler<T extends ZodType<any, any, any>> = (data: z.infer<T>) => void;

export const useGlobalHookForm = <T extends ZodTypeAny>(
  schema: T,
  defaultValues: z.infer<T>,
  onSubmit: SubmitHandler<T>,
  options: Partial<UseFormProps<z.infer<T>>> = {}
): {
  methods: UseFormReturn<z.infer<T>>;
  handleSubmit: () => void;
} => {
  const methods = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onBlur',
    ...options,
  });

  const handleSubmit = methods.handleSubmit(onSubmit);

  return { methods, handleSubmit };
};
