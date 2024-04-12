import { auth } from "@/auth";
import { Tree } from "@/components/Tree";

export default async function ExamplePage() {
  const session = await auth();

  return (
    <main>
      <h1>Example page!</h1>
      {/* <p>Session: {JSON.stringify(session, null)}</p> */}
      <p>Session:</p>
      <Tree data={session} />
    </main>
  );
}

export const dynamic = "auto";
