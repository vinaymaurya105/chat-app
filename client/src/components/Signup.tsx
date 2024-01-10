import { Password, Visibility, VisibilityOff } from "@mui/icons-material";
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
import { ChangeEvent, useState } from "react";
import HomePageLayout from "./HomePageLayout";
import { Link } from "react-router-dom";

const useStyle: any = makeStyles(() => ({
  input: {
    "& .MuiOutlinedInput-root": {
      border: "1px solid #0000003b",
      padding: "5px 8px",
      height: "30px",
    },
    "& .MuiOutlinedInput-input": {
      borderRadius: 3,
      padding: 0,
      fontSize: 15,
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

  const handleField = (
    e: ChangeEvent<HTMLInputElement>,
    name: keyof typeof ValueType
  ) => {
    const value = e.target.value;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = () => {
    if (values.password !== values.cnfPass) {
      console.log("Please insert valid pass");
    }
    console.log(values);
  };

  return (
    <HomePageLayout label="Signup">
      <Typography variant="body2">
        Already have an account? <Link to="/login">Log In</Link>
      </Typography>
      <Box className="wrapper">
        <InputLabel required style={{ fontSize: 13 }}>
          First Name
        </InputLabel>
        <TextField
          className={classes.input}
          sx={{ fieldset: { border: "none" } }}
          placeholder="Please enter your first name"
          required
          fullWidth
          value={values.firstName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleField(e, "firstName")
          }
        />
      </Box>
      <Box className="wrapper">
        <InputLabel required style={{ fontSize: 13 }}>
          Last Name
        </InputLabel>
        <TextField
          className={classes.input}
          sx={{ fieldset: { border: "none" } }}
          placeholder="Please enter your last name"
          required
          fullWidth
          value={values.lastName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleField(e, "lastName")
          }
        />
      </Box>
      <Box className="wrapper">
        <InputLabel required style={{ fontSize: 13 }}>
          Email
        </InputLabel>
        <TextField
          className={classes.input}
          sx={{ fieldset: { border: "none" } }}
          placeholder="Please enter your email"
          required
          fullWidth
          value={values.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleField(e, "email")
          }
        />
      </Box>
      <Box className="wrapper">
        <InputLabel required style={{ fontSize: 13 }}>
          Password
        </InputLabel>
        <TextField
          className={classes.input}
          sx={{ fieldset: { border: "none" } }}
          placeholder="Please enter your password"
          required
          value={values.password}
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
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleField(e, "password")
          }
        />
      </Box>
      <Box className="wrapper">
        <InputLabel required style={{ fontSize: 13 }}>
          Confirm Password
        </InputLabel>
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
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleField(e, "cnfPass")
          }
        />
      </Box>
      <Box className="wrapper">
        <InputLabel style={{ fontSize: 13 }}>Profile Picture</InputLabel>
        <TextField
          className={classes.input}
          sx={{ fieldset: { border: "none" } }}
          type="file"
          fullWidth
          value={values.img}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleField(e, "img")}
        />
      </Box>
      <Button
        variant="contained"
        style={{ textTransform: "none", boxShadow: "none" }}
        onClick={handleSignup}
      >
        Sign up
      </Button>
    </HomePageLayout>
  );
}

export default Signup;
