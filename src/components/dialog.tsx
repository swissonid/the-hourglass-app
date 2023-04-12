import { useDialog } from "react-aria";
import React, { useRef } from "react";

type DialogProps = {
  title: string;
  children?: React.ReactNode;
};

//https://codesandbox.io/s/reverent-faraday-5nwk87?file=/src/Dialog.js:124-282
export const Dialog: React.FC<DialogProps> = ({
  title,
  children,
  ...props
}: DialogProps) => {
  let ref = useRef<HTMLDivElement>(null);
  let { dialogProps } = useDialog(props, ref);

  return (
    <div {...dialogProps} ref={ref}>
      {children}
    </div>
  );
};
