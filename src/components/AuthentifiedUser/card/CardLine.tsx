const CardLine = ({
  avatar,
  info,
}: {
  avatar: JSX.Element;
  info?: string | null;
}) => {
  if (!info) return null;
  return (
    <div className="flex my-2 space-x-4">
      {avatar} <p>{info}</p>
      <hr className="my-1"/>
    </div>
  );
};

export default CardLine