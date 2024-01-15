import {
  Box,
  Button,
  IconButton,
  Slide,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import { useEffect, useState } from "react";
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

function Snackebar(props: { isShow: boolean; variant: string; setOpen: any }) {
  const { isShow = false, variant, setOpen } = props;

  const classes = useStyle();

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={isShow}
      autoHideDuration={1000}
      onClose={() => setOpen((prev: any) => ({ ...prev, open: false }))}
      TransitionComponent={Slide}
    >
      <SnackbarContent
        elevation={0}
        aria-describedby="message-id2"
        className={classes.root}
        message="Hello this is one"
        action={
          <IconButton
            onClick={() => setOpen((prev: any) => ({ ...prev, open: false }))}
            size="small"
          >
            <CloseIcon style={{ color: "#fff" }} />
          </IconButton>
        }
      />
    </Snackbar>
  );
}

export default Snackebar;
