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
import { getLoginUserRecord } from "../utils/Helper";
import Loader from "./Loader";
import { UPDATE_USER } from "../utils/constants/api";
import axios from "axios";
import Snackebar from "./Snackebar";

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
type userType = {
  id?: string;
  label: string;
  about: string;
  subLabel?: string;
  icon: string;
  token: string;
};

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

const defUser = { label: "", about: "", icon: "", token: "" };
function MyProfile(props: any) {
  const { open, handleProfie } = props;
  const classes = useStyles();

  const [isEdit, setIsEdit] = useState({ label: false, about: false });
  const [values, setValues] = useState<userType>(defUser);
  const [isLoading, setLoading] = useState(false);
  const [loader, setLoader] = useState({
    open: false,
    variant: "error",
    message: "",
  });

  const handleField = (event: ChangeEvent<HTMLInputElement>, type: string) => {
    const value = event.target.value;
    setValues((prev) => ({ ...prev, [type]: value }));
  };

  const handleEdit = (label: string) => {
    setIsEdit((prev) => ({ ...prev, [label]: true }));
  };

  const updateUserApi = (type: "label" | "about") => {
    const config = {
      method: "PATCH",
      url: `${UPDATE_USER}/${values.id}`,
      headers: { authorization: `Bearer ${values.token}` },
      data: { [type]: values[type] },
    };
    setLoading(true);
    axios(config)
      .then((res: any) => {
        const { success, message, result } = res.data;
        if (!success) throw new Error(message);

        values[type] = result[type];
        localStorage.setItem("user", JSON.stringify(values));

        setLoading(false);
        setIsEdit((prev) => ({ ...prev, [type]: false }));
        setLoader({ variant: "success", open: true, message });
      })
      .catch((err: Error) => {
        setLoading(false);
        setLoader({ variant: "error", open: true, message: err.message });
      });
  };

  const handleSave = (prop: "label" | "about") => {
    const user = getLoginUserRecord();
    if (user[prop] === values[prop]) {
      setIsEdit((prev) => ({ ...prev, [prop]: false }));
      return;
    }
    if (prop === "label") {
      updateUserApi("label");

      return;
    }
    if (prop === "about") {
      updateUserApi("about");
    }
  };

  useEffect(() => {
    const user = getLoginUserRecord();
    setValues(user || defUser);
  }, []);

  return (
    <Drawer open={open} hideBackdrop elevation={0}>
      <Loader loading={isLoading}>
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
            <Profile
              size={200}
              icon={values?.icon}
              userId={values.id}
              editable
            />
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
                value={values?.label}
                limit
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleField(e, "label")
                }
                handleEdit={() => handleEdit("label")}
                editable={isEdit.label}
                onSave={() => handleSave("label")}
              />
            </Box>
          </Box>

          <Box p="20px 20px 28px 30px" boxSizing="border-box" width="380px">
            <Typography variant="body2">
              This is not your username or pin. this will be visible to your
              chat contacts
            </Typography>
          </Box>
          <Box className={classes.container}>
            <Typography variant="body2" color="#008069">
              About
            </Typography>
            <InputField
              value={values?.about}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleField(e, "about")
              }
              handleEdit={() => handleEdit("about")}
              editable={isEdit.about}
              onSave={() => handleSave("about")}
            />
          </Box>
        </Box>
      </Loader>
      {loader.open && (
        <Snackebar
          isShow={loader.open}
          variant={loader.variant}
          message={loader.message}
          setOpen={setLoader}
        />
      )}
    </Drawer>
  );
}

export default MyProfile;
