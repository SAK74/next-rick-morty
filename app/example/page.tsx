import { auth } from "@/auth";

export default async function ExamplePage() {
  const session = await auth();
  return (
    <main>
      <h1>Example page!</h1>
      <p>Session: {JSON.stringify(session, null, 4)}</p>
    </main>
  );
}

export const dynamic = "auto";
