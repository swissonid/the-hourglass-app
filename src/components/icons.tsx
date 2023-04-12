import { mdiCalendarBlankOutline, mdiChartDonut, mdiCogOutline, mdiHelpBoxOutline } from "@mdi/js";
import * as mdi from "@mdi/react";


export type Icons = "Chart" | "Setting" | "Calendar";



function getIcon(icon: Icons): string {
  console.log(icon);
  switch (icon) {
    case "Chart":
      return mdiChartDonut;
    case "Setting":
      return mdiCogOutline;
    case "Calendar":
      return mdiCalendarBlankOutline;
    default:
      return mdiHelpBoxOutline;
  }
}

type IconProps = {
  icon: Icons;
  size?: number;
  color?: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ icon, size = 1, color, className }) => {

  const iconPath = getIcon(icon);
  return (
    <mdi.Icon path={iconPath} size={size} color={color} className={className} />
  );
}
