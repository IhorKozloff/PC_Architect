interface IProps {
  children: React.ReactNode
}
export default function DashboardLayout({ children }: IProps) {
  return (
    <div className="container mx-auto max-w-5xlmt-8">
      {children}
    </div>
  );

}