export interface ProgrammeFormData {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  dob?: string;
  gender?: string;
  nin?: string;
  bvn?: string;
  // Add Step 2 fields here later...
  phone?: string;
  email?: string;
  address?: string;
  city: string;
  state: string;
  lga: string;
  //Step 3
  highestEducationLevel?: string;
  institutionName?: string;
  yearCompleted?: string;
  employmentStatus?: string;
  occupation?: string;
  monthlyIncome?: string;
  // Step 4
  documents?: File[];
}

export interface StepChildProps {
  formData: ProgrammeFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProgrammeFormData>>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  fieldErrors: Record<string, string>;
  setFieldErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}
