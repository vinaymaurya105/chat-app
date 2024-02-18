import { Done, Edit, West } from "@mui/icons-material";
import {
  Box,
  Drawer,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  makeStyles,
} from "@mui/material";
import Profile from "./Profile";
import { ChangeEvent, useState } from "react";

const useStyles: any = makeStyles(() => ({
  input: {
    "& .MuiInputBase": {
      border: "none",
    },
  },
}));

function MyProfile(props: any) {
  const { open, handleProfie } = props;

  const classes = useStyles();
  const [isEdit, setIsEdit] = useState({ name: false, about: false });
  const [values, setValues] = useState({ name: "", about: "" });

  const handleField = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValues((prev) => ({ ...prev, name: value }));
  };

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
          <Typography variant="body2" color="#ccc5b9">
            Your name
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={1}
          >
            {/* <Typography>Vinay Kumar Maurya</Typography> */}

            <TextField
              placeholder="nnn"
              variant="standard"
              inputProps={{
                maxLength: 25,
              }}
              InputProps={{
                readOnly: !isEdit.name,
                endAdornment: (
                  <InputAdornment position="end">
                    {isEdit.name ? (
                      <Box display="flex" gap={1}>
                        <Typography variant="body2" color="#d6ccc2">
                          {25 - values.name.length}
                        </Typography>

                        <IconButton style={{ height: 24, width: 24 }}>
                          <Done />
                        </IconButton>
                      </Box>
                    ) : (
                      <IconButton style={{ height: 24, width: 24 }}>
                        <Edit />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
                disableUnderline: !isEdit.name,
              }}
              onChange={handleField}
              fullWidth
              value={values.name}
            />
            {/* <IconButton style={{ height: 24, width: 24 }}>
              <Edit />
            </IconButton> */}
          </Box>
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
            About
          </Typography>
          <Typography>vinaymaurya@gmail.com</Typography>
        </Box>
      </Box>
    </Drawer>
  );
}

export default MyProfile;
