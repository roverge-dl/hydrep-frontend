import React from "react";
import { BiCheckCircle } from "react-icons/bi";
import type { StepChildProps } from "../../types/programFormData";

const ApplicationReview: React.FC<StepChildProps> = ({ formData }) => {
  // Helper to render a data row
  const DataRow = ({
    label,
    value,
  }: {
    label: string;
    value: string | undefined;
  }) => (
    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
      <span className="text-xs text-hdark-300 font-medium whitespace-nowrap">
        {label}:
      </span>
      <span className="text-xs font-bold text-hdark-500">{value || "N/A"}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Success Banner */}
      <div className="bg-hgrey-300 border border-hgreen-500 rounded-xl p-4 flex items-center gap-3">
        <BiCheckCircle className="text-hgreen-500 " size={20} />
        <div>
          <h4 className="text-sm font-bold text-[#15803d]">Almost there!</h4>
          <p className="text-xs text-[#15803d]/80">
            Please review your information before submitting
          </p>
        </div>
      </div>

      {/* Section: Personal Info */}
      <div className="border border-hgrey-300 rounded-xl mobilemd:p-6 p-4 space-y-4">
        <h3 className="text-sm font-bold text-hdark-500 mb-4">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          <DataRow
            label="Name"
            value={`${formData.firstName} ${formData.middleName} ${formData.lastName}`}
          />
          <DataRow label="Gender" value={formData.gender} />
          <DataRow label="Date of Birth" value={formData.dob} />
          <DataRow label="NIN" value={formData.nin} />
        </div>
      </div>

      {/* Section: Contact & Address */}
      <div className="border border-hgrey-300 rounded-xl mobilemd:p-6 p-4 space-y-4">
        <h3 className="text-sm font-bold text-hdark-500 mb-4">
          Contact & Address
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          <DataRow label="Phone" value={formData.phone} />
          <DataRow label="Email" value={formData.email} />
          <div className="md:col-span-2">
            <DataRow label="Address" value={formData.address} />
          </div>
        </div>
      </div>

      {/* Section: Background */}
      <div className="border border-hgrey-300 rounded-xl mobilemd:p-6 p-4 space-y-4">
        <h3 className="text-sm font-bold text-hdark-500 mb-4">Background</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          <DataRow label="Education" value={formData.highestEducationLevel} />
          <DataRow label="Employment" value={formData.employmentStatus} />
        </div>
      </div>

      {/* Section: Documents */}
      <div className="border border-hgrey-300 rounded-xl mobilemd:p-6 p-4">
        <h3 className="text-sm font-bold text-hdark-500 mb-4">Documents</h3>
        <p className="text-xs text-gray-500">
          {formData?.documents?.length} document(s) uploaded
        </p>
      </div>
    </div>
  );
};

export default ApplicationReview;
