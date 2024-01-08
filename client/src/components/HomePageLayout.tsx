import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    maxWidth: 500,
  },
});

function HomePageLayout(props: any) {
  const { label = "Login", subLabel, children } = props;
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap={2}
      p={2}
    >
      <Box
        height={40}
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="#fff"
        borderRadius={2}
        p="2px 16px"
        maxWidth={500}
        width="100%"
      >
        <Typography variant="h5" color="grey">
          Talk-A-Tive
        </Typography>
      </Box>
      <Box
        maxWidth={500}
        width="100%"
        height="100%"
        bgcolor="#fff"
        borderRadius={2}
        p={2}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap={1.5}
      >
        <Typography variant="h6">{label}</Typography>
        {subLabel}
        {children}
      </Box>
    </Box>
  );
}

export default HomePageLayout;
