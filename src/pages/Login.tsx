import { BiLock } from "react-icons/bi";
import { BsMailbox } from "react-icons/bs";
import { Link } from "react-router-dom";
import BgBar from "../assets/images/bg-horizontal-bar.png";
import Input from "../components/forms/Input";
import Logo from "../assets/svgs/coat-of-arms.svg";
import Button from "../components/forms/Button";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-linear-to-br from-hwhite-400 to-hgreen-200 overflow-hidden">
      {/* Background Images - Assuming they are in your public folder */}
      <img
        src={BgBar}
        className="absolute  top-50     object-cover opacity-90 hidden md:flex"
        alt=""
      />
      <img
        src={BgBar}
        className="absolute  top-100   object-cover opacity-90 hidden md:flex"
        alt=""
      />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-8 mx-4 drop-shadow-2xl">
        {/* Back Link */}
        {/* <Link
          to="/login"
          className="flex items-center text-xs text-slate-500 hover:text-slate-800 transition mb-6">
          <BiChevronLeft size={14} className="mr-1" />
          Back to sign in page
        </Link> */}

        <div className="flex justify-center items-center">
          <img
            src={Logo}
            className="w-28 h-fit object-contain object-center"
            alt="Hydrep logo"
          />
        </div>

        <h1 className="h2 text-center mb-4">Welcome to HYPREP</h1>
        <p className="text-center text-sm m-4">Sign in to continue</p>
        <Button
          leftIcon={<FcGoogle className="w-8 h-8" />}
          variant="outline"
          className="w-full">
          Continue With Google
        </Button>
        <div className="flex justify-between items-center w-full mt-4">
          <div className="h-px bg-hdark-300 w-5/12"></div>{" "}
          <span className="w-2/12 text-center text-sm text-hdark-300">OR</span>
          <div className="h-px bg-hdark-300 w-5/12"></div>
        </div>

        <form className="space-y-4 mt-4">
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

          {/* Submit Button */}
          <Button className="w-full">Sign in</Button>
          <div className="flex justify-between items-center w-full text-sm gap-1">
            <div>
              <a
                href="/reset-password"
                className="flex justify-end text-right font-semibold text-sm">
                Forgot password?
              </a>
            </div>
            <div className="flex gap-x-2">
              <span>Need an account?</span>
              <a
                href="/register "
                className="flex justify-end text-right font-semibold text-sm text-hgreen-500 hover:text-hgreen-600">
                Sign up
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
