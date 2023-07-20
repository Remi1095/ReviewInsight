import React from "react";
import BookCover from "./BookCover";
import { getBookLists, setBookLists, getBookById } from "../bookUtils";
import { Container, Row, Col, ListGroup } from 'react-bootstrap';

function Contribute() {

  const bookLists = getBookLists();

  return (
    <Container fluid className="mb-5">
      <Row>
        <Col xxl={1}></Col>
        <Col xxl={10}>
          <div className="d-flex flex-wrap justify-content-center">
            {Object.keys(bookLists).map((key, index) => (
              <div key={index} className="mx-3 mb-4">
                  <h3>{key} ({bookLists[key].length})</h3>

                  {bookLists[key].length > 0 && (
                    <div
                      className="d-flex content-box p-2 me-auto"
                      style={{
                        maxWidth: "90vw",
                        width: "fit-content",
                        backgroundColor: 'var(--primary-2)',
                        borderColor: "gray",
                        overflow: "scroll"
                      }}
                    >
                      {bookLists[key].map((bookid, index) => {
                        const book = getBookById(bookid);
                        return (
                          <div key={index} className="p-1" style={{ width:"90px"}}>
                            <BookCover bgColor={book.fakeCover.bgColor} iconColor={book.fakeCover.iconColor} icon={book.fakeCover.icon} />
                          </div>
                        );
                      })}
                    </div>
                  )}
              </div>
            ))}
          </div>
        </Col>
        <Col xxl={1}></Col>
      </Row>
    </Container >
  );
}

export default Contribute;