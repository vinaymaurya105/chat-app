import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserListing from "./UserListing";
import { FETCH_CHAT_USERS } from "../../utils/constants/api";
import { getReqHeaders } from "../../utils/Helper";
import axios from "axios";
import Loader from "../Loader";

function Chat() {
  const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const config = {
      method: "GET",
      url: FETCH_CHAT_USERS,
      headers: getReqHeaders(),
    };
    setLoading(true);
    axios(config)
      .then((res) => {
        const { success, message, result } = res.data;
        if (!success) throw new Error(message);
        setChatData(result);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);
  return (
    <Box height="100%">
      <Loader loading={loading}>
        <UserListing values={chatData} />
      </Loader>
    </Box>
  );
}

export default Chat;
