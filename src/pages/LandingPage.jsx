import { useState } from "react"
import EnrollModal from "../components/EnrollModal"
import Header from "../components/Header"
import Hero from "../components/Hero"
import MiniCatalog from "../components/MiniCatalog"
import MiniCategories from "../components/MiniCategories"
// import Popular from "../components/Popular"
import Tabs from "../components/Tabs"


const LandingPage = () => {

  return (
    <>  
        <Header/>
        <Hero/>
        <Tabs/>
        <MiniCategories/>
        {/* <Popular/> */}
        <MiniCatalog />
        {/* <EnrollModal step={step} setStep={setStep} /> */}
    </>
  )
}

export default LandingPage
