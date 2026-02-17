import type { ProgrammeFormData } from "./programFormData";

interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  dob?: string;
  gender?: string;
  nin?: string;
  bvn?: string;
  // Add Step 2 fields here later...
  phone?: string;
  email?: string;
  address?: string;
  community_id?: string;
  community?: string;
  state_id?: string;
  state?: string;
  lga_id?: string;
  lga?: string;
}

export interface UserData extends ProgrammeFormData {
  id: string;
  token: { token: string };
  user: User;
}
