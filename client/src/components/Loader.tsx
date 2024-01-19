import { Box, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  loader: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    zIndex: 1,
    alignItems: "center",
  },
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
});

function Loader(props: any) {
  const { children, loading } = props;
  const classes = useStyle();

  return (
    <Box className={classes.container}>
      {loading && (
        <Box className={classes.loader}>
          <CircularProgress color="primary" />
        </Box>
      )}
      {children}
    </Box>
  );
}

export default Loader;
