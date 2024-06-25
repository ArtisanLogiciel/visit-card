import Person2Rounded from "@mui/icons-material/Person2Rounded";
import { Avatar } from "@mui/material";

const IMAGE_SIZE_DEFAULT = 80;

const ImageProfil = ({
  file,
  url,
  size = IMAGE_SIZE_DEFAULT,
}: {
  file?: File | null;
  url?:string|null
  size: number;
}) => {
  const imageURL = file ? URL.createObjectURL(file) : url;

  if (!imageURL)
    return (
  
      <Avatar sx={{ width: size, height: size }}>
        <Person2Rounded />
      </Avatar>
 
    );

  return <Avatar src={imageURL} sx={{ width: size, height: size }} />;
};

export default ImageProfil;
