import {
  Badge,
  Box,
  ClickAwayListener,
  Grow,
  IconButton,
  InputAdornment,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  TextField,
  Tooltip,
} from "@mui/material";
import Header from "./Header";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useRef, useState } from "react";
import {
  Close,
  Add,
  More,
  MoreVert,
  NotificationsNone,
  GroupAddOutlined,
  PersonAddAlt,
} from "@mui/icons-material";
import Profile from "../Profile";
import axios from "axios";
import { LOGOUT_USER } from "../../utils/constants/api";
import { useNavigate } from "react-router-dom";
import { getLoginUserRecord } from "../../utils/Helper";
import Snackebar from "../Snackebar";
import Loader from "../Loader";
import SearchInput from "../SearchInput";
import GroupChat from "./GroupChat";

const useStyle = makeStyles(() => ({
  button: {
    height: 30,
    "&.MuiButton-root": {
      textTransform: "none",
      color: "#212529",
      background: "#e9ecef",
      "&:hover": {
        background: "#dee2e6",
      },
    },
    "& .MuiButton-endIcon": {
      marginLeft: 0,
    },
  },
}));

function MainHeader(props: any) {
  const { handleProfile, handleNewChat, handleGroupChat } = props;
  const classes = useStyle();

  const [openList, setOpenList] = useState(false);
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const [loader, setLoader] = useState({
    open: false,
    variant: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleClickAway = () => {
    setOpenList(false);
  };

  const handleMyProfile = () => {
    handleClickAway();
    handleProfile();
  };

  const handleLogout = () => {
    const user = getLoginUserRecord();
    if (!user) return;
    const config = {
      method: "POST",
      url: LOGOUT_USER,
      headers: { authorization: `Bearer ${user.token}` },
    };
    setLoading(true);
    axios(config)
      .then((res) => {
        const { success, message } = res.data;
        if (!success) throw new Error(message);
        setLoader({ open: true, variant: "success", message });
        setLoading(false);
        handleClickAway();
        localStorage.removeItem("user");
        navigate("/login");
      })
      .catch((err: any) => {
        setLoading(false);
        setLoader({ open: true, variant: "error", message: err.message });
      });
  };

  return (
    <Box>
      <Loader loading={loading}>
        <Header>
          <Box display="flex" justifyContent="space-between">
            <Box
              onClick={handleMyProfile}
              borderRadius="50%"
              style={{ cursor: "pointer" }}
            >
              <Profile />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              gap={1}
              ref={anchorRef}
            >
              <Tooltip
                title="New chat"
                componentsProps={{
                  tooltip: {
                    sx: {
                      fontSize: "12px",
                    },
                  },
                }}
              >
                <IconButton size="small" onClick={handleNewChat}>
                  <PersonAddAlt />
                </IconButton>
              </Tooltip>

              <Tooltip
                title="Notifications"
                componentsProps={{
                  tooltip: {
                    sx: {
                      fontSize: "12px",
                    },
                  },
                }}
              >
                <IconButton size="small">
                  <Badge badgeContent={1} color="primary">
                    <NotificationsNone />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Tooltip
                title="New Group"
                componentsProps={{
                  tooltip: {
                    sx: {
                      fontSize: "12px",
                    },
                  },
                }}
              >
                <IconButton size="small" onClick={handleGroupChat}>
                  <GroupAddOutlined />
                </IconButton>
              </Tooltip>

              <Tooltip
                title="Menu"
                componentsProps={{
                  tooltip: {
                    sx: {
                      fontSize: "12px",
                    },
                  },
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => setOpenList((prev) => !prev)}
                >
                  <MoreVert />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Header>

        <Popper
          open={openList}
          anchorEl={anchorRef.current}
          transition
          style={{ zIndex: 1300, transition: "width 2s" }}
          placement="bottom-end"
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "bottom end" : "bottom end",
              }}
            >
              <Paper elevation={0}>
                <ClickAwayListener onClickAway={handleClickAway}>
                  <MenuList id="menu-list-grow">
                    <MenuItem
                      style={{ fontSize: 12 }}
                      onClick={handleMyProfile}
                    >
                      My profile
                    </MenuItem>
                    <MenuItem
                      style={{ fontSize: 12 }}
                      onClick={handleGroupChat}
                    >
                      New Group
                    </MenuItem>
                    <MenuItem style={{ fontSize: 12 }} onClick={handleLogout}>
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>

        <SearchInput onChange={(a: string) => console.log(a)} />
      </Loader>

      <Snackebar
        isShow={loader.open}
        variant={loader.variant}
        setOpen={setLoader}
        message={loader.message}
      />
    </Box>
  );
}

export default MainHeader;
