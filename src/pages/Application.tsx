/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/dashboard/Application.tsx (or wherever your file is located)
import { useEffect, useState } from "react";
import { BiPlus, BiLoaderAlt, BiFolderOpen } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

// Components

import PageLayout from "../components/ui/PageLayout";
import Button from "../components/forms/Button";
import ApplicationCard from "../components/application/ApplicationCard";

// API
import {
  getUserApplications,
  type ApplicationResponse,
} from "../services/api/applicationService";

// Define the tabs we want to show
const TAB_KEYS = ["All", "Pending", "Approved", "Rejected", "Draft"];

const Application = () => {
  const navigate = useNavigate();

  // State
  const [activeTab, setActiveTab] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState<ApplicationResponse["data"]>(
    [],
  );
  console.log("applications", applications);

  // Stats state (initialized to 0)
  const [stats, setStats] = useState<Record<string, number>>({
    all: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    draft: 0,
  });

  // Fetch Data whenever Active Tab changes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getUserApplications(activeTab);
        console.log("response", response);
        setApplications(response.data);

        // Update stats (The API returns keys in lowercase: 'all', 'pending', etc.)
        if (response.stats) {
          setStats(response.stats);
        }
      } catch (error: any) {
        console.error(error);
        // toast.error(error.message || "Could not load applications");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  return (
    <div>
      <PageLayout
        isAction={true}
        title="My Applications"
        subtitle="Track and manage your programme applications"
        children={
          <Button
            leftIcon={<BiPlus className="w-4 h-4" />}
            onClick={() => navigate("/programmes")} // Navigate to program listing to start new
          >
            New Application
          </Button>
        }
      />

      <div className="space-y-6">
        {/* Tabs Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar sm:w-fit bg-hwhite-400 h-fit rounded-lg p-1">
          {TAB_KEYS.map((label) => {
            // Get the count from our stats object using the lowercase label as key
            const count = stats[label.toLowerCase()] || 0;
            const isActive = activeTab === label;

            return (
              <button
                key={label}
                onClick={() => setActiveTab(label)}
                className={`
                  whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer flex items-center gap-2
                  ${
                    isActive
                      ? "bg-white text-hdark-500 shadow-sm border border-slate-100"
                      : "text-hdark-300 hover:text-hdark-500 hover:bg-slate-50"
                  }
                `}>
                {label}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? "bg-gray-100" : "bg-gray-200/50"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="mt-4 min-h-75">
          {isLoading ? (
            // Loading State
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <BiLoaderAlt className="animate-spin w-8 h-8 mb-2 text-green-600" />
              <p className="text-sm">Loading applications...</p>
            </div>
          ) : applications.length > 0 ? (
            // List of Applications
            <div className="grid grid-cols-1 gap-4">
              {applications.map((app) => (
                <ApplicationCard
                  key={app.id}
                  id={app.id}
                  title={app.title}
                  date={app.date}
                  status={app.status}
                  // Navigate to details page with the application ID
                  viewDetails={() => navigate(`/applications/${app.id}`)}
                />
              ))}
            </div>
          ) : (
            // Empty State
            <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-100 rounded-xl bg-gray-50/50">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 text-gray-400">
                <BiFolderOpen size={24} />
              </div>
              <p className="text-sm font-semibold text-hdark-500">
                No applications found
              </p>
              <p className="text-xs text-gray-400 mt-1">
                You don't have any{" "}
                {activeTab !== "All" ? activeTab.toLowerCase() : ""}{" "}
                applications yet.
              </p>
              {activeTab === "All" && (
                <button
                  onClick={() => navigate("/programmes")}
                  className="mt-4 text-xs font-bold text-green-600 hover:underline">
                  Start a new application
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Application;
