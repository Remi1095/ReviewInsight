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
    <Container fluid className="mb-5">

      <Row>
        <Col xxl={3} lg={2} xs={1} />
        <Col xxl={6} lg={8} xs={10}>
          <h2 className="text-center light-bold">Review "{book.title}"</h2>

          <div className="mx-auto" style={{ width: "50%", minWidth: "320px" }}>
            <RatingSlider />
          </div>
          <div className="text-center mt-3">
            <textarea
              value={text}
              placeholder="Write your review here..."
              onChange={handleTextChange}
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
                  onChange={handleSpoilersChange}
                />
                <span className="ms-2">Yes</span>
              </label>

              <label>
                <input
                  name="spoiler"
                  type="radio"
                  value="no"
                  checked={!containsSpoilers}
                  onChange={handleSpoilersChange}
                />
                <span className="ms-2">No</span>
              </label>
            </div>
          </div>

          <button className="button-pill mt-4 fs-5 light-bold">Submit your review</button>
        </Col>
        <Col xxl={3} lg={2} xs={1} />
      </Row>

    </Container>
  );
}

export default ReviewBook;