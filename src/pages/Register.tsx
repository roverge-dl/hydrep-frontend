import { BiChevronLeft, BiLock, BiUser, BiPhone } from "react-icons/bi";
import { BsMailbox } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import BgBar from "../assets/images/bg-bar.png";
import Input from "../components/forms/Input";
import Logo from "../assets/svgs/coat-of-arms.svg";
import Button from "../components/forms/Button";
import { useState } from "react";
import { runValidation } from "../services/helpers/validator";
import { toast } from "react-toastify";
import { registerUser } from "../services/api/authService";

type ValidationErrors = { [key: string]: string[] };

const Register = () => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
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

  const handleRegister = async () => {
    setLoading(true);
    const validateUserData = await runValidation([
      {
        input: {
          value: userData.first_name,
          field: "first_name",
          type: "text",
        },
        rules: { required: true },
        alias: "First name",
      },
      {
        input: { value: userData.last_name, field: "last_name", type: "text" },
        rules: { required: true },
        alias: "Last name",
      },
      {
        input: { value: userData.phone, field: "phone", type: "text" },
        rules: { required: true, min_length: 11, max_length: 11 },
        alias: "Phone number",
      },
      {
        input: { value: userData.email, field: "email", type: "text" },
        rules: { required: true },
        alias: "Email",
      },
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
      const response = await registerUser(
        userData.first_name,
        userData.last_name,
        userData.phone,
        userData.email,
        userData.password,
      );
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

      <div className="relative z-10 w-full mobilemd:min-h-fit min-h-screen max-w-xl bg-white mobilesm:rounded-2xl shadow-xl mobilemd:p-6  p-4 mobilemd:mx-4 mobilesm:mx-2 drop-shadow-2xl">
        <Link
          to="/login"
          className="flex items-center text-xs text-slate-500 hover:text-slate-800 transition xl:mb-6 mb-4">
          <BiChevronLeft size={14} className="mr-1" />
          Back to sign in page
        </Link>

        <div className="flex justify-center items-center">
          <img
            src={Logo}
            className="xl:w-20 xl:h-fit w-24 object-contain object-center"
            alt="Hydrep logo"
          />
        </div>

        <h1 className="h2 text-center xl:mb-6 mb-4">Create your account</h1>

        <form className="space-y-2 grid md:grid-cols-2 grid-cols-1 gap-4">
          {/* Full Name Field */}
          <div className="md:col-span-1 col-span-2 ">
            <Input
              label="First Name"
              type="text"
              name="first_name"
              placeholder="John Doe"
              value={userData.first_name}
              onChange={handleUserData}
              leftIcon={<BiUser size={18} />}
              error={fieldErrors?.first_name}
            />
          </div>
          <div className="md:col-span-1 col-span-2 ">
            <Input
              label="Last Name"
              type="text"
              name="last_name"
              placeholder="John Doe"
              value={userData.last_name}
              onChange={handleUserData}
              leftIcon={<BiUser size={18} />}
              error={fieldErrors?.last_name}
            />
          </div>
          <div className="md:col-span-1 col-span-2 ">
            {" "}
            <Input
              label="Phone Number"
              type="tel"
              name="phone"
              placeholder="08012345678"
              value={userData.phone}
              onChange={handleUserData}
              leftIcon={<BiPhone size={18} />}
              error={fieldErrors?.phone}
            />
          </div>

          <div className="md:col-span-1 col-span-2 ">
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
          </div>

          <div className="md:col-span-1 col-span-2 ">
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
          </div>

          {/* Confirm Password Field */}
          <div className="md:col-span-1 col-span-2 ">
            <Input
              label="Confirm Password"
              type="password"
              name="confirm_password"
              placeholder="••••••••"
              value={userData.confirm_password}
              onChange={handleUserData}
              leftIcon={<BiLock size={18} />}
              error={fieldErrors?.confirm_password}
            />
          </div>

          <Button
            className="w-full mt-4 mx-auto col-span-2"
            type="button"
            disabled={loading}
            loading={loading}
            onClick={handleRegister}>
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
