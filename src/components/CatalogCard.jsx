const CatalogCard = () => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl col-span-3">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Eskova Studio</h2>
        <p>Ленина 54</p>
        <div className="card-actions justify-end">
          <button className="btn btn-secondary">Записаться</button>
        </div>
      </div>
    </div>
  );
};

export default CatalogCard;
