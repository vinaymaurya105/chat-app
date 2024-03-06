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
import { useEffect, useState } from "react";
import { LIST_USERS } from "../../utils/constants/api";
import { Close } from "@mui/icons-material";
import axios from "axios";
import Loader from "../Loader";
import { getReqHeaders } from "../../utils/Helper";
import UserLabel from "../UserLabel";
import SearchInput from "../SearchInput";

function GroupChat(props: any) {
  const { handleGroupChat } = props;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const config = { method: "GET", url: LIST_USERS, headers: getReqHeaders() };
    setLoading(true);
    axios(config)
      .then((res) => {
        const { success, message, result } = res.data;
        if (!success) throw new Error(message);
        setUsers(result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <Dialog open onClose={handleGroupChat} maxWidth="lg">
      <Loader loading={loading}>
        <Box width={550}>
          <Box
            display="flex"
            justifyContent="space-between"
            p="5px 20px"
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
              <SearchInput />
              <Box borderTop="1px solid  #e9ecef">
                {users.map((user) => {
                  const { id, label, about } = user;
                  return (
                    <Box key={id}>
                      <UserLabel label={label} subLabel={about} />
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button>Next</Button>
          </DialogActions>
        </Box>
      </Loader>
    </Dialog>
  );
}

export default GroupChat;
