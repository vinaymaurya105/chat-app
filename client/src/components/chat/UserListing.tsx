import { Box, Typography } from "@mui/material";

import { makeStyles } from "@mui/styles";

import MainHeader from "./MainHeader";
import MyProfile from "../MyProfile";
import { useEffect, useState } from "react";
import { getSender } from "../../utils/Helper";

import Profile from "../Profile";

const useStyle = makeStyles(() => ({
  container: {
    display: "flex",
    gap: 15,
    padding: "10px 15px",
    borderBottom: "1px solid #e9ecef",
    width: 380,
    boxSizing: "border-box",
    overflow: "hidden",
    cursor: "pointer",
    "&:hover": {
      background: "#e9ecef",
    },
  },
}));

function UserListing(props: any) {
  const { values: userValues } = props;
  const classes = useStyle();
  const [openProfile, setOpenProfile] = useState(false);
  const [values, setValues] = useState([]);

  const handleProfie = () => {
    setOpenProfile((prev) => !prev);
  };

  useEffect(() => {
    console.log(userValues);
    setValues(userValues);
  }, [userValues]);

  return (
    <Box bgcolor="#fff" width={380} height="100%">
      <MainHeader handleProfie={handleProfie} />
      <Box borderTop="1px solid #e9ecef" overflow="auto">
        {values.map((user) => {
          const { id, chatName, isGroupChat, users, icon } = user;
          let sender;
          if (!isGroupChat) {
            sender = getSender(users);
          }
          return (
            <Box key={id} className={classes.container}>
              <Profile icon={isGroupChat ? icon : sender?.icon} />
              <Box display="flex" flexDirection="column">
                {isGroupChat ? (
                  <Typography variant="body1">{chatName}</Typography>
                ) : (
                  <Typography>{sender?.label}</Typography>
                )}
                <Typography variant="caption" noWrap color="GrayText">
                  Hello
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>

      {openProfile && (
        <MyProfile open={openProfile} handleProfie={handleProfie} />
      )}
    </Box>
  );
}

export default UserListing;
