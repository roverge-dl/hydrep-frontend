/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link, useSearchParams } from "react-router-dom"; // Added useNavigate/Link
import { BiChevronLeft } from "react-icons/bi";

// Assets & Components
import BgBar from "../../assets/images/bg-horizontal-bar.png";
import { IoMailUnreadOutline } from "react-icons/io5";

const SentEmail = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
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
        <div className="flex justify-center items-center mx-auto mb-6 h-16 w-16 rounded-full bg-hgreen-200">
          <IoMailUnreadOutline className="text-hgreen-500 h-8 w-8" />
        </div>

        <div className="space-y-2 mb-6">
          <h1 className="h2 text-center ">Check your email</h1>
          <p className="text-center text-sm text-hdark-400">
            We've sent password reset instructions to{" "}
            <span className="text-hdark-500 font-semibold">{email}</span>
          </p>
        </div>

        <div className="h-20 w-full bg-hgreen-200 p-4 rounded-xl text-[#15803D] text-sm text-center border border-hgreen-500">
          Please check your email for the password reset link. It may take a few
          minutes to arrive.
        </div>

        <Link
          to="/login"
          className="flex items-center justify-center text-xs text-slate-500 hover:text-slate-800 transition xl:mt-6 mt-4 mx-auto">
          <BiChevronLeft size={14} className="mr-1" />
          Back to sign in
        </Link>
      </div>
    </div>
  );
};

export default SentEmail;
