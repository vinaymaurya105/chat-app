import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

function Login() {
  const [show, setShow] = useState(false);

  const handleIconClick = () => {
    setShow((prev) => !prev);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap={1.5}
      width="100%"
    >
      <Box className="wrapper">
        <InputLabel required>Email Address</InputLabel>
        <TextField
          placeholder="Please enter your email id"
          required
          fullWidth
        />
      </Box>
      <Box className="wrapper">
        <InputLabel required>Password</InputLabel>
        <TextField
          placeholder=" Please enter valid password"
          required
          fullWidth
          type={show ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleIconClick}>
                  {show ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Button
        variant="contained"
        style={{ textTransform: "none", boxShadow: "none" }}
      >
        Login
      </Button>
    </Box>
  );
}

export default Login;
