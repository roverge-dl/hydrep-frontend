import Input from "../forms/Input";
import Select from "../forms/Select";
import type { StepChildProps } from "../../types/programFormData";

const Background: React.FC<StepChildProps> = ({
  formData,
  handleInputChange,
  fieldErrors,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-x-8 gap-x-4 mobilelg:gap-y-6 gap-y-4">
        {/* Field: First Name */}
        <div className="space-y-1.5">
          <Select
            label="Highest Level of Education"
            placeholder="Select level"
            value={formData.highestEducationLevel}
            name="highestEducationLevel"
            onChange={handleInputChange}
            error={fieldErrors.highestEducationLevel}
            options={[
              { label: "--select gender--", value: "s" },
              { label: "Male", value: "m" },
              { label: "Female", value: "f" },
            ]}
          />
        </div>
        <div className="space-y-1.5">
          <Input
            label="Institution Name"
            labelClass="text-start"
            name="institutionName"
            type="text"
            placeholder="Enter institution  name"
            value={formData.institutionName}
            onChange={handleInputChange}
            className="pl-4"
            error={fieldErrors.institutionName}
            required={false}
          />
        </div>
        <div className="space-y-1.5">
          <Input
            label="Year Completed"
            labelClass="text-start"
            name="yearCompleted"
            type="date"
            placeholder="Enter middle name"
            value={formData.yearCompleted}
            onChange={handleInputChange}
            className="pl-4"
            required={false}
            error={fieldErrors.yearCompleted}
          />
        </div>

        <div className="space-y-1.5">
          <Select
            label="Employment Status"
            placeholder="Select status"
            value={formData.employmentStatus}
            name="gender"
            onChange={handleInputChange}
            error={fieldErrors.employmentStatus}
            options={[
              { label: "--select status--", value: "s" },
              { label: "Employed", value: "m" },
              { label: "Unemployed", value: "f" },
            ]}
          />
        </div>

        <div className="space-y-1.5">
          <Input
            label="Occupation"
            labelClass="text-start"
            name="occupation"
            type="text"
            placeholder="Enter occupation"
            value={formData.occupation}
            onChange={handleInputChange}
            className="pl-4"
            error={fieldErrors.occupation}
            required={false}
          />
        </div>

        <div className="space-y-1.5">
          <Input
            label="Monthly Income(N)"
            labelClass="text-start"
            name="monthlyIncome"
            type="text"
            placeholder="Enter employer name"
            value={formData.monthlyIncome}
            onChange={handleInputChange}
            className="pl-4"
            error={fieldErrors.monthlyIncome}
            required={false}
          />
        </div>
      </div>
    </>
  );
};

export default Background;
