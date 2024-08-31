import { Grid2 } from "@mui/material";
import { styled } from "@mui/material/styles";
import { keyframes } from "@mui/system";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export const Background = ({ children }: Props) => {
  return <BackgroundStyled container>{children}</BackgroundStyled>;
};

// Define keyframes for animation
const backAnimation = keyframes`
  0% {
    background-position: left 30% bottom 22px, left 0px bottom 0px,
      left 0px bottom 22px, left 0px bottom 0px;
  }
  50% {
    background-position: left 50% bottom 22px,
      left -816px bottom 0px, /* -($groundWidth * 12) => -(68px * 12) */
      left -508px bottom 22px, /* -($bushesWidth * 1) => -(508px * 1) */
      left -256px bottom 0px;  /* -($backWidth / 2) => -(512px / 2) */
  }
  100% {
    background-position: left 30% bottom 22px,
      left -1632px bottom 0px, /* -($groundWidth * 24) => -(68px * 24) */
      left -1016px bottom 22px, /* -($bushesWidth * 2) => -(508px * 2) */
      left -512px bottom 0px;   /* -$backWidth => -512px */
  }
`;

// Create styled component
const BackgroundStyled = styled(Grid2)({
  height: "100vh",
  overflow: "hidden",
  position: "relative",
  backgroundImage: `
      url("https://github.com/Kageetai/mario-background-parallax/blob/master/img/mario.gif?raw=true"),
      url("https://github.com/Kageetai/mario-background-parallax/blob/master/img/ground.png?raw=true"),
      url("https://github.com/Kageetai/mario-background-parallax/blob/master/img/bushes.png?raw=true"),
      url("https://raw.githubusercontent.com/Kageetai/mario-background-parallax/master/img/back.png?raw=true")
    `,
  backgroundColor: "#f8e0b0",
  backgroundRepeat: "no-repeat, repeat-x, repeat-x, repeat-x",
  backgroundPosition:
    "left 30% bottom 22px, left 0px bottom 0px, left 0px bottom 22px, left 0px bottom 0px",
  animation: `${backAnimation} 15s infinite linear`,
});
