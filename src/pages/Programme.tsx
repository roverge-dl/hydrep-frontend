// import { Search, Filter, Map } from "lucide-react";
// import ProgrammeCard from "../components/programmes/ProgrammeCard";

import { BiSearch } from "react-icons/bi";
import ProgrammeCard from "../components/programme/ProgrammeCard";
import PageLayout from "../components/ui/PageLayout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPrograms } from "../services/api/applicationService";

interface Programme {
  title: string;
  category: string;
  categoryColor: string;
  description: string;
  spots: number;
  deadline: string;
  region: string;
}
const PROGRAMMES_DATA = [
  {
    title: "Youth Empowerment and Skills Development",
    category: "skills development",
    categoryColor: "bg-pink-50 text-pink-500",
    description:
      "A comprehensive programme designed to equip young Nigerians with marketable skills in various sectors...",
    spots: 3753,
    deadline: "Dec 31, 2026",
    region: "North, South, East, West",
  },
  {
    title: "Women in Agriculture Programme",
    category: "livelihood",
    categoryColor: "bg-green-50 text-green-500",
    description:
      "Supporting women farmers with modern farming techniques, equipment, and market linkages...",
    spots: 2108,
    deadline: "Feb 28, 2027",
    region: "North, Central",
  },
  {
    title: "Digital Skills for Innovation",
    category: "training",
    categoryColor: "bg-blue-50 text-blue-500",
    description:
      "Intensive training in software development, data science, UI/UX design, and digital marketing...",
    spots: 1433,
    deadline: "Aug 15, 2026",
    region: "South, West",
  },
];

export default function Programmes() {
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgrammmes = async () => {
      try {
        const response = await getPrograms();
        console.log(response);

        if (response.status === "success") {
          console.log("fetched programmes", response.data.data);
          setProgrammes(response?.data?.data);
        }
      } catch (err: any) {
        if (err) {
          console.log(err);
        } else {
          console.log(err.message);
        }
      }
    };
    fetchProgrammmes();
  }, []);
  return (
    <div className="space-y-8">
      <PageLayout
        isAction={false}
        subtitle="Browse and apply to programmes that match your interests"
        title="Available Programmes"
        children={null}
      />
      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 min-h-16 border border-hgrey-500 bg-white rounded-xl p-2 ">
        <div className="relative flex-1">
          <BiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search programmes..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-hgrey-500 rounded-md focus:outline-none focus:ring-2 focus:ring-hgreen-500/20 focus:border-hgreen-500 text-sm"
          />
        </div>

        <div className="flex gap-2">
          <select className="bg-white border border-slate-200 rounded-md px-4 py-2.5 text-sm text-slate-600 focus:outline-none outline-none cursor-pointer">
            <option>All Categories</option>
          </select>
          <select className="bg-white border border-slate-200 rounded-md px-4 py-2.5 text-sm text-slate-600 focus:outline-none outline-none cursor-pointer">
            <option>All Regions</option>
          </select>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 mobilelg:grid-cols-2 tabletlg:grid-cols-3 laptopmd:grid-cols-3 lg:gap-6 gap-4 pb-8">
        {programmes?.map((prog, idx) => (
          <ProgrammeCard
            key={idx}
            {...prog}
            handleApply={() => navigate("/programme-apply")}
          />
        ))}
      </div>
    </div>
  );
}
