import { Box, Typography } from "@mui/material";
import React from "react";
import Login from "./Login";
import { url } from "inspector";

function Home() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap={1.5}
      p={2}
    >
      <Box
        height={60}
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="#fff"
        borderRadius={2}
        p="0px 16px"
        maxWidth={500}
        width="100%"
      >
        <Typography variant="h4" color="grey">
          Talk-A-Tive
        </Typography>
      </Box>
      <Box
        maxWidth={500}
        width="100%"
        height="100%"
        bgcolor="#fff"
        borderRadius={2}
        p={2}
      >
        <Login />
      </Box>
    </Box>
  );
}

export default Home;
