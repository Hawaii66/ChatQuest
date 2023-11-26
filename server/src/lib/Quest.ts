import { Quest } from "@/interfaces/Quest";
import { GetActiveQuestion } from "./Question";
import { supabase } from "./supabase";
import { NextResponse } from "next/server";

export const UploadQuest = async (
  userid: number,
  quest: Omit<Quest, "user" | "question">
) => {
  const activeQuestion = await GetActiveQuestion();
  if (!activeQuestion) {
    return NextResponse.json({}, { status: 500 });
  }

  await supabase.from("Quests").insert({
    comment: quest.comment,
    question: activeQuestion.id,
    url: quest.url,
    user: userid,
  });
};

export const UploadImage = async (userid: number, base64: string) => {
  const path = `/${userid}/${Date.now()}.png`;

  const blob = await fetch(`data:image/png;base64,${base64}`).then((res) =>
    res.blob()
  );

  const res = await supabase.storage.from("quests").upload(path, blob);
  const publicUrl = supabase.storage.from("quests").getPublicUrl(path);

  return publicUrl.data.publicUrl;
};
