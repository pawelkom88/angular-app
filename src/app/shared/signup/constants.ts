export const labels = {
  username: 'Email',
  password: 'Password',
  confirmPassword: 'Confirm password',
} as const;

export type Labels = keyof typeof labels;

export const PASSWORD_REGEX =
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$';

export const PASSWORD_MIN_LENGTH = 6;
