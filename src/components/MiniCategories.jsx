import { useEffect, useState } from "react"
import { URL } from "../utils/backend-url"
import CategoryCard from "./CategoryCard";


const MiniCategories = () => {
  const [categories, setCategories] = useState([])
  console.log(categories);

  const getCategories = async () => {
    try {
      const response = await fetch(`${URL}/api/categories/`)
      const data = await response.json()
      if(data) {
        setCategories(data)
      }
      return data

    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect( () => {
    getCategories()
  }, [])
  return (
    <section className='p-7'>
      <div className='container mx-auto'>
        <h2 className='text-4xl mb-5'>Категории</h2>


        <div className='flex gap-4'>
         {categories.map((category) => (
          <CategoryCard key={category.id} category={category}/>
         ))}
        </div>
      </div>
    </section>
  )
}

export default MiniCategories