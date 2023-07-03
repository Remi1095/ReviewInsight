import React from "react";
import BookCover from "./BookCover";
import { getBookLists, setBookLists, getBookById, getBookCover } from "../bookUtils";
import { Container, Row, Col, ListGroup } from 'react-bootstrap';

function Contribute() {

  const bookLists = getBookLists();

  return (
    <Container fluid>
      <Row>
        <Col xxl={3} lg={2} xs={1}></Col>
        <Col xxl={6} lg={8} xs={10}>
          {Object.keys(bookLists).map((key, index) => (
            <div className="mb-3">
              <h3>{key} ({bookLists[key].length})</h3>

              {bookLists[key].length > 0 && (
                <div className="d-flex book-list-box flex-wrap" style={{ width: "fit-content", backgroundColor: index % 2 === 0 ? 'var(--primary-2)' : 'var(--accent-1)' }}>
                {bookLists[key].map((bookid, index) => {
                  // Create a local variable
                  const book = getBookById(bookid);
              
                  return (
                    <div className="d-flex mx-3 my-3" key={bookid} style={{ width: "80px" }}>
                      <BookCover bgColor={book.fakeCover.bgColor} iconColor={book.fakeCover.iconColor} icon={book.fakeCover.icon} />
                    </div>
                  );
                })}
              </div>
              )}
            </div>
          ))}
        </Col>
        <Col xxl={3} lg={2} xs={1}></Col>
      </Row>
    </Container>
  );
}

export default Contribute;