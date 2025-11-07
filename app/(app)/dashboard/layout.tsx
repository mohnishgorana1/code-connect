"use client";
import { Footer } from "@/components/Footer";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useAppUser } from "@/contexts/UserContext";
import { Role } from "@/models/user.model";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { ExternalLink, History, CirclePlus, Home } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const CandidateTabs = [
  {
    name: "Home",
    icon: Home,
    href: "/dashboard/candidate",
  },
  {
    name: "Join Meeting",
    icon: ExternalLink,
    href: "/dashboard/candidate/join-meeting",
  },
  {
    name: "Previous Meeting",
    href: "/dashboard/previous-meeting",
    icon: History,
  },
];
const InterviewerTabs = [
  {
    name: "Home",
    icon: Home,
    href: "/dashboard/interviewer",
  },
  {
    name: "Create Meeting",
    href: "/dashboard/interviewer/create-meeting",
    icon: CirclePlus,
  },
  {
    name: "Previous Meeting",
    href: "/dashboard/previous-meeting",
    icon: History,
  },
];
const AdminTabs = [
  {
    name: "",
    href: "",
    icon: "",
  },
];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { appUser, loading } = useAppUser();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  let currentRoleTabs;

  // TODO: Jab admin functiolity ban jae tab enable kr dena
  // if (appUser?.role === Role.Candidate) {
  //   currentRoleTabs = CandidateTabs;
  // } else if (appUser?.role === Role.Interviewer) {
  //   currentRoleTabs = InterviewerTabs;
  // } else {
  //   currentRoleTabs = AdminTabs;
  // }

  if (!loading) {
    if (appUser?.role === Role.Candidate) {
      currentRoleTabs = CandidateTabs;
    } else {
      currentRoleTabs = InterviewerTabs;
    }
  }

  if (loading) {
    <Loader />;
  }

  return (
    <main className={`min-h-[89vh] bg-gray-950 flex flex-col px-2 md:px-3 gap-y-2`}>
      <div className="w-full flex min-h-full">
        <aside
          className={`${
            isSidebarCollapsed ? "w-[7%]" : "w-[18%]"
          } px-4 py-4 flex flex-col gap-y-4 bg-gray-900 rounded-sm transition-all duration-300 ease-linear`}
        >
          <header className="flex items-center justify-between w-full">
            <h1
              className={`capitalize font-bold text-3xl ${
                isSidebarCollapsed ? "hidden" : ""
              }`}
            >
              Dashboard
            </h1>
            <button
              className={`cursor-pointer flex items-center justify-center rounded-md
             h-7 w-7 border text-white border-white ${
               isSidebarCollapsed && "mx-auto"
             }`}
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            >
              <FaArrowLeft
                className={`text-sm ${
                  isSidebarCollapsed && "rotate-180"
                } transition duration-500 ease-linear`}
              />
            </button>
          </header>
          {/* tabs list */}
          <div className="my-10 flex flex-col gap-y-6 items-center w-full">
            {currentRoleTabs &&
              currentRoleTabs.length > 0 &&
              currentRoleTabs.map((tab, idx) => {
                const Icon = tab.icon;
                const isActive = tab.href === pathname;
                const activeClasses =
                  "bg-cyan-600 border-cyan-500 shadow-lg shadow-cyan-500/30 text-white font-semibold";
                const inactiveClasses =
                  "border-gray-700 bg-gray-800 hover:bg-gray-700 hover:shadow-gray-600/50 text-gray-300";
                const baseClasses = "ease-out duration-300 shadow-md";
                return (
                  <div className="w-full" key={idx}>
                    {isSidebarCollapsed ? (
                      <Link href={tab.href} className="relative group">
                        <button
                          key={idx}
                          className={`border h-12 w-14 p-0 mx-auto flex items-center justify-center rounded-lg ${baseClasses} ${
                            isActive ? activeClasses : inactiveClasses
                          }`}
                        >
                          <Icon className="text-5xl" />
                          <span className="absolute left-full top-3/4 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition bg-gray-800 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                            {tab.name}
                          </span>
                        </button>
                      </Link>
                    ) : (
                      <Link
                        href={tab.href}
                        key={idx}
                        className={`border w-full px-3 py-1.5 flex items-center justify-between rounded-lg ${baseClasses} ${
                          isActive ? activeClasses : inactiveClasses
                        }`}
                      >
                        <span>{tab.name}</span>
                        <Icon className="" />
                      </Link>
                    )}
                  </div>
                );
              })}
          </div>
        </aside>
        <div
          className={`${
            isSidebarCollapsed ? "w-[93%]" : "w-[88%]"
          } text-white min-h-[89vh] md:px-8 md:py-4 px-1`}
        >
          {isSidebarCollapsed}
          {children}
        </div>
      </div>
      <Footer />
    </main>
  );
}
