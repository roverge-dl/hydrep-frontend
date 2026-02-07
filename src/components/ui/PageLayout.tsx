interface PageLayoutProps {
  title: string;
  subtitle: string;
  isAction: boolean;
  children: React.ReactNode;
}
const PageLayout = ({
  title,
  subtitle,
  children,
  isAction,
}: PageLayoutProps) => {
  return (
    <div className="flex justify-between mb-4 sm:flex-nowrap flex-wrap gap-y-4">
      <div>
        <h1 className="h1 text-xl text-hdark-500 font-bold leading-relaxed">
          {title}
        </h1>
        <p className="body-sm">{subtitle}</p>
      </div>
      {isAction && <div className="sm:w-fit w-full">{children}</div>}
    </div>
  );
};

export default PageLayout;
