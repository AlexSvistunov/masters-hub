
const Tabs = () => {
  return (
    <div className="my-2">
      <div className="container mx-auto bg-base-200 rounded-lg p-2">
        <div className="w-full flex justify-center gap-4">
          <button className="btn btn-primary">Подборка</button>
          <button className="btn btn-secondary">Каталог</button>
          <button className="btn btn-accent">Мои записи</button>
        </div>
      </div>
    </div>
  )
}

export default Tabs