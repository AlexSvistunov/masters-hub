import { useState } from "react"
import EnrollModal from "../components/EnrollModal"
import Header from "../components/Header"
import Hero from "../components/Hero"
import MiniCatalog from "../components/MiniCatalog"
import MiniCategories from "../components/MiniCategories"
// import Popular from "../components/Popular"
import Tabs from "../components/Tabs"


const LandingPage = () => {

  const [step, setStep] = useState(0);
  const [time, setTime] = useState(null);

  // const recordingSlots = async (masterId) => {
  //   console.log(masterId);
  //   try {
  //     const response = await fetch(`${URL}/api/recording/${masterData.id}/${masterId}/`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Token ${currentToken}`,
  //       },
  //     });
  //     const data = await response.json();
  //     setStep(2)
  //     setTime(data.time);
  //     console.log("RECODRING TEST", data);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // no masterdata, same code

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
