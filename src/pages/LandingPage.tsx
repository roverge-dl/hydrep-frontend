import { BiCheckCircle, BiMenu } from "react-icons/bi";
import { Link } from "react-router-dom";
import Button from "../components/forms/Button";
import { FaBookReader } from "react-icons/fa";
import { MdLocalActivity, MdPersonalInjury } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { FiArrowRight } from "react-icons/fi";
import Logo from "../assets/svgs/hydrep-logo.svg";
import { IoIosCloseCircle } from "react-icons/io";
import { useState } from "react";
import {
  motion,
  AnimatePresence,
  type Variants,
  useScroll,
} from "framer-motion";

// Fixed Animation Variants with explicit Types
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const LandingPage = () => {
  const year = new Date().getFullYear();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fixed: use scrollYProgress for the progress bar
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen">
      {/* Fixed Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-hgreen-500 z-[70] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <header className="px-6 mobilemd:h-20 py-4 mx-auto fixed top-0 left-0 right-0 w-full z-50 bg-white/90 backdrop-blur-sm">
        <nav className="flex items-center justify-between">
          <motion.a
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            href="/"
            className="text-2xl font-bold text-hgreen-600">
            <img src={Logo} className="object-cover w-32 h-fit" alt="Logo" />
          </motion.a>

          <button
            className="md:hidden h-8 w-8 text-[#00BF6F] bg-hgreen-200 rounded-lg flex items-center justify-center border border-[#00BF6F]"
            onClick={() => setIsMenuOpen(true)}>
            <BiMenu size={24} />
          </button>

          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            {["Programs", "Features", "Benefits"].map((item, i) => (
              <motion.a
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                href={`#${item.toLowerCase()}`}
                className="hover:text-hgreen-600 transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-hgreen-500 transition-all group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          <div className="gap-4 items-center mobilemd:flex hidden">
            <Link
              to="/login"
              className="text-sm font-semibold hover:text-hgreen-600">
              Sign In
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/register">
                <Button onClick={() => {}}>Get Started</Button>
              </Link>
            </motion.div>
          </div>
        </nav>

        {/* Mobile Menu Animation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="flex flex-col justify-center min-h-screen w-full fixed inset-0 p-8 bg-hgreen-200 z-[100]">
              <button
                className="self-end absolute top-6 right-6"
                onClick={() => setIsMenuOpen(false)}>
                <IoIosCloseCircle className="text-red-500 w-10 h-10" />
              </button>
              <ul className="space-y-8 flex-col flex text-xl font-bold text-hdark-500">
                <motion.a
                  onClick={() => setIsMenuOpen(false)}
                  href="/programmes">
                  Programs
                </motion.a>
                <motion.a onClick={() => setIsMenuOpen(false)} href="#features">
                  Features
                </motion.a>
                <motion.a onClick={() => setIsMenuOpen(false)} href="#benefits">
                  Benefits
                </motion.a>
                <Link to="/login" className="hover:underline">
                  Sign In
                </Link>
                <Link to="/register">
                  <Button onClick={() => {}}>Get Started</Button>
                </Link>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* Hero Section */}
        <section
          className="relative items-center bg-linear-to-tr from-[#00BF6F] via-[#224B41] to-[#00BF6F] tabletmd:pt-20 pt-12"
          id="features">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-6xl laptopmd:px-0 mobilemd:px-8 px-4 py-16 md:py-24 mx-auto grid tabletlg:grid-cols-2 tabletlg:gap-12 gap-8">
            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="flex justify-between items-center px-4 py-3 w-fit gap-x-4 rounded-full backdrop-blur-2xl bg-[#FFFFFF1A]">
                <div className="h-2 w-2 rounded-full bg-[#34D399]" />
                <span className="text-white mobilesm:text-sm text-xs tracking-wide capitalize">
                  Government Skills Empowerment Platform
                </span>
              </div>
              <h1 className="mobilemd:text-4xl text-3xl md:text-5xl font-bold text-[#FFFFFF] leading-tight">
                Transform Your <br className="mobilelg:block hidden" /> Future
                Through <br className="mobilelg:block hidden" /> Learning
              </h1>
              <p className="text-base text-[#D1D5DB] max-w-lg">
                Access quality skill development programs, apply for social
                intervention programmes, and advance your career with
                government-backed initiatives.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/register"
                  className="mobilemd:px-6 px-3 mobilemd:text-base text-sm py-3 bg-white text-hdark-500 rounded-lg hover:bg-transparent hover:border-white border border-transparent hover:text-white cursor-pointer flex items-center gap-2 transition-all duration-300">
                  Get Started <FiArrowRight />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/programmes"
                  className="mobilemd:px-6 px-3 mobilemd:text-base text-sm py-3 bg-white text-hdark-500 rounded-lg hover:bg-transparent hover:border-white border border-transparent hover:text-white cursor-pointer flex items-center gap-2 transition-all duration-300">
                  Explore Programs
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative">
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="backdrop-blur-2xl rounded-3xl p-8 bg-white/5 border border-white/10 shadow-2xl">
                <div className="space-y-4">
                  <FeaturePill
                    text="Interactive Learning Modules"
                    icon={<FaBookReader />}
                  />
                  <FeaturePill
                    text="Personalized Learning Paths"
                    icon={<MdPersonalInjury />}
                  />
                  <FeaturePill
                    text="Track Your Progress"
                    icon={<GiProgression />}
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <motion.section
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          className="bg-[#F8FAFC] flex items-center justify-center w-full border-b border-[#E2E8F0]">
          <div className=" py-8 w-full flex mobilemd:justify-evenly justify-between mobilemd:gap-x-0 gap-x-8 items-center flex-wrap gap-y-4 mobilemd:px-0 px-8">
            {[
              { val: "1000+", label: "Active Learners" },
              { val: "50+", label: "Programs" },
              { val: "95%", label: "Success Rate" },
              { val: "24/7", label: "Support" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center">
                <h3 className="text-3xl font-bold text-slate-900">
                  {stat.val}
                </h3>
                <p className="text-sm text-slate-500 font-medium capitalize tracking-tighter">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Features Section */}
        <section
          className="bg-white tabletmd:py-20 py-12 mobilemd:px-6 px-4"
          id="programs">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-2xl font-bold text-slate-900">
              Everything You Need to Succeed
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Access a comprehensive platform designed to support your personal
              and professional growth.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto grid md:grid-cols-3 tabletlg:gap-8 gap-4">
            <FeatureCard
              title="Skill Development Programs"
              desc="Access government-backed learning programs designed to enhance your skills and career prospects"
              icon={<FaBookReader size={20} />}
            />
            <FeatureCard
              title="Social Programmes"
              desc="Apply for livelihood and empowerment programmes tailored to support your growth"
              icon={<MdLocalActivity size={20} />}
            />
            <FeatureCard
              title="Assessment & Certification"
              desc="Take courses and assessments to validate your knowledge and eligibility"
              icon={<GiProgression size={20} />}
            />
          </motion.div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-[#F8FAFC]" id="benefits">
          <div className="tabletlg:py-24 tabletmd:py-20 py-12 mobilemd:px-6 px-4 max-w-6xl mx-auto border-t border-slate-100">
            <div className="grid tabletlg:grid-cols-2 tabletlg:gap-16 gap-8 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    Why Choose Our Platform?
                  </h2>
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
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 text-slate-700 font-medium">
                      <BiCheckCircle className="text-hgreen-500" size={20} />
                      <span className="mobilemd:text-base text-sm">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-4 rounded-xl border-hdark-300 border relative shadow-sm">
                <div className="space-y-6 relative z-10">
                  <div className="flex justify-between p-2 bg-slate-50 rounded-lg items-center">
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-bold">4.8/5</span>
                      <span className="text-slate-400 text-xs font-normal ml-2">
                        Average Rating
                      </span>
                    </div>
                    <div className="text-hgreen-500 text-xl font-bold">
                      ★★★★★
                    </div>
                  </div>
                  <div className="bg-[#F8FAFC] space-y-8 p-4 rounded-lg">
                    <blockquote className="text-sm leading-relaxed text-hdark-200 italic">
                      "This platform has completely transformed my career
                      prospects. The programs are well-structured and the
                      support is exceptional."
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-hgreen-600 rounded-full flex items-center justify-center text-white font-bold">
                        A
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">Aisha M.</h4>
                        <p className="text-sm text-slate-500">
                          Program Graduate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="tabletmd:py-16 py-12 mobilemd:px-6 px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center space-y-8 bg-linear-to-tr from-[#00BF6F] via-[#224B41] to-[#00BF6F] mobilelg:p-12 p-8 rounded-xl text-white shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Ready to Start Your Journey?
            </h2>
            <p className="text-hgreen-50 mobilemd:text-lg text-base opacity-90">
              Join our community of learners and take the first step towards a
              brighter future.
            </p>
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white text-hdark-500 rounded-lg hover:bg-transparent hover:border-white border border-transparent hover:text-white cursor-pointer flex items-center gap-2 transition-all duration-300">
                Get Started <FiArrowRight />
              </motion.button>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="bg-[#224B41] text-white tabletmd:py-16 py-8 mobilemd:px-6 px-4 ">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-white">HYPER</h2>
            <p className="text-sm leading-relaxed w-10/12">
              Empowering individuals through skill development and social
              intervention programmes.
            </p>
          </div>

          <div className="space-y-4">
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

          <div className="space-y-4">
            <h4 className="text-white font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/applications"
                  className="hover:text-[#34D399] hover:underline">
                  Available Programs
                </Link>
              </li>
              <li>
                <Link
                  to="/programmes"
                  className="hover:text-[#34D399] hover:underline">
                  Programmes
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="hover:text-[#34D399] hover:underline">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto tabletmd:mt-16 mt-8 pt-8 border-t border-white/20 text-center flex tabletmd:justify-between items-center flex-col-reverse tabletmd:flex-row tabletmd:flex-nowrap flex-wrap justify-center gap-y-8">
          <p className="text-xs font-normal text-white/70">
            © {year} Hydrep Portal Powered By{" "}
            <a href="https://roverge.com" className="underline text-[#34D399]">
              Roverge.
            </a>{" "}
            All rights reserved.
          </p>
          <ul className="text-sm flex justify-center items-center gap-x-6">
            <li>
              <Link to="#" className="hover:text-[#34D399] hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-[#34D399] hover:underline">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-[#34D399] hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

// Helper Components with Motion
const FeaturePill = ({
  text,
  icon,
}: {
  text: string;
  icon?: React.ReactNode;
}) => (
  <motion.div
    whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.1)" }}
    className="bg-[#FFFFFF0D] p-4 rounded-xl flex items-center gap-3 group cursor-pointer transition-colors">
    {icon && (
      <div className="h-10 w-10 p-1 rounded-lg group-hover:text-[#4DA313] text-[#34D399] bg-[#224B41] flex justify-center items-center">
        {icon}
      </div>
    )}
    <span className="text-sm font-normal text-white">{text}</span>
  </motion.div>
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
  <motion.div
    variants={fadeInUp}
    whileHover={{ y: -10 }}
    className="bg-white tabletlg:p-8 p-4 rounded-2xl transition-shadow hover:shadow-lg cursor-pointer border border-[#E5E5E5]">
    <div className="w-12 h-12 bg-hgreen-50 rounded-lg mb-6 flex items-center justify-center text-hgreen-600">
      {icon && (
        <div className="h-10 w-10 p-1 flex items-center justify-center text-[#00BF6F] bg-[#D0EFE6] rounded-lg">
          {icon}
        </div>
      )}
    </div>
    <h3 className="text-base font-bold text-hdark-500 mb-3">{title}</h3>
    <p className="text-hdark-300 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

export default LandingPage;
