import { West } from "@mui/icons-material";
import { Box, Drawer, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import { useState } from "react";

function MyProfile(props: any) {
  const { open, handleProfie } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("");

  return (
    <Drawer open={open}>
      <Box bgcolor="#F0F2F5" height="100%" width={380} boxSizing="border-box">
        <Box display="flex" bgcolor="#008069" color="#fff" p="10px">
          <IconButton
            style={{ height: 30, width: 24, color: "#fff" }}
            onClick={handleProfie}
          >
            <West />
          </IconButton>

          <Box
            height={60}
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={380}
            boxSizing="border-box"
          >
            <Typography variant="h6">My Profile</Typography>
          </Box>
        </Box>

        <Box
          p="28px 0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxSizing="border-box"
        >
          <Profile size={200} editable />
        </Box>

        <Box
          p="14px 30px"
          display="flex"
          gap={1.5}
          flexDirection="column"
          boxShadow="0 1px 5px rgba(11,20,26,0.08)"
          bgcolor="#fff"
        >
          <Typography variant="body2" color="#008069">
            Your name
          </Typography>
          <Typography>Vinay Kumar Maurya</Typography>
        </Box>

        <Box p="20px 20px 28px 30px" boxSizing="border-box" width="380px">
          <Typography variant="body2">
            This is not your username or pin. this will be visible to your chat
            contacts
          </Typography>
        </Box>
        <Box
          p="14px 30px"
          display="flex"
          gap={1.5}
          flexDirection="column"
          boxShadow="0 1px 5px rgba(11,20,26,0.08)"
          bgcolor="#fff"
        >
          <Typography variant="body2" color="#008069">
            Email
          </Typography>
          <Typography>vinaymaurya@gmail.com</Typography>
        </Box>
      </Box>
    </Drawer>
  );
}

export default MyProfile;
