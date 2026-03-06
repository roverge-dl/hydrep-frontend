import { IoCheckmarkCircleOutline, IoTimeOutline } from "react-icons/io5";

interface ExaminationProgressBadgeProps {
  title: string;
  program: string;
  date: string;
  status: String;
  percentageProgress: string;
  score: number;
  totalScore: number;
}

export default function ExaminationProgressBadge({
  title,
  program,
  date,
  status,
  percentageProgress,
  score,
  totalScore,
}: ExaminationProgressBadgeProps) {
  return (
    <div className="group bg-white border border-hgrey-500 rounded-xl p-4 mb-4 flex items-center justify-between hover:border-hgreen-500/30  transition-all cursor-pointer">
      <div className="flex items-center gap-4">
        {/* Icon wrapper */}
        <div className="w-11 h-11 bg-hgreen-50 rounded-xl flex items-center justify-center bg-[#D1FAE5]">
          <IoCheckmarkCircleOutline className="text-hgreen-500 w-6 h-6" />
        </div>

        <div>
          <div className="flex items-center">
            <span className="font-semibold text-sm text-hdark-500 leading-tight">
              {program}
            </span>{" "}
            <span className="mx-1 text-hgreen-500">•</span>
            <span className="font-normal text-sm text-hdark-400 leading-tight">
              {title}
            </span>
          </div>

          <p className="text-xs text-[#64748B] mt-1">
            {status} <span className="mx-1">•</span> {date}
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-base font-semibold text-hgreen-500">
          {percentageProgress}%
        </span>
        <span className="text-xs text-hdark-400">
          {score}/{totalScore} points
        </span>
      </div>
    </div>
  );
}
