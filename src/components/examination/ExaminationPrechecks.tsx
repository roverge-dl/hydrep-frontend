import { LuMonitorCheck } from "react-icons/lu";

import { useState } from "react";
import { ReadinessItem } from "./ReadinessItem";
import { DetailCard } from "./ReadinessItem";
import PageLayout from "../ui/PageLayout";
import { GoBrowser } from "react-icons/go";
import { IoWifiOutline } from "react-icons/io5";
import { RiExpandDiagonalLine } from "react-icons/ri";
import { GrInfo } from "react-icons/gr";
import ExamInstructions from "./ExaminationInstructions";
import Button from "../forms/Button";
import { useNavigate } from "react-router-dom";
interface ExamPrecheckProps {
  onStart: () => void;
}

const ExamPrechecks = ({ onStart }: ExamPrecheckProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl me-auto sm:p-6 mobilemd:p-2 p-0">
      <PageLayout
        isAction={false}
        title="  Examination Instructions"
        subtitle="General Aptitude Test"
        children={null}
      />

      {/* System Readiness Section */}
      <section className="mobilemd:my-8 my-4">
        <h2 className="flex items-center gap-2 font-bold mb-4">
          <LuMonitorCheck size={20} /> System Readiness Check
        </h2>
        <ReadinessItem
          label="Browser Compatibility"
          status="success"
          icon={<GoBrowser className="text-hdark-300 h-5 w-5" />}
        />
        <ReadinessItem
          label="Internet Connection"
          status="success"
          icon={<IoWifiOutline className="text-hdark-300 h-6 w-6" />}
        />
        <ReadinessItem
          label="Fullscreen Mode"
          status="loading"
          subtext="Will activate on start"
          icon={<RiExpandDiagonalLine className="text-hdark-300 h-6 w-6" />}
        />
      </section>

      {/* Detail Cards Row */}
      <section>
        <h2 className="flex items-center gap-2 font-bold mb-4">
          <GrInfo size={20} /> Examination Details
        </h2>
        <div className="flex mobilelg:gap-4 gap-2 mobilelg:mb-8 mb-4 mobilelg:flex-nowrap flex-wrap">
          <DetailCard
            label="Duration"
            value="20 min"
            colorClass="bg-[#EFF6FF] text-[#1E3A8A]"
          />
          <DetailCard
            label="Questions"
            value="5"
            colorClass="bg-[#FAF5FF] text-[#581C87]"
          />
          <DetailCard
            label="Passing Score"
            value="60%"
            colorClass="bg-green-50 text-hgreen-600"
          />
        </div>
      </section>
      <ExamInstructions />

      {/* Start Action */}
      <div className="mt-4 p-4 bg-hgrey-500 rounded-lg">
        <label className="flex items-center gap-3  cursor-pointer">
          <input
            type="checkbox"
            onChange={(e) => setIsChecked(e.target.checked)}
            className="w-5 h-5 accent-green-600"
          />
          <span className="text-sm text-gray-600">
            I have read and understood the rules.
          </span>
        </label>
      </div>
      <Button
        disabled={!isChecked}
        onClick={() => {
          onStart();
          navigate("/exams/start");
        }}
        className="w-7/12 px-4 ms-auto mt-4">
        Start Examination
      </Button>
    </div>
  );
};

export default ExamPrechecks;
