import React from "react";
import { Icon, Icons } from "@components/icons";

type NavBarProps = {
  children?: React.ReactNode;
};

export const NavBar: React.FC<NavBarProps> = () => {
  return (
    <nav className="flex h-screen w-20 flex-col items-center justify-between border-r-[1px] border-slate-700 bg-slate-800 py-4">
      <div className="flex flex-col gap-2">
        <NavBarItem icon="Calendar" />
        <NavBarItem icon="Chart" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-12 w-12 rounded-md bg-gray-100 opacity-60" />
        <NavBarItem icon="Setting" />
      </div>
    </nav>
  );
};

type NavBarItemProps = {
  icon: Icons;
};
const NavBarItem: React.FC<NavBarItemProps> = ({ icon }) => {
  return (
    <button className="h-12 w-12">
      <Icon icon={icon} size={1.5} className="ml-auto mr-auto" />
    </button>
  );
};
