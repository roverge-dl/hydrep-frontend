import { BsChevronLeft } from "react-icons/bs";
import PageLayout from "../components/ui/PageLayout";
import { BiFile } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { IoIosHourglass } from "react-icons/io";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { useState } from "react";
import ApplicationDetailPersonalnfo from "../components/application/ApplicationDetailPersonalnfo";

const TABS = [{ label: "Details" }, { label: "Documents" }];

const ApplicationDetail = () => {
  const [activeTab, setActiveTab] = useState("Details");
  return (
    <>
      <a className="flex items-center gap-4 mb-4" href="/programmes">
        <BsChevronLeft className="w-3 h-3" />{" "}
        <span className="text-sm text-hdark-400 font-semibold">
          Back to Programmes
        </span>
      </a>
      <PageLayout
        title="Programme Application"
        subtitle="Apply for a programme"
        isAction={false}
        children={null}
      />
      <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl p-4 flex items-center gap-3 my-8">
        <IoIosHourglass className="text-[#1E40AF] " size={20} />
        <div>
          <p className="text-sm text-[#1E40AF]">
            Your application is being reviewed. You will be notified of any
            updates.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar sm:w-fit  bg-hwhite-400 h-fit rounded-lg mb-4">
        {TABS.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`
              whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer
              ${
                activeTab === tab.label
                  ? "bg-white text-hgreen-500 shadow-xs border border-slate-100"
                  : "text-hdark-300 hover:text-hdark-500 hover:bg-slate-50"
              }
            `}>
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex justify-between gap-4 laptopmd:flex-row flex-col-reverse  ">
        {activeTab === "Details" && (
          <div className="laptopmd:w-8/12 tabletsm:w-10/12 w-full">
            <ApplicationDetailPersonalnfo />
          </div>
        )}
        {activeTab === "Documents" && (
          <div className="laptopmd:w-8/12 tabletsm:w-10/12 w-full bg-white p-4 rounded-lg h-fit">
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-hdark-500 mb-4">
                Uploaded Documents
              </h3>
              {/* {formData?.documents?.map((file, index) => ( */}
              <div
                //  key={index}
                className="flex items-center justify-between p-4 bg-gray-50/50 border border-gray-100 rounded-lg group hover:border-hgreen-500 transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white border border-gray-100 rounded text-green-600">
                    <BiFile size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-hdark-500">
                      {/* {file.name || `Document ${index + 1}`} */}
                      Document 1
                    </p>
                    <p className="text-[10px] text-gray-400 uppercase">
                      {/* {file.type.split("/")[1] || "File"} */}
                      JPG
                    </p>
                  </div>
                </div>
                <button
                  // onClick={() => removeFile(index)}
                  className="p-1  transition-colors text-hdark-500 h-8 w-8 rounded-lg hover:bg-hgrey-300 cursor-pointer">
                  <HiArrowTopRightOnSquare size={20} />
                </button>
              </div>
              {/* ))} */}

              {/* {formData?.documents?.length === 0 && (
                     <p className="text-xs text-gray-300 italic">
                       No documents uploaded yet.
                     </p>
                   )} */}
            </div>
          </div>
        )}
        <div className="laptopmd:w-4/12 tabletmd:w-6/12 tabletsm:w-8/12 w-full bg-white border border-hgrey-500 rounded-xl mobilelg:p-6 p-4 h-fit">
          <h3 className="text-sm font-bold text-hdark-500 mb-4">
            Application Status
          </h3>
          <div className="flex items-center space-x-2 border border-[#1D4ED8] rounded-lg p-2 bg-[#EFF6FF] w-fit">
            <FiSend className="w-5 h-5 text-[#1D4ED8]" />
            <span className="text-xs text-[#1D4ED8] font-medium">
              Submitted
            </span>
          </div>
          <div className="flex flex-col gap-4 border-t border-hgrey-500 pt-4 mt-4">
            <div className="flex justify-between">
              <span className="text-xs text-hdark-300 font-medium whitespace-nowrap">
                Application #:
              </span>
              <span className="text-xs font-bold text-hdark-500">
                APP-1770803708772
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-hdark-300 font-medium whitespace-nowrap">
                Programme:
              </span>
              <span className="text-xs font-bold text-hdark-500">
                APP-1770803708772
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-hdark-300 font-medium whitespace-nowrap">
                Submitted:
              </span>
              <span className="text-xs font-bold text-hdark-500">
                Feb 11, 2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationDetail;
