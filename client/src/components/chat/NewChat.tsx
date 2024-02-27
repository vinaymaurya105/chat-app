import { West } from "@mui/icons-material";
import { Box, Drawer, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { LIST_USERS } from "../../utils/constants/api";
import { getReqHeaders } from "../../utils/Helper";
import axios from "axios";

const useStyles = makeStyles(() => ({
  wrapper: {
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 380,
    boxSizing: "border-box",
  },
}));

function NewChat(props: any) {
  const { open, handleNewChat } = props;
  const classes = useStyles();

  const [values, setValues] = useState([]);

  useEffect(() => {
    const config = {
      method: "GET",
      url: LIST_USERS,
      headers: getReqHeaders(),
    };
    axios(config)
      .then((res) => {
        const { success, result, message } = res.data;
        if (!success) throw Error(message);
        console.log(result);
      })
      .catch((err: Error) => {
        console.log(err.message);
      });
  }, []);

  return (
    <Box>
      <Drawer open={open} hideBackdrop elevation={0}>
        <Box bgcolor="#F0F2F5" height="100%" width={380} boxSizing="border-box">
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
        </Box>
      </Drawer>
    </Box>
  );
}

export default NewChat;
