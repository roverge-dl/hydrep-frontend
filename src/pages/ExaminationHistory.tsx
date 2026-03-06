/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../components/ui/PageLayout";
import ExaminationCard from "../components/examination/ExaminationCard";
import ExaminationProgressBadge from "../components/examination/ExaminationProgressBagde";
import { getExamHistory, getUpcomingExams } from "../services/api/examService";

export default function ExaminationHistory() {
  // Grab applicationId from URL (used as enrollment ID based on your prompt)
  const { applicationId } = useParams<{ applicationId: string }>();
  const [programId, setProgramId] = useState<string | null>(null);

  const [upcomingExams, setUpcomingExams] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pastExams, setPastExams] = useState<any[]>([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        setIsLoading(true);
        const response = await getUpcomingExams();
        if (response.status === "success") {
          console.log("Upcoming Exams Response:", response);
          setUpcomingExams(response.data);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load examinations.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExams();
  }, []);
  useEffect(() => {
    const fetchExamsHistory = async () => {
      try {
        setIsLoading(true);
        const response = await getExamHistory();

        if (response.status === "success") {
          setPastExams(response.data);
          console.log(response);
        }

        // Extract the exams array from the nested program object
        // const examsList = enrollmentData?.program?.exams || [];
      } catch (err: any) {
        setError(err.message || "Failed to load examinations.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExamsHistory();
  }, []);

  if (isLoading) {
    return (
      <div className="p-8 text-center text-gray-500">Loading exams...</div>
    );
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingExams.map((exam) => (
              <ExaminationCard
                key={exam.id + Math.random()}
                title={exam?.title}
                description={exam?.description}
                // The backend doesn't explicitly return a 'questions' count,
                // so we fallback to 'totalScore' for now.
                questions={exam?.questionsCount}
                time={exam?.duration}
                status={exam?.status}
                statusColor={
                  exam.status === "published"
                    ? "bg-[#D1FAE5] text-hgreen-500"
                    : "bg-gray-200 text-gray-600"
                }
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
        <h3 className="font-semibold text-lg text-gray-700">Past Exams</h3>
        <div className="max-h-125 over p-8 border border-hdark-300 rounded-xl overflow-y-auto ">
          {pastExams.map((exam, i) => (
            <ExaminationProgressBadge
              key={i}
              title={exam?.exam.title}
              program={exam?.program.title}
              status={exam?.status}
              percentageProgress={exam?.percentage}
              score={exam?.score}
              date={exam?.startedAt.slice(0, 10) || "N/A"}
              totalScore={exam?.exam.totalScore}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
