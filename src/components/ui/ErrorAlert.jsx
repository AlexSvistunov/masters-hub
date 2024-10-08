import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideAlert } from "../../store/slices/errorAlert";

const ErrorAlert = ({ seconds }) => {
  const isShown = useSelector(
    (state) => state?.errorAlert?.alertError?.alertState
  );

  const text = useSelector(
    (state) => state?.errorAlert?.alertError?.message
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isShown) {
      setTimeout(() => {
        dispatch(hideAlert());
      }, seconds);
    }
  }, [isShown]);

  return (
    isShown && (
      <div
        role="alert"
        className="alert alert-error fixed top-4 right-4 max-w-96 z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg "
          className="h-6 w-6 shrink-0 stroke-current hidden tablet:block"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{text}</span>
      </div>
    )
  );
};

export default ErrorAlert;
