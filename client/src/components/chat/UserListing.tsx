import { Box, Typography } from "@mui/material";

import { makeStyles } from "@mui/styles";

import MainHeader from "./MainHeader";
import MyProfile from "../MyProfile";
import { useEffect, useState } from "react";
import { getSender } from "../../utils/Helper";

import NewChat from "./NewChat";
import UserLabel from "../UserLabel";
import GroupChat from "./GroupChat";

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
  const [newChat, setNewChat] = useState(false);
  const [groupChat, setGroupChat] = useState(false);

  const handleProfile = () => {
    setOpenProfile((prev) => !prev);
  };

  const handleNewChat = () => {
    setNewChat((prev) => !prev);
  };
  const handleGroupChat = () => {
    setGroupChat((prev) => !prev);
  };

  useEffect(() => {
    setValues(userValues);
  }, [userValues]);

  return (
    <>
      <Box bgcolor="#fff" width={380} height="100%">
        <MainHeader
          handleProfile={handleProfile}
          handleNewChat={handleNewChat}
          handleGroupChat={handleGroupChat}
        />
        <Box borderTop="1px solid #e9ecef" overflow="auto">
          {values.map((user) => {
            const { id, chatName, isGroupChat, users, icon } = user;
            let sender;
            if (!isGroupChat) {
              sender = getSender(users);
            }
            return (
              <Box key={id}>
                <UserLabel label={isGroupChat ? chatName : sender?.label} />
              </Box>
            );
          })}
        </Box>

        {openProfile && (
          <MyProfile open={openProfile} handleProfile={handleProfile} />
        )}
        {newChat && <NewChat open={newChat} handleNewChat={handleNewChat} />}
      </Box>
      {groupChat && <GroupChat handleGroupChat={handleGroupChat} />}
    </>
  );
}

export default UserListing;
