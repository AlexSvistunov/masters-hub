import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import URL from "../utils/backend-url";
import { useEffect, useState } from "react";
import CatalogCard from "../components/CatalogCard";
import useAuth from "../hooks/useAuth";
import "../App.css";
import Services from "../components/Services";
import WorksExample from "../components/WorksExample";
import { useDispatch } from "react-redux";
import Reviews from "../components/Reviews";

const MasterPage = () => {

  const { currentToken } = useAuth();
  const [masterData, setMasterData] = useState({});
  const [moreReviews, setMoreReviews] = useState(null);
  const [stepProps, setStepProps] = useState(null);
  const [isLeavingCommentOpen, setIsLeavingCommentOpen] = useState(false);
  const [step, setStep] = useState(0);

  console.log(masterData);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const averageRating = masterData?.reviews?.average_rating;
  const formattedRating =
    averageRating % 1 === 0 ? averageRating + ".0" : averageRating;

  const { id } = useParams();

  const fetchMasterProfile = async () => {
    const headers = {};
    if (currentToken) {
      headers.Authorization = `Token ${currentToken}`;
    }
    const response = await fetch(`${URL}/api/users/${id}/`, {
      method: "GET",
      headers,
    });
    const data = await response.json();
    console.log(data);
    setMasterData(data);
  };

  const showMoreReviews = async () => {
    const response = await fetch(`${URL}/api/reviews/${id}/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${currentToken}`,
      },
    });
    const data = await response.json();
    console.log(data);
    setMoreReviews(data);
  };

  const sendReview = async (textareaValue, amountStars) => {
    const obj = {
      rating_star: amountStars,
      user: 1,
      description: textareaValue,
    };

    if (!textareaValue) {
      return;
    }

    try {
      const response = await fetch(`${URL}/api/feedback/${id}/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${currentToken}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify(obj),
      });
      const data = await response.json();
      console.log(data);
      setMasterData({ ...masterData, reviews: data.reviews });
      setIsLeavingCommentOpen(false);
      console.log(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const recordingSlots = async (masterId) => {
    console.log(masterId);
    try {
      const response = await fetch(
        `${URL}/api/recording/${masterData.id}/${masterId}/`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${currentToken}`,
          },
        }
      );
      const data = await response.json();
      setStep(2);
      console.log("RECODRING TEST", data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchMasterProfile();
  }, []);

  return (
    <>
      <Header />
      {/* <EnrollModal step={step} setStep={setStep} /> */}
      <section className="py-28 tablet:py-40">
        {masterData && (
          <div className="container mx-auto">
            <div className="mb-5">
              <CatalogCard
                item={masterData}
                items={masterData}
                setItems={setMasterData}
                token={currentToken}
                keyword="profile"
              />
            </div>

            <div className="bg-base-200 p-5 rounded-2xl mb-5">
              <h3 className="text-3xl mb-3">Описание</h3>
              <pre className="whitespace-pre-wrap">
                <p className="max-w-full w-full">{masterData.description}</p>
              </pre>
            </div>

            <Services
              step={step}
              setStep={setStep}
              masterData={masterData}
              setStepProps={setStepProps}
              recordingSlots={recordingSlots}
              setMasterData={setMasterData}
            />

            <WorksExample masterData={masterData} />

            {masterData?.specialists?.length ? (
              <div className="bg-base-200 p-5 rounded-2xl mb-5">
                <div className="flex gap-2 items-center mb-5">
                  <h3 className="text-3xl">Специалисты</h3>
                  <span className="text-2xl text-primary">
                    {masterData?.specialists?.length}
                  </span>
                </div>

                <div className="flex flex-wrap tablet:flex-nowrap tablet:items-start items-center gap-4 my-4">
                  {masterData?.specialists?.map((specialist) => (
                    <Link
                      to={`/profile/${id}/specialist/${specialist.id}`}
                      className="flex flex-col items-center border border-gray-700 rounded-lg p-3 min-h-20 min-w-40 max-w-64"
                      key={specialist.id}
                    >
                      <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-500">
                        <img
                          className="w-full h-full"
                          src={`/backend/masterhub/static/${specialist.photo}`}
                        ></img>
                      </div>

                      <h3 className="text-xl mb-1">{specialist.name}</h3>
                      <span className=" text-gray-500 text-base text-center">
                        {specialist.job}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            <Reviews
              masterData={masterData}
              setIsLeavingCommentOpen={setIsLeavingCommentOpen}
              isLeavingCommentOpen={isLeavingCommentOpen}
              sendReview={sendReview}
              formattedRating={formattedRating}
              masterPage={true}
              reviewsArray={masterData?.reviews?.detail}
              count={masterData?.reviews?.count}
            />
          </div>
        )}
      </section>
    </>
  );
};

export default MasterPage;
