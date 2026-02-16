import type { ProgrammeFormData } from "../../types/programFormData";

const ApplicationDetailPersonalnfo: React.FC<ProgrammeFormData> = ({}) => {
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
    <div className="">
      <div className="space-y-6 ">
        {/* Success Banner */}

        {/* Section: Personal Info */}
        <div className="border border-hgrey-500 rounded-xl mobilelg:p-6 p-4  space-y-4 bg-white">
          <h3 className="text-sm font-bold text-hdark-500 mb-4">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            <DataRow label="Name" value={``} />
            <DataRow label="Gender" value={""} />
            <DataRow label="Date of Birth" value={""} />
            <DataRow label="NIN" value={""} />
          </div>
        </div>

        {/* Section: Contact & Address */}
        <div className="border border-hgrey-500 rounded-xl mobilelg:p-6 p-4  space-y-4 bg-white">
          <h3 className="text-sm font-bold text-hdark-500 mb-4">
            Contact & Address
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            <DataRow label="Phone" value={""} />
            <DataRow label="Email" value={""} />
            <div className="md:col-span-2">
              <DataRow label="Address" value={""} />
            </div>
          </div>
        </div>

        {/* Section: Background */}
        <div className="border border-hgrey-500 rounded-xl mobilelg:p-6 p-4  space-y-4 bg-white">
          <h3 className="text-sm font-bold text-hdark-500 mb-4">Background</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            <DataRow label="Highest Education" value={""} />
            <DataRow label="Institution" value={""} />
            <DataRow label="Employment Status" value={""} />
            <DataRow label="Occupation" value={""} />
          </div>
        </div>

        {/* Section: Documents */}
        <div className="border border-hgrey-500 rounded-xl mobilelg:p-6 p-4  bg-white">
          <h3 className="text-sm font-bold text-hdark-500 mb-4">Documents</h3>
          <p className="text-xs text-gray-500">{""} document(s) uploaded</p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailPersonalnfo;
