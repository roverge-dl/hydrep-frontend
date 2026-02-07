import { BiChevronLeft, BiLock } from "react-icons/bi";
import { BsMailbox } from "react-icons/bs";
import { Link } from "react-router-dom";
import BgBar from "../assets/images/bg-bar.png";
import Input from "../components/forms/Input";
import Logo from "../assets/svgs/coat-of-arms.svg";
import Button from "../components/forms/Button";
import { useState } from "react";
import { runValidation } from "../helpers/validator";
import Loader from "../components/ui/Loader";

// interface RegisterProps {
//   userData: {};
//   fieldErrors?: { [key: string]: string[] };
// }
const Register = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const handleUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleRegister = async () => {
    const validateUserData = await runValidation([
      {
        input: { value: userData.email, field: "email", type: "text" },
        rules: { required: true },
        alias: "Email ",
      },
      {
        input: { value: userData.password, field: "password", type: "text" },
        rules: {
          required: true,
          has_special_character: true,
          min_length: 8,
          must_have_number: true,
        },

        alias: "Password ",
      },
      {
        input: {
          value: userData.confirm_password,
          field: "confirm_password",
          type: "text",
        },
        rules: {
          required: true,
          has_special_character: true,
          min_length: 8,
          must_have_number: true,
        },

        alias: "Password ",
      },
    ]);
    if (validateUserData?.status === false) {
      // setFieldErrors(validateUserData);

      setLoading(false);
      return;
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-linear-to-br from-hwhite-400 to-hgreen-200 overflow-hidden">
      {/* Background Images - Assuming they are in your public folder */}
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

      {/* Main Card */}
      <div className="relative z-10 w-full mobilemd:min-h-fit min-h-screen max-w-md bg-white mobilesm:rounded-2xl shadow-xl mobilemd:p-8 p-4 mobilemd:mx-4 mobilesm:mx-2 drop-shadow-2xl">
        {/* Back Link */}
        <Link
          to="/login"
          className="flex items-center text-xs text-slate-500 hover:text-slate-800 transition xl:mb-6 mb-4">
          <BiChevronLeft size={14} className="mr-1" />
          Back to sign in page
        </Link>

        <div className="flex justify-center items-center">
          <img
            src={Logo}
            className="xl:w-28 xl:h-fit w-24 object-contain object-center"
            alt="Hydrep logo"
          />
        </div>

        <h1 className="h2 text-center xl:mb-6 mb-4">Create your account</h1>

        <form className="space-y-4">
          {/* Email Field */}

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={userData.email}
            onChange={handleUserData}
            leftIcon={<BsMailbox size={18} />}
            error={fieldErrors?.email}
          />

          {/* Password Field */}
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
            value={userData.password}
            onChange={handleUserData}
            leftIcon={<BiLock size={18} />}
            error={fieldErrors?.password}
          />
          {/* Password Field */}
          <Input
            label="Confirm Password"
            type="password"
            name="confrim_password"
            placeholder="••••••••"
            value={userData.confirm_password}
            onChange={handleUserData}
            leftIcon={<BiLock size={18} />}
            error={fieldErrors?.confrim_password}
          />

          {/* Submit Button */}
          <Button className="w-full" disabled={loading}>
            {loading ? <Loader /> : "Create Account"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
