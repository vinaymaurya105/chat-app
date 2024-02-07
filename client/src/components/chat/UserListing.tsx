import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Header from "./Header";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useState } from "react";
import { Close } from "@mui/icons-material";

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
}));

function userListing() {
  const classes = useStyle();

  const [search, setSearch] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  const handleCancel = () => {
    setSearch("");
  };

  return (
    <Box bgcolor="#fff" width={330} height="100%">
      <Header>
        <Button>CreateChat</Button>
      </Header>
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
    </Box>
  );
}

export default userListing;
