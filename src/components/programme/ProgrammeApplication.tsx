/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { BiCheck, BiChevronLeft, BiChevronRight } from "react-icons/bi";
import PageLayout from "../ui/PageLayout";
import Button from "../forms/Button";
import { BsChevronLeft } from "react-icons/bs";
import type {
  ProgrammeFormData,
  ProgramObject,
  StepChildProps,
} from "../../types/programFormData";
import PersonalInfo from "./PersonalInfo";
import ContactAndAddress from "./ContactAndAddress";
// import Background from "./Background";
import Documents from "./Documents";
import ApplicationReview from "./ApplicationReview";
import { runValidation } from "../../utils/validation";
import {
  completeProgrammeEnrollment,
  registerForProgramme,
  updateUserProfile,
} from "../../services/api/applicationService";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import type { UserData } from "../../types/user";
import { useNavigate, useParams } from "react-router-dom";
import CourseSelection from "./CourseSelection";
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
  { id: 3, title: "Course Selection", sub: "Choose your path" },
  { id: 4, title: "Documents", sub: "Upload files" },
  { id: 5, title: "Review", sub: "Confirm details" },
];

const ProgrammeApplication: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [programCourses, setProgramCourses] = useState<ProgramObject[]>([]);
  const [userData, setUserData] = useState<Partial<UserData>>({
    state: "",
    lga: "",
    community: "",
  });
  const [formData, setFormData] = useState<ProgrammeFormData>({
    first_name: "",
    last_name: "",
    middle_name: "",
    dob: "",
    gender: "",
    nin: "",
    email: "",
    address: "",
    community: "",
    state: "",
    lga: "",
    phone: "",
    selectedCourses: [],
  });
  // Change this:
  // const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // To this:
  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string | string[]>
  >({});
  const { user, updateUser } = useAuth();

  const { slug: programSlug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const handleApplication = async () => {
    setIsLoading(true);
    const validateformData = await runValidation([
      {
        input: {
          value: formData.first_name,
          field: "first_name",
          type: "text",
        },
        rules: { required: true },
        alias: "First name",
      },
      {
        input: { value: formData.last_name, field: "last_name", type: "text" },
        rules: { required: true },
        alias: "Last name",
      },
      {
        input: {
          value: formData.middle_name,
          field: "middle_name",
          type: "text",
        },
        rules: { required: false },
        alias: "Middle name",
      },
      {
        input: {
          value: formData.dob,
          field: "dob",
          type: "text",
        },
        rules: { required: true },
        alias: "Date of birth",
      },
      {
        input: {
          value: formData.gender,
          field: "gender",
          type: "text",
        },
        rules: { required: true },
        alias: "Gender",
      },
      {
        input: {
          value: formData.nin,
          field: "nin",
          type: "text",
        },
        rules: { required: true, max_length: 11, min_length: 11 },
        alias: "NIN",
      },
    ]);

    if (validateformData?.status === false) {
      setFieldErrors(validateformData?.errors ?? {});
      setIsLoading(false);
      return;
    }
    try {
      const response = await registerForProgramme(
        user?.user?.id?.toString(), // Pass User ID
        formData.first_name,
        formData.middle_name,
        formData.last_name,
        formData.dob,
        formData.gender,
        formData.nin,
      );
      if (response.status === "success") {
        toast.success(response.message);
        updateUser(response.data);
        setIsLoading(false);
        setCurrentStep(currentStep + 1);
      }
      if (response.status === "fail") {
        console.log(response);
        toast.error(response.message);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error);
      if (error) {
        toast.error("something went wrong. Please try again.");
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleFinishEnrollment = async () => {
    setIsLoading(true);

    try {
      const response = await completeProgrammeEnrollment(
        programSlug as string, // Pass User I
        formData.selectedCourses!,
      );
      if (response.status === "success") {
        toast.success(response.message);
        // updateUser(response.data);
        setIsLoading(false);
        navigate("/applications");
      }
      if (response.status === "fail") {
        toast.error(response.message);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error);
      if (error) {
        toast.error(error.message);
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    switch (currentStep) {
      case 1:
        return handleApplication();
      case 2:
        return handleContactStep();
      case 3:
        // setSelectedCourses([]);
        // setFormData((prev: any) => ({ ...prev, selectedCourses: [] }));
        setCurrentStep(currentStep + 1);
        break;
      case 4:
        setCurrentStep(currentStep + 1);
        break;
      // return handleDocumentsStep();
      case 5:
        handleFinishEnrollment();
        break;
      default:
        break;
      // return handleReviewStep();
    }
    // if(currentStep === 2) handleContactStep();
    // if (currentStep < steps.length) setCurrentStep(currentStep + 1);
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
      userData,
      setUserData,
      setProgramCourses,
      programCourses,
    };
    switch (currentStep) {
      case 1:
        return <PersonalInfo {...props} />;
      case 2:
        return <ContactAndAddress {...props} />;
      case 3:
        // return <Background {...props} />;
        return <CourseSelection {...props} />;
      case 4:
        // completeProgrammeEnrollment(user?.user?.id?.toString(), userData?.id);
        return <Documents {...props} />;
      case 5:
        return <ApplicationReview {...props} />;
      default:
        return null;
    }
  };

  // Inside handleNext or a specific handler for Step 2
  const handleContactStep = async () => {
    setIsLoading(true);
    // 1. Validation Logic for Step 2...

    try {
      // 2. Call the update service
      const response = await updateUserProfile(user!.user.id, {
        phone: formData.phone,
        address: formData.address,
        state_id: formData.state,
        lga_id: formData.lga,
        community_id: formData.community,
      });

      if (response.status === "success") {
        toast.success(response.message);
        updateUser(response.data);
        setIsLoading(false);
        setCurrentStep(currentStep + 1);
      }
      if (response.status === "fail") {
        console.log(response);
        toast.error(response.message);
        setIsLoading(false);
      }

      // 3. Move Next
      // handleNext();
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to save contact info");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("user", user);
    // Extract the user object regardless of nesting
    const profile = user?.user || user;
    console.log("profile", profile);

    if (profile) {
      setFormData((prev) => ({
        ...prev,
        // Only populate if the field in formData is currently empty
        first_name: prev.first_name || profile.first_name || "",
        last_name: prev.last_name || profile.last_name || "",
        middle_name: prev.middle_name || profile.middle_name || "",
        dob: prev.dob || profile.dob || "",
        gender: prev.gender || profile.gender || "",
        nin: prev.nin || profile.nin || "",
        phone: prev.phone || profile.phone || "",
        email: prev.email || profile.email || "",
        address: prev.address || profile.address || "",
        state: prev.state || profile.state || "",
        community: prev.community || profile.community || "",
        lga: prev.lga || profile.lga || "",
      }));
    }
  }, [user]); // Runs when user data is loaded from AuthContext

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
          ${isCompleted ? "bg-hgreen-600 text-white" : isActive ? "bg-hgreen-500 text-white" : "bg-hgreen-50 text-hgreen-500"}`}>
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
            ${currentStep > step.id ? "bg-hgreen-600" : "bg-gray-100"}`}
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
              loading={isLoading} // Add loading state to button
              width="mobilemd:w-fit w-full"
              rightIcon={<BiChevronRight size={18} />}>
              {currentStep === steps.length
                ? "Submit Application"
                : "Save & Continue"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgrammeApplication;
