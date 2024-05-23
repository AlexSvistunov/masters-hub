

const MiniCategories = () => {
  return (
    <section className='p-7'>
      <div className='container mx-auto'>
        <h2 className='text-4xl mb-5'>Категории</h2>

        <div className='flex gap-4'>
          <div className='w-2/6 relative category-card'>
            <img className='w-full h-full rounded-lg' src='https://f1.dikidi.ru/c2/v1989/3uhgfj0vfs.jpg'></img>
            <span className='absolute top-2/4 left-2/4 text-3xl text-black'>Ресницы</span>
          </div>

          <div className='w-2/6 relative category-card'>
            <img className='w-full h-full rounded-lg' src='https://f1.dikidi.ru/c2/v1989/3uhgfj0vfs.jpg'></img>
            <span className='absolute top-2/4 left-2/4 text-3xl text-black'>Брови</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MiniCategories