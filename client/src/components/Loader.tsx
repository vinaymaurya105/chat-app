import { Box, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ReactNode } from "react";

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

type LoaderType = {
  children: ReactNode;
  loading: boolean;
};

function Loader(props: LoaderType) {
  const { children, loading = false } = props;
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
