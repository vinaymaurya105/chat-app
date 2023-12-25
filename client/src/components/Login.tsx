import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ChangeEvent, useEffect, useState } from "react";

const useStyle: any = makeStyles(() => ({
  input: {
    "& .MuiOutlinedInput-root": {
      border: "1px solid #0000003b",
      padding: "6px 8px",
    },
    "& .MuiOutlinedInput-input": {
      borderRadius: 3,
      padding: 0,
    },
  },
}));

function Login() {
  const classes = useStyle();
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({ email: "", password: "" });

  const handleIconClick = () => {
    setShow((prev) => !prev);
  };

  const handleField = (
    e: ChangeEvent<HTMLInputElement>,
    name: "email" | "password"
  ) => {
    const value = e.target.value;
    setValues((prev) => ({ ...prev, [name]: value }));
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
          className={classes.input}
          sx={{ fieldset: { border: "none" } }}
          placeholder="Please enter your email id"
          required
          fullWidth
          value={values.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleField(e, "email")
          }
        />
      </Box>
      <Box className="wrapper">
        <InputLabel required>Password</InputLabel>
        <TextField
          className={classes.input}
          sx={{ fieldset: { border: "none" } }}
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
          value={values.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleField(e, "password")
          }
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
