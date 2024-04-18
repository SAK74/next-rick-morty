import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params: { path } }: { params: { path: string[] } }
) => {
  const url = new URL(request.url);

  // return NextResponse.json({ test: "ok!" });

  const resp = await fetch(process.env.API_URL + url.pathname + url.search, {
    next: { tags: ["characters"] },
  });

  const json = await resp.json();
  if (process.env.NODE_ENV === "development") {
    console.log({ url: url.href, path });
    console.log("API has fetched");
    console.log("----------------------");
  }

  if (!resp.ok) {
    let message: string;
    if (json) {
      message = json.error;
    } else {
      message = resp.statusText;
    }
    return NextResponse.json(message, { status: resp.status });
  }

  return NextResponse.json(json);
};
