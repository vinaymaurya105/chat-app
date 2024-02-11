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

type ProfileType = { size?: number; editable?: boolean; icon?: string };

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
  const { size = 40, icon = "" } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchoreRef = useRef<HTMLAnchorElement | null>(null);

  const [img, setImage] = useState<string | undefined>(icon);

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    handleClickAway();
    const files = event.target.files || [];
    const file = files[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onloadend = (e: ProgressEvent<FileReader>) => {
      const result = e.target?.result as string;
      setImage(result);
    };
    fileReader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    handleClickAway();
    if (!img) return;
    setImage("");
  };
  return (
    <Box>
      <Box
        ref={anchoreRef}
        className={classes.container}
        height={size}
        width={size}
      >
        <Avatar src={img} style={{ height: size, width: size }} />
        <Box
          className={classes.editIconBox}
          onClick={() => setOpen((prev) => !prev)}
        >
          <ModeEdit style={{ height: size / 2 }} />
        </Box>
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
                        onChange={handleInput}
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
