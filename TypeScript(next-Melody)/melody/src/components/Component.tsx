import PropTypes from "prop-types";
import React from "react";
import "../styles/style.module.css";

interface Props {
  property1: "line-text-2" | "line-text-1";
  className: any;
}

export const Component = ({ property1, className }: Props): JSX.Element => {
  return (
    <div className={`component ${className}`}>
      <div className={`group ${property1}`}>
        <p className="new-way-to-reach-the">NEW WAY TO REACH THE NEW FAN</p>
        <p className="text-wrapper">NEW WAY TO REACH THE NEW FAN</p>
        <p className="div">NEW WAY TO REACH THE NEW FAN</p>
        <img className="globe" alt="Globe" src={property1 === "line-text-2" ? "globe-1-2.svg" : "globe-1.svg"} />
        <img className="img" alt="Globe" src={property1 === "line-text-2" ? "globe-4-3.svg" : "globe-4.svg"} />
        <img className="globe-2" alt="Globe" src={property1 === "line-text-2" ? "globe-2-2.svg" : "globe-2.svg"} />
        {property1 === "line-text-2" && (
          <>
            <p className="p">NEW WAY TO REACH THE NEW FAN</p>
            <p className="new-way-to-reach-the-2">NEW WAY TO REACH THE NEW FAN</p>
            <p className="new-way-to-reach-the-3">NEW WAY TO REACH THE NEW FAN</p>
            <img className="globe-3" alt="Globe" src="image.svg" />
            <img className="globe-4" alt="Globe" src="globe-3.svg" />
            <img className="globe-5" alt="Globe" src="globe-4-2.svg" />
          </>
        )}
      </div>
      <img className="line" alt="Line" src={property1 === "line-text-2" ? "line-15-2.svg" : "line-15.svg"} />
      <img className="line-2" alt="Line" src={property1 === "line-text-2" ? "line-16-2.svg" : "line-16.svg"} />
    </div>
  );
};

Component.propTypes = {
  property1: PropTypes.oneOf(["line-text-2", "line-text-1"]),
};
