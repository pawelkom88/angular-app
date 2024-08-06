export type UserCredentials = {
  username: string;
  password: string;
};

export interface User extends UserCredentials {
  id: number;
}
