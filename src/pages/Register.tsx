import { BiChevronLeft, BiLock } from "react-icons/bi";
import { BsMailbox } from "react-icons/bs";
import { Link } from "react-router-dom";
import BgBar from "../assets/images/bg-bar.png";
import Input from "../components/forms/Input";
import Logo from "../assets/svgs/coat-of-arms.svg";
import Button from "../components/forms/Button";

const Register = () => {
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
            leftIcon={<BsMailbox size={18} />}
          />

          {/* Password Field */}
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
            leftIcon={<BiLock size={18} />}
          />
          {/* Password Field */}
          <Input
            label="Confirm Password"
            type="password"
            name="password"
            placeholder="••••••••"
            leftIcon={<BiLock size={18} />}
          />

          {/* Submit Button */}
          <Button className="w-full">Create Account</Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
