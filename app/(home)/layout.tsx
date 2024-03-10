export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center  p-6  2xl:p-24 bg-[radial-gradient(ellipse,_var(--tw-gradient-stops))] to-blue-50 from-sky-300 ">
      {children}
    </main>
  );
}
