/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { BsClock } from "react-icons/bs";
import { QuestionOption } from "./QuestionOption";
import { FaRegCheckCircle } from "react-icons/fa";
import Button from "../forms/Button";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

interface ExaminationInprogressProps {
  exam: any;
  attempt: any;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedAnswers: QuestionAnswers;
  setSelectedAnswers: React.Dispatch<
    React.SetStateAction<QuestionAnswers>
  >;
}

type Option = {
  id: number;
  letter?: string;
  text: string;
};

interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface QuestionAnswers {
  [questionId: number]: number;
}

const ExaminationInprogress: React.FC<
  ExaminationInprogressProps
> = ({
  exam,
  attempt,
  setShowModal,
  selectedAnswers,
  setSelectedAnswers,
}) => {
  const questions: Question[] = exam.questions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const currentQuestion = questions[currentIndex];

  /* --------------------------------------------
     TIMER LOGIC (based on server expiresAt)
  ---------------------------------------------*/
  useEffect(() => {
    const expiry = new Date(attempt.expiresAt).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = Math.max(0, Math.floor((expiry - now) / 1000));

      setTimeLeft(diff);

      if (diff <= 0) {
        clearInterval(interval);
        setShowModal(true); // Auto submit when time runs out
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [attempt.expiresAt, setShowModal]);

  /* --------------------------------------------
     PERSIST ANSWERS TO LOCAL STORAGE
  ---------------------------------------------*/
  useEffect(() => {
    const stored = localStorage.getItem("activeExam");
    if (!stored) return;

    const parsed = JSON.parse(stored);
    parsed.answers = selectedAnswers;

    localStorage.setItem("activeExam", JSON.stringify(parsed));
  }, [selectedAnswers]);

  const handleSelect = (optionId: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const unansweredCount = questions.length - answeredCount;

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, [timeLeft]);

  return (
    <div className="min-h-screen relative">
      {/* HEADER */}
      <header className="sticky w-full top-0 bg-white shadow-sm rounded-lg p-4 flex justify-between items-center z-10">
        <div>
          <h1 className="font-bold">{exam.title}</h1>
          <p className="text-xs text-gray-500">
            Question {currentIndex + 1} of {questions.length}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-hgrey-300 px-4 py-2 rounded-lg font-bold text-xl">
          <BsClock size={20} /> {formattedTime}
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 tabletlg:grid-cols-6 gap-8 sm:p-4 mt-4">
        {/* QUESTION AREA */}
        <div className="tabletlg:col-span-4">
          <div className="mb-4">
            <h2 className="text-base font-medium text-hdark-400">
              {currentQuestion?.text}
            </h2>
          </div>

          <div className="bg-white p-4 rounded-xl border border-hgrey-500 space-y-4">
            {currentQuestion.options.map((opt, index) => (
              <QuestionOption
                key={opt.id}
                letter={
                  opt.letter ?? String.fromCharCode(65 + index)
                }
                text={opt.text}
                isSelected={
                  selectedAnswers[currentQuestion.id] === opt.id
                }
                onClick={() => handleSelect(opt.id)}
              />
            ))}
          </div>

          {/* NAVIGATION */}
          <div className="flex justify-between mt-4 items-center">
            <Button
              disabled={currentIndex === 0}
              onClick={() =>
                setCurrentIndex((prev) => prev - 1)
              }
              variant="ghost"
              leftIcon={<BiChevronLeft className="w-6 h-6" />}
            >
              Previous
            </Button>

            <Button
              rightIcon={<BiChevronRight className="w-6 h-6" />}
              onClick={() =>
                currentIndex === questions.length - 1
                  ? setShowModal(true)
                  : setCurrentIndex((prev) => prev + 1)
              }
            >
              {currentIndex === questions.length - 1
                ? "Submit Exam"
                : "Next"}
            </Button>
          </div>
        </div>

        {/* NAVIGATOR */}
        <aside className="bg-white p-4 rounded-xl border border-hgrey-500 h-fit tabletlg:col-span-2">
          <h3 className="font-semibold text-hdark-400 mb-4 text-sm">
            Question Navigator
          </h3>

          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, i) => (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(i)}
                className={`w-10 h-10 rounded-md border text-xs font-bold relative ${
                  currentIndex === i
                    ? "bg-green-600 text-white"
                    : selectedAnswers[q.id]
                    ? "text-green-600 bg-green-50 border-green-500"
                    : "bg-white"
                }`}
              >
                {selectedAnswers[q.id] && (
                  <FaRegCheckCircle className="absolute top-0 right-0 w-3 h-3" />
                )}
                {i + 1}
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Answered:</span>
              <span className="text-green-600 font-semibold">
                {answeredCount}/{questions.length}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Unanswered:</span>
              <span className="font-semibold">
                {unansweredCount}
              </span>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default ExaminationInprogress;