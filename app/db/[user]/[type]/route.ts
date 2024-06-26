import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

//

export async function GET(
  request: NextRequest,
  {
    params: { user, type },
  }: { params: { user: string; type: "favorites" | "custom" } }
) {
  if (process.env.NODE_ENV === "development") {
    console.log("RequestURL: ", request.url);
    console.log("Params: ", { user, type });
    console.log("DB  fetched");
    console.log("----------------------");
  }

  try {
    const result = await (type === "favorites"
      ? db.favorite.findMany({ where: { User: { some: { email: user } } } })
      : db.custom.findMany({ where: { userEmail: user } }));
    return NextResponse.json({ message: "OK", result }, { status: 200 });
  } catch (error) {
    console.log("Fetch db err: ", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
