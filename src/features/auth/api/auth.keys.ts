export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
  validate: () => [...authKeys.all, 'validate'] as const,
};
