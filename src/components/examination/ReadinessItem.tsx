import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

interface ReadinessItemProps {
  label: string;
  status: "loading" | "success";
  subtext?: string;
  icon?: React.ReactNode;
}
interface DetailCardProps {
  label: string;
  value: string;
  colorClass: string;
}
export const ReadinessItem = ({
  label,
  status,
  subtext,
  icon,
}: ReadinessItemProps) => (
  <div className="flex items-center justify-between p-4 mb-2 bg-white border border-hgrey-500 rounded-lg">
    <div className="flex items-center gap-3">
      <div className="text-gray-500">{icon}</div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
    {status === "loading" ? (
      <span className="text-xs text-gray-400 italic">{subtext}</span>
    ) : (
      <IoCheckmarkDoneCircleOutline className="w-5 h-5 text-green-500" />
    )}
  </div>
);

export const DetailCard = ({ label, value, colorClass }: DetailCardProps) => (
  <div
    className={`mobilemd:p-4 p-2 rounded-lg ${colorClass} flex-1 border border-${colorClass}`}>
    <p className="text-xs font-semibold capitalize opacity-70 mb-1">{label}</p>
    <p className="mobilemd:text-xl text-lg font-bold">{value}</p>
  </div>
);
