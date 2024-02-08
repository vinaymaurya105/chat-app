import { Avatar, Box } from "@mui/material";

function Profile(props: any) {
  const { size = 40 } = props;
  return (
    <Box>
      <Avatar style={{ height: size, width: size }} />
      <input type="file" />
    </Box>
  );
}

export default Profile;
