import { Suspense } from "react";
import Header from "@/components/Header";
import { currentUser } from "@clerk/nextjs/server";
import Sidebar from "@/components/Sidebar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeUser = await currentUser();
  
  return (
    <main className="py-2 sm:py-3 md:py-4 lg:py-6 w-full h-full">
      <Suspense>
        <div className="flex flex-col gap-y-2 sm:gap-y-5">
          <nav>
            <Header />
          </nav>
          <section className="flex flex-col sm:flex-row">
            <section className={``}>
              <Sidebar />
            </section>
            <section className="min-h-[70vh] sm:h-auto border w-full bg-yellow-500">{children}</section>
          </section>
        </div>
      </Suspense>
    </main>
  );
}
