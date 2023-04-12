import React from "react";

export type CenterProps = {
  children?: React.ReactNode;
};
export const Center: React.FC<CenterProps> = ({ children }: CenterProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      {children}
    </div>
  );
};
