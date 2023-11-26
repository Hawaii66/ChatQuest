import { NextRequest, NextResponse } from "next/server";
import { GetUserFromClerkId } from "./User";
import { User } from "@/interfaces/User";

export const WithUser: (
  handler: (request: NextRequest, user: User) => Promise<NextResponse>
) => (request: NextRequest, user: User) => Promise<NextResponse> =
  (handler: (request: NextRequest, user: User) => Promise<NextResponse>) =>
  async (request: NextRequest) => {
    const clerkid = new URL(request.url).searchParams.get("clerkid");
    if (!clerkid) {
      return NextResponse.json({}, { status: 403 });
    }

    const user = await GetUserFromClerkId(clerkid);
    if (!user) {
      return NextResponse.json({}, { status: 500 });
    }

    return handler(request, user);
  };
