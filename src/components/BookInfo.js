import React, { useState } from "react";
import { getBookById, getBookCover, getAverageScore, getScoreArray } from "../bookUtils";
import RatingBox from "./RatingBox";
import RatingSlider from "./RatingSlider";
import ShowMore from "./ShowMore";
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList } from 'recharts';

function Review({ review, style = {} }) {

  return (
    <div className="content-box mx-auto" style={{ ...style, marginBottom: "15px", paddingTop: "4px", paddingBottom: "8px", paddingInline: "8px" }}>

      <div className="d-flex justify-content-between mb-2" style={{ fontSize: 'smaller' }}>
        <span>{review.name}</span>
        <span className="text-black-50">{review.date}</span>
      </div>
      <div className="d-flex">
        <div style={{ flex: '0 0 12%', maxWidth: '12%' }}>
          <RatingBox score={review.score} textTag="h2" style={{ maxWidth: '80%' }} />
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

  const scores = getScoreArray(book);

  const bins = Array.from({ length: 10 }, (_, index) => ({
    bin: `${index + 1}`,
    value: scores.filter((score) => score === index + 1).length,
  }));

  function formatYAxis(tick) { return `${(tick / scores.length * 100).toFixed(0)}%` };

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

  const [containsSpoilers, setContainsSpoilers] = useState(true);

  function handleSpoilersChange(event) {
    setContainsSpoilers(event.target.value === 'yes');
  }

  const navigate = useNavigate();
  const { bookid } = useParams();
  const book = getBookById(bookid);
  const bookCover = getBookCover(book);
  const avgScore = getAverageScore(book).toFixed(1);

  function toReviewBook() {
    navigate(`/review-book/${book.id}`)
  }

  return (
    <Container fluid>
      <Row className="pb-3" style={{ borderBottom: "1px solid lightgray" }}>

        <Col xxl={3} lg={1} xs={0}></Col>

        <Col className="text-center" xxl={2} lg={3} xs={4}>
          <div className="mx-auto text-center" style={{ width: "80%" }}>
            <img className="border" style={{ width: "100%" }} src={bookCover} alt="book1" />
          </div>
          <br />

          <RatingBox score={avgScore} textTag="h1" style={{ width: "50%" }} />
          <p className="fs-5">{book.reviews.length} reviews - {book.scores.length} scores</p>
          <RatingSlider />
          <u>Rate this book</u>

          <button className="button-pill mt-3 fs-5 light-bold" onClick={toReviewBook}>Write a review</button>

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
          <div className="warning-box mx-auto mt-3 px-4 py-2">
            <p className="light-bold text-center mb-2">Show spoilers in reviews:</p>
            <div className="text-center">
              <input
                name="spoiler"
                type="radio"
                value="yes"
                checked={containsSpoilers}
                onChange={handleSpoilersChange}
              />
              <label className="ms-1 me-4">Yes</label>
              <input
                name="spoiler"
                type="radio"
                value="no"
                checked={!containsSpoilers}
                onChange={handleSpoilersChange}
              />
              <label className="ms-1">No</label>
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