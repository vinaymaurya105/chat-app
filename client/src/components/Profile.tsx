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
import { useRef, useState } from "react";

type ProfileType = { size?: number; editable?: boolean };

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

function Profile(props: ProfileType) {
  const { size = 40 } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchoreRef = useRef<HTMLAnchorElement | null>(null);
  return (
    <Box>
      <Box className={classes.container} height={size} width={size}>
        <Avatar style={{ height: size, width: size }} />
        <Box className={classes.editIconBox} onClick={() => setOpen(true)}>
          <ModeEdit style={{ height: size / 2 }} />
        </Box>
        {/* <input type="file" /> */}
        <Popper
          open={open}
          anchorEl={anchoreRef.current}
          transition
          style={{ zIndex: 1500 }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center-top" : "left-top",
              }}
            >
              <Paper>
                {/* <ClickAwayListener onClickAway={}> */}
                <MenuList>
                  <MenuItem>UploadImage</MenuItem>
                </MenuList>
                {/* </ClickAwayListener> */}
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </Box>
  );
}

export default Profile;
