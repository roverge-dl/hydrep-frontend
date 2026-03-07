/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
// import { FiAward, FiX } from "react-icons/fi";
import { BiChevronLeft, BiHourglass } from "react-icons/bi";
import { LiaFileDownloadSolid } from "react-icons/lia";
import { LuFileQuestion } from "react-icons/lu";
import {
  IoCheckmarkCircleOutline,
  // IoCloseCircleOutline,
} from "react-icons/io5";
import { getExamResult } from "../../services/api/examService";
import Button from "../forms/Button";
import { toast } from "react-toastify";
import { BsHourglassSplit } from "react-icons/bs";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ExamResult = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchResult = async () => {
      if (!attemptId) return;
      try {
        setLoading(true);
        const response = await getExamResult(attemptId);

        // Assuming your backend returns { status: 'success', data: { ... } }
        if (response.status === "success") {
          setData(response.data);
          console.log("Exam Result Data:", response.data);
          // toast.success("Exam results loaded successfully!");
        } else {
          // toast.error("Failed to load exam results");
        }
      } catch (error: any) {
        console.error("Result Fetch Error:", error);
        toast.error(error.message || "Error fetching results");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [attemptId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hgreen-500"></div>
          <p className="text-gray-500 font-medium">Calculating your score...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <p className="text-red-500 mb-4">Could not retrieve result data.</p>
          <Button onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // Assuming data contains: score, total_questions, correct_count, incorrect_count, duration_minutes, etc.
  // Map backend fields to your UI needs
  // const score = data.metrics.score || 0;
  // const data.result.isPassed = score >= 70;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="sticky w-full top-0 bg-white shadow-sm rounded-lg p-4 flex justify-between items-center z-10">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-1 text-gray-500 hover:text-hdark-400 transition-colors font-medium text-sm">
          <BiChevronLeft size={24} /> Back to Dashboard
        </button>
        <div className="text-right">
          <h1 className="font-bold text-sm text-hdark-400 leading-none">
            {data.exam?.title || "Assessment Result"}
          </h1>
          <span className="text-[10px] text-gray-400 font-semibold capitalize tracking-wider">
            Reference: {attemptId?.slice(-8)}
          </span>
        </div>
      </header>

      <main className="mx-auto p-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="space-y-6 grid grid-cols-1 lg:grid-cols-6 gap-6">
          {/* MAIN SCORE CARD */}
          <motion.div
            variants={fadeInUp}
            className="bg-white rounded-2xl border border-hgrey-500 overflow-hidden shadow-sm col-span-1 lg:col-span-4">
            {/* <div
              className={`h-2 w-full ${data.result.isPassed ? "bg-hgreen-500" : "bg-red-500"}`}
            /> */}
            <div
              className={`h-2 w-full bg-orange-500`}
            />
            <div className="p-8 md:p-12 text-center">
              <div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 mb-4 border border-orange-500`}>
              {/* <div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 mb-4 border ${data.result.isPassed ? "border-hgreen-500" : "border-red-500"}`}> */}
                {/* {data.result.isPassed ? (
                  <FiAward className="text-hgreen-500" size={40} />
                ) : (
                  <FiX className="text-red-500" size={40} />
                )} */}
                <BiHourglass className="text-orange-500" size={40} />
              </div>
              <h2 className="text-4xl font-black text-hdark-400 mb-1">
                {data.metrics.scorePercentage}%
              </h2>
              {/* <p
                className={`font-bold uppercase tracking-widest text-sm ${data.result.isPassed ? "text-hgreen-600" : "text-red-600"}`}>
                {data.result.isPassed
                  ? "Assessment Passed"
                  : "Assessment Failed"}
              </p> */}
              <p
                className={`font-bold uppercase tracking-widest text-sm text-orange-600`}>
                  Assesment Completed
                {/* {data.result.isPassed
                  ? "Assessment Passed"
                  : "Assessment Failed"} */}
              </p>
              <p className="mt-4 text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
                {/* {data.result.isPassed
                  ? `${data.result.feedback}`
                  : `${data.result.feedback}`} */}
                  Pay attention to you mail for feedback and next steps.
              </p>
            </div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col md:flex-row gap-4 mx-auto max-w-xl px-8 pb-8">
              {data.result.isPassed ? (
                <button className="flex justify-center items-center gap-2 mx-auto cursor-pointer font-bold text-hdark-400 hover:text-hgreen-600 transition-colors">
                  <LiaFileDownloadSolid className="text-hgreen-500 w-8 h-8" />
                  Download Result PDF
                </button>
              ) : (
                <>
                  {/* <Button
                    onClick={() => navigate(`/exams/${examId}/`)}
                    className="flex-1 justify-center gap-2 py-4">
                    <FiRotateCcw /> Retake Assessment
                  </Button> */}
                  <Link to="/programmes" className="flex-1">
                    <Button
                      variant="ghost"
                      className="w-full border border-hgrey-500 bg-white py-4">
                      Back to Programmes
                    </Button>
                  </Link>
                </>
              )}
            </motion.div>
          </motion.div>

          {/* PERFORMANCE BREAKDOWN SIDEBAR */}
          <motion.div
            variants={fadeInUp}
            className="bg-white p-6 rounded-2xl border border-hgrey-500 shadow-sm col-span-1 lg:col-span-2 self-start">
            <h3 className="font-bold text-hdark-400 mb-4 text-sm uppercase tracking-wider">
              Performance Breakdown
            </h3>
            {/* <div className="space-y-4">
              <div className="flex justify-between text-xs text-gray-400">
                <span>Pass Requirement</span>
                <span>50%</span>
              </div>
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${data.metrics.scorePercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full ${data.result.isPassed ? "bg-hgreen-500" : "bg-red-500"}`}
                />
              </div>
            </div> */}

            <div className="grid grid-cols-2 mt-6 border-t border-hgrey-300">
              <StatItem
                label="Questions"
                value={data.metrics.totalQuestions || 0}
                icon={<LuFileQuestion className="text-blue-500 w-6 h-6" />}
              />
              <StatItem
                label="Correct"
                value={data.metrics.totalCorrect || 0}
                icon={
                  <IoCheckmarkCircleOutline className="text-hgreen-500 w-6 h-6" />
                }
              />
              <StatItem
                label="Attempted"
                value={data.metrics.totalAttempted}
                icon={
                  <IoCheckmarkCircleOutline className="text-orange-500 w-6 h-6" />
                }
              />
              <StatItem
                label="Time"
                value={`${data.metrics.timeSpent || 0}`}
                icon={<BsHourglassSplit className="text-orange-500 w-6 h-6" />}
              />
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

const StatItem = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: any;
  icon: React.ReactNode;
}) => (
  <div className="p-4 text-center border-b border-r last:border-r-0 border-hgrey-300">
    <div className="flex justify-center mb-1">{icon}</div>
    <div className="text-lg font-bold text-hdark-400 leading-none">{value}</div>
    <div className="text-[10px] text-gray-400 uppercase font-bold mt-1 tracking-tight">
      {label}
    </div>
  </div>
);

export default ExamResult;
