import { Box, Typography } from "@mui/material";
import React from "react";
import Profile from "./Profile";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    gap: "15px",
    padding: "10px 15px",
    oveflow: "hidden",
    cursor: "pointer",
    borderBottom: "1px solid #e9ecef",
    "&:hover": {
      background: "#e9ecef",
    },
  },
}));

type UserProps = {
  label: string | undefined;
  subLabel?: string;
  size?: number;
};

function UserLabel(props: UserProps) {
  const {
    label = "",
    subLabel = "Hey there! I am using ChatMingle",
    size,
  } = props;
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Profile size={size} />
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Typography variant="body2">{label}</Typography>
        <Typography variant="caption" color="GrayText">
          {subLabel}
        </Typography>
      </Box>
    </Box>
  );
}

export default UserLabel;
