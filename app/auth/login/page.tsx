import { AuthForm } from "@/app/auth/_components/AuthForm";

export default function LoginPage({
  // params,
  searchParams,
}: {
  // params: string;
  searchParams: { callbackurl?: string; error?: string };
}) {
  return (
    <main>
      <AuthForm type="login" error={searchParams.error} />
    </main>
  );
}
