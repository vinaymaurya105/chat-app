import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { LIST_USERS } from "../../utils/constants/api";
import { Close } from "@mui/icons-material";
import axios from "axios";

function GroupChat(props: any) {
  const { handleGroupChat } = props;
  console.log("hell");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const config = { method: "GET", url: LIST_USERS };
    axios(config).then((res) => {
      const { success, message, result } = res.data;
    });
  });
  return (
    <Dialog open onClose={handleGroupChat} maxWidth="lg">
      <Box width={550}>
        <Box
          display="flex"
          justifyContent="space-between"
          p="9px 20px"
          height={50}
          boxSizing="border-box"
          alignItems="center"
        >
          <DialogTitle style={{ padding: 0 }}>
            <Typography variant="h6">Add group members</Typography>
          </DialogTitle>
          <IconButton onClick={handleGroupChat}>
            <Close />
          </IconButton>
        </Box>

        <DialogContent dividers>
          <Box height="100%" flex={1}>
            Hell
          </Box>
        </DialogContent>
        <DialogActions>
          <Button>Next</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default GroupChat;
