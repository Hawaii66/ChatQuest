import { User } from "@/interfaces/User";
import { WithUser } from "@/lib/Route";
import { CreateUser } from "@/lib/User";
import { NextRequest, NextResponse } from "next/server";

export const GET = WithUser(async (_, user) => {
  return NextResponse.json(user);
});

export const POST = async (request: NextRequest) => {
  const body: Omit<User, "userid"> = await request.json();

  const createdUser = await CreateUser(body);

  return NextResponse.json(createdUser);
};
