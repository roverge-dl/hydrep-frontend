import { BiChevronRight } from "react-icons/bi";
import { FiFileText } from "react-icons/fi";

interface ApplicationCardProps {
  title: string;
  id: string;
  date: string;
  status: string;
  viewDetails: () => void; // Fixed spelling from viewDetials
}

export default function ApplicationCard({
  title,
  id,
  date,
  status,
  viewDetails,
}: ApplicationCardProps) {
  return (
    <div
      className="group bg-white border border-slate-100 rounded-2xl p-4 mb-4 flex mobilemd:flex-row flex-col-reverse mobilemd:items-center justify-between hover:border-hgreen-500/30 hover:shadow-md transition-all cursor-pointer gap-y-4"
      onClick={viewDetails}>
      <div className="flex items-center gap-4">
        {/* Icon wrapper */}
        <div className="w-11 h-11 bg-hgreen-50 rounded-xl flex items-center justify-center bg-[#F1F5F9]">
          <FiFileText className="text-hgreen-500 w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold text-sm text-hdark-500 leading-tight">
            {title}
          </h3>
          <p className="text-xs text-[#64748B] mt-1 w-full  flex mobilelg:flex-nowrap flex-wrap ">
            <span className="mobilelg:w-fit w-full">{id}</span>{" "}
            <span className="mobilelg:block hidden mobilelg:w-fit mx-1">•</span>
            <span className="mobilelg:w-fit w-full"> Created {date}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 mobilemd:w-fit w-full justify-between mobilemd:justify-start">
        {/* Status Badge */}
        <div
          className={`flex items-center gap-2 ${status === "Approved" ? "bg-green-50 border border-green-500" : "bg-hgrey-300 border border-hdark-300"} h-10 px-3  rounded-lg`}>
          <FiFileText
            size={14}
            className={`${status === "Approved" ? "text-green-500" : "text-hdark-500"}`}
          />
          <span
            className={`text-xs font-medium text-hdark-500 ${status === "Approved" ? "text-green-500" : "text-hdark-500"}`}>
            {status}
          </span>
        </div>

        <BiChevronRight
          size={18}
          className="text-slate-300 group-hover:text-hgreen-500 transition-colors"
        />
      </div>
    </div>
  );
}
