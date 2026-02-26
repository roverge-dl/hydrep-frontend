/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExaminationInprogress, {
  type QuestionAnswers,
} from "../components/examination/ExaminationInprogress";
import SubmissionModal from "../components/ui/modal/SubmitModal";

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

  if (!exam || !attempt) {
    navigate("/");
    return null;
  }

  const totalQuestions = exam.questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  const handleSubmitFinal = () => {
    console.log("Submitting:", selectedAnswers);

    // TODO: call submit endpoint

    localStorage.removeItem("activeExam");
    setShowModal(false);
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
          onReview={() => setShowModal(false)}
          onSubmit={handleSubmitFinal}
        />
      )}
    </>
  );
};

export default ExamInterface;