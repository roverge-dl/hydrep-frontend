import { BiChevronLeft, BiLock } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import BgBar from "../assets/images/bg-bar.png";
import Input from "../components/forms/Input";
import Button from "../components/forms/Button";
import { useState } from "react";
import { runValidation } from "../services/helpers/validator";
import { toast } from "react-toastify";
import { passwordReset } from "../services/api/authService";

type ValidationErrors = { [key: string]: string[] };

const PasswordReset = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });
  const navigate = useNavigate();

  const [fieldErrors, setFieldErrors] = useState<ValidationErrors>({});

  const [loading, setLoading] = useState(false);

  const handleUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handlePasswordReset = async () => {
    setLoading(true);
    const validateUserData = await runValidation([
      {
        input: { value: userData.password, field: "password", type: "text" },
        rules: {
          required: true,
          has_special_character: true,
          min_length: 8,
          must_have_number: true,
        },
        alias: "Password",
      },
      {
        input: {
          value: userData.confirm_password,
          field: "confirm_password",
          type: "text",
        },
        rules: {
          required: true,

          must_match: "password",
        },
        alias: "Confirm Password",
      },
    ]);

    if (validateUserData?.status === false) {
      setFieldErrors(validateUserData?.errors || {});
      setLoading(false);
      return;
    }
    try {
      const response = await passwordReset(userData.password);
      if (response.status === "success") {
        console.log(response);
        toast.success("Registration successful. Please login.");
        navigate("/login");
        localStorage.setItem("cbt_user", JSON.stringify(response.data.user));
        localStorage.setItem("cbt_token", response.data.token);
        setLoading(false);
      }
      if (response.status === "fail") {
        console.log(response);
        toast.error(response.message);
        setLoading(false);
      }
    } catch (error: any) {
      console.log(error);
      if (error) {
        setFieldErrors(error.errors);
        toast.error(error.message);
        // toast.error(`${error.message}! Check the highlighted field(s).`);
        // setFieldErrors(error.errors);

        return;
      }
    } finally {
      setLoading(false);
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
        <div className="space-y-2 mb-6">
          <h1 className="h2 text-center ">Set new password</h1>
          <p className="text-center text-sm text-hdark-400">
            Enter your new password
          </p>
        </div>

        <form className="space-y-8 ">
          {/* Full Name Field */}

          <Input
            labelClass="text-start"
            label="New Password"
            type="password"
            name="password"
            placeholder="••••••••"
            value={userData.password}
            onChange={handleUserData}
            leftIcon={<BiLock size={18} />}
            error={fieldErrors?.password}
          />

          {/* Confirm Password Field */}

          <Input
            labelClass="text-start"
            label="Confirm Password"
            type="password"
            name="confirm_password"
            placeholder="••••••••"
            value={userData.confirm_password}
            onChange={handleUserData}
            leftIcon={<BiLock size={18} />}
            error={fieldErrors?.confirm_password}
          />

          <Button
            className="w-full mt-4 mx-auto col-span-2"
            type="button"
            disabled={loading}
            loading={loading}
            onClick={handlePasswordReset}>
            Reset Password
          </Button>

          <Link
            to="/login"
            className="flex items-center justify-center text-xs text-slate-500 hover:text-slate-800 transition xl:mt-6 mt-4 mx-auto">
            <BiChevronLeft size={14} className="mr-1" />
            Back to login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
