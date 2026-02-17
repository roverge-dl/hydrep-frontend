import Input from "../forms/Input";
import Select from "../forms/Select";
import type { StepChildProps } from "../../types/programFormData";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const PersonalInfo: React.FC<StepChildProps> = ({
  formData,
  handleInputChange,
  fieldErrors,
}) => {
  const [gender] = useState<{ label: string; value: string }[]>([
    { label: "--select gender--", value: "s" },
    { label: "Male", value: "m" },
    { label: "Female", value: "f" },
  ]);
  const { user } = useAuth();
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-x-8 gap-x-4  mobilelg:gap-y-6 gap-y-4">
        {/* Field: First Name */}
        <div className="space-y-1.5">
          <Input
            label="First Name"
            labelClass="text-start"
            name="first_name"
            type="text"
            placeholder="Enter first name"
            value={user?.first_name ? user?.first_name : formData.first_name}
            // defaultValue={user?.first_name}
            onChange={handleInputChange}
            className="pl-4"
            error={fieldErrors.first_name}
          />
        </div>

        {/* Field: Last Name */}
        <div className="space-y-1.5">
          <Input
            label="Last Name"
            labelClass="text-start"
            name="last_name"
            type="text"
            placeholder="Enter last name"
            value={user?.last_name ? user?.last_name : formData.last_name}
            onChange={handleInputChange}
            className="pl-4"
            error={fieldErrors.last_name}
          />
        </div>

        {/* Field: Middle Name */}
        <div className="space-y-1.5">
          <Input
            label="Middle Name"
            labelClass="text-start"
            name="middle_name"
            type="text"
            placeholder="Enter middle name"
            value={user?.middle_name ? user?.middle_name : formData.middle_name}
            onChange={handleInputChange}
            className="pl-4"
            required={false}
            error={fieldErrors.middle_name}
          />
        </div>

        <div className="space-y-1.5">
          <Input
            label="Date of Birth"
            labelClass="text-start"
            className="pl-4"
            name="dob"
            type="date"
            placeholder="Enter middle name"
            value={user?.dob ? user?.dob : formData.dob}
            onChange={handleInputChange}
            error={fieldErrors.dob}
          />
        </div>

        {/* Field: Gender */}
        <div className="space-y-1.5">
          <Select
            label="Gender"
            placeholder="Select gender"
            value={user?.gender ? user?.gender : formData.gender}
            name="gender"
            onChange={handleInputChange}
            error={fieldErrors.gender?.[0] || ""}
            options={gender}
          />
        </div>

        {/* Field: NIN */}
        <div className="space-y-1.5">
          <Input
            label="NIN (National ID)"
            labelClass="text-start"
            className="pl-4"
            name="nin"
            type="text  "
            placeholder="Enter NIN"
            value={user?.nin ? user?.nin : formData.nin}
            onChange={handleInputChange}
            error={fieldErrors.nin?.[0] || ""}
          />
        </div>

        {/* Field: BVN */}
        {/* <div className="space-y-1.5">
          <Input
            label="BVN"
            labelClass="text-start"
            name="bvn"
            type="text"
            placeholder="Enter BVN"
            value={formData.bvn}
            onChange={handleInputChange}
            className="pl-4"
            error={fieldErrors.bvn}
            required={false}
          />
        </div> */}
      </div>
    </>
  );
};

export default PersonalInfo;
