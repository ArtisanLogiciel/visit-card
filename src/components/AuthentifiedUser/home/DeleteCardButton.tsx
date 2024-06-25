import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Link } from "react-router-dom";

const DeleteCardButton = () => {
  return (
    <Link to="/delete-card" className="">
      <DeleteRoundedIcon sx={{backgroundColor:"red",padding:"2px"}} />
    </Link>
  );
};

export default DeleteCardButton;
