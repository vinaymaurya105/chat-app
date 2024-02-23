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
