import { Avatar, Box } from "@mui/material";

type ProfileType = { size?: number; editable?: boolean };

function Profile(props: ProfileType) {
  const { size = 40 } = props;
  return (
    <Box>
      <Avatar style={{ height: size, width: size }} />
      <input type="file" />
      <Box height={size} width={size} bgcolor="red" borderRadius={50} />
    </Box>
  );
}

export default Profile;
