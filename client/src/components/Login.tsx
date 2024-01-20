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
import HomePageLayout from "./HomePageLayout";
import { Link, useNavigate } from "react-router-dom";
import Snackebar from "./Snackebar";
import axios from "axios";
import { LOGIN } from "../constants/api";
import Loader from "./Loader";

const useStyle = makeStyles(() => ({
  input: {
    "& .MuiOutlinedInput-root": {
      border: "1px solid #0000003b",
      padding: "5px 8px",
      height: 30,
    },
    "& .MuiOutlinedInput-input": {
      borderRadius: 3,
      padding: 0,
      fontSize: 15,
    },
  },
}));

function Login() {
  const classes = useStyle();

  const [show, setShow] = useState(false);
  const [values, setValues] = useState({ email: "", password: "" });
  const [snack, setSnack] = useState({
    open: false,
    variant: "error",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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

  const handleLogin = () => {
    const config = {
      method: "POST",
      url: LOGIN,
      data: { userName: values.email, password: values.password },
    };

    setLoading(true);
    axios(config)
      .then((res) => {
        const { success, message } = res.data;
        if (!success) throw Error(message);

        setSnack({ open: true, variant: "success", message });
        setLoading(false);
        navigate("/chat");
      })
      .catch((err) => {
        setLoading(false);
        setSnack({ open: true, variant: "error", message: err.message });
      });
  };

  return (
    <>
      <HomePageLayout label="Login" loading={loading}>
        <Typography variant="body2">
          Don't have an account? <Link to="/signup">Create an account</Link>
        </Typography>

        <Box className="wrapper">
          <InputLabel required style={{ fontSize: 13 }}>
            Email Address
          </InputLabel>

          <TextField
            autoFocus
            className={classes.input}
            autoComplete="email"
            sx={{ fieldset: { border: "none" } }}
            placeholder="Please enter your email id"
            required={true}
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
          onClick={handleLogin}
        >
          Login
        </Button>
      </HomePageLayout>
      {snack.open && (
        <Snackebar
          isShow={snack.open}
          variant={snack.variant}
          setOpen={setSnack}
          message={snack.message}
        />
      )}
    </>
  );
}

export default Login;
