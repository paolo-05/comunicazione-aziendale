import styles from "@/styles/Tooltip.module.css";
import { ReactNode } from "react";

type TooltipProps = {
  text: string;
  children: ReactNode;
};

const Tooltip = ({ text, children }: TooltipProps) => {
  return (
    <div className={styles.tooltipContainer}>
      {children}
      <div className={styles.tooltip}>{text}</div>
    </div>
  );
};

export default Tooltip;
