'use client'
import React from "react";
import { RiVideoAddFill } from "react-icons/ri";
import { SiGotomeeting } from "react-icons/si";
import { MdUpcoming } from "react-icons/md";
import { TbDeviceTvOldFilled } from "react-icons/tb";
import { usePathname } from "next/navigation";
import Link from "next/link";


const sidebarItems = [
  {
    label: "Create Meeting",
    icon: <RiVideoAddFill />,
    link: "/meeting/create-meeting"
  },
  {
    label: "Join Meeting",
    icon: <SiGotomeeting />,
    link: "/meeting/join-meeting"

  },
  {
    label: "Upcoming Meetings",
    icon: <MdUpcoming />,
    link: "/meeting/upcoming-meetings"
  },
  {
    label: "Past Meetings",
    icon: <TbDeviceTvOldFilled />,
    link: "/meeting/past-meetings"
  },
];

function Sidebar() {
    const currentPathName = usePathname()
    console.log("currentpathname", currentPathName);
    
  return (
    <section className={`my-4 sm:my-0 sm:border-r min-h-full bg-neutral-900 ${currentPathName === "/onboard" && "hidden"}`}>
      <ul className="grid grid-cols-2 sm:grid-cols-1 gap-y-2 sm:gap-y-0 ">
        {sidebarItems.map((item: any) => (
          <Link href={item.link} key={item.label} className={`${currentPathName === item.link && "text-blue-500 underline"} cursor-pointer sm:h-32 px-1 sm:px-4 hover:bg-neutral-950 flex  items-center justify-between text-sm md:text-lg font-bold`}>
            <p className="text-xs md:text-lg">{item.label}</p>
            <p className="hidden sm:flex">{item.icon}</p>
          </Link>
        ))}
      </ul>
    </section>
  );
}

export default Sidebar;
