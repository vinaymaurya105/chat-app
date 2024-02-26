import { West } from "@mui/icons-material";
import { Box, Drawer, IconButton, Typography } from "@mui/material";

function NewChat(props: any) {
  const { open, handleNewChat } = props;
  console.log({ open });
  return (
    <Box>
      <Drawer open={open} hideBackdrop elevation={0}>
        <Box bgcolor="#F0F2F5" height="100%" width={380} boxSizing="border-box">
          <Box display="flex" bgcolor="#008069" color="#fff" p="10px">
            <IconButton
              style={{ height: 30, width: 24, color: "#fff" }}
              onClick={handleNewChat}
            >
              <West />
            </IconButton>

            <Box
            // className={classes.wrapper}
            >
              <Typography variant="h6">My Profile</Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}

export default NewChat;
