import {
  Box,
  Button,
  IconButton,
  Slide,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

function Snackebar() {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <Button onClick={() => setOpen((prev) => !prev)}>Open snack</Button>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={1000}
        onClose={() => setOpen((prev) => !prev)}
        TransitionComponent={Slide}
      >
        <SnackbarContent
          elevation={0}
          aria-describedby="message-id2"
          message="Hello this is one"
          action={
            <IconButton>
              <CloseIcon style={{ color: "#fff" }} />
            </IconButton>
          }
        />
      </Snackbar>
    </Box>
  );
}

export default Snackebar;
