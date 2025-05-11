import React from "react";
import "./style.module.css";

interface Props {
  className: any;
}

export const Tag = ({ className }: Props): JSX.Element => {
  return (
    <div className={`tag ${className}`}>
      <div className="text-wrapper">Rock</div>
    </div>
  );
};
