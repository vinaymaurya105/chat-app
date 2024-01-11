import { Box, Button, Snackbar, SnackbarContent } from "@mui/material";
import React, { useState } from "react";

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
      >
        <SnackbarContent message="Hello this is one" />
      </Snackbar>
    </Box>
  );
}

export default Snackebar;
