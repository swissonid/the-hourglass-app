import React from "react";

type PageContainerProps = {
  children?: React.ReactNode;
};
export const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <div className="min-h-[100dvh] container mx-auto pt-6 overflow-auto">
      {children}
    </div>
  );
};
