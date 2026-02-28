import PageLayout from "../components/ui/PageLayout";
import { PiFileTextBold } from "react-icons/pi";
import DashboardCard from "../components/dashboard/DashboarCard";
import { IoIosHourglass } from "react-icons/io";
import { PiGraduationCap } from "react-icons/pi";
import { IoMdNotificationsOutline } from "react-icons/io";
import Button from "../components/forms/Button";
import { BiPlus } from "react-icons/bi";
import { useAuth } from "../context/AuthContext";
import { getDashboardDetails } from "../services/api/dashboardService";
import { useEffect, useState } from "react";

const dashboardDetails = [
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
  const [stats, setStats] = useState<any>(null);
  const [loading, setIsLoading] = useState(false);
  console.log(loading);
  const { user } = useAuth();
  console.log(dashboardDetails);

  useEffect(() => {
    const fetchDashboardDetails = async () => {
      try {
        const res = await getDashboardDetails();
        setIsLoading(true);
        console.log(res);

        if (res.status === "success") {
          setStats(res.data);
          setIsLoading(false);
        }
        if (res.status === "fail") {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching dashboard details:", error);
      }
    };
    fetchDashboardDetails();
  }, []);
  const cards = [
    {
      title: "Enrollments",
      value: stats?.enrollmentsCount?.toString() || "0",
      status: "Active",
      color: "bg-linear-to-b from-[#0F172A] to-[#1E293B]",
      icon: <PiFileTextBold className="w-6 h-6" />,
    },
    {
      title: "Active Programs",
      value: stats?.activeProgramsCount?.toString() || "0",
      status: "Active",
      color: "bg-linear-to-b from-[#10B981] to-[#059669]",
      icon: <IoIosHourglass className="w-6 h-6" />,
    },
    {
      title: "Upcoming Exams",
      value: stats?.upcomingExamsCount?.toString() || "0",
      status: "Scheduled",
      color: "bg-linear-to-b from-[#F59E0B] to-[#D97706]",
      icon: <PiGraduationCap className="w-6 h-6" />,
    },
    {
      title: "Past Exams",
      value: stats?.pastExamsCount?.toString() || "0",
      status: "Completed",
      color: "bg-linear-to-b from-[#3B82F6] to-[#2563EB]",
      icon: <IoMdNotificationsOutline className="w-6 h-6" />,
    },
  ];
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
        {cards.map((card, index) => (
          <div className="col-span-1" key={index}>
            {/* You might want a skeleton loader here if isLoading is true */}
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
          <div className="mt-4">
            {stats?.recentApplications?.length > 0 ? (
              <div className="space-y-3">
                {stats.recentApplications.map((app: any) => (
                  <div
                    key={app.id}
                    className="p-3 border rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-sm text-hdark-500">
                        Program ID: {app.programId}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs ${app.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              /* Your existing "No Application yet" Empty State code here */
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
            )}
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
