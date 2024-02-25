import { ModeEdit } from "@mui/icons-material";
import {
  Avatar,
  Box,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ChangeEvent, useRef, useState } from "react";
import { UPDATE_USER } from "../utils/constants/api";
import { getLoginUserRecord } from "../utils/helper";
import axios from "axios";

type ProfileType = {
  size?: number;
  editable?: boolean;
  icon?: string;
  userId?: string;
  setLoading?: (v: boolean) => void;
};

const useStyles = makeStyles(() => ({
  editIconBox: {
    position: "absolute",
    display: "none",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    background: "rgba(0,0,0, 0.6)",
    color: "#fff",
    height: "100%",
    width: "100%",
    cursor: "pointer",
  },

  container: {
    position: "relative",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    borderRadius: "50%",
    "&:hover $editIconBox": {
      display: "flex",
    },
  },
}));

const imgValidation = "image/png,image/gif,image/jpg,image/jpeg";

function Profile(props: ProfileType) {
  const {
    size = 40,
    icon = "",
    editable = false,
    userId,
    setLoading = () => {},
  } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchoreRef = useRef<HTMLAnchorElement | null>(null);

  const [img, setImage] = useState<string | undefined>(icon);

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    handleClickAway();

    const files = event.target.files || [];
    const file = files[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onloadend = (e: ProgressEvent<FileReader>) => {
      const result = e.target?.result as string;

      setImage(result);

      // const user = getLoginUserRecord();
      // const config = {
      //   method: "PATCH",
      //   url: `${UPDATE_USER}/${user.id}`,
      //   headers: { authorization: user.token },
      //   data: { icon: JSON.stringify(result) },
      // };
      // setLoading(true);
      // axios(config)
      //   .then((res) => {
      //     const { success, message, result } = res.data;
      //     if (!success) throw new Error(message);

      //     user.icon = result.icon;
      //     localStorage.setItem("user", JSON.stringify(user));
      //     setImage(result);

      //     setLoading(false);
      //   })
      //   .catch((err: Error) => {
      //     setLoading(false);
      //     console.log(err.message);
      //   });
    };
    fileReader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    handleClickAway();
    if (!img) return;
    setImage("");
  };
  return (
    <Box borderRadius="50%">
      <Box
        ref={anchoreRef}
        className={classes.container}
        height={size}
        width={size}
      >
        <Avatar src={img} style={{ height: size, width: size }} />
        {editable && (
          <Box
            className={classes.editIconBox}
            onClick={() => setOpen((prev) => !prev)}
          >
            <ModeEdit style={{ height: size / 2 }} />
          </Box>
        )}
        <Popper
          open={open}
          anchorEl={anchoreRef.current}
          transition
          style={{ zIndex: 1300 }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center-bottom" : "left-top",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClickAway}>
                  <MenuList id="menu-list-grow">
                    <MenuItem component="label" style={{ fontSize: 12 }}>
                      Upload image
                      <input
                        type="file"
                        hidden
                        accept={imgValidation}
                        onChange={handleImageUpload}
                      />
                    </MenuItem>
                    <MenuItem
                      style={{ fontSize: 12 }}
                      disabled={!img}
                      onClick={handleRemoveImage}
                    >
                      Remove image
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </Box>
  );
}

export default Profile;
