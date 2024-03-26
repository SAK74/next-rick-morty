import { db } from "@/lib/db";
import { Favorite } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export type FavResponseType =
  | {
      message: "OK";
      result: Favorite[];
    }
  | {
      message: "Error";
      error: unknown;
    };

export async function GET(request: NextRequest, { params }: any) {
  console.log("RequestURL: ", request.url);
  try {
    const result = await db.favorite.findMany();
    return NextResponse.json({ message: "OK", result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
