interface QuestionOptionProps {
  letter: string;
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

interface NavSquareProps {
  number: number;
  status: string;
}

const QuestionOption = ({
  letter,
  text,
  isSelected,
  onClick,
}: QuestionOptionProps) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-4  border rounded-lg transition-all ${
      isSelected
        ? "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600"
        : "border-gray-200 hover:bg-gray-50"
    }`}>
    <div
      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
        isSelected ? "border-indigo-600" : "border-gray-300"
      }`}>
      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />}
    </div>
    <span className="text-sm font-medium text-gray-800">
      {letter}. {text}
    </span>
  </button>
);

const NavSquare = ({ number, status }: NavSquareProps) => {
  const baseStyles =
    "w-10 h-10 rounded flex items-center justify-center text-sm font-semibold border";
  const variants: { [key: string]: string } = {
    current: "border-indigo-600 bg-indigo-50 text-indigo-600",
    answered: "bg-green-600 border-green-600 text-white",
    unvisited: "bg-white border-gray-200 text-gray-500",
  };

  return <div className={`${baseStyles} ${variants[status]}`}>{number}</div>;
};

export { QuestionOption, NavSquare };
