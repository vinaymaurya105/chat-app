import { Box, Typography } from "@mui/material";
import React from "react";
import Login from "./Login";

function Home() {
  return (
    <Box
      display="flex"
      position="absolute"
      flexDirection="column"
      left="60%"
      style={{ translate: "-50% 0%" }}
      width="100%"
    >
      <Box>
        <Typography>Talk-A-Tive</Typography>
      </Box>
      <Box width="30%">
        <Login />
      </Box>
    </Box>
  );
}

export default Home;
