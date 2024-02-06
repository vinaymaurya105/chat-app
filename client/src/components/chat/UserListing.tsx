import { Box, Button, TextField } from "@mui/material";
import Header from "./Header";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles(() => ({
  input: {
    "& .MuiFilledInput-root": {
      padding: "5px 8px",
      height: "35px",
      borderRadius: 8,
    },
    "& .MuiFilledInput-input": {
      padding: 0,
      fontSize: 14,
    },
  },
}));

function userListing() {
  const classes = useStyle();
  return (
    <Box bgcolor="#fff" width={330} height="100%">
      <Header>
        <Button>CreateChat</Button>
      </Header>
      <Box
        height={49}
        display="flex"
        alignItems="center"
        justifyContent="center"
        p="0 15px"
      >
        <TextField
          fullWidth
          className={classes.input}
          variant="filled"
          sx={{ border: "none" }}
        />
      </Box>
    </Box>
  );
}

export default userListing;
