import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  console.log({ url: url.search });
  // const _headers = headers();
  // console.log({ _headers });

  const apiURL = process.env.API_URL;
  const resp = fetch(apiURL + "/character" + url.search, {});
  const json = await (await resp).json();
  console.log({ json });

  return NextResponse.json(json);
};

// export const dynamic=''
