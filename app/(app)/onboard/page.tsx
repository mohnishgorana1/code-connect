import OnboardForm from "@/components/OnboardForm";
import { fetchProfileAction } from "@/lib/actions/profile.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

async function OnboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-up");
  }

  const profileInfo = await fetchProfileAction(user?.id);

  if (user && profileInfo?._id) redirect("/");

  console.log("user", user);

  return (
    <main className="mt-4 w-full flex flex-col items-center gap-y-12 md:px-36">
      <section className="hidden lg:flex w-full gap-y-4 flex-col text-center">
        <h1 className="font-bold md:text-7xl text-2xl hover:opacity-100 duration-200 opacity-50 ">
          Connect | Collaborate | Code
        </h1>
      </section>
      <section className="w-full flex flex-col gap-y-8">
        <h1 className="font-bold text-3xl text-center md:text-start">
          Onboard As
        </h1>
        <OnboardForm
          userAuthId={user.id}
          email={user.emailAddresses[0].emailAddress}
          userName={user.firstName + " " + user.lastName}
        />
      </section>
    </main>
  );
}

export default OnboardPage;
