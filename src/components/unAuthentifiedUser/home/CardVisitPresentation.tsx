const CardVisitPresentation = () => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="p-2 bg-white">
        <h1>Jean Dupont</h1>
        <h2>Macon </h2>
        <h2>Les bricoleurs </h2>
      </div>
      <form className="ml-2 space-x-1 text-xs ">
        <input type="radio" id="PDF" />
        <label>PDF</label>
        <input type="radio" id="image" />
        <label>Image</label>
        <input
          type="submit"
          className="p-2 bg-orange-500 rounded-sm"
          value={"Enregistrer"}
        />
      </form>
    </div>
  );
};

export default CardVisitPresentation;
