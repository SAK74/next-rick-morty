import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

//

export async function GET(
  request: NextRequest,
  { params: { fav } }: { params: { fav: "favorites" | "custom" } }
) {
  console.log("RequestURL: ", request.url);
  console.log("Params: ", fav);
  console.log("DB  fetched");
  console.log("----------------------");
  try {
    const base = fav === "favorites" ? db.favorite : db.custom;
    const result = await (fav === "favorites"
      ? db.favorite.findMany()
      : db.custom.findMany());
    return NextResponse.json({ message: "OK", result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
