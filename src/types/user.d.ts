import type { ProgrammeFormData } from "./programFormData";

interface User {
  id: string;
  email: string;
  name?: string;
}

export interface UserData extends ProgrammeFormData {
  id: string;
  token: { token: string };
  user: User;
}
