/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../components/ui/PageLayout";
import ExaminationCard from "../components/examination/ExaminationCard";
import ExaminationProgressBadge from "../components/examination/ExaminationProgressBagde";
import { getEnrollmentExams } from "../services/api/examService";

// Keeping mock data for past results since the current backend response 
// doesn't include user's submitted scores or completed exam progress yet.
const PAST_EXAMS_MOCK = [
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
    id: 2,
    title: "Data Analysis Checkpoint",
    status: "Completed",
    percentageProgress: "50",
    score: 10,
    questions: 20,
    date: "21st June, 2025",
  },
];

export default function Examination() {
  // Grab applicationId from URL (used as enrollment ID based on your prompt)
  const { applicationId } = useParams<{ applicationId: string }>();
  const [programId, setProgramId] = useState<string | null>(null);
  
  const [upcomingExams, setUpcomingExams] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExams = async () => {
      if (!applicationId) return;
      
      try {
        setIsLoading(true);
        const enrollmentData = await getEnrollmentExams(applicationId);
        
        // Extract the exams array from the nested program object
        const examsList = enrollmentData?.program?.exams || [];
        setUpcomingExams(examsList);
        setProgramId(enrollmentData?.programId);
      } catch (err: any) {
        setError(err.message || "Failed to load examinations.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExams();
  }, [applicationId]);

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading exams...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <PageLayout
        isAction={false}
        subtitle="View upcoming exams and your results"
        title="My Examinations"
        children={null}
      />

      {/* Upcoming Exams Grid Layout */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-gray-700">Upcoming Exams</h3>
        {upcomingExams.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {upcomingExams.map((exam) => (
              <ExaminationCard 
                key={exam.id}
                title={exam.title}
                description={exam.description}
                // The backend doesn't explicitly return a 'questions' count, 
                // so we fallback to 'totalScore' for now.
                questions={exam.questionsCount} 
                time={exam.duration}
                status={exam.status}
                statusColor={exam.status === "published" ? "bg-[#D1FAE5] text-hgreen-500" : "bg-gray-200 text-gray-600"}
                examId={exam.id}
                programId={programId}
              />
            ))}
          </div>
        ) : (
          <div className="p-6 text-center border border-hgrey-500 rounded-xl bg-white text-gray-500">
            No upcoming exams found for this program.
          </div>
        )}
      </div>

      {/* Past/Completed Exams */}
      <div className="space-y-4">
         <h3 className="font-semibold text-lg text-gray-700">Past Results</h3>
        {PAST_EXAMS_MOCK.map((exam, i) => (
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