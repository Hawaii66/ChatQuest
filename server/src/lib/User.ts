import { User } from "@/interfaces/User";
import { supabase } from "./supabase";

export const GetUserFromClerkId = async (clerkid: string) => {
  const { data } = await supabase
    .from("Users")
    .select("*")
    .eq("clerk_id", clerkid)
    .single();

  if (!data) {
    return undefined;
  }

  const user: User = {
    clerkid: clerkid,
    email: data.email,
    userid: data.id,
    username: data.username,
  };

  return user;
};

export const CreateUser = async (user: Omit<User, "userid">) => {
  const { data } = await supabase
    .from("Users")
    .insert({
      clerk_id: user.clerkid,
      email: user.email,
      username: user.username,
    })
    .select("*")
    .single();

  if (!data) {
    return undefined;
  }

  const createdUser: User = {
    clerkid: data.clerk_id,
    email: data.email,
    userid: data.id,
    username: data.username,
  };

  return createdUser;
};
