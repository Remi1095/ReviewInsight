import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import RatingSlider from "./RatingSlider";
import { setUserReview, getUserReview, setUserRating, getUserRating } from "../userReviews";
import { getBookById } from "../bookUtils";
import { Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

function ReviewBook() {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookid } = useParams();
  const book = getBookById(bookid);

  const [sliderRating, setSliderRating] = useState(getUserRating(bookid) ?? 5);
  const [text, setText] = useState(getUserReview(bookid)?.review ?? "");
  const [containsSpoilers, setContainsSpoilers] = useState(getUserReview(bookid)?.spoilers ?? true);
  const [isChangedReview, setIsChangedReview] = useState(!!getUserReview(bookid));

  useEffect(() => {
    setSliderRating(getUserRating(bookid) ?? 5);
    setText(getUserReview(bookid)?.review ?? "");
    setContainsSpoilers(getUserReview(bookid)?.spoilers ?? true);
    setIsChangedReview(!!getUserReview(bookid));
  }, [location]);


  function handleSubmitReview() {
    if (text.length > 0) {
      setUserRating(bookid, sliderRating)
      setUserReview(bookid, text, containsSpoilers);
      navigate(`/book-info/${bookid}`);
      window.scrollTo({ top: 0, behavior: 'instant' });
      toast('Review successfully submitted', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });

    } else {
      toast('Please write a review', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }
    
  }


  return (
    <Container fluid className="mb-5">
      <Row>
        <Col xxl={3} lg={2} xs={1} />
        <Col xxl={6} lg={8} xs={10}>
          <h2 className="text-center light-bold">Review "{book.title}"</h2>

          <div className="mx-auto" style={{ width: "50%", minWidth: "320px" }}>
            <RatingSlider rating={sliderRating} handleRating={setSliderRating} />
          </div>
          <div className="text-center mt-3">
            <textarea
              value={text}
              placeholder="Write your review here..."
              onChange={(event) => setText(event.target.value)}
              rows={10}
              className="px-2 py-2 mx-auto content-box"
              style={{ width: "80%" }}
            />
          </div>
            

          <div className="warning-box mx-auto mt-4 px-3 py-2">
            <p className="light-bold text-center mb-2">My review contains spoilers!</p>
            <div className="text-center">
              <label className="me-4">
                <input
                  name="spoiler"
                  type="radio"
                  value="yes"
                  checked={containsSpoilers}
                  onChange={() => setContainsSpoilers(true)}
                />
                <span className="ms-2">Yes</span>
              </label>

              <label>
                <input
                  name="spoiler"
                  type="radio"
                  value="no"
                  checked={!containsSpoilers}
                  onChange={() => setContainsSpoilers(false)}
                />
                <span className="ms-2">No</span>
              </label>
            </div>
          </div>

          <button className="button-pill mt-4 fs-5 light-bold" onClick={handleSubmitReview}>
            {isChangedReview ? "Change your review" : "Submit your review"}
          </button>
        </Col>
        <Col xxl={3} lg={2} xs={1} />
      </Row>

    </Container>
  );
}

export default ReviewBook;