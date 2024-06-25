import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Link } from "react-router-dom";

const EditCardButton = () => {
  return (
    <Link to="edit-card" className="">
      <EditRoundedIcon sx={{ backgroundColor: "orange", padding: "3px" }} />
    </Link>
  );
};

export default EditCardButton;
