interface IProps {
  children: React.ReactNode
}
export default function DashboardLayout({ children }: IProps) {
  return (
    <main className="min-w-0 flex-1 bg-[#0c0f16] bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.1),transparent_60%)] text-slate-100">
      <div className="mx-auto w-full max-w-[1440px] min-w-0 px-5 py-8 sm:px-8 sm:py-12">
        {children}
      </div>
    </main>
  );

}
