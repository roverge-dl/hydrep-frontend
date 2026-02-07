import { BiPlus } from "react-icons/bi";
import PageLayout from "../components/ui/PageLayout";
import Button from "../components/forms/Button";
import { useState } from "react";
import ApplicationCard from "../components/application/ApplicationCard";

const TABS = [
  { label: "All", count: 7 },
  { label: "Pending", count: 1 },
  { label: "Approved", count: 0 },
  { label: "Rejected", count: 0 },
  { label: "Drafts", count: 6 },
];

const APPLICATIONS = [
  { title: "Application 1", id: "1", date: "2023-01-01", status: "Draft" },
  { title: "Application 2", id: "2", date: "2023-02-01", status: "Pending" },
  { title: "Application 3", id: "3", date: "2023-03-01", status: "Approved" },
  { title: "Application 4", id: "4", date: "2023-04-01", status: "Rejected" },
];

const Application = () => {
  const [activeTab, setActiveTab] = useState("All");
  return (
    <div>
      <PageLayout
        isAction={true}
        title="My Applications"
        subtitle="Track and manage your programme applications"
        children={
          <Button leftIcon={<BiPlus className="w-4 h-4" />} onClick={() => {}}>
            New Application
          </Button>
        }
      />
      <div className="space-y-6">
        {/* Tabs Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar sm:w-fit  bg-hwhite-400 h-fit rounded-lg ">
          {TABS.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`
              whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer
              ${
                activeTab === tab.label
                  ? "bg-white text-hdark-500 shadow-xs border border-slate-100"
                  : "text-hdark-300 hover:text-hdark-500 hover:bg-slate-50"
              }
            `}>
              {tab.label}{" "}
              <span className="ml-1 text-hdark-300">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* List of Applications */}
        <div className="mt-4">
          {APPLICATIONS.map((_, i) => (
            <ApplicationCard
              key={i}
              title={_.title}
              id={_.id}
              date={_.date}
              status={_.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Application;
