import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import  URL  from "/src/utils/backend-url";
import Services from "../components/Services";
import Header from "../components/Header";

const SpecialistPage = () => {
  const [specialistData, setSpecialistData] = useState({});

  const [step, setStep] = useState(2)

  const { id, specId } = useParams();
  
  const getSpecialistData = async () => {
    const response = await fetch(`${URL}/api/specialist/${specId}/`);
    const data = await response.json();
    setSpecialistData(data);
  };

  useEffect(() => {
    getSpecialistData();
    window.scrollTo(0, 0)
  }, []);

  return (
    <>
    <Header/>
    <section className="py-40">
      <div className="container mx-auto">
        <div className="flex gap-8 mb-5">
          <img
            src={`/backend/masterhub/static${specialistData?.photo}`}
            width={340}
            height={340}
            className="rounded-lg"
          ></img>

          <div className="bg-base-200 p-8 rounded-2xl flex-auto">
           <div className="mb-4">
           <h3 className="text-3xl">{specialistData?.name}</h3>
           <span className="text-gray-500 text-xl">{specialistData?.job}</span>
           </div>
            <p className="text-lg">{specialistData?.description}</p>
          </div>
        </div>

        <Services masterData={specialistData} step={step} setStep={setStep} />
      </div>
    </section></>
  );
};

export default SpecialistPage;
