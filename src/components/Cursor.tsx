import styled from 'styled-components';
import React from 'react';

const Circle = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const GlassCircle = styled(Circle)<{clicked: boolean}>`
  background-color: rgba(255, 255, 255, 0.5);
  animation: darkenBackground 1s linear infinite;

  ${(props) =>
    props.clicked && `@keyframes darkenBackground {
    0% {
      background-color: rgba(255, 255, 255, 0.5);
    }
    50% {
      background-color: rgba(120, 120, 100, 0.5);
    }
    100% {
      background-color: rgba(255, 255, 255, 0.5);
    }
  }`}
`;

const Cursor = ({clicked}: {clicked: boolean}) => {
  return (
    <GlassCircle clicked={clicked}/>
  );
};

export default Cursor;
