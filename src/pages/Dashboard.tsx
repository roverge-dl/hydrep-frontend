import PageLayout from "../components/ui/PageLayout";
import { PiFileTextBold } from "react-icons/pi";
import DashboardCard from "../components/dashboard/DashboarCard";
import { IoIosHourglass } from "react-icons/io";
import { PiGraduationCap } from "react-icons/pi";
import { IoMdNotificationsOutline } from "react-icons/io";
import Button from "../components/forms/Button";
import { BiPlus } from "react-icons/bi";
import { useAuth } from "../context/AuthContext";

const dashboardData = [
  {
    title: " Applications",
    value: "10",
    status: "Active",
    color: "bg-linear-to-b from-[#0F172A] to-[#1E293B]",
    icon: <PiFileTextBold className="w-6 h-6" />,
  },

  {
    title: "Active Programs",
    value: "10",
    status: "Active",
    color: "bg-linear-to-b from-[#10B981] to-[#059669]",
    icon: <IoIosHourglass className="w-6 h-6" />,
  },
  {
    title: "Upcoming Exams",
    value: "10",
    status: "Active",
    color: "bg-linear-to-b from-[#F59E0B] to-[#D97706]",
    icon: <PiGraduationCap className="w-6 h-6" />,
  },
  {
    title: "Total Applications",
    value: "10",
    status: "Active",
    color: "bg-linear-to-b from-[#3B82F6] to-[#2563EB]",
    icon: <IoMdNotificationsOutline className="w-6 h-6" />,
  },
];

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="space-y-4">
      <PageLayout
        isAction={false}
        title={`Welcome back! ${user?.user?.first_name}`}
        subtitle="Track your applications, programmes, and upcoming activities"
        children={
          <Button leftIcon={<BiPlus className="w-4 h-4" />} onClick={() => {}}>
            New Application
          </Button>
        }
      />

      <div className="grid tabletlg:grid-cols-4 mobilelg:grid-cols-2 gap-4">
        {dashboardData.map((card, index) => (
          <div className="col-span-1" key={index}>
            <DashboardCard {...card} />
          </div>
        ))}
      </div>

      <div className="grid tabletlg:grid-cols-5 gap-4">
        <div className="tabletlg:col-span-3 col-span-5 border border-hdark-300 rounded-lg p-4 bg-white min-h-80">
          <div className="flex justify-between">
            <h1 className="title">Recent Applications</h1>{" "}
            <button className="text-sm cursor-pointer text-hdark-500  hover:text-hgreen-500">
              View All
            </button>
          </div>
          <div className="min-h-72 flex justify-end flex-col">
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="p-2 h-12 w-12 bg-hwhite-300 rounded-full flex items-center justify-center">
                <PiFileTextBold className="w-6 h-7 text-hdark-400" />
              </div>
              <h1 className="title">No Application yet</h1>
              <p className="body-sm">Start by applying to a programme</p>
              <Button
                width="mobilesm:w-7/12 w-full"
                leftIcon={<BiPlus className="w-6 h-6" />}>
                Browse Programs
              </Button>
            </div>
          </div>
        </div>
        <div className="tabletlg:col-span-2 col-span-5 border border-hdark-300 rounded-lg p-4 bg-white min-h-80">
          <div className="flex justify-between">
            <h1 className="title">Announcements</h1>{" "}
          </div>
          <div className="min-h-72 flex justify-center flex-col">
            <div className="flex flex-col justify-center items-center gap-2">
              <h1 className="body-sm">No Announcement</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
