import { Link, useParams } from "react-router-dom";
import Reviews from "../components/Reviews";
import URL from "../utils/backend-url";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

const AllReviews = () => {
  const { id } = useParams();

  const [reviewsData, setReviewsData] = useState({});
  const [pageNum, setPageNum] = useState(null);

  const getReviews = async (page = null) => {
    try {
      const response = await axios.get(`${URL}/api/reviews/${id}/`, {
        params: {
          page,
        },
      });
      setReviewsData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    getReviews(pageNum);
  }, [pageNum]);

  return (
    <>
    <Header/>
      <div className="container mx-auto">
        <section className="py-40">
          <div className="flex items-center mb-7">
            <Link className="btn" to={-1}>Go back</Link>
            <h1 className="text-3xl text-center flex-1">Отзывы клиентов</h1>
          </div>

          <Reviews
            reviewsArray={reviewsData.results}
            count={reviewsData.count}
            setPageNum={setPageNum}
            reviewsData={reviewsData}
          />
        </section>
      </div>
    </>
  );
};

// studio info

export default AllReviews;
