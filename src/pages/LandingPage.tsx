import { BiCheckCircle, BiMenu } from "react-icons/bi";
import { Link } from "react-router-dom"; // Reusing your existing asset
import Button from "../components/forms/Button";
import { FaBookReader } from "react-icons/fa";
import { MdLocalActivity, MdPersonalInjury } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { FiArrowRight } from "react-icons/fi";
import Logo from "../assets/svgs/hydrep-logo.svg";
import { IoIosCloseCircle } from "react-icons/io";
import { useState } from "react";

const LandingPage = () => {
  const year = new Date().getFullYear();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="min-h-screen ">
      <header className=" px-6 mobilemd:h-20 py-4 mx-auto fixed top-0 left-0 right-0 w-full z-50 bg-white/90 backdrop-blur-sm">
        <nav className="flex items-center justify-between ">
          <a href="/" className="text-2xl font-bold text-hgreen-600">
            <img src={Logo} className="object-cover w-32 h-fit" alt="" />
          </a>{" "}
          <button
            className="md:hidden  h-8 w-8 text-[#00BF6F] bg-hgreen-200 rounded-lg flex items-center justify-center border border-[#00BF6F]"
            onClick={() => setIsMenuOpen(true)}>
            <BiMenu size={24} />
          </button>
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
            <a
              href="#programs"
              className="hover:underline hover:text-hdark-500 active:text-hdark-500">
              Programs
            </a>{" "}
            {/* [cite: 4, 51] */}
            <a
              href="#features"
              className="hover:underline hover:text-hdark-500 active:text-hdark-500">
              Features
            </a>{" "}
            {/* [cite: 49] */}
            <a
              href="#benefits"
              className="hover:underline hover:text-hdark-500 active:text-hdark-500">
              Benefits
            </a>{" "}
            {/* [cite: 50] */}
          </div>
          <div className=" gap-4 items-center mobilemd:flex hidden">
            <Link to="/login" className="text-sm font-semibold hover:underline">
              Sign In
            </Link>{" "}
            {/* [cite: 5, 52] */}
            <Link to="/register">
              <Button onClick={() => {}}>Get Started</Button>{" "}
            </Link>
            {/* [cite: 6, 56] */}
          </div>
        </nav>

        {isMenuOpen && (
          <nav className="mobilemd:flex flex flex-col  justify-center min-h-screen w-full absolute inset-0 p-8 bg-hgreen-200">
            <button
              className="self-end absolute top-2 right-0"
              onClick={() => setIsMenuOpen(false)}>
              <IoIosCloseCircle className="text-red-500 w-8 h-8" />
            </button>
            <ul className="space-y-8 flex-col flex">
              <a href="/programmes">Programs</a>
              <a href="#features">Features</a>
              <a href="#benefits">Benefits</a>
              <Link
                to="/login"
                className="text-sm font-semibold hover:underline">
                Sign In
              </Link>{" "}
              <Link to="/register">
                <Button onClick={() => {}}>Get Started</Button>{" "}
              </Link>
            </ul>
          </nav>
        )}
      </header>

      <div>
        <section
          className="relative   items-center bg-linear-to-tr from-[#00BF6F] via-[#224B41] to-[#00BF6F] tabletmd:pt-20 pt-12"
          id="features">
          <div className="max-w-6xl laptopmd:px-0 mobilemd:px-8 px-4 py-16 md:py-24  mx-auto grid tabletlg:grid-cols-2 tabletlg:gap-12 gap-8 ">
            <div className="space-y-4">
              <div className="flex justify-between items-center px-4 py-3 w-fit gap-x-4 rounded-full backdrop-blur-2xl bg-[#FFFFFF1A]">
                <div className="h-2 w-2 rounded-full bg-[#34D399]" />
                <span className="text-white  mobilesm:text-sm text-xs tracking-wide capitalize">
                  Government Skills Empowerment Platform {/* [cite: 7] */}
                </span>
              </div>
              <h1 className="mobilemd:text-4xl text-3xl md:text-5xl font-bold text-[#FFFFFF] leading-tight">
                Transform Your <br className="mobilelg:block hidden" /> Future
                Through <br className="mobilelg:block hidden" /> Learning{" "}
                {/* [cite: 8] */}
              </h1>
              <p className="text-base text-[#D1D5DB] max-w-lg">
                Access quality skill development programs, apply for social
                intervention programmes, and advance your career with
                government-backed initiatives {/* [cite: 9] */}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/register"
                  className="mobilemd:px-6 px-3 mobilemd:text-base text-sm py-3 bg-white text-hdark-500 rounded-lg hover:bg-transparent hover:border-white border border-transparent hover:text-white cursor-pointer flex items-center gap-2 transition-colors duration-300  ease-in-out">
                  Get Started {/* [cite: 14] */}
                  <FiArrowRight />
                </a>
                <a
                  href="/programmes"
                  className="mobilemd:px-6 px-3 mobilemd:text-base text-sm py-3 bg-white text-hdark-500 rounded-lg hover:bg-transparent hover:border-white border border-transparent hover:text-white cursor-pointer flex items-center gap-2 transition-colors duration-300  ease-in-out">
                  Explore Programs {/* [cite: 14] */}
                </a>
              </div>
            </div>

            {/* Hero Visual Block */}
            <div className="backdrop-blur-2xl rounded-xl mobilemd:p-8 p-4 relative overflow-hidden min-h-fit flex items-center justify-center bg-[#FFFFFF0D] self-center border border-[#FFFFFF1A]">
              <div className="space-y-4 relative z-10 w-full max-w-full">
                <FeaturePill
                  text="Interactive Learning Modules"
                  icon={<FaBookReader size={20} />}
                />{" "}
                {/* [cite: 10] */}
                <FeaturePill
                  text="Personalized Learning Paths"
                  icon={<MdPersonalInjury size={20} />}
                />{" "}
                {/* [cite: 11] */}
                <FeaturePill
                  text="Track Your Progress"
                  icon={<GiProgression size={20} />}
                />{" "}
                {/* [cite: 12] */}
              </div>
              {/* <img
                src={circle}
                className="absolute top-0 right-0 opacity-20"
                alt=""
              /> */}
            </div>
          </div>
        </section>

        <section className="bg-[#F8FAFC] flex items-center justify-center w-full border-b border-[#E2E8F0]">
          <div className="py-8 w-full flex mobilemd:justify-evenly justify-between mobilemd:gap-x-0 gap-x-8 items-center flex-wrap gap-y-4 mobilemd:px-0 px-8 ">
            <div className="flex flex-col items-center">
              <h3 className="mobilemd:text-2xl text-xl font-bold text-slate-900">
                1000+
              </h3>{" "}
              <p className="text-sm text-slate-500">Active Learners</p>{" "}
            </div>
            <div className="flex flex-col items-center">
              <h3 className="mobilemd:text-2xl text-xl font-bold text-slate-900">
                50+
              </h3>{" "}
              <p className="text-sm text-slate-500">Programs Available</p>{" "}
            </div>
            <div className="flex flex-col items-center">
              <h3 className="mobilemd:text-2xl text-xl font-bold text-slate-900">
                95%
              </h3>{" "}
              <p className="text-sm text-slate-500">Success Rate</p>{" "}
            </div>
            <div className="flex flex-col items-center">
              <h3 className="mobilemd:text-2xl text-xl font-bold text-slate-900">
                24/7
              </h3>{" "}
              <p className="text-sm text-slate-500">Support Access</p>{" "}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          className="bg-white tabletmd:py-20 py-12 mobilemd:px-6 px-4"
          id="programs">
          <div className="max-w-7xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-2xl font-bold text-slate-900">
              Everything You Need to Succeed
            </h2>{" "}
            {/*  */}
            <p className="text-slate-600 max-w-2xl mx-auto">
              Access a comprehensive platform designed to support your personal
              and professional growth {/* [cite: 23] */}
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 tabletlg:gap-8 gap-4">
            <FeatureCard
              title="Skill Development Programs"
              desc="Access government-backed learning programs designed to enhance your skills and career prospects"
              icon={<FaBookReader size={20} />}
            />{" "}
            {/* [cite: 24] */}
            <FeatureCard
              title="Social Programmes"
              desc="Apply for livelihood and empowerment programmes tailored to support your growth"
              icon={<MdLocalActivity size={20} />}
            />{" "}
            {/* [cite: 25, 28] */}
            <FeatureCard
              title="Assessment & Certification"
              desc="Take courses and assessments to validate your knowledge and eligibility"
              icon={<GiProgression size={20} />}
            />{" "}
            {/* [cite: 27, 29] */}
          </div>
        </section>
        {/* Testimonials Section */}
        <section className="bg-[#F8FAFC]" id="benefits">
          <div className="tabletlg:py-24 tabletmd:py-20 py-12 mobilemd:px-6 px-4 max-w-6xl mx-auto border-t border-slate-100">
            <div className="grid tabletlg:grid-cols-2 tabletlg:gap-16 gap-8 items-start">
              {/* Column 1: Why Choose Our Platform? */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    Why Choose Our Platform?
                  </h2>{" "}
                  <p className="text-slate-600">
                    Join thousands of learners who are transforming their lives
                    through our comprehensive skill development and empowerment
                    programs.
                  </p>
                </div>

                <ul className="grid grid-cols-1 gap-4">
                  {[
                    "Free access to skill development programs",
                    "Track your learning progress in real-time",
                    "Apply for government intervention programmes",
                    "Get certified through official assessments",
                    "Build your professional profile",
                    "Access support and resources",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-slate-700 font-medium ">
                      <BiCheckCircle className="text-hgreen-500" size={20} />
                      <span className="mobilemd:text-base text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Testimonial Card */}
              <div className="bg-white p-4 rounded-xl border-hdark-300 border relative">
                <div className="space-y-6 relative z-10">
                  <div className="flex justify-between p-2 bg-slate-50 rounded-lg items-center">
                    <div className="flex flex-col  items-center">
                      <span className="text-lg font-bold items-center">
                        4.8/5
                      </span>
                      <span className="text-slate-400 text-xs font-normal ml-2">
                        Average Rating
                      </span>{" "}
                    </div>
                    <div className="flex flex-col text-hyellow-500 gap-1 text-xl font-bold items-center ">
                      <span className="text-hgreen-500">★★★★★</span>
                    </div>
                  </div>
                  <div className="bg-[#F8FAFC] space-y-8 p-4 rounded-lg">
                    <blockquote className="text-sm leading-relaxed text-hdrak-200 italic">
                      "This platform has completely transformed my career
                      prospects. The programs are well-structured and the
                      support is exceptional."
                    </blockquote>{" "}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-hgreen-600 rounded-full flex items-center justify-center text-white font-bold">
                        A
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">Aisha M.</h4>{" "}
                        <p className="text-sm text-slate-500">
                          Program Graduate
                        </p>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className=" tabletmd:py-16 py-12 mobilemd:px-6 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8 bg-linear-to-tr from-[#00BF6F] via-[#224B41] to-[#00BF6F] mobilelg:p-12 p-8 rounded-xl text-white  ">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Ready to Start Your Journey?
            </h2>
            <p className="text-hgreen-50 mobilemd:text-lg text-base opacity-90">
              Join our community of learners and take the first step towards a
              brighter future
            </p>
            <div className="flex justify-center">
              <button className="px-6 py-3 bg-white text-hdark-500 rounded-lg hover:bg-transparent hover:border-white border border-transparent hover:text-white cursor-pointer flex items-center gap-2 transition-colors duration-300  ease-in-out">
                Get Started {/* [cite: 14] */}
                <FiArrowRight />
              </button>
            </div>
          </div>
        </section>
      </div>
      <footer className="bg-[#224B41] text-white tabletmd:py-16 py-8 mobilemd:px-6 px-4 ">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-white">HYPER</h2>{" "}
            {/* [cite: 46] */}
            <p className="text-sm leading-relaxed w-10/12">
              Empowering individuals through skill development and social
              intervention programmes. {/* [cite: 47] */}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 ">
            <h4 className="text-white font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#features"
                  className="hover:text-[#34D399] hover:underline">
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#benefits"
                  className="hover:text-[#34D399] hover:underline">
                  Benefits
                </a>
              </li>
              <li>
                <a
                  href="#programs"
                  className="hover:text-[#34D399] hover:underline">
                  Programs
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Resources</h4>{" "}
            {/* [cite: 54] */}
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/applications"
                  className="hover:text-[#34D399] hover:underline">
                  Available Programs
                </Link>
              </li>{" "}
              {/* [cite: 55] */}
              <li>
                <Link
                  to="/programmes"
                  className="hover:text-[#34D399] hover:underline">
                  Programmes
                </Link>
              </li>{" "}
              {/* [cite: 55] */}
              <li>
                <Link
                  to="/register"
                  className="hover:text-[#34D399] hover:underline">
                  Get Started
                </Link>
              </li>{" "}
              {/* [cite: 56] */}
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto tabletmd:mt-16 mt-8 pt-8 border-t border-white text-center flex tabletmd:justify-between items-center flex-col-reverse tabletmd:flex-row tabletmd:flex-nowrap flex-wrap justify-center gap-y-8">
          <p className="text-xs font-normal">
            © {year} {""}
            Hydrep Portal Powered By{" "}
            <a href="roverge.com" className="underline">
              Roverge.
            </a>{" "}
            All rights reserved.
          </p>
          <div className="">
            {/* [cite: 57] */}
            <ul className="text-sm flex justify-center items-center tabletmd:gap-x-4 gap-x-4">
              <li>
                <Link to="#" className="hover:text-[#34D399] hover:underline">
                  Privacy Policy
                </Link>
              </li>{" "}
              {/* [cite: 57] */}
              <li>
                <Link to="#" className="hover:text-[#34D399] hover:underline">
                  Terms of Service
                </Link>
              </li>{" "}
              {/* [cite: 57] */}
              <li>
                <Link to="#" className="hover:text-[#34D399] hover:underline">
                  Contact
                </Link>
              </li>{" "}
              {/* [cite: 57] */}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper Components
const FeaturePill = ({
  text,
  icon,
}: {
  text: string;
  icon?: React.ReactNode;
}) => (
  <div className="bg-[#FFFFFF0D] p-4 rounded-xl hover:shadow-sm  flex items-center jus gap-3 group cursor-pointer ">
    {icon && (
      <div className="h-10 w-10 p-1 rounded-lg group-hover:text-[#4DA313] text-[#34D399] bg-[#224B41] flex justify-center items-center">
        {icon}
      </div>
    )}
    <span className="text-sm font-normal text-white">{text}</span>
  </div>
);

const FeatureCard = ({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon?: React.ReactNode;
}) => (
  <div className="bg-white tabletlg:p-8 p-4 rounded-2xl transition-shadow hover:shadow-md  cursor-pointer border border-[#E5E5E5]">
    <div className="w-12 h-12 bg-hgreen-50 rounded-lg mb-6 flex items-center justify-center text-hgreen-600">
      {icon && (
        <div className="h-10 w-10 p-1 flex items-center justify-center text-[#00BF6F] bg-[#D0EFE6] rounded-lg">
          {" "}
          {icon}
        </div>
      )}
    </div>
    <h3 className="text-base font-bold text-hdark-500 mb-3">{title}</h3>
    <p className="text-hdark-300 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default LandingPage;
