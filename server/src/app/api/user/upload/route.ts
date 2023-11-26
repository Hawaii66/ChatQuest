import { UploadImage, UploadQuest } from "@/lib/Quest";
import { WithUser } from "@/lib/Route";
import { NextResponse } from "next/server";

export const POST = WithUser(async (request, user) => {
  const formData = await request.formData();
  const image: any = formData.get("image");
  const text: any = formData.get("text");

  const url = await UploadImage(user.userid, image);

  UploadQuest(user.userid, {
    comment: text ?? "",
    url: url,
  });

  return NextResponse.json({ url });
});
