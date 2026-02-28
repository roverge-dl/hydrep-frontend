/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExaminationInprogress, {
  type QuestionAnswers,
} from "../components/examination/ExaminationInprogress";
import SubmissionModal from "../components/ui/modal/SubmitModal";
import { submitExam } from "../services/api/examService";
import { toast } from "react-toastify";

const getInitialExamData = () => {
  const stored = localStorage.getItem("activeExam");
  if (!stored) return null;
  return JSON.parse(stored);
};

const ExamInterface = () => {
  const initialData = getInitialExamData();
  const navigate = useNavigate();

  const [exam] = useState<any>(initialData?.exam ?? null);
  const [attempt] = useState<any>(initialData?.attempt ?? null);
  const [selectedAnswers, setSelectedAnswers] =
    useState<QuestionAnswers>(initialData?.answers ?? {});
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!exam || !attempt) {
    navigate("/");
    return null;
  }

  const totalQuestions = exam.questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  /*
  -------------------------------------------------
    FORMAT ANSWERS FOR BACKEND
  -------------------------------------------------
  */
  const formatAnswers = () => {
    return Object.entries(selectedAnswers).map(
      ([questionId, optionId]) => ({
        questionId: Number(questionId),
        optionId,
      })
    );
  };

  /*
  -------------------------------------------------
    FINAL SUBMISSION
  -------------------------------------------------
  */
  const handleSubmitFinal = async () => {
    try {
      setIsSubmitting(true);

      const response = await submitExam(attempt.id, formatAnswers());
      console.log("response",  response);
      if(response.status === 'success'){
        toast.success(response.message);
        navigate(`/exams/${exam.id}/result/${attempt.id}`);
      }else{
        toast.error(response.message);
      } 
      
      
      // const result = await response.json();
     
      // if(result.stat)

      /*
        Clear local storage AFTER successful submission
      */
      // localStorage.removeItem("activeExam");

      /*
        Navigate to result page
        You can pass state or use a result route param
      */
      // navigate(`/exam-result/${attempt.id}`, {
      //   state: result.data,
      // });

    } catch (error: any) {
      console.error("Submission error:", error);
      alert(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
      setShowModal(false);
    }
  };

  return (
    <>
      <ExaminationInprogress
        exam={exam}
        attempt={attempt}
        setShowModal={setShowModal}
        selectedAnswers={selectedAnswers}
        setSelectedAnswers={setSelectedAnswers}
      />

      {showModal && (
        <SubmissionModal
          total={totalQuestions}
          answered={answeredCount}
          isSubmitting={isSubmitting}
          onReview={() => setShowModal(false)}
          onSubmit={handleSubmitFinal}
        />
      )}
    </>
  );
};

export default ExamInterface;