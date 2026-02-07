import PageLayout from "../components/ui/PageLayout";
import ExaminationCard from "../components/examination/ExaminationCard";
import ExaminationProgressBadge from "../components/examination/ExaminationProgressBagde";
import type { s } from "framer-motion/client";

const PROGRAMMES_DATA = [
  {
    title: "General Aptitude Test",
    status: "livelihood",
    statusColor: "bg-[#D1FAE5] text-hgreen-500",
    description: "Test your general knowledge and reasoning skills",
    questions: 5,
    time: "20",
  },
];

const examData = [
  {
    id: 1,
    title: "Skills Development Assessment",
    status: "Completed",
    percentageProgress: "100",
    score: 5,
    questions: 5,
    date: "31st May, 2023",
  },
  {
    id: 1,
    title: "Skills Development Assessment",
    status: "Completed",
    percentageProgress: "50",
    score: 10,
    questions: 20,
    date: "21st June, 2025",
  },
];

export default function Examination() {
  return (
    <div className="space-y-8">
      <PageLayout
        isAction={false}
        subtitle="View upcoming exams and your results"
        title="My Examinations"
        children={null}
      />

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {PROGRAMMES_DATA.map((prog, idx) => (
          <ExaminationCard key={idx} {...prog} />
        ))}
      </div>
      <div>
        {examData.map((exam, i) => (
          <ExaminationProgressBadge
            key={i}
            title={exam?.title}
            status={exam?.status}
            percentageProgress={exam?.percentageProgress}
            score={exam?.score}
            date={exam?.date}
            questions={exam?.questions}
          />
        ))}
      </div>
    </div>
  );
}
