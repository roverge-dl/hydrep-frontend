// Using the reusable button we made

import { BiChevronRight } from "react-icons/bi";
import Button from "../forms/Button";
import { IoTimeOutline } from "react-icons/io5";
import { SlGraduation } from "react-icons/sl";
import { FiFileText } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface ExaminationProps {
  title: string;
  description: string;
  questions: number;
  time: string;
  statusColor?: string;
  status?: string;
  examId: string;
  programId?: string | null;
}

export default function ExaminationCard({
  title,
  status,
  statusColor,
  description,
  questions,
  time,
  examId,
  programId,
}: ExaminationProps) {
  const navigate = useNavigate();
  return (
    <div className="bg-white border border-hgrey-500 rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow col-span-1">
      <div className="p-5 flex-1">
        {/* Header: Icon & Category Tag */}
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 bg-hgreen-50 rounded-xl flex items-center justify-center bg-[#D1FAE5]">
            <SlGraduation className="w-6 h-6 text-[#19BC5B]" />
          </div>
          {status && (
            <span
              className={`px-3 py-1 rounded-md text-[10px] font-semibold capitalize tracking-wider ${statusColor}`}>
              {status}
            </span>
          )}
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
            <IoTimeOutline className="text-[#94A3B8] w-5 h-5" />
            <span className="text-xs font-medium">{time} Minutes</span>
          </div>
          <div className="flex items-center gap-3 text-[#475569]">
            <FiFileText className="text-[#94A3B8] w-5 h-5" />
            <span className="text-xs font-medium">
              {questions?.toLocaleString()} Questions
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 pt-0">
        <Button
          onClick={() =>
            navigate(`/program/${programId}/exams/${examId}/prechecks`)
          }
          variant="primary"
          rightIcon={<BiChevronRight size={18} />}
          className="text-sm w-full">
          Start Exam
        </Button>
      </div>
    </div>
  );
}
