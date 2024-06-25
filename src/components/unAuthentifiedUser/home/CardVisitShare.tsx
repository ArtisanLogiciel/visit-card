import qrCode from "../../../assets/qr-welcome-text.png";

const CardVisitShare = () => {
  return (
    <div
      className="flex flex-col items-center w-5/6 p-4 bg-white border-2 border-gray-400 rounded-md border-content"
      data-testid="card-visit-share"
    >
      <img src={qrCode} alt="qrcode" className="size-[50%]" />
      <h2 className="text-xs text-center">
        <b>Partager ma carte de visite</b>
      </h2>
    </div>
  );
};

export default CardVisitShare;
