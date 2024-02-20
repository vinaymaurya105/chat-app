import { Done, Edit, West } from "@mui/icons-material";
import {
  Box,
  Drawer,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Profile from "./Profile";
import { ChangeEvent, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";

const useStyles: any = makeStyles(() => ({
  wrapper: {
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 380,
    boxSizing: "border-box",
  },
  container: {
    padding: "14px 30px",
    display: "flex",
    gap: 12,
    flexDirection: "column",
    boxShadow: "0 1px 5px rgba(11,20,26,0.08)",
    background: "#fff",
  },
  profile: {
    padding: "28px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  },
}));

function InputField(props: any) {
  const {
    onChange,
    editable = false,
    value,
    handleEdit,
    limit = false,
    onSave,
  } = props;

  return (
    <TextField
      variant="standard"
      inputProps={
        limit
          ? {
              maxLength: 25,
            }
          : {}
      }
      InputProps={{
        readOnly: !editable,
        endAdornment: (
          <InputAdornment position="end">
            {editable ? (
              <Box display="flex" gap={1}>
                {limit && (
                  <Typography variant="body2" color="#ccc5b9">
                    {25 - value.length}
                  </Typography>
                )}

                <IconButton style={{ height: 24, width: 24 }} onClick={onSave}>
                  <Done />
                </IconButton>
              </Box>
            ) : (
              <IconButton
                style={{ height: 24, width: 24 }}
                onClick={handleEdit}
              >
                <Edit />
              </IconButton>
            )}
          </InputAdornment>
        ),
        disableUnderline: true,
      }}
      onChange={onChange}
      fullWidth
      value={value}
      style={editable ? { borderBottom: "2px solid #adb5bd" } : {}}
    />
  );
}

function MyProfile(props: any) {
  const { open, handleProfie } = props;
  const classes = useStyles();

  const [isEdit, setIsEdit] = useState({ name: false, about: false });
  const [values, setValues] = useState({
    name: "Vinay Kumar Maurya",
    about: "Battery about to die",
  });

  const handleField = (event: ChangeEvent<HTMLInputElement>, type: string) => {
    const value = event.target.value;
    setValues((prev) => ({ ...prev, [type]: value }));
  };

  const handleEdit = (label: string) => {
    setIsEdit((prev) => ({ ...prev, [label]: true }));
  };

  const handleSave = (prop: string) => {
    if (prop === "name") {
      console.log({ name: values.name });
      return;
    }
    if (prop === "about") {
      console.log({ anout: values.about });
    }
  };

  return (
    <Drawer open={open} hideBackdrop elevation={0}>
      <Box bgcolor="#F0F2F5" height="100%" width={380} boxSizing="border-box">
        <Box display="flex" bgcolor="#008069" color="#fff" p="10px">
          <IconButton
            style={{ height: 30, width: 24, color: "#fff" }}
            onClick={handleProfie}
          >
            <West />
          </IconButton>

          <Box className={classes.wrapper}>
            <Typography variant="h6">My Profile</Typography>
          </Box>
        </Box>

        <Box className={classes.profile}>
          <Profile size={200} editable />
        </Box>

        <Box className={classes.container}>
          <Typography variant="body2" color="#008069">
            Your name
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={1}
          >
            <InputField
              value={values.name}
              limit
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleField(e, "name")
              }
              handleEdit={() => handleEdit("name")}
              editable={isEdit.name}
              onSave={() => handleSave("name")}
            />
          </Box>
        </Box>

        <Box p="20px 20px 28px 30px" boxSizing="border-box" width="380px">
          <Typography variant="body2">
            This is not your username or pin. this will be visible to your chat
            contacts
          </Typography>
        </Box>
        <Box className={classes.container}>
          <Typography variant="body2" color="#008069">
            About
          </Typography>
          <InputField
            value={values.about}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleField(e, "about")
            }
            handleEdit={() => handleEdit("about")}
            editable={isEdit.about}
            onSave={() => handleSave("about")}
          />
        </Box>
      </Box>
    </Drawer>
  );
}

export default MyProfile;
