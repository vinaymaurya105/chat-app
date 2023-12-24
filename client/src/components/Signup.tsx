import { Password, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";

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

enum ValueType {
  "firstName",
  "lastName",
  "email",
  "password",
  "cnfPass",
  "img",
}

function Signup() {
  const classes = useStyle();

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cnfPass: "",
    img: "",
  });

  const [show, setShow] = useState({ password: false, cnfPasswd: false });

  const handleIconClick = (valType: "password" | "cnfPasswd") => {
    setShow((prev) => ({ ...prev, [valType]: !prev[valType] }));
  };

  console.log(values);
  const handleField = (e: any, name: keyof typeof ValueType) => {
    const value = e.target.value;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  console.log(show);
  return (
    <Box display="flex" flexDirection="column" gap={1.5}>
      <Box className="wrapper">
        <InputLabel required>First Name</InputLabel>
        <TextField
          className={classes.input}
          sx={{ fieldset: { border: "none" } }}
          placeholder="Please enter your first name"
          required
          fullWidth
          value={values.firstName}
          onChange={(e) => handleField(e, "firstName")}
        />
      </Box>
      <Box className="wrapper">
        <InputLabel required>Last Name</InputLabel>
        <TextField
          className={classes.input}
          sx={{ fieldset: { border: "none" } }}
          placeholder="Please enter your last name"
          required
          fullWidth
          value={values.lastName}
          onChange={(e) => handleField(e, "lastName")}
        />
      </Box>
      <Box className="wrapper">
        <InputLabel required>Email</InputLabel>
        <TextField
          className={classes.input}
          sx={{ fieldset: { border: "none" } }}
          placeholder="Please enter your email"
          required
          fullWidth
          value={values.email}
          onChange={(e) => handleField(e, "email")}
        />
      </Box>
      <Box className="wrapper">
        <InputLabel required>Password</InputLabel>
        <TextField
          className={classes.input}
          sx={{ fieldset: { border: "none" } }}
          placeholder="Please enter your password"
          required
          // value={value.password}
          type={show.password ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" style={{ marginLeft: 0 }}>
                <IconButton
                  size="small"
                  onClick={() => handleIconClick("password")}
                >
                  {show.password ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
          onChange={(e) => handleField(e, "password")}
        />
      </Box>
      <Box className="wrapper">
        <InputLabel required>Confirm Password</InputLabel>
        <TextField
          className={classes.input}
          sx={{ fieldset: { border: "none" } }}
          placeholder="Please  confirm password"
          required
          fullWidth
          value={values.cnfPass}
          type={show.cnfPasswd ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" style={{ marginLeft: 0 }}>
                <IconButton
                  size="small"
                  onClick={() => handleIconClick("cnfPasswd")}
                >
                  {show.cnfPasswd ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={(e) => handleField(e, "cnfPass")}
        />
      </Box>
      {/* <Box className="wrapper">
        <InputLabel>Profile Picture</InputLabel>
        <TextField
          className={classes.input}
          sx={{ fieldset: { border: "none" } }}
          type="file"
          fullWidth
          value={values.img}
        />
      </Box> */}
    </Box>
  );
}

export default Signup;
