import styled from "styled-components";
import React from "react";
import { CSSTransition } from "react-transition-group";
import Cursor from "./Cursor";

// const StyledCursor = styled.div<{ top: number; left: number }>`
//   top: ${(props) => props.top}px;
//   left: ${(props) => props.left}px;
// `;

import { useEffect, useState } from "react";

export const CursorContainer = ({
  position,
  clicked,
}: {
  position: { x: number; y: number };
  clicked: boolean;
}) => {
  const [active, setActive] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(position);

  // useEffect(() => {
  //   setCursorPosition(position);
  //   setActive(true);
  // }, [position]);

  // const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
  //   t /= d / 2;
  //   if (t < 1) return (c / 2) * t * t + b;
  //   t--;
  //   return (-c / 2) * (t * (t - 2) - 1) + b;
  // };

  // const smoothScrollTo = (endY: number, duration: number) => {
  //   const startY = window.scrollY;
  //   const change = endY - startY;
  //   const startTime = performance.now();

  //   const scrollStep = (timestamp: number) => {
  //     const elapsed = timestamp - startTime;
  //     window.scrollTo(0, easeInOutQuad(elapsed, startY, change, duration));
  //     if (elapsed < duration) {
  //       window.requestAnimationFrame(scrollStep);
  //     }
  //   };

  //   window.requestAnimationFrame(scrollStep);
  // };

  return (
    <div
      style={{
        top: cursorPosition.y,
        left: cursorPosition.x,
        position: "absolute",
        transition: "top 0.3s ease-in-out, left 0.3s ease-in-out",
      }}
    >
      <Cursor clicked={clicked} />
    </div>
  );
};
