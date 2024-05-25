const Tabs = () => {
  return (
    <div className="my-2">
      <div className="container mx-auto rounded-lg p-2">
        <div className="w-full flex justify-center gap-4">
          <button className="btn btn-neutral">Подборка</button>
          <button className="btn">Каталог</button>
          <button className="btn">Мои записи</button>
        </div>
      </div>
    </div>

  );
};

export default Tabs;
