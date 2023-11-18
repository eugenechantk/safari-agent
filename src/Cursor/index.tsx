import styled from "styled-components";
import React from "react";
import { CSSTransition } from "react-transition-group";
import Cursor from "./Cursor";

// const StyledCursor = styled.div<{ top: number; left: number }>`
//   top: ${(props) => props.top}px;
//   left: ${(props) => props.left}px;
// `;

export const CursorContainer = ({
  position,
  clicked,
}: {
  position: { x: number; y: number };
  clicked: boolean;
}) => {
  const [active, setActive] = React.useState(false);
  console.log("coordinates passed to cursor", position);

  return (
    <CSSTransition in={active} timeout={300} onExited={() => setActive(false)}>
      <div style={{ top: position.y, left: position.x, position: "absolute" }}>
        <Cursor clicked={clicked} />
      </div>
    </CSSTransition>
  );
};
