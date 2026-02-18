// src/components/application/ApplicationDetailPersonalnfo.tsx
import React from "react";
import { type ApplicationDetailResponse } from "../../services/api/applicationService";

// Define strict props for this component
interface PersonalInfoProps {
  data: ApplicationDetailResponse['applicant'];
}

const DataRow = ({ label, value }: { label: string; value: string | undefined }) => (
    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
      <span className="text-xs text-hdark-300 font-medium whitespace-nowrap">
        {label}:
      </span>
      <span className="text-xs font-bold text-hdark-500 break-words">{value || "N/A"}</span>
    </div>
);
const ApplicationDetailPersonalnfo: React.FC<PersonalInfoProps> = ({ data }) => {
  
  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Section: Personal Info */}
      <div className="border border-hgrey-500 rounded-xl mobilelg:p-6 p-4 space-y-4 bg-white">
        <h3 className="text-sm font-bold text-hdark-500 mb-4 border-b pb-2">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          <DataRow label="Name" value={data.name} />
          <DataRow label="Gender" value={data.gender} />
          <DataRow label="Date of Birth" value={data.dob} />
          <DataRow label="NIN" value={data.nin} />
        </div>
      </div>

      {/* Section: Contact & Address */}
      <div className="border border-hgrey-500 rounded-xl mobilelg:p-6 p-4 space-y-4 bg-white">
        <h3 className="text-sm font-bold text-hdark-500 mb-4 border-b pb-2">
          Contact & Address
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          <DataRow label="Phone" value={data.phone} />
          <DataRow label="Email" value={data.email} />
          <div className="md:col-span-2">
            <DataRow label="Address" value={data.address} />
          </div>
        </div>
      </div>

      {/* Section: Background */}
      {/* <div className="border border-hgrey-500 rounded-xl mobilelg:p-6 p-4 space-y-4 bg-white">
        <h3 className="text-sm font-bold text-hdark-500 mb-4 border-b pb-2">Background</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          <DataRow label="Highest Education" value={data.highest_education} />
          <DataRow label="Institution" value={data.institution} />
          <DataRow label="Employment Status" value={data.employment_status} />
          <DataRow label="Occupation" value={data.occupation} />
        </div>
      </div> */}
    </div>
  );
};

export default ApplicationDetailPersonalnfo;