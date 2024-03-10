import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params: { path } }: { params: { path: string[] } }
) => {
  const url = new URL(request.url);
  console.log({ host: url.host });

  console.log({ url, path });

  const resp = fetch(process.env.API_URL + url.pathname + url.search, {});

  const json = await (await resp).json();
  console.log({ json });

  return NextResponse.json(json);
};

// export const dynamic=''
