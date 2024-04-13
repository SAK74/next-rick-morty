import { LoginForm } from "@/components/auth/loginForm";

export default function Page({
  params,
  searchParams,
}: {
  params: any;
  searchParams: { callbackurl?: string; error?: string };
}) {
  // const paramId = params.paramId;
  // const searchId = searchParams.searchId;
  return (
    <main>
      <LoginForm type="login" error={searchParams.error} />
    </main>
  );
}
