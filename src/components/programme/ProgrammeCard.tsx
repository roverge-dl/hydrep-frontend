// Using the reusable button we made

import { BiChevronRight } from "react-icons/bi";
import Button from "../forms/Button";
import { LuFileText } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
// import { IoLocationOutline } from "react-icons/io5";
import { IoCalendarClearOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
// import { GoClockFill } from "react-icons/go";
import { HiOutlineClock } from "react-icons/hi2";

interface ProgrammeProps {
  title: string;
  status: string;
  categoryColor?: string;
  description: string;
  spots: number;
  deadline: string;
  // region: string;
  duration: string;
  slug: string;
  handleApply: () => void;
}

export default function ProgrammeCard({
  title,
  status,
  categoryColor,
  description,
  spots,
  deadline,
  // region,
  duration,
  slug,
  handleApply,
}: ProgrammeProps) {
  return (
    <div className="bg-white border border-hgrey-500 rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow border-t-8 border-t-hgreen-500 col-span-1">
      <div className="p-5 flex-1">
        {/* Header: Icon & Category Tag */}
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 bg-hgreen-50 rounded-xl flex items-center justify-center bg-[#F1F5F9]">
            <LuFileText className="w-6 h-6 text-hgreen-500" />
          </div>
          <span
            className={`px-3 py-1 rounded-md text-[10px] font-semibold capitalize tracking-wider ${categoryColor}`}>
            {status}
          </span>
        </div>

        {/* Content */}
        <h3
          className="font-semibold text-hdark-600 text-base mb-2 leading-tight line-clamp-1"
          title={title}>
          {title}
        </h3>
        <p
          className="text-sm text-[#64748B] line-clamp-2 mb-6"
          title={description}>
          {description}
        </p>

        {/* Metadata List */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[#475569]">
            <LuUsers className="text-[#94A3B8] w-5 h-5" />
            <span className="text-xs font-medium">
              {spots.toLocaleString()} spots remaining
            </span>
          </div>
          <div className="flex items-center gap-3 text-[#475569]">
            <IoCalendarClearOutline className="text-[#94A3B8] w-5 h-5" />
            <span className="text-xs font-medium">
              Deadline: {deadline.split("T")[0]}
            </span>
          </div>
          {/* <div className="flex items-center gap-3 text-[#475569]">
            <IoLocationOutline className="text-slate-400 w-5 h-5" />
            <span className="text-xs font-medium truncate">{region}</span>
          </div> */}
          <div className="flex items-center gap-3 text-[#475569]">
            <HiOutlineClock className="text-[#94A3B8] w-5 h-5" />
            <span className="text-xs font-medium">Duration: {duration}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <Link className="p-5 pt-0" to={`/programmes/${slug}`}>
        <Button
          onClick={handleApply}
          variant="primary"
          rightIcon={<BiChevronRight size={18} />}
          className="text-sm w-full">
          Apply Now
        </Button>
      </Link>
    </div>
  );
}
