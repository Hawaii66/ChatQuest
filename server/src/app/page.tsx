import { Button } from "@/components/ui/button";
import { UserButton, auth, currentUser } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="w-screen h-screen grid place-items-center">
      <Link href={"/admin"}>
        <Button>Admin</Button>
      </Link>
    </div>
  );
}
