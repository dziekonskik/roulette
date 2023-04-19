import React from "react";
import styles from "./actionButton.module.scss";

interface ActionButtonProps {
  action: "spin" | "reset";
  onClick: () => void;
  children: React.ReactNode;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  action,
  onClick,
}) => {
  return (
    <article className={styles[action]} onClick={onClick}>
      {children}
    </article>
  );
};
