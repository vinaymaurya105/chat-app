import { IconButton, Slide, Snackbar, SnackbarContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  root: {
    "&.MuiSnackbarContent-root": {
      boxShadow: "none",
      color: "#fff",
      borderRadius: 6,
    },
  },
});

type SnackBarType = {
  isShow: boolean;
  variant: string;
  setOpen: any;
  message?: string;
};

function Snackebar(props: SnackBarType) {
  const { isShow = false, variant, setOpen, message } = props;

  const classes = useStyle(variant);

  return message ? (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={isShow}
      autoHideDuration={1500}
      onClose={() => setOpen((prev: any) => ({ ...prev, open: false }))}
      TransitionComponent={Slide}
      color={variant === "error" ? "erro" : "success"}
    >
      <SnackbarContent
        elevation={0}
        aria-describedby="message-id2"
        className={classes.root}
        style={{ background: variant === "success" ? "#2e7d32" : "#ef5350" }}
        message={message}
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
  ) : (
    <></>
  );
}

export default Snackebar;
