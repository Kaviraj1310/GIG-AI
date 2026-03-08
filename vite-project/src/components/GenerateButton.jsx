import React from "react";
import styled from "styled-components";

const GenerateButton = ({ text = "Generate", onClick }) => {
  return (
    <Wrapper>
      <button className="btn" onClick={onClick}>
        <svg
          height="24"
          width="24"
          viewBox="0 0 24 24"
          className="sparkle"
        >
          <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"/>
        </svg>

        <span className="text">{text}</span>
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display:flex;
  justify-content:center;
  margin-top:20px;

  .btn {
    border: none;
    width: 220px;
    height: 55px;
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background: #0f172a;
    cursor: pointer;
    transition: all 0.35s ease;
  }

  .sparkle {
    fill: #9ca3af;
    transition: 0.5s;
  }

  .text {
    color: #9ca3af;
    font-weight: 600;
    font-size: 16px;
  }

  .btn:hover {
    background: linear-gradient(135deg,#22c55e,#06b6d4);
    box-shadow: 0 0 25px rgba(6,182,212,0.6);
    transform: translateY(-2px);
  }

  .btn:hover .text {
    color: white;
  }

  .btn:hover .sparkle {
    fill: white;
    transform: scale(1.2);
  }
`;

export default GenerateButton;