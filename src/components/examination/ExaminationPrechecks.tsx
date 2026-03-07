import { LuMonitorCheck } from "react-icons/lu";
import { useEffect, useState } from "react";
import { ReadinessItem, DetailCard } from "./ReadinessItem";
import PageLayout from "../ui/PageLayout";
import { GoBrowser } from "react-icons/go";
import { IoWifiOutline } from "react-icons/io5";
import { RiExpandDiagonalLine } from "react-icons/ri";
import { GrInfo } from "react-icons/gr";
import ExamInstructions from "./ExaminationInstructions";
import Button from "../forms/Button";
import { useNavigate, useParams } from "react-router-dom";
import {
  getExamSummary,
  startExam,
  type ExamSummary,
} from "../../services/api/examService";

const ExamPrechecks = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [exam, setExam] = useState<ExamSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id, programId } = useParams(); // expects route: /exams/:id/summary

  const handleStart = async () => {
    try {
      if (!id || !programId) return;

      const response = await startExam(id, programId);

      // Save EVERYTHING for offline execution
      localStorage.setItem(
        "activeExam",
        JSON.stringify({
          attempt: response.attempt,
          exam: response.exam,
        }),
      );

      navigate(`/exams/${id}/start`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchExam = async () => {
      try {
        if (!id) return;

        const response = await getExamSummary(id);
        console.log("Exam Summary Response:", response);
        setExam(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading exam details...</div>;
  }

  if (!exam) {
    return <div className="p-6 text-red-500">Exam not found.</div>;
  }

  return (
    <div className="max-w-4xl me-auto sm:p-6 mobilemd:p-2 p-0">
      <PageLayout
        isAction={false}
        title="Examination Instructions"
        subtitle={exam.title}
        children={null}
      />

      {/* System Readiness Section */}
      <section className="mobilemd:my-8 my-4">
        <h2 className="flex items-center gap-2 font-bold mb-4">
          <LuMonitorCheck size={20} /> System Readiness Check
        </h2>

        <ReadinessItem
          label="Browser Compatibility"
          status="success"
          icon={<GoBrowser className="text-hdark-300 h-5 w-5" />}
        />

        <ReadinessItem
          label="Internet Connection"
          status="success"
          icon={<IoWifiOutline className="text-hdark-300 h-6 w-6" />}
        />

        <ReadinessItem
          label="Fullscreen Mode"
          status="loading"
          subtext="Will activate on start"
          icon={<RiExpandDiagonalLine className="text-hdark-300 h-6 w-6" />}
        />
      </section>

      {/* Examination Details */}
      <section>
        <h2 className="flex items-center gap-2 font-bold mb-4">
          <GrInfo size={20} /> Examination Details
        </h2>

        <div className="flex mobilelg:gap-4 gap-2 mobilelg:mb-8 mb-4 mobilelg:flex-nowrap flex-wrap">
          <DetailCard
            label="Duration"
            value={`${exam.duration} min`}
            colorClass="bg-[#EFF6FF] text-[#1E3A8A]"
          />

          <DetailCard
            label="Questions"
            value={`${exam.questionsCount}`}
            colorClass="bg-[#FAF5FF] text-[#581C87]"
          />

          {/* <DetailCard
            label="Passing Score"
            value={`${exam.passMark} `}
            colorClass="bg-green-50 text-hgreen-600"
          /> */}
          <DetailCard
            label="Total Score"
            value={`${exam.totalMarks} `}
            colorClass="bg-orange-50 text-orange-600"
          />
        </div>
      </section>

      <ExamInstructions />

      {/* Start Action */}
      <div className="mt-4 p-4 bg-hgrey-500 rounded-lg">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            onChange={(e) => setIsChecked(e.target.checked)}
            className="w-5 h-5 accent-green-600"
          />
          <span className="text-sm text-gray-600">
            I have read and understood the rules.
          </span>
        </label>
      </div>

      <Button
        disabled={!isChecked}
        onClick={handleStart}
        className="w-7/12 px-4 ms-auto mt-4">
        Start Examination
      </Button>
    </div>
  );
};

export default ExamPrechecks;
