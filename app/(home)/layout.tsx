export type Search = { searchParams: { name?: string; status?: string } };

export default function HomeLayout({
  children,
  summary,
  detail,
}: {
  children: React.ReactNode;
  summary: React.ReactNode;
  detail: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center  p-6  2xl:p-24 bg-[radial-gradient(ellipse,_var(--tw-gradient-stops))] to-blue-50 from-sky-300 ">
      {children}
      <section className="grid grid-cols-[1fr_auto] w-full">
        <div className="">{summary}</div>
        {detail}
      </section>
    </main>
  );
}
