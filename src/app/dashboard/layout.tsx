interface IProps {
  children: React.ReactNode
}
export default function DashboardLayout({ children }: IProps) {
  return (
    <main className="min-w-0 flex-1 bg-background text-foreground">
      <div className="mx-auto w-full max-w-[1440px] min-w-0 px-5 py-8 sm:px-8 sm:py-12">
        {children}
      </div>
    </main>
  );

}
