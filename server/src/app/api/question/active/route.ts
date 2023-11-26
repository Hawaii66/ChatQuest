import { GetActiveQuestion } from "@/lib/Question";
import { NextResponse } from "next/server";

export const GET = async () => {
  const question = await GetActiveQuestion();

  if (!question) {
    return NextResponse.json({}, { status: 500 });
  }

  return NextResponse.json(question);
};
