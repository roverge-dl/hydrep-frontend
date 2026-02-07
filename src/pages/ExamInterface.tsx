import { useState } from "react";
import ExaminationInprogress, {
  type QuestionAnswers,
} from "../components/examination/ExaminationInprogress";
import SubmissionModal from "../components/ui/modal/SubmitModal";

// Dummy data matching your interfaces
const DUMMY_QUESTIONS = [
  {
    id: 1,
    question: "Question 1",
    text: "Which of the following is a primary color in the RGB color model?",
    options: [
      { id: 101, letter: "A", text: "Green" },
      { id: 102, letter: "B", text: "Yellow" },
      { id: 103, letter: "C", text: "Pink" },
      { id: 104, letter: "D", text: "Brown" },
    ],
  },
  {
    id: 2,
    question: "Question 2",
    text: "What is the capital of France?",
    options: [
      { id: 201, letter: "A", text: "London" },
      { id: 202, letter: "B", text: "Berlin" },
      { id: 203, letter: "C", text: "Paris" },
      { id: 204, letter: "D", text: "Madrid" },
    ],
  },
  {
    id: 3,
    question: "Question 3",
    text: "Which programming language is primarily used for Android app development?",
    options: [
      { id: 301, letter: "A", text: "Swift" },
      { id: 302, letter: "B", text: "Kotlin" },
      { id: 303, letter: "C", text: "Objective-C" },
      { id: 304, letter: "D", text: "C#" },
    ],
  },
  {
    id: 4,
    question: "Question 4",
    text: "Which planet is known as the Red Planet?",
    options: [
      { id: 401, letter: "A", text: "Venus" },
      { id: 402, letter: "B", text: "Jupiter" },
      { id: 403, letter: "C", text: "Mars" },
      { id: 404, letter: "D", text: "Saturn" },
    ],
  },
  {
    id: 5,
    question: "Question 5",
    text: "What is the square root of 64?",
    options: [
      { id: 501, letter: "A", text: "6" },
      { id: 502, letter: "B", text: "7" },
      { id: 503, letter: "C", text: "8" },
      { id: 504, letter: "D", text: "9" },
    ],
  },
];

const ExamInterface = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<QuestionAnswers>({});
  const totalQuestions = DUMMY_QUESTIONS.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  const handleSubmitFinal = () => {
    console.log("Submitting to API:", selectedAnswers);
    // Add your API call logic here
    setShowModal(false);
  };

  return (
    <>
      <ExaminationInprogress
        questions={DUMMY_QUESTIONS}
        setShowModal={setShowModal}
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
