/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/dashboard/ApplicationDetail.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Changed href to Link for SPA navigation
import { BsChevronLeft } from "react-icons/bs";
import { BiFile, BiLoaderAlt, BiErrorCircle } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { IoIosHourglass } from "react-icons/io";
import { HiArrowRight, HiArrowTopRightOnSquare } from "react-icons/hi2";
import { statusColors } from "../utils/statics";

// Components
import PageLayout from "../components/ui/PageLayout";
import ApplicationDetailPersonalnfo from "../components/application/ApplicationDetailPersonalnfo";

// Service
import { getApplicationDetails, type ApplicationDetailResponse } from "../services/api/applicationService";
import Button from "../components/forms/Button";

const TABS = [{ label: "Details" }, { label: "Documents" }];

const ApplicationDetail = () => {
  const { id } = useParams<{ id: string }>(); // Get ID from URL
  const [activeTab, setActiveTab] = useState("Details");
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [application, setApplication] = useState<ApplicationDetailResponse | null>(null);

  // Fetch Data on Mount
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getApplicationDetails(id);
        setApplication(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Could not load application details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // --- Render Loading State ---
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-hdark-400">
        <BiLoaderAlt className="animate-spin w-10 h-10 mb-3 text-green-600" />
        <p>Loading application details...</p>
      </div>
    );
  }

  // --- Render Error State ---
  if (error || !application) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-red-500">
        <BiErrorCircle className="w-12 h-12 mb-3" />
        <p className="text-lg font-semibold">Error Loading Application</p>
        <p className="text-sm text-gray-500">{error}</p>
        <Link to="/applications" className="mt-4 text-sm underline text-hdark-500">
          Go back to list
        </Link>
      </div>
    );
  }

  // --- Helper: Status Colors ---
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'bg-green-50 text-green-700 border-green-200';
      case 'rejected': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE]'; // Pending
    }
  };

  return (
    <>
      <Link className="flex items-center gap-4 mb-4" to="/applications">
        <BsChevronLeft className="w-3 h-3" />{" "}
        <span className="text-sm text-hdark-400 font-semibold">
          Back to Applications
        </span>
      </Link>
      
      <PageLayout
        title="Application Details"
        subtitle={`View details for ${application.application_no}`}
        isAction={false}
        children={null}
      />

      {/* Dynamic Status Banner */}
      <div className={`border rounded-xl p-4 flex items-center gap-3 my-8 ${getStatusColor(application.status)}`}>
        <IoIosHourglass size={20} />
        <div>
          <p className="text-sm font-medium">
            Status: {application.status}
          </p>
          <p className="text-xs opacity-80 mt-0.5">
            {application.status === 'Pending' 
              ? "Your application is currently being reviewed. You will be notified of updates."
              : `This application has been ${application.status.toLowerCase()}.`
            }
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar sm:w-fit bg-hwhite-400 h-fit rounded-lg mb-4 p-1">
        {TABS.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`
              whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer
              ${
                activeTab === tab.label
                  ? "bg-white text-green-500 shadow-sm border border-slate-100"
                  : "text-hdark-300 hover:text-hdark-500 hover:bg-slate-50"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex justify-between gap-6 laptopmd:flex-row flex-col-reverse">
        
        {/* LEFT COLUMN: Main Content */}
        {activeTab === "Details" && (
          <div className="laptopmd:w-8/12 w-full">
            {/* Pass the applicant data prop here */}
            <ApplicationDetailPersonalnfo data={application.applicant} />
          </div>
        )}

        {activeTab === "Documents" && (
          <div className="laptopmd:w-8/12 w-full bg-white p-6 border border-hgrey-500 rounded-xl h-fit">
            <h3 className="text-sm font-bold text-hdark-500 mb-4 border-b pb-2">
              Uploaded Documents ({application.documents.length})
            </h3>
            
            <div className="space-y-3">
              {application.documents.length > 0 ? (
                application.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-lg group hover:border-green-500/50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white border border-gray-100 rounded text-green-600">
                        <BiFile size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-hdark-500">
                          {doc.title}
                        </p>
                        <p className="text-[10px] text-gray-400 uppercase">
                          {doc.type}
                        </p>
                      </div>
                    </div>
                    
                    <a
                      href={doc.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-200"
                      title="View Document"
                    >
                      <HiArrowTopRightOnSquare size={18} />
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400 italic text-center py-4">
                  No documents found for this application.
                </p>
              )}
            </div>
          </div>
        )}

        {/* RIGHT COLUMN: Sidebar Summary */}
        <div className="laptopmd:w-4/12 w-full bg-white border border-hgrey-500 rounded-xl mobilelg:p-6 p-4 h-fit sticky top-4">
          <h3 className="text-sm font-bold text-hdark-500 mb-4">
            Application Summary
          </h3>
          
          <div className="flex justify-between">

            <div className={`flex items-center space-x-2 border border-${statusColors[application?.status?.toLowerCase() as keyof typeof statusColors]} rounded-lg p-2 bg-[#EFF6FF] w-fit mb-6`} >
              <FiSend className={`w-4 h-4 text-${statusColors[application?.status?.toLowerCase() as keyof typeof statusColors]}`} />
              <span className={`text-xs text-${statusColors[application?.status?.toLowerCase() as keyof typeof statusColors]} font-medium`}>
                {application.status}
              </span>
            </div>
            
           
          </div>
          

          <div className="flex flex-col gap-4 border-t border-gray-100 pt-4">
            <div className="flex justify-between items-start gap-4">
              <span className="text-xs text-hdark-300 font-medium whitespace-nowrap">
                Application #:
              </span>
              <span className="text-xs font-bold text-hdark-500 text-right break-all">
                {application.application_no}
              </span>
            </div>
            
            <div className="flex justify-between items-start gap-4">
              <span className="text-xs text-hdark-300 font-medium whitespace-nowrap">
                Programme:
              </span>
              <span className="text-xs font-bold text-hdark-500 text-right">
                {application.program.title}
              </span>
            </div>
            
            <div className="flex justify-between items-start gap-4">
              <span className="text-xs text-hdark-300 font-medium whitespace-nowrap">
                Date Submitted:
              </span>
              <span className="text-xs font-bold text-hdark-500 text-right">
                {application.submitted_at}
              </span>
            </div>
             <Button rightIcon={<HiArrowRight className="w-4 h-4" />}>
              
              <Link to={`/applications/${application.id}/exams`}>Start Exams</Link>
            </Button>
          </div>
        </div>

      </div>
    </>
  );
};

export default ApplicationDetail;