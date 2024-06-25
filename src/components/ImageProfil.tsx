import Person2Rounded from "@mui/icons-material/Person2Rounded";
import { Avatar, Skeleton } from "@mui/material";
import { UseQueryResult } from "@tanstack/react-query";

const IMAGE_SIZE_DEFAULT = 80;

const ImageProfil = ({
  file,
  url,
  size = IMAGE_SIZE_DEFAULT,
}: {
  file?: File | null;
  url?: UseQueryResult<string | null, Error>;
  size: number;
}) => {
  const imageURL = file ? URL.createObjectURL(file) : url?.data;

  if (url?.isLoading)
    return <Skeleton variant="circular" width={size} height={size} />;

  if (!imageURL)
    return (
      <Avatar sx={{ width: size, height: size }}>
        <Person2Rounded />
      </Avatar>
    );

  return <Avatar src={imageURL} sx={{ width: size, height: size }} />;
};

export default ImageProfil;
