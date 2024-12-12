'use client'
import React from "react";
import { RiVideoAddFill } from "react-icons/ri";
import { SiGotomeeting } from "react-icons/si";
import { MdUpcoming } from "react-icons/md";
import { TbDeviceTvOldFilled } from "react-icons/tb";
import { usePathname } from "next/navigation";


const sidebarItems = [
  {
    label: "Create Meeting",
    icon: <RiVideoAddFill />,
  },
  {
    label: "Join Meeting",
    icon: <SiGotomeeting />,
  },
  {
    label: "Upcoming Meetings",
    icon: <MdUpcoming />,
  },
  {
    label: "Past Meetings",
    icon: <TbDeviceTvOldFilled />,
  },
];

function Sidebar() {
    const currentPathName = usePathname()
    console.log("currentpathname", currentPathName);
    
  return (
    <section className={`sm:border-r min-h-full bg-neutral-900 py-4 ${currentPathName === "/onboard" && "hidden"}`}>
      <ul className="flex sm:flex-col">
        {sidebarItems.map((item: any) => (
          <li key={item.label} className="sm:h-28 px-4 hover:bg-neutral-950 flex  items-center justify-between text-sm md:text-lg font-bold">
            <p className="">{item.label}</p>
            <p className="hidden sm:flex">{item.icon}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Sidebar;
