import { Close, Search } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ChangeEvent, useState } from "react";

const useStyles = makeStyles(() => ({
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

type SearchInputType = { onChange?: (search: string) => void };
function SearchInput(props: SearchInputType) {
  const { onChange = () => {} } = props;
  const classes = useStyles();

  const [search, setSearch] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onChange(value);
  };

  const handleCancel = () => {
    setSearch("");
  };
  return (
    <Box height={49} display="flex" alignItems="center" p="5px 15px">
      <TextField
        fullWidth
        className={classes.input}
        variant="filled"
        placeholder="Searh or start new chat"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" style={{ marginTop: 0 }}>
              <Search />
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
  );
}

export default SearchInput;
