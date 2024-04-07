export type User = {
  userId: number;
  email: string
  username: string;
  password: string;
};

export type PayloadLogin = Pick<User, 'email' | 'password'>

export type PayloadUser = Omit<User, 'userId'>