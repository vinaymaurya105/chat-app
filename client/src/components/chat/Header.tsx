import { Box } from "@mui/material";
import React, { ReactNode } from "react";

type HeaderProp = {
  children?: ReactNode;
};

function Header(props: HeaderProp) {
  const { children } = props;
  return (
    <Box
      height={59}
      //   width={375}
      bgcolor="#F0F2F5"
      padding="10px 16px"
      boxSizing="border-box"
    >
      {children}
    </Box>
  );
}

export default Header;
