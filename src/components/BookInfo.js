import React, { useEffect, useRef, useState } from "react";
import { getBookById, getAverageRating, getRatingArray, getBookLists, getLists, setLists } from "../bookUtils";
import { getUserRating, getUserReview, setUserRating } from "../userReviews";
import RatingBox from "./RatingBox";
import RatingSlider from "./RatingSlider";
import ShowMore from "./ShowMore";
import BookCover from "./BookCover";
import PaginationBar from "./PaginationBar";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList } from 'recharts';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';



function MyListsModal({ bookid, show, handleClose, handleConfirm }) {

  const allLists = getBookLists().lists;

  const [selectedLists, setSelectedLists] = useState(getLists(bookid));

  useEffect(() => {
    setSelectedLists(getLists(bookid));
  }, [show]);

  function handleListSelection(index) {
    if (selectedLists.includes(allLists[index])) {
      setSelectedLists(selectedLists.filter((list) => list !== allLists[index]));
    } else {
      setSelectedLists([...selectedLists, allLists[index]]);
    }
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
    >
      <Modal.Header>
        <Modal.Title className="fs-4">Save book to a list</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {allLists.map((list, index) => (
          <label key={index} className='d-block ms-3'>
            <input
              type="checkbox"
              checked={selectedLists.includes(list)}
              onChange={() => handleListSelection(index)}
              className='me-2'
            />
            {list}
          </label>
        ))}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-evenly">
        <button className="button-pill px-2 py-1" onClick={() => handleConfirm(selectedLists)}>
          Confirm selection
        </button>
      </Modal.Footer>
    </Modal>
  );
};


function Review({ review, style = {} }) {
  const [showMore, setShowMore] = useState(false);
  function toggleShowMore() {
    setShowMore(!showMore);
  }

  return (
    <>
      <div
        className="content-box mx-auto"
        style={{
          ...style,
          marginBottom: "15px",
          paddingTop: "4px",
          paddingBottom: "8px",
          paddingInline: "8px",
          backgroundColor: review.spoiler ? "var(--accent-2)" : "white"
        }}
      >

        <div className="d-flex justify-content-between mb-1" style={{ fontSize: 'smaller' }}>
          <span>{review.name}</span>
          <span className="text-black-50">{review.date}</span>
        </div>
        <div className="d-flex">
          <div style={{ flex: '0 0 12%', maxWidth: '12%' }}>
            <RatingBox rating={review.rating} textTag="h2" style={{ maxWidth: '80%' }} />
          </div>
          <div style={{ flex: '0 0 88%', maxWidth: '88%' }}>
            <div className="ms-1">
              <ShowMore text={review.review} lines={3} showMore={showMore} handleShowMore={toggleShowMore} />
            </div>
          </div>
        </div>
      </div>
    </>

  );

}


function ReviewBarChart({ book, className = "" }) {

  const ratings = getRatingArray(book);

  const bins = Array.from({ length: 10 }, (_, index) => ({
    bin: `${index + 1}`,
    value: ratings.filter((rating) => rating === index + 1).length,
  }));

  function formatYAxis(tick) { return `${(tick / ratings.length * 100).toFixed(0)}%` };

  return (
    <BarChart width={600} height={400} data={bins} className={className} margin={{ top: 20, right: 0, bottom: 0, left: 0 }}>
      <CartesianGrid strokeDasharray="8 8" />
      <XAxis dataKey="bin" stroke="black" />
      <YAxis tickFormatter={formatYAxis} stroke="black" />
      <Bar isAnimationActive={false} dataKey="value" fill="var(--accent-0)">
        <LabelList dataKey="value" position="top" fill="black" />
      </Bar>
    </BarChart>
  );
}


function BookInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookid } = useParams();
  const book = getBookById(bookid);
  const avgRating = getAverageRating(book).toFixed(1);
  const showingRef = useRef(null);

  const [showMore, setShowMore] = useState(false);
  const [showSpoilers, setShowSpoilers] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isChangedRating, setIsChangedRating] = useState(!!getUserRating(bookid))
  const [sliderRating, setSliderRating] = useState(getUserRating(bookid) ?? 5);
  const [filteredReviews, setFilteredReviews] = useState(book.reviews);
  const [reviewsDisplayed, setReviewsDisplayed] = useState([]);
  const [reviewIndexes, setReviewIndexes] = useState([0, 0]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get('page')) || 1;
    onPageChange(page);
  }, [location.search]);


  function onPageChange(page) {
    const startIndex = (page - 1) * 6;
    const endIndex = Math.min(page * 6, filteredReviews.length)
    setReviewsDisplayed(filteredReviews.slice(startIndex, endIndex))
    setReviewIndexes([startIndex, endIndex])
  }

  function toSearch(genre) {
    const queryParams = new URLSearchParams();
    queryParams.set('genres.include', [genre]);
    navigate(`/search?${queryParams.toString()}`);
  }

  function toggleShowMore() {
    setShowMore(!showMore);
  }

  function handleRateBook() {
    setUserRating(bookid, sliderRating);
    setIsChangedRating(true);
    toast(`Book rated ${sliderRating}/10`, {
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

  function handleSpoilersSelect(event) {
    setShowSpoilers(event.target.value === 'no');
    setFilteredReviews(book.reviews.filter((review) => event.target.value === 'no' || !review.spoiler));
    navigate(location.pathname);
    if (!location.search) {
      onPageChange(1);
    }
  }

  function showMyListsModal() {
    setShowModal(true);
  };

  function closeMyListsModal() {
    setShowModal(false);
  };

  function confirmListSelection(selectedLists) {
    setShowModal(false);
    setLists(bookid, selectedLists)
    toast('Book successfully saved', {
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

  function toReviewBook() {
    navigate(`/review-book/${book.id}`)
  }

  return (
    <Container fluid className="mb-5">
      <MyListsModal show={showModal} bookid={book.id} handleClose={closeMyListsModal} handleConfirm={confirmListSelection} />
      <Row className="pb-3" style={{ borderBottom: "1px solid lightgray" }}>

        <Col xxl={3} lg={1} xs={0}></Col>

        <Col className="text-center" xxl={2} lg={3} xs={4}>
          <div className="mx-auto text-center" style={{ width: "80%" }}>
            <BookCover bgColor={book.fakeCover.bgColor} iconColor={book.fakeCover.iconColor} icon={book.fakeCover.icon} />
          </div>
          <br />

          <RatingBox rating={avgRating} textTag="h1" style={{ width: "50%" }} />
          <p className="fs-5">{book.reviews.length} reviews - {book.ratings.length} ratings</p>

          <button
            className="button-pill fs-5 text-white light-bold mt-3 px-4"
            style={{ backgroundColor: "var(--primary-0)" }}
            onClick={showMyListsModal}>
            <span>Add to a list</span>
            <FontAwesomeIcon icon={faChevronDown} className="ps-2" />
          </button>

        </Col>

        <Col xxl={4} lg={7} xs={8}>
          {book.series !== null && <p className="fs-5 text-black-50 mb-1">{book.series} #{book.volume}</p>}
          <h2 className="mb-1">{book.title}</h2>
          <p className="fs-5 mb-2">{book.author}</p>

          <p className="fs-5">
            <strong className="me-2">Genres:</strong>
            {book.genres.map((genre, index) => (
              <u key={index} className="mx-2 pointer" onClick={() => toSearch(genre)}>{genre}</u>
            ))}
          </p>

          <ShowMore text={book.description} lines={5} showMore={showMore} handleShowMore={toggleShowMore} />

          <p className="mt-4 mb-0 light-bold">Book details:</p>
          <table className="w-100">
            <tbody>
              <tr>
                <td>Title</td>
                <td>{book.title}</td>
              </tr>
              {book.series !== null && <tr>
                <td>Series</td>
                <td>{book.series} (#{book.volume})</td>
              </tr>}
              <tr>
                <td>Language</td>
                <td>{book.language}</td>
              </tr>
              <tr>
                <td>Classification</td>
                <td>{book.classification}</td>
              </tr>
              <tr>
                <td>Number of words</td>
                <td>{book.words}</td>
              </tr>
              <tr>
                <td>Published</td>
                <td>{book.published} by {book.publisher}</td>
              </tr>
            </tbody>
          </table>
        </Col>

        <Col xxl={3} lg={1} xs={0}></Col>

      </Row >

      <Row>
        <Col xxl={3} lg={1} xs={0}></Col>
        <Col xxl={6} lg={10} xs={12}>

          <h3 className="text-center my-3">Ratings & Reviews</h3>
          <div className="d-flex justify-content-center text-center py-3" style={{ borderBottom: "1px solid lightgray" }}>
            <div className="me-5" style={{ width: "40%" }}>
              <RatingSlider rating={sliderRating} handleRating={setSliderRating} />
              <div className="mt-2">
                <u className="fs-5 pointer" onClick={handleRateBook}>{isChangedRating ? "Change your rating" : "Rate this book"}</u>
              </div>
            </div>
            <div style={{ width: "40%" }}>
              <button className="button-pill mt-3 fs-5 light-bold w-100" onClick={toReviewBook}>
                {!getUserReview(bookid) ? "Write a review" : "Change your review"}
              </button>
            </div>
          </div>

          <div className="warning-box mx-auto mt-3 px-4 py-2">
            <p className="light-bold text-center mb-2">Show spoilers in reviews:</p>
            <div className="text-center">
              <label className="me-4">
                <input
                  name="spoiler"
                  type="radio"
                  value="yes"
                  checked={showSpoilers}
                  onChange={handleSpoilersSelect}
                />
                <span className="ms-2">Yes</span>
              </label>
              <label>
                <input
                  name="spoiler"
                  type="radio"
                  value="no"
                  checked={!showSpoilers}
                  onChange={handleSpoilersSelect}
                />
                <span className="ms-2">No</span>
              </label>
            </div>
          </div>

          <div className="mx-auto square-box">
            <h5 className="text-center">User reviews</h5>
            <ReviewBarChart book={book} />
          </div>


          <h4 ref={showingRef} className="text-center fw-normal mb-3">Showing {reviewIndexes[0] + 1}-{reviewIndexes[1]} of {book.reviews.length} books reviews</h4>
          <PaginationBar totalPages={Math.ceil(filteredReviews.length / 6)} onPageChange={onPageChange} scrollTopRef={showingRef} />
          <div className="w-100">
            {reviewsDisplayed.map((review, index) => (
              <Review review={review} style={{ width: "90%" }} key={review.name} />
            ))}
          </div>
          <PaginationBar totalPages={Math.ceil(filteredReviews.length / 6)} onPageChange={onPageChange} scrollTopRef={showingRef} />
        </Col>
        <Col xxl={3} lg={1} xs={0}></Col>

      </Row>

    </Container >
  );
}

export default BookInfo;