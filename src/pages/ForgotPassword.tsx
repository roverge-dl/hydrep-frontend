/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate/Link
import { BiChevronLeft } from "react-icons/bi";
import { BsMailbox } from "react-icons/bs";

// Assets & Components
import BgBar from "../assets/images/bg-horizontal-bar.png";
import Input from "../components/forms/Input";
import Logo from "../assets/svgs/coat-of-arms.svg";
import Button from "../components/forms/Button";
import { forgotPassword } from "../services/api/authService";
import { toast } from "react-toastify";
import { runValidation } from "../utils/validation";

// Logic & Services
// import { runValidation } from "../utils/validation";

const ForgotPassword = () => {
  // 1. State Management (Copied from pattern)
  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string[] }>(
    {},
  );

  console.log(setFieldErrors);

  const navigate = useNavigate();
  // 2. Handle Input Changes

  // 3. API Submission Logic
  const handleForgotPassword = async () => {
    setIsLoading(true);
    try {
      // Calling the service directly as per your provided authService file
      const response = await forgotPassword(email);

      // Check success based on your API response structure
      if (response.status === "success") {
        console.log(response.data);
        toast.success(response.message);
        navigate(`/sent-reset-link?email=${email}`);

        // Clear form
        setEmail("");
      }
      if (response.status === "fail") {
        toast.error(response.message);
      }
    } catch (error: any) {
      console.error("An unexpected error occurred:", error);
      if (error.errors) {
        error.errors.forEach((err: any) => {
          toast.error(err.message || "An error occurred. Please try again.");
        });
        // toast.error("Invalid credentials. Please try again.");
      } else {
        toast.error(error.message || "An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const validateForgotPasswordEmail = async () => {
    // Adapted validation rules for your specific field names (email/password)
    const validate = await runValidation([
      {
        input: {
          value: email,
          field: "email",
          type: "email",
        },
        rules: { required: true, email: true },
      },
    ]);

    if (validate?.status === false) {
      setFieldErrors(validate.errors ?? {});
    } else {
      handleForgotPassword();
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-linear-to-br from-hwhite-400 to-hgreen-200 overflow-hidden">
      <img
        src={BgBar}
        className="absolute xl:left-60 lg:left-40 tabletmd:left-20 left-10 top-0 h-full w-24 object-cover opacity-90 hidden sm:block"
        alt=""
      />
      <img
        src={BgBar}
        className="absolute xl:left-100 lg:left-80 tabletmd:left-60 left-40 top-0 h-full w-24 object-cover opacity-90 hidden sm:block"
        alt=""
      />

      <div className="relative z-10 w-full mobilemd:min-h-fit min-h-screen max-w-md bg-white mobilesm:rounded-2xl shadow-xl mobilemd:p-6  p-4 mobilemd:mx-4 mobilesm:mx-2 drop-shadow-2xl">
        <Link
          to="/login"
          className="flex items-center text-xs text-slate-500 hover:text-slate-800 transition xl:mb-6 mb-4">
          <BiChevronLeft size={14} className="mr-1" />
          Back to sign in
        </Link>

        <div className="flex justify-center items-center">
          <img
            src={Logo}
            className="xl:w-20 xl:h-fit w-24 object-contain object-center"
            alt="Hydrep logo"
          />
        </div>

        <div className="space-y-2 mb-6">
          <h1 className="h2 text-center ">Reset your password</h1>
          <p className="text-center text-sm text-hdark-400">
            Enter the email linked to your account, and we'll send you a link to
            reset your password
          </p>
        </div>

        <form className="space-y-2 ">
          {/* Full Name Field */}

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<BsMailbox size={18} />}
            error={fieldErrors?.email}
          />

          <Button
            className="w-full mt-4 mx-auto "
            type="button"
            disabled={isLoading}
            loading={isLoading}
            onClick={validateForgotPasswordEmail}>
            Send Reset Link
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
