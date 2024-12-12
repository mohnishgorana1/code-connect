import Sidebar from "@/components/Sidebar";
import { fetchProfileAction } from "@/lib/actions/profile.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

async function Home() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-up");
  }

  const profileInfo = await fetchProfileAction(user?.id);

  if (user && !profileInfo?._id) redirect("/onboard");

  if (profileInfo?._id) {
    return (
      <>
        <main className="">hy</main>
      </>
    );
  }
}

export default Home;
