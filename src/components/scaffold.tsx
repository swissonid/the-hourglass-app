import React from "react";
import { NavBar } from "./nav-bar";

type AppLayoutProps = {
  children?: React.ReactNode;
};
export const Scaffold: React.FC<AppLayoutProps> = ({
  children,
}: AppLayoutProps) => {
  return (
    <main className="flex min-h-[100dvh] w-full">
      <NavBar />
      {children}
    </main>
  );
};
