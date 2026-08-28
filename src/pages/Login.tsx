/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "react-router-dom"; // Added useNavigate/Link
import { BiLock } from "react-icons/bi";
import { BsMailbox } from "react-icons/bs";
import { FaEye } from "react-icons/fa6"; // Added for password toggle
import { LuEyeClosed } from "react-icons/lu"; // Added for password toggle
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify"; // Assuming you have this installed based on pattern

// Assets & Components
import BgBar from "../assets/images/bg-horizontal-bar.png";
import Input from "../components/forms/Input";
import Logo from "../assets/images/logo-transparent.png";
import Button from "../components/forms/Button";
import ValidationError from "../components/ValidationError";

// Logic & Services
import { runValidation } from "../utils/validation";
import { loginUser } from "../services/api/authService"; // Importing direct service
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();

  // 1. State Management (Copied from pattern)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Password visibility
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string[] }>(
    {},
  );

  // 2. Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Clear errors for this field when user types
    const newFieldErrors = { ...fieldErrors };
    delete newFieldErrors[e.target.name];
    setFieldErrors(newFieldErrors);

    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 3. API Submission Logic
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      // Calling the service directly as per your provided authService file
      const response = await loginUser(formData.email, formData.password);

      // Check success based on your API response structure
      if (response.status === "success") {
        toast.success(response.message);
        login(response.data);
        localStorage.setItem("cbt_token", response.data.token);

        // Clear form
        setFormData({
          email: "",
          password: "",
        });
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

  // 4. Validation Logic
  const validateLoginForm = async () => {
    // Adapted validation rules for your specific field names (email/password)
    const validate = await runValidation([
      {
        input: {
          value: formData.email,
          field: "email",
          type: "email",
        },
        rules: { required: true, email: true },
      },
      {
        input: {
          value: formData.password,
          field: "password",
          type: "text",
        },
        rules: { required: true },
      },
    ]);

    if (validate?.status === false) {
      setFieldErrors(validate.errors ?? {});
    } else {
      handleLogin();
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-linear-to-br from-hwhite-400 to-hgreen-200 overflow-hidden">
      {/* Background Images */}
      <img
        src={BgBar}
        className="absolute  top-50      object-cover opacity-90 hidden md:flex"
        alt=""
      />
      <img
        src={BgBar}
        className="absolute  top-100   object-cover opacity-90 hidden md:flex"
        alt=""
      />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-8 mx-4 drop-shadow-2xl">
        <div className="flex justify-center items-center">
          <img
            src={Logo}
            className="w-28 h-16 object-contain object-center"
            alt="PAED logo"
          />
        </div>

        <h1 className="h2 text-center mb-4">Welcome to PAED</h1>
        <p className="text-center text-sm m-4">Sign in to continue</p>

        {/* Google Auth Button - Added link logic from pattern */}
        <a
          href={`${import.meta.env.VITE_BASE_URL}/auth/google`}
          className="w-full block">
          <Button
            type="button"
            leftIcon={<FcGoogle className="w-8 h-8" />}
            variant="outline"
            className="w-full">
            Continue With Google
          </Button>
        </a>

        <div className="flex justify-between items-center w-full mt-4">
          <div className="h-px bg-hdark-300 w-5/12"></div>{" "}
          <span className="w-2/12 text-center text-sm text-hdark-300">OR</span>
          <div className="h-px bg-hdark-300 w-5/12"></div>
        </div>

        <form className="space-y-4 mt-4" onSubmit={(e) => e.preventDefault()}>
          {/* Email Field */}
          <div>
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="you@example.com"
              leftIcon={<BsMailbox size={18} />}
              value={formData.email}
              onChange={handleChange}
            />
            <ValidationError validationErrors={fieldErrors} field="email" />
          </div>

          {/* Password Field with Visibility Toggle */}
          <div className="relative">
            {/* Eye Icon logic from pattern - positioned absolutely over the input */}
            {isVisible ? (
              <FaEye
                className="absolute right-3 top-10.5 z-10 cursor-pointer text-gray-500"
                onClick={() => setIsVisible(false)}
              />
            ) : (
              <LuEyeClosed
                className="absolute right-3 top-10.5 z-10 cursor-pointer text-gray-500"
                onClick={() => setIsVisible(true)}
              />
            )}

            <Input
              label="Password"
              type={isVisible ? "text" : "password"} // Dynamic type
              name="password"
              placeholder="••••••••"
              leftIcon={<BiLock size={18} />}
              value={formData.password}
              onChange={handleChange}
            />
            <ValidationError validationErrors={fieldErrors} field="password" />
          </div>

          {/* Submit Button */}
          <Button
            className="w-full"
            onClick={validateLoginForm}
            disabled={isLoading}
            loading={isLoading}>
            Sign in
          </Button>

          <div className="flex justify-between items-center w-full text-sm gap-1">
            <div>
              <Link
                to="/forgot-password"
                className="flex justify-end text-right font-semibold text-sm">
                Forgot password?
              </Link>
            </div>
            <div className="flex gap-x-2">
              <span>Need an account?</span>
              <Link
                to="/register"
                className="flex justify-end text-right font-semibold text-sm text-hgreen-500 hover:text-hgreen-600">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
