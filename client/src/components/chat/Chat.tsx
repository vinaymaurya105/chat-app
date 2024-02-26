import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserListing from "./UserListing";
import { FETCH_CHAT_USERS } from "../../utils/constants/api";
import { getReqHeaders } from "../../utils/Helper";
import axios from "axios";
import Loader from "../Loader";
import Snackebar from "../Snackebar";

function Chat() {
  const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState({
    open: false,
    variant: "error",
    message: "",
  });

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
        // setLoader({ variant: "success", open: true, message });
      })
      .catch((err) => {
        setLoading(false);
        // setLoader({ variant: "error", open: true, message: err.message });
      });
  }, []);
  return (
    <Box height="100%">
      <Loader loading={loading}>
        <UserListing values={chatData} />
      </Loader>

      {loader.open && (
        <Snackebar
          isShow={loader.open}
          variant={loader.variant}
          message={loader.message}
          setOpen={setLoader}
        />
      )}
    </Box>
  );
}

export default Chat;
