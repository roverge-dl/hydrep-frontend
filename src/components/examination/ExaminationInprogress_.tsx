import { useState } from "react";
import { BsClock } from "react-icons/bs";
import { QuestionOption } from "./QuestionOption";
import { FaRegCheckCircle } from "react-icons/fa";
import Button from "../forms/Button";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

interface ExaminationInprogressProps {
  questions: Question[];
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Question {
  id: number;
  question: string;
  text: string;
  options: Option[];
}

type Option = {
  id: number;
  letter: string;
  text: string;
};

export interface QuestionAnswers {
  [questionId: number]: number;
}

const ExaminationInprogress: React.FC<ExaminationInprogressProps> = ({
  questions,
  setShowModal,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuestionAnswers>({});

  const currentQuestion = questions[currentIndex];

  const handleSelect = (optionId: number) => {
    setAnswers({ ...answers, [currentQuestion.id]: optionId });
  };

  return (
    <div className="min-h-screen relative ">
      <header className="sticky  w-full top-0 bg-white shadow-sm rounded-lg p-4 flex justify-between items-center z-10 mobilesm:flex-nowrap flex-wrap space-y-4 ">
        <div className="mobilesm:w-fit w-full">
          <h1 className="font-bold">General Aptitude Test</h1>
          <p className="text-xs text-gray-500">
            Question {currentIndex + 1} of {questions.length}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-hgrey-300 px-4 py-2 rounded-lg font-bold text-xl ">
          <BsClock size={20} /> 18:59
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 tabletlg:grid-cols-6 gap-8 sm:p-4 mt-4">
        <div className="tabletlg:col-span-4 ">
          <div>
            <div className="flex items-center  rounded text-xs  mb-4 gap-x-2">
              <span className="mobilemd:h-10 h-8 mobilemd:w-10 w-8 p-1 rounded-lg bg-hgreen-500 text-white flex items-center justify-center text-lg font-bold">
                {currentIndex + 1}
              </span>
              <p className="text-sm text-hdark-400">
                Question {currentIndex + 1} of {questions.length}
              </p>{" "}
            </div>
            <h2 className="text-base font-medium mb-4 text-hdark-400">
              {currentQuestion?.text}
            </h2>
          </div>
          <div className="bg-white mobilelg:p-6 p-4 rounded-xl border border-hgrey-500 min-h-fit space-y-4">
            {currentQuestion.options.map((opt) => (
              <QuestionOption
                key={opt.id}
                letter={opt.letter}
                text={opt.text}
                isSelected={answers[currentQuestion.id] === opt.id}
                onClick={() => handleSelect(opt.id)}
              />
            ))}
          </div>

          <div className="flex justify-between mt-4 items-center">
            <Button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
              className="px-6 py-2 bg-white border border-hdark-300 rounded-lg hover:bg-gray-50 disabled:opacity-30"
              leftIcon={<BiChevronLeft className="w-6  h-6" />}
              variant="ghost">
              Previous
            </Button>
            <Button
              rightIcon={<BiChevronRight className="w-6  h-6" />}
              onClick={() =>
                currentIndex === questions.length - 1
                  ? setShowModal(true)
                  : setCurrentIndex((prev) => prev + 1)
              }
              className="px-8 py-2 bg-green-600 text-white rounded-lg font-bold">
              {currentIndex === questions.length - 1 ? "Submit Exam" : "Next"}
            </Button>
          </div>
        </div>

        <aside className="bg-white p-4 rounded-xl border border-hgrey-500 h-fit tabletlg:col-span-2">
          <h3 className="font-semibold text-hdark-400 mb-4 text-sm">
            Question Navigator
          </h3>
          <div className="grid grid-cols-5  gap-2">
            {questions.map((q, i) => (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(i)}
                className={`w-10 h-10 rounded-md border border-hgrey-500 text-xs font-bold relative ${
                  currentIndex === i
                    ? "border-transparent  bg-green-600 text-white"
                    : answers[q.id]
                      ? " text-green-600 bg-green-50 border-green-500"
                      : "bg-white"
                }`}>
                {answers[q.id] && (
                  <span className={`absolute top-0 right-0 text-green-500`}>
                    <FaRegCheckCircle className="w-3 h-3 " />
                  </span>
                )}
                {answers[q.id] && currentIndex === i && (
                  <span className={`absolute top-0 right-0 text-white`}>
                    <FaRegCheckCircle className="w-3 h-3 " />
                  </span>
                )}
                {i + 1}
              </button>
            ))}
          </div>

          <div className="w-full space-y-2 mt-4">
            <div className="flex justify-between items-center w-full text-sm font-normal ">
              <span className=" text-hdark-400">Answered: </span>
              <span className="text-hgreen-500 font-semibold">
                1/{questions.length}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm font-normal">
              <span className="text-hdark-400">Unanswered:</span>
              <span className="text-hdark-500 font-semibold">4</span>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};
export default ExaminationInprogress;
