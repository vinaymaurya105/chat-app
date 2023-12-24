import { Box, InputLabel, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyle: any = makeStyles(() => ({
  input: {
    "& .MuiOutlinedInput-input": {
      padding: "6px 8px",
      border: "1px solid #0000003b",
      borderRadius: 3,
    },
  },
}));

function Signup() {
  const classes = useStyle();
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
        />
      </Box>
      <Box className="wrapper">
        <InputLabel>Email</InputLabel>
        <TextField
          className={classes.input}
          sx={{ fieldset: { border: "none" } }}
          placeholder="Please enter your email"
          required
          fullWidth
        />
      </Box>
      <Box className="wrapper">
        <InputLabel>Password</InputLabel>
        <TextField
          className={classes.input}
          sx={{ fieldset: { border: "none" } }}
          placeholder="Please enter your password"
          required
          fullWidth
        />
      </Box>
      <Box className="wrapper">
        <InputLabel>Confirm Password</InputLabel>
        <TextField
          className={classes.input}
          sx={{ fieldset: { border: "none" } }}
          placeholder="Please  confirm password"
          required
          fullWidth
        />
      </Box>
      <Box className="wrapper">
        <InputLabel>Profile Picture</InputLabel>
        <TextField
          className={classes.input}
          sx={{ fieldset: { border: "none" } }}
          type="file"
          fullWidth
        />
      </Box>
    </Box>
  );
}

export default Signup;
