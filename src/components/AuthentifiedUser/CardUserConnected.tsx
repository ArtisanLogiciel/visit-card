import { UserContext, UserContextProvider } from '@/Providers/usersProviders';
import useCard from '@/hooks/useCard';
import useImageProfil from '@/hooks/useImageProfil';
import { useQuery } from '@tanstack/react-query';
import  { useContext } from 'react'
import Card from './card/Card';

const CardUserConnected = () => {
  const { authUser } = useContext<UserContextProvider | null>(
    UserContext
  ) as UserContextProvider;
  const { getCard, cardQueryKey } = useCard(authUser);

  const { getImageURLSourceImage, imageURLQueryKey } = useImageProfil(authUser);

  const urlImage = useQuery({
    queryKey: imageURLQueryKey,
    queryFn: getImageURLSourceImage,
  });

  const card = useQuery({
    queryKey: cardQueryKey,
    queryFn: getCard,
  });
  return (
    <div className='flex flex-col items-center '>
    <Card urlImage={urlImage} card={card}/>
    </div>
  )
}

export default CardUserConnected
