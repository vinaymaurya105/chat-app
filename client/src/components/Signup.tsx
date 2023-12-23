import { Box, InputLabel, TextField } from "@mui/material";
import React from "react";

function Signup() {
  return (
    <Box display="flex" flexDirection="column" gap={1.5}>
      <Box className="wrapper">
        <InputLabel required>Name</InputLabel>
        <TextField placeholder="Please enter your Name" required fullWidth />
      </Box>
      <Box className="wrapper">
        <InputLabel>Email</InputLabel>
        <TextField placeholder="Please enter your email" required fullWidth />
      </Box>
      <Box className="wrapper">
        <InputLabel>Password</InputLabel>
        <TextField
          placeholder="Please enter your password"
          required
          fullWidth
        />
      </Box>
      <Box>
        <InputLabel>Confirm Password</InputLabel>
        <TextField
          placeholder="Please enter confirm password"
          required
          fullWidth
        />
      </Box>
    </Box>
  );
}

export default Signup;
