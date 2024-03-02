import { Search, West } from "@mui/icons-material";
import { Box, Drawer, IconButton, Slide, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { LIST_USERS } from "../../utils/constants/api";
import { getReqHeaders } from "../../utils/Helper";
import axios from "axios";
import SearchInput from "../SearchInput";
import Loader from "../Loader";
import Profile from "../Profile";

const useStyles = makeStyles(() => ({
  wrapper: {
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 380,
    boxSizing: "border-box",
  },
  container: {
    display: "flex",
    gap: "15px",
    padding: "10px 15px",
    oveflow: "hidden",
    cursor: "pointer",
    borderBottom: "1px solid #e9ecef",
    "&:hover": {
      background: "#e9ecef",
    },
  },
}));

function NewChat(props: any) {
  const { open, handleNewChat } = props;
  const classes = useStyles();

  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const config = {
      method: "GET",
      url: LIST_USERS,
      headers: getReqHeaders(),
    };
    setLoading(true);
    axios(config)
      .then((res) => {
        const { success, result, message } = res.data;
        if (!success) throw Error(message);
        setValues(result);
        setLoading(false);
      })
      .catch((err: Error) => {
        setLoading(false);
      });
  }, []);

  return (
    <Drawer
      open={open}
      anchor="left"
      elevation={0}
      hideBackdrop
      style={{ transition: "width 2s" }}
    >
      <Loader loading={loading}>
        <Box bgcolor="#fff" height="100%" width={380} boxSizing="border-box">
          <Box display="flex" bgcolor="#008069" color="#fff" p="10px">
            <IconButton
              style={{ height: 30, width: 24, color: "#fff" }}
              onClick={handleNewChat}
            >
              <West />
            </IconButton>

            <Box className={classes.wrapper}>
              <Typography variant="h6">New Chat</Typography>
            </Box>
          </Box>

          <SearchInput />
          <Box
            display="flex"
            flexDirection="column"
            overflow="auto"
            borderTop="1px solid #e9ecef"
          >
            {values.map((value) => {
              const { id, label, about } = value;
              return (
                <Box key={id} className={classes.container}>
                  <Profile size={45} />
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <Typography variant="body2">{label}</Typography>
                    <Typography variant="caption" color="GrayText">
                      {about || "Hey there! I am using ChatMingle"}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Loader>
    </Drawer>
  );
}

export default NewChat;
