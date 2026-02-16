interface User {
  id: string;
  email: string;
  name?: string;
}

export interface UserData {
  token: { token: string };
  user: User;
}
