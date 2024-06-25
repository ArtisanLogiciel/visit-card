
const CardLineAddress = ({
  avatar,
  address,
  city
}: {
  avatar: JSX.Element;
  address?: string | null;
  city?: string | null;
}) => {
  if(!address && !city) return null
  const location = `${address?address+",":""}${city??""}`
  return (
    <div className="flex space-x-4">
      {avatar} <p>{location}</p>
    </div>
  );
};

export default CardLineAddress
