import { startOfDay } from "date-fns";
import { supabase } from "./supabase";
import { Question } from "@/interfaces/Question";

export const GetActiveQuestion = async () => {
  const currentDay = startOfDay(new Date());

  const { data } = await supabase
    .from("Questions")
    .select("*")
    .eq("day", currentDay.getTime())
    .single();

  if (!data) {
    return undefined;
  }

  const question: Question = {
    day: data.day,
    id: data.id,
    message: data.text,
  };

  return question;
};

export const AddQuestion = async (question: Omit<Question, "id">) => {
  await supabase.from("Questions").insert({
    day: question.day,
    text: question.message,
  });
};
