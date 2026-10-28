interface IProps {
  children: React.ReactNode
};

export default function BuildsLayout({ children }: IProps) {
  return (
    <div className="container mx-auto max-w-5xl">
      {children}
    </div>
  );
};