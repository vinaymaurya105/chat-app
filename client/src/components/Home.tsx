import { Box, Typography } from "@mui/material";
import React from "react";
import Login from "./Login";
import { url } from "inspector";

const imgUrl =
  "https://img.freepik.com/free-vector/emoji-framed-background_53876-89766.jpg?size=626&ext=jpg&ga=GA1.1.933889225.1703267740&semt=ais";

function Home() {
  return (
    <Box
      display="flex"
      // position="absolute"
      flexDirection="column"
      // left="50%"
      // top="50px"
      width="100%"
      // height="100%"
      flex={1}
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        width="35%"
        border="1px solid #B0A695"
        height={40}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography>Talk-A-Tive</Typography>
      </Box>
      <Box width="35%" height="100%">
        <Login />
      </Box>
    </Box>
  );
}

export default Home;
