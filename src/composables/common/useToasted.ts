import { inject } from 'vue';

export type UseToasted = {
  error(label: string, timeout?: number): void;
  success(label: string, timeout?: number): void;
  warning(label: string, timeout?: number): void;
};

export const useToasted = (): UseToasted => {
  const toasted = inject('toasted') as UseToasted;
  return toasted;
};
