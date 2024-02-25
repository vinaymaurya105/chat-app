export const getLoginUserRecord = () => {
  const loginUser = localStorage.getItem("user");
  const user = JSON.parse(loginUser as string);
  return user as {
    id: string;
    label: string;
    about: string;
    subLabel: string;
    icon: string;
    token: string;
  };
};

export const getReqHeaders = () => {
  const user = getLoginUserRecord();
  const header = { authorization: `Bearer ${user.token}` };
  return header;
};

export function getSender(users: { [key: string]: string }[]) {
  const user = getLoginUserRecord();
  const sender = users.find((u) => u.id !== user.id);
  console.log({ sender });
  return sender;
}
