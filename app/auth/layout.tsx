export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen justify-center items-start p-2 2xl:p-24 bg-[radial-gradient(ellipse,_var(--tw-gradient-stops))] to-blue-50 from-sky-300">
      {children}
    </main>
  );
}
