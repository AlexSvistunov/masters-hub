import { useState } from "react"
import EnrollModal from "../components/EnrollModal"
import Header from "../components/Header"
import Hero from "../components/Hero"
import MiniCatalog from "../components/MiniCatalog"
import MiniCategories from "../components/MiniCategories"
// import Popular from "../components/Popular"
import Tabs from "../components/Tabs"


const LandingPage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [id, setId] = useState(null)

  return (
    <>  
        <Header/>
        <Hero/>
        <Tabs/>
        <MiniCategories/>
        {/* <Popular/> */}
        <MiniCatalog isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setId={setId}/>
        <EnrollModal isModalOpen={isModalOpen} id={id} setIsModalOpen={setIsModalOpen}/>
    </>
  )
}

export default LandingPage
