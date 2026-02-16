import React, { useState } from "react";
import { BiCheck, BiChevronLeft, BiChevronRight } from "react-icons/bi";
import PageLayout from "../ui/PageLayout";
import Button from "../forms/Button";
import { BsChevronLeft } from "react-icons/bs";
import type {
  ProgrammeFormData,
  StepChildProps,
} from "../../types/programFormData";
import PersonalInfo from "./PersonalInfo";
import ContactAndAddress from "./ContactAndAddress";
import Background from "./Background";
import Documents from "./Documents";
import ApplicationReview from "./ApplicationReview";
// import { ChevronRight, ChevronLeft, Calendar } from "lucide-react";

// --- Types ---

interface Step {
  id: number;
  title: string;
  sub: string;
}

const steps: Step[] = [
  { id: 1, title: "Personal Info", sub: "Basic details" },
  { id: 2, title: "Contact & Address", sub: "Location info" },
  { id: 3, title: "Background", sub: "Education & work" },
  { id: 4, title: "Documents", sub: "Upload files" },
  { id: 5, title: "Review", sub: "Confirm details" },
];

const ProgrammeApplication: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<ProgrammeFormData>({
    firstName: "",
    lastName: "",
    middleName: "",
    dob: "",
    gender: "",
    nin: "",
    bvn: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    lga: "",
    highestEducationLevel: "",
    institutionName: "",
    yearCompleted: "",
    employmentStatus: "",
    occupation: "",
    monthlyIncome: "",
    documents: [],
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    const props: StepChildProps = {
      formData,
      setFormData,
      handleInputChange,
      fieldErrors,
      setFieldErrors,
    };
    switch (currentStep) {
      case 1:
        return <PersonalInfo {...props} />;
      case 2:
        return <ContactAndAddress {...props} />;
      case 3:
        return <Background {...props} />;
      case 4:
        return <Documents {...props} />;
      case 5:
        return <ApplicationReview {...props} />;
      default:
        return null;
    }
  };

  return (
    <>
      <a className="flex items-center gap-4 mb-4" href="/programmes">
        <BsChevronLeft className="w-3 h-3" />{" "}
        <span className="text-sm text-hdark-400 font-semibold">
          Back to Programmes
        </span>
      </a>
      <PageLayout
        title="Programme Application"
        subtitle="Apply for a programme"
        isAction={false}
        children={null}
      />
      <div className="min-h-screen ">
        <div className="w-full max-w-4xl bg-white rounded-2xl  border border-hgrey-500 overflow-hidden">
          {/* Progress Stepper */}
          <div className="tabletmd:p-6 md:p-4 p-2 border-b border-hgrey-300 flex justify-between items-start relative">
            {steps.map((step, index) => {
              const isCompleted = currentStep > step.id;
              const isActive = currentStep === step.id;

              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center flex-1 relative">
                  {/* Circle Index / Checkmark */}
                  <div
                    className={`mobilemd:w-10 w-8 mobilemd:h-10 h-8 rounded-full flex items-center justify-center font-medium text-sm mb-3 z-10 transition-all duration-300
          ${isCompleted ? "bg-[#10B981] text-white" : isActive ? "bg-[#22c55e] text-white" : "bg-[#F0FCEF] text-[#22c55e]"}`}>
                    {isCompleted ? <BiCheck size={20} /> : step.id}
                  </div>

                  {/* Labels */}
                  <div className="text-center hidden sm:block">
                    <p
                      className={`text-[13px] font-medium ${
                        currentStep >= step.id
                          ? "text-hdark-500"
                          : "text-hdark-300"
                      }`}>
                      {step.title}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {step.sub}
                    </p>
                  </div>

                  {/* Connecting Line */}
                  {index !== steps.length - 1 && (
                    <div
                      className={`absolute mobilemd:top-5 top-4 left-[50%] w-full h-0.5 z-0 transition-colors duration-300
            ${currentStep > step.id ? "bg-[#10B981]" : "bg-gray-100"}`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Form Body */}
          <div className="mobilemd:p-6 p-4">{renderStep()}</div>

          {/* Action Footer */}
          <div className="mobilemd:p-6 p-4 border-t border-hgrey-300 flex mobilemd:flex-row flex-col gap-y-4 justify-between items-center mt-4">
            <Button
              onClick={handlePrevious}
              className="border border-hgrey-500 "
              width="mobilemd:w-fit w-full"
              variant={currentStep <= 1 ? "ghost" : "outline"}
              leftIcon={<BiChevronLeft size={18} />}>
              Previous
            </Button>
            <Button
              onClick={handleNext}
              className=""
              width="mobilemd:w-fit w-full"
              rightIcon={<BiChevronRight size={18} />}>
              Save & Continue
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgrammeApplication;
