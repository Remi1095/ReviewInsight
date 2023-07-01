import React, { useState } from "react";
import { useParams } from "react-router-dom";
import RatingSlider from "./RatingSlider";
import { getBookById } from "../bookUtils";
import { Container, Row, Col } from 'react-bootstrap';

function ReviewBook() {
  const [text, setText] = useState("");
  const [containsSpoilers, setContainsSpoilers] = useState(true);

  function handleTextChange(event) {
    setText(event.target.value);
  }

  function handleSpoilersChange(event) {
    setContainsSpoilers(event.target.value === 'yes');
  }


  const { bookid } = useParams();
  const book = getBookById(bookid);
  return (
    <Container fluid>

      <Row>
        <Col className="border" xxl={3} lg={2} xs={1} />
        <Col className="border" xxl={6} lg={8} xs={10}>
          <h2 className="text-center mb-3 light-bold">Review "{book.title}"</h2>

          <div className="mx-auto" style={{width:"50%", minWidth:"320px"}}>
            <RatingSlider />
          </div>

          <div className="content-box mt-3">
            <textarea
              value={text}
              placeholder="Write your review here..."
              onChange={handleTextChange}
              rows={20}
              className="no-style px-2 py-1"
              style={{ whiteSpace: 'pre' }}
            />
          </div>

          <div className="warning-box mx-auto mt-3 px-3 py-2">
            <p className="light-bold text-center mb-2">My review contains spoilers!</p>
            <div className="text-center">
            <label className="mx-2">
              <input
                type="radio"
                value="yes"
                checked={containsSpoilers}
                onChange={handleSpoilersChange}
              />
              Yes
            </label>
            <label className="mx-2">
              <input
                type="radio"
                value="no"
                checked={!containsSpoilers}
                onChange={handleSpoilersChange}
              />
              No
            </label>
          </div>
          </div>

          <button className="button-pill mt-3 fs-5 light-bold">Submit your review</button>
        </Col>
        <Col className="border" xxl={3} lg={2} xs={1} />
      </Row>

    </Container>
  );
}

export default ReviewBook;