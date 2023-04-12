import React, { ReactNode } from "react";

export type ContainerProps = {
  children: ReactNode;
  fullWidth?: boolean;
};
export const Container: React.FC<ContainerProps> = ({
  children,
  fullWidth = false,
}: ContainerProps) => {
  if (fullWidth) {
    return (
      <div className="w-full rounded border border-gray-700 bg-slate-800 p-6">
        {children}
      </div>
    );
  }
  return (
    <div className="w-max rounded border border-gray-700 bg-slate-800 p-6">
      {children}
    </div>
  );
};
