import { Box, Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LIST_USERS } from "../../utils/constants/api";

function GroupChat(props: any) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const config = { method: "GET", url: LIST_USERS };
  });
  return (
    <Box>
      <Dialog open title="Add group members">
        <Box></Box>
      </Dialog>
    </Box>
  );
}

export default GroupChat;
