import React, { useState } from "react";
import { getBookById, getBookCover, getAverageRating, getRatingArray, getBookLists, setBookLists } from "../bookUtils";
import RatingBox from "./RatingBox";
import RatingSlider from "./RatingSlider";
import ShowMore from "./ShowMore";
import AppDropdown from "./AppDropdown"
import BookCover from "./BookCover";
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList } from 'recharts';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-bootstrap/Modal';

function MyListsModal({ show, handleClose, bookid }) {

  const bookLists = getBookLists();
  const maxDropdowns = Object.keys(bookLists).length;
  
  const [availableLists, setAvailableLists] = useState(Object.keys(bookLists));

  const [selectedLists, setSelectedLists] = useState(Array.from({ length: 1 }, () => ""));

  function handleBookLists(list, index) {
    const newAvailableLists = availableLists.filter(item => item !== list);
    if (selectedLists[index] !== "") {
      newAvailableLists.push(selectedLists[index]);
    }
    setAvailableLists(newAvailableLists);

    const newSelectedLists = [...selectedLists];
    newSelectedLists[index] = list;
    setSelectedLists(newSelectedLists);


  }

  function addDropdown() {
    const newSelectedLists = [...selectedLists, ""];
    setSelectedLists(newSelectedLists);
  }

  function removeDropdown() {
    const newSelectedLists = [...selectedLists];
    const lastList = newSelectedLists.pop();
    if (lastList !== "") {
      const newAvailableLists = [...availableLists, lastList];
      setAvailableLists(newAvailableLists);
    }
    setSelectedLists(newSelectedLists);

  }

  function handleSelection() {
    selectedLists.forEach(list => {
      if (list !== "") {
        bookLists[list].push(bookid);
      }
    });
    setBookLists(bookLists)
    handleClose();
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add this book to a list</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        {selectedLists.map((list, index) => (
          <AppDropdown
            key={index}
            className="d-inline mx-2"
            emptyValue="Select list"
            initialValue={selectedLists[index]}
            items={availableLists}
            handleItemSelect={handleBookLists}
            index={index}
          />
        ))}
        {selectedLists.length > 1 && (
          <button
            className="ms-2 px-2 py-1 button-pill d-inline"
            style={{ backgroundColor: "lightgray" }}
            onClick={removeDropdown}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
        )}
        {selectedLists.length < maxDropdowns && (
          <button
            className="ms-2 px-2 py-1 button-pill d-inline"
            style={{ backgroundColor: "lightgray" }}
            onClick={addDropdown}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        )}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-evenly">

        <button className="button-pill" onClick={handleSelection}>
          Confirm selection
        </button>
      </Modal.Footer>
    </Modal>
  );
};


function Review({ review, style = {} }) {

  return (
    <div className="content-box mx-auto" style={{ ...style, marginBottom: "15px", paddingTop: "4px", paddingBottom: "8px", paddingInline: "8px" }}>

      <div className="d-flex justify-content-between mb-2" style={{ fontSize: 'smaller' }}>
        <span>{review.name}</span>
        <span className="text-black-50">{review.date}</span>
      </div>
      <div className="d-flex">
        <div style={{ flex: '0 0 12%', maxWidth: '12%' }}>
          <RatingBox rating={review.rating} textTag="h2" style={{ maxWidth: '80%' }} />
        </div>
        <div style={{ flex: '0 0 88%', maxWidth: '88%' }}>
          <div className="ms-1">
            <ShowMore text={review.review} lines={3} />
          </div>
        </div>
      </div>
    </div>
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
      <Bar dataKey="value" fill="var(--accent-0)">
        <LabelList dataKey="value" position="top" fill="black" />
      </Bar>
    </BarChart>
  );
}


function BookInfo() {

  const [spoilers, setSpoilers] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { bookid } = useParams();
  const book = getBookById(bookid);
  const bookCover = getBookCover(book);
  const avgRating = getAverageRating(book).toFixed(1);

  function handleSpoilersSelect(event) {
    setSpoilers(event.target.value === 'yes');
  }

  function showMyListsModal() {
    setShowModal(true);
  };

  function closeMyListsModal() {
    setShowModal(false);
  };

  function toReviewBook() {
    navigate(`/review-book/${book.id}`)
  }

  return (
    <Container fluid>
      <MyListsModal show={showModal} handleClose={closeMyListsModal} bookid={book.id} />
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
              <u key={index} className="mx-2">{genre}</u>
            ))}
          </p>

          <ShowMore text={book.description} lines={5} />

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
              <RatingSlider />
              <u>Rate this book</u>
            </div>
            <div style={{ width: "40%" }}>
              <button className="button-pill mt-3 fs-5 light-bold w-100" onClick={toReviewBook}>Write a review</button>
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
                  checked={spoilers}
                  onChange={handleSpoilersSelect}
                />
                <span className="ms-2">Yes</span>
              </label>
              <label>
                <input
                  name="spoiler"
                  type="radio"
                  value="no"
                  checked={!spoilers}
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


          <h4 className="text-center fw-normal mb-3">Showing 1-6 of {book.reviews.length} reviews</h4>
          <div className="w-100">
            {book.reviews.map((review, index) => (
              <Review review={review} style={{ width: "90%" }} key={index} />
            ))}
          </div>
        </Col>
        <Col xxl={3} lg={1} xs={0}></Col>

      </Row>

    </Container >
  );
}

export default BookInfo;