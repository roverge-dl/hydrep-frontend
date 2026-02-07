import circle from "../../assets/images/Background.png";
interface DashboardCardProps {
  title: string;
  value: string;
  status: string;
  icon: React.ReactNode;
  color: string;
}

const DashboardCard = ({
  title,
  value,
  status,
  icon,
  color,
}: DashboardCardProps) => {
  return (
    <div
      className={`p-4 ${color} rounded-xl shadow-md h-32 relative flex justify-between `}>
      <div className="flex flex-col justify-between">
        <h1 className="text-white font-semibold text-base ">{title}</h1>
        <h1 className="font-bold text-xl text-white">{value}</h1>
        <span className="text-white text-sm">{status}</span>
      </div>
      <div className="flex items-center h-10 w-10 justify-center text-white rounded-md bg-[#FFFFFF33]">
        {icon}
      </div>
      <img src={circle} className="absolute right-0 bottom-0 " alt="" />
    </div>
  );
};

export default DashboardCard;
