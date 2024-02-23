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
  Notifications,
  NotificationsNone,
  GroupAddOutlined,
} from "@mui/icons-material";
import Profile from "../Profile";
import axios from "axios";
import { LOGOUT_USER } from "../../utils/constants/api";
import { useNavigate } from "react-router-dom";
import { getLoginUserRecord } from "../../utils/helper";
import Snackebar from "../Snackebar";
import Loader from "../Loader";

const useStyle = makeStyles(() => ({
  input: {
    "& .MuiFilledInput-root": {
      padding: "5px 15px",
      height: "35px",
      borderRadius: 8,
    },
    "& .MuiFilledInput-input": {
      padding: 0,
      fontSize: 14,
    },
  },
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
  const { handleProfie } = props;
  const classes = useStyle();

  const [search, setSearch] = useState("");
  const [openList, setOpenList] = useState(false);
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const [loader, setLoader] = useState({
    open: false,
    variant: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  const handleCancel = () => {
    setSearch("");
  };

  const handleClickAway = () => {
    setOpenList(false);
  };

  const handleMyProfile = () => {
    handleClickAway();
    handleProfie();
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
                <IconButton size="small">
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
                    <MenuItem style={{ fontSize: 12 }}>New Group</MenuItem>
                    <MenuItem style={{ fontSize: 12 }} onClick={handleLogout}>
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>

        <Box
          height={49}
          display="flex"
          alignItems="center"
          justifyContent="center"
          p="0 15px"
        >
          <TextField
            fullWidth
            className={classes.input}
            variant="filled"
            placeholder="Searh or start new chat"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" style={{ marginTop: 0 }}>
                  <IconButton size="small">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
              disableUnderline: true,
              endAdornment: search.length > 0 && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={handleCancel}>
                    <Close style={{ height: 18, width: 18 }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={search}
            onChange={handleSearch}
          />
        </Box>
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
