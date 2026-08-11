/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect} from "react";
import { 
  BiCheckCircle, 
  BiFile, 
  BiLinkExternal, 
  BiCalendar, 
  BiBuilding 
} from "react-icons/bi";
import type { StepChildProps } from "../../types/programFormData";


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
      <span className="text-xs font-bold text-hdark-500 break-words">{value || "N/A"}</span>
    </div>
  );
const ApplicationReview: React.FC<StepChildProps> = ({ formData, userData, programCourses}) => {
  
  

  // Helper to convert the documents object into an array we can map over
  // We handle both Array (legacy) and Object (new implementation) structures just in case
  const documentsList = Array.isArray(formData.documents) 
    ? formData.documents 
    : formData.documents ? Object.values(formData.documents) : [];

  useEffect(() => {
    console.log('form data', formData);
  }, [])

  return (
    <div className="space-y-6">
      {/* Success Banner */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
        <BiCheckCircle className="text-green-600 shrink-0" size={24} />
        <div>
          <h4 className="text-sm font-bold text-green-700">Almost there!</h4>
          <p className="text-xs text-green-600/80">
            Please review your information carefully before submitting.
          </p>
        </div>
      </div>

      {/* Section: Personal Info */}
      <div className="border border-hgrey-300 rounded-xl p-4 md:p-6 space-y-4 bg-white">
        <h3 className="text-sm font-bold text-hdark-500 mb-2 border-b border-gray-100 pb-2">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <DataRow
            label="Full Name"
            value={`${formData.first_name} ${formData.middle_name || ''} ${formData.last_name}`}
          />
          <DataRow label="Gender" value={formData.gender} />
          <DataRow label="Date of Birth" value={formData.dob} />
          <DataRow label="NIN" value={formData.nin} />
        </div>
      </div>

      {/* Section: Contact & Address */}
      <div className="border border-hgrey-300 rounded-xl p-4 md:p-6 space-y-4 bg-white">
        <h3 className="text-sm font-bold text-hdark-500 mb-2 border-b border-gray-100 pb-2">
          Contact & Address
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <DataRow label="Phone" value={formData.phone} />
          <DataRow label="Email" value={formData.email} />
          <DataRow label="State" value={userData?.state} />
          <DataRow label="LGA" value={userData?.lga} />
          <DataRow label="Community" value={userData?.community} />
          <DataRow label="Address" value={formData.address} />
          {/* <div className="md:col-span-2">
            <DataRow label="Address" value={formData.address} />
          </div>
          <DataRow label="LGA" value={userData?.lga} /> */}
        </div>
      </div>

      {/* Section: Background */}
      <div className="border border-hgrey-300 rounded-xl p-4 md:p-6 space-y-4 bg-white">
        <h3 className="text-sm font-bold text-hdark-500 mb-2 border-b border-gray-100 pb-2">
          Selected Courses
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {programCourses?.filter((course) => formData.selectedCourses?.includes(course.value))?.map((course: any, index:number) => (
            <div className="md:col-span-2">
            <DataRow label={`Course ${index + 1}`} value={course.label} key={course.value} />
            </div>
          ))}
          {/* <DataRow label="Education" value={formData.highestEducationLevel} />
          <DataRow label="Employment" value={formData.employmentStatus} /> */}
        </div>
      </div>

      {/* Section: Documents */}
      <div className="border border-hgrey-300 rounded-xl p-4 md:p-6 bg-white">
        <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
          <h3 className="text-sm font-bold text-hdark-500">Documents</h3>
          <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">
            {documentsList.length} Attached
          </span>
        </div>
        
        {documentsList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {documentsList.map((doc: any, index: number) => (
              <div 
                key={index} 
                className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg group hover:border-hgreen-500/50 transition-all"
              >
                {/* File Icon */}
                <div className="p-2 bg-white rounded border border-gray-100 text-hgreen-500 shrink-0">
                  <BiFile size={20} />
                </div>

                {/* Document Details */}
                <div className="flex-1 min-w-0">
                  {/* We use issuer as a title proxy if available, otherwise generic */}
                  <p className="text-xs font-bold text-hdark-500 truncate">
                     {doc.issuer ? `${doc.issuer} Document` : `Document #${index + 1}`}
                  </p>
                  
                  <div className="flex flex-col gap-1 mt-1">
                    {doc.issuer && (
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                        <BiBuilding size={10} />
                        <span className="truncate">{doc.issuer}</span>
                      </div>
                    )}
                    {doc.dateIssued && (
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                         <BiCalendar size={10} />
                         <span>Issued: {new Date(doc.dateIssued).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* View Link */}
                {doc.fileUrl && (
                  <a 
                    href={doc.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-1.5 text-gray-400 hover:text-hgreen-600 hover:bg-white rounded-md transition-colors"
                    title="View Document"
                  >
                    <BiLinkExternal size={16} />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            <p className="text-xs text-gray-400 italic">No documents uploaded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationReview;