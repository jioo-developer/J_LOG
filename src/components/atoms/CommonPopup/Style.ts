import { css } from "@emotion/react";

export const fullscreen = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const darkLayer = css`
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
`;

export const whiteBoxWrapper = css`
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const flexDirection = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

//   width: ${direction === "row" ? "25rem;" : "18rem;"}
export const whiteBox = (
  width: string | number,
  height: string | number
) => css`
  box-sizing: border-box;
  border-radius: 4px;
  width: ${width}px;
  height : ${height === "auto" ? "auto;" : height + "px;"}
  background: white;
  box-shadow: 0px 4px 8px 8px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  position:relactive;
  z-index:900;

  h3 {
    font-size: 1.5rem;
    color: #343a40;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  p {
    width: 100%;
    text-align: left;
    font-size: 1.125rem;
    margin: 0;
    color: #3d3d3e;
  }
`;
