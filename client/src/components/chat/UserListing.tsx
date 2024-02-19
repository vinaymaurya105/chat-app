import { Box } from "@mui/material";

import { makeStyles } from "@mui/styles";

import MainHeader from "./MainHeader";
import MyProfile from "../MyProfile";
import { useState } from "react";

const useStyle = makeStyles(() => ({}));

function userListing() {
  const classes = useStyle();
  const [openProfile, setOpenProfile] = useState(false);

  const handleProfie = () => {
    setOpenProfile((prev) => !prev);
  };

  return (
    <Box bgcolor="#fff" width={380} height="100%">
      <MainHeader handleProfie={handleProfie} />
      {openProfile && (
        <MyProfile open={openProfile} handleProfie={handleProfie} />
      )}
    </Box>
  );
}

export default userListing;
