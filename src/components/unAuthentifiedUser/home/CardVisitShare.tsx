import qrCode from "../../../assets/qr-welcome-text.png";

const CardVisitShare = () => {
  return (
    <div className="flex flex-col items-center p-4 bg-white border-2 border-gray-400 rounded-md" data-testid="card-visit-share">
      <img src={qrCode} alt="qrcode" className="size-[60%]" />
      <h2 className="text-xs">
        <b>Partager ma carte de visite</b>
      </h2>
    </div>
  );
};

export default CardVisitShare;
