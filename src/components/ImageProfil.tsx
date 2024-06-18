import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import useImageProfil from "@/hooks/useImageProfil";
import Person2Rounded from "@mui/icons-material/Person2Rounded";
import { Avatar, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

const ImageProfil = () => {
  const { authUser } = useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;

  const IMAGE_SIZE = 80

  const { getImage, isRepertoryEmpty } = useImageProfil(authUser);
  const {
    data: imageSource,
    isError,
    isLoading,
    error,
 
  } = useQuery({
    queryKey: ["image", "card", authUser?.uid],
    queryFn: getImage,
    
  });

  const { data: isRepertoryProfilEmpty } = useQuery({
    queryKey: ["image", "card", "isProfilEmpty", authUser?.uid],
    queryFn: isRepertoryEmpty,
  });

  if (isRepertoryProfilEmpty)
    return (
      <Avatar>
        <Person2Rounded />
      </Avatar>
    );
  if (isLoading) return <Skeleton variant="rounded" animation="pulse" />;
  if (!imageSource && isError)
    return <p>error {import.meta.env.DEV ? error.message : null}</p>;
  return <Avatar src={imageSource} sx={{width:IMAGE_SIZE,height:IMAGE_SIZE}}/>;
};

export default ImageProfil;
