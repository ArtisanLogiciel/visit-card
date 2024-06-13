import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import { MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AccountButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { logoutUser } = useContext(UserContext) as UserContextProvider;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleAccount = () => {
    handleClose();
    navigate("/account");
  };

  const handleLogout = async () => {
    handleClose();
    await logoutUser();
    navigate("/");
  };
  return (
    <>
      <Button onClick={handleClick}>Compte</Button>
      <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
        <MenuItem onClick={handleAccount}>Mon compte</MenuItem>
        <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
      </Menu>
    </>
  );
};

export default AccountButton;
