import React, { useState } from "react";
import { getBookById, getBookCover, getAverageScore } from "../bookUtils";
import RatingBox from "./RatingBox";
import RatingSlider from "./RatingSlider";
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';


function BookInfo() {

  const [showMore, setShowMore] = useState(false);

  function toggleDescription() {
    setShowMore(!showMore);
  };

  const { bookid } = useParams();
  const book = getBookById(bookid);
  const bookCover = getBookCover(book);
  const avgScore = getAverageScore(book.scores, book.reviews).toFixed(1);
  return (
    <Container fluid>
      <Row>

        <Col className="border" xl={2} xs={0}></Col>

        <Col className="border text-center" xl={2} xs={4}>
          <div className="mx-auto text-center" style={{ width: "80%" }}>
            <img className="border" style={{ width: "100%" }} src={bookCover} alt="book1" />
          </div>
          <br />
          <RatingBox score={avgScore} textTag="h1" style={{width: "50%"}}/>
          <p className="fs-5">{book.reviews.length} reviews - {book.scores.length} scores</p>
          <RatingSlider />

        </Col>

        <Col className="border" xl={6} xs={8}>
          <p className="fs-5 text-black-50 mb-1">{book.series} #{book.volume}</p>
          <h2 className="mb-1">{book.title}</h2>
          <p className="fs-5 mb-2">{book.author}</p>
          <p className="fs-5">
            <strong className="me-2">Genres:</strong>
            {book.genres.map((genre, index) => (
              <u key={index} className="mx-2">{genre}</u>
            ))}
          </p>
          <p
            className="ms-1 mb-0"
            style={{ maxHeight: showMore ? 'none' : '145px', overflow: 'hidden' }}
          >
            {book.description}
          </p>
          {book.description.length > 100 && (
            <strong onClick={toggleDescription}><u>
              {showMore ? 'Show Less' : 'Show More'}
            </u></strong>
          )}
        </Col>

        <Col className="border" xl={2} xs={0}></Col>

      </Row>
    </Container >
  );
}

export default BookInfo;