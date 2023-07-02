import React from "react";
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
                <div className="book-list-box" style={{ width: "fit-content", backgroundColor: index % 2 === 0 ? 'var(--primary-2)' : 'var(--accent-1)' }}>

                  <ListGroup horizontal className="flex-wrap justify-content-center" style={{ height: "100%", flexShrink: "0" }}>

                    {bookLists[key].map((bookid, index) => (
                      <ListGroup.Item key={bookid} className="d-flex justify-content-center align-items-center px-2 py-2">
                        <img
                          style={{ maxHeight: "100%", width: "80px" }}
                          src={getBookCover(getBookById(bookid))}
                          alt={bookid}
                        />
                      </ListGroup.Item>
                    ))}

                  </ListGroup>

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