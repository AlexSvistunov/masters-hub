import { useParams } from "react-router-dom";
import Reviews from "../components/Reviews";
import URL from "../utils/backend-url";
import { useEffect, useState } from "react";
import axios from "axios";

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
    <div className="container mx-auto">
      <section className="py-10">
        <h1 className="text-3xl text-center mb-5">Отзывы клиентов</h1>
        <Reviews
          reviewsArray={reviewsData.results}
          count={reviewsData.count}
          setPageNum={setPageNum}
          reviewsData={reviewsData}
        />
      </section>
    </div>
  );
};

// studio info
// back arrow

export default AllReviews;
