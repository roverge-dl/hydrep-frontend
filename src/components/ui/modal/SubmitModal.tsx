import { BiCheckCircle } from "react-icons/bi";
import Button from "../../forms/Button";

interface submitModalProps {
  total: number;
  answered: number;
  isSubmitting: boolean;
  onReview: () => void;
  onSubmit: () => void;
}

const SubmissionModal = ({
  total,
  answered,
  onReview,
  onSubmit,
  isSubmitting
}: submitModalProps) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-999999">
    <div className="bg-white rounded-xl max-w-xl w-full mobilemd:p-8 p-4 shadow-2xl">
      <h3 className="text-lg font-semibold text-hdark-500 mb-2">
        Submit Examination?
      </h3>
      <p className="text-sm text-[#737373] mb-6">
        You are about to submit your examination. This action cannot be undone.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#F8FAFC] mobilemd:p-4 p-2 rounded-lg border border-[#475569]">
          <p className="text-sm text-[#475569] font-medium capitalize mb-1">
            Total Questions
          </p>
          <p className="mobilemd:text-2xl text-xl font-bold text-[#0F172A]">
            {total}
          </p>
        </div>
        <div className="bg-green-50 mobilemd:p-4 p-2 rounded-lg border border-hgreen-500">
          <p className="text-sm text-green-600 font-medium capitalize mb-1">
            Answered
          </p>
          <p className="mobilemd:text-2xl text-xl font-bold text-hgreen-600">
            {answered}
          </p>
        </div>
      </div>

      {answered !== total && (
        <div className="bg-green-50 text-green-700 p-3 rounded-lg flex items-center gap-2 mb-8 border border-green-100">
          <BiCheckCircle className="w-4 h-4" />
          <span className="text-xs font-semibold">
            All questions have been answered. You're ready to submit!
          </span>
        </div>
      )}

      <div className="flex items-center mobilemd:justify-end gap-2 mobilemd:flex-row flex-col">
        <Button
          onClick={onReview}
          className="mobilemd:w-fit w-full "
          variant="outline">
          Review Answers
        </Button>
        <Button onClick={onSubmit} disabled={isSubmitting} className="mobilemd:w-fit w-full">
          {isSubmitting ? "Submitting..." : "Submit Exam"}
        </Button>
      </div>
    </div>
  </div>
);

export default SubmissionModal;
