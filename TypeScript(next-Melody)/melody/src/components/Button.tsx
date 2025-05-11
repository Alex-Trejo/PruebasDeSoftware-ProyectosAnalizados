"use client";
import PropTypes from "prop-types";
import React, { useReducer } from "react";


interface Props {
  property1: "hover" | "default";
  className: string;
  chevronRight: string;
  text: string; // Agregado
}

interface State {
  property1: "hover" | "default";
}

type Action = "mouse_enter" | "mouse_leave";

export const Button = ({ property1, className, chevronRight, text }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });

  return (
    <button
      className={`button ${state.property1} ${className}`}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
    >
      <div className="text-wrapper">{text}</div> {/* Usar text aquí */}
      <img
        className="chevron-right"
        alt="Chevron right"
        src={state.property1 === "hover" ? "image.svg" : chevronRight}
      />
    </button>
  );
};

function reducer(state: State, action: Action): State {
  switch (action) {
    case "mouse_enter":
      return {
        ...state,
        property1: "hover",
      };

    case "mouse_leave":
      return {
        ...state,
        property1: "default",
      };

    default:
      return state;
  }
}

Button.propTypes = {
  property1: PropTypes.oneOf(["hover", "default"]).isRequired,
  className: PropTypes.string.isRequired,
  chevronRight: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired, // Agregado
};
