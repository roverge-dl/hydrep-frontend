import type { UserData } from "./user";

export interface ProgrammeFormData {
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
  documents?: File[];
  //Step 3
  // highestEducationLevel?: string;
  // institutionName?: string;
  // yearCompleted?: string;
  // employmentStatus?: string;
  // occupation?: string;
  // monthlyIncome?: string;
  // Step 4
  // documents?: File[];
}

export interface StepChildProps {
  formData: ProgrammeFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProgrammeFormData>>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  fieldErrors: Record<string, string | string[]>;
  setFieldErrors: React.Dispatch<
    React.SetStateAction<Record<string, string | string[]>>
  >;
  userData?: Partial<UserData>;
  setUserData?: React.Dispatch<React.SetStateAction<Partial<UserData>>>;
}
