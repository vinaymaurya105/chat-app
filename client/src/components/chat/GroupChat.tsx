import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
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
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  button: {
    "&.MuiButtonBase-root": {
      textTransform: "none",
      borderRadius: 50,
      height: 30,
      boxShadow: "none",
    },
  },
  input: {
    "& .MuiOutlinedInput-input": {
      padding: "5px 15px",
      borderRadius: 8,
    },
  },
}));

type UserType = { id: string; label: string; subLabel: string };

function GroupChat(props: any) {
  const { handleGroupChat } = props;
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<UserType[]>([]);
  const [next, setNext] = useState(false);

  const handleNext = () => {
    setNext(true);
  };

  const handleUserSelect = (user: UserType) => {
    setSelected((prev: UserType[]) => {
      let prevState = [...prev];
      const selectedUser = prevState.find((u: UserType) => u.id === user.id);
      if (selectedUser) {
        console.log("ss");
        prevState = prevState.filter((u) => u.id !== user.id);
      } else {
        prevState.push(user);
      }
      return prevState;
    });
  };
  useEffect(() => {
    console.log({ selected });
    console.log("hello");
  }, [selected]);

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
        <Box width={600} display="flex" flexDirection="column">
          {!next ? (
            <>
              <Box
                display="flex"
                justifyContent="space-between"
                p="5px 10px"
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
                  {/* <SearchInput /> */}
                  <Box p={1}>
                    <TextField fullWidth className={classes.input} />
                  </Box>

                  <Box borderTop="1px solid  #e9ecef">
                    {users.map((user) => {
                      const { id, label, about } = user;
                      return (
                        <Box key={id} onClick={() => handleUserSelect(user)}>
                          <UserLabel label={label} subLabel={about} />
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              </DialogContent>
            </>
          ) : (
            <></>
          )}
          <DialogActions>
            <Button
              variant="contained"
              className={classes.button}
              disableFocusRipple
              onClick={handleNext}
            >
              Next
            </Button>
          </DialogActions>
        </Box>
      </Loader>
    </Dialog>
  );
}

export default GroupChat;
