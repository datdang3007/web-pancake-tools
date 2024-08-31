import { Button, ButtonProps } from "@mui/material";
import { ReactNode } from "react";

type Props = ButtonProps & {
  children: ReactNode;
};

export const ButtonCommon = (props: Props) => {
  const { children, ...rest } = props;

  return (
    <Button
      {...rest}
      sx={{
        textTransform: "none",
      }}
    >
      {children}
    </Button>
  );
};
