import { Box } from "@mui/material";

import { makeStyles } from "@mui/styles";

import MainHeader from "./MainHeader";

const useStyle = makeStyles(() => ({}));

function userListing() {
  const classes = useStyle();

  return (
    <Box bgcolor="#fff" width={380} height="100%">
      <MainHeader />
    </Box>
  );
}

export default userListing;
