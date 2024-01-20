import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Loader from "./Loader";
import { ReactNode } from "react";

const useStyle = makeStyles({
  continer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 16,
    paddingTop: 20,
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    borderRadius: "6px",
    maxWidth: 500,
    width: "100%",
    background: "#fff",
    flexDirection: "column",
  },
});

type HomePageType = {
  label: string;
  children: ReactNode;
  loading: boolean;
};

function HomePageLayout(props: HomePageType) {
  const { label, children, loading } = props;

  const classes = useStyle();

  return (
    <Loader loading={loading}>
      <Box className={classes.continer}>
        <Box
          className={classes.wrapper}
          height={40}
          p="2px 16px"
          alignItems="center"
        >
          <Typography variant="h5" color="grey">
            Talk-A-Tive
          </Typography>
        </Box>
        <Box p={2} gap={1.5} className={classes.wrapper}>
          <Typography variant="h6">{label}</Typography>
          {children}
        </Box>
      </Box>
    </Loader>
  );
}

export default HomePageLayout;
