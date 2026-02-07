import { BsInfo, BsInfoCircle } from "react-icons/bs";

const ExamInstructions = () => {
  const instructions = [
    "Read each question carefully before selecting your answer.",
    "You can navigate between questions using the Next/Previous buttons or the question navigator.",
    "Your answers are automatically saved as you select them.",
    "The timer will count down from 20 minutes. The exam will auto-submit when time expires.",
    "You can review and change your answers before submitting.",
    "Ensure you have a stable internet connection throughout the exam.",
  ];

  const rules = [
    "Do not refresh the page during the exam",
    "Do not navigate away from the exam page",
    "Do not use external resources or assistance",
    "Multiple violations may result in disqualification",
  ];

  return (
    <div className="max-w-4xl mx-auto ">
      {/* Important Instructions Section */}
      <section className="mobilelg:mt-8 mt-4">
        <h2 className="text-lg font-bold text-hdark-500 mb-6">
          Important Instructions
        </h2>
        <div className="space-y-4">
          {instructions.map((text, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="shrink-0 w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">
                {index + 1}
              </div>
              <p className="text-sm text-hdark-400 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Examination Rules Box */}
      <div className="mobilelg:mt-8 mt-4 p-4  border border-hgrey-500 rounded-xl bg-white">
        <div className="flex items-center gap-2 mb-4 text-hdark-500">
          <BsInfoCircle size={18} className="" />
          <h3 className="font-bold text-sm">Examination Rules</h3>
        </div>
        <ul className="space-y-3">
          {rules.map((rule, i) => (
            <li
              key={i}
              className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              {rule}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExamInstructions;
