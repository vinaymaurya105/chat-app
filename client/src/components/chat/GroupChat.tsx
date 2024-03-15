import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { LIST_USERS } from "../../utils/constants/api";
import { Close } from "@mui/icons-material";
import axios from "axios";
import Loader from "../Loader";
import { getReqHeaders } from "../../utils/Helper";
import UserLabel from "../UserLabel";
import SearchInput from "../SearchInput";
import { makeStyles } from "@mui/styles";
import Profile from "../Profile";

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
    "& .MuiInputBase-root": {
      display: "flex",
      flexWrap: "wrap",
      maxHeight: 100,
      padding: 4,
      gap: 4,
      overflowY: "auto",
      background: "rgba(0,0,0,0.03)",
      border: "1px solid #adb5bd",
    },

    "& .MuiOutlinedInput-input": {
      padding: "5px 8px",
      borderRadius: 8,
      height: 30,
      boxSizing: "border-box",
    },
  },
  chip: {
    "&.MuiChip-root": {
      color: "black",
      borderColor: "green",
      padding: "2px",
    },

    "& .MuiChip-label": {
      padding: "0 4px",
    },
  },
}));

type UserType = { id: string; label: string; subLabel: string; icon: string };

type GroupChatType = {
  handleGroupChat: () => void;
};
function GroupChat(props: GroupChatType) {
  const { handleGroupChat } = props;
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<UserType[]>([]);
  const [next, setNext] = useState(false);
  const scrollRef = useRef<any>(null);
  const [search, setSearch] = useState("");
  const [groupame, setGroupName] = useState("");

  const handleNext = () => {
    setNext((prev) => !prev);
  };

  const handleUserSelect = (user: UserType) => {
    setSelected((prev: UserType[]) => {
      let prevState = [...prev];
      const selectedUser = prevState.find((u: UserType) => u.id === user.id);
      if (selectedUser) {
        prevState = prevState.filter((u) => u.id !== user.id);
      } else {
        prevState.push(user);
      }

      return prevState;
    });
  };

  const handleDelete = (idx: string) => {
    setSelected((prev: UserType[]) => {
      const prevState = prev.filter(({ id }) => id !== idx);
      return prevState;
    });
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    const data = [...selected];
    e.stopPropagation();
    if (data.length && e.key === "Backspace" && !search.length) {
      data.pop();
      setSelected(data);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  useEffect(() => {
    scrollRef?.current?.scrollIntoView();
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
            {!next ? (
              <Box height="100%" flex={1}>
                <Box p={1}>
                  <TextField
                    className={classes.input}
                    fullWidth
                    InputProps={{
                      disableUnderline: true,
                      startAdornment: selected.map((user) => {
                        const { id, label, icon } = user || {};
                        return (
                          <Chip
                            ref={scrollRef}
                            className={classes.chip}
                            key={id}
                            label={label}
                            variant="outlined"
                            size="small"
                            onDelete={() => handleDelete(id)}
                            deleteIcon={<Close />}
                            avatar={<Profile icon={icon} size={19} />}
                          />
                        );
                      }),
                    }}
                    sx={{ fieldset: { border: "none" } }}
                    onKeyDown={handleKeyPress}
                    onChange={handleInputChange}
                    value={search}
                  />
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
            ) : (
              <Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  p="28px 0"
                >
                  <Profile size={200} editable />
                </Box>
                <TextField fullWidth variant="standard" />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              className={classes.button}
              disableFocusRipple
              onClick={!next ? handleGroupChat : handleNext}
            >
              {!next ? "Cancel" : "Back"}
            </Button>
            <Button
              variant="contained"
              className={classes.button}
              disableFocusRipple
              onClick={!next ? handleNext : () => console.log("Save")}
            >
              {!next ? "Next" : "Save"}
            </Button>
          </DialogActions>
        </Box>
      </Loader>
    </Dialog>
  );
}

export default GroupChat;
