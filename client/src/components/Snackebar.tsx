import {
  Box,
  Button,
  IconButton,
  Slide,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  root: {
    "&.MuiSnackbarContent-root": {
      boxShadow: "none",
      color: "#fff",
      background: "#2196f3",
      borderRadius: 6,
    },
  },
});

function Snackebar(props: { isShow?: boolean; variant?: string }) {
  const { isShow = false, variant } = props;

  const classes = useStyle();

  const [open, setOpen] = useState(isShow);

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
          className={classes.root}
          message="Hello this is one"
          action={
            <IconButton onClick={() => setOpen(false)} size="small">
              <CloseIcon style={{ color: "#fff" }} />
            </IconButton>
          }
        />
      </Snackbar>
    </Box>
  );
}

export default Snackebar;
