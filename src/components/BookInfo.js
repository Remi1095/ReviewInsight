import React from "react";
import { getBookById, getBookCover } from "../bookUtils";
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';


function BookInfo() {

  const { bookid } = useParams();
  const book = getBookById(bookid);
  const bookCover = getBookCover(book);
  return (
    <Container fluid>
      <Row>
        <Col className="border" xl={2} xs={0}></Col>
        <Col className="border d-flex justify-content-center" xl={3} xs={4}>
          <img className="border book" style={{ maxHeight:"50%" }} src={bookCover} alt="book1" />
        </Col>
        <Col className="border" xl={5} xs={8}>
          <p className="fs-5 text-black-50 mb-1">{book.series} #{book.volume}</p>
          <h2 className="mb-1">{book.title}</h2>
          <p className="fs-5 mb-2">{book.author}</p>
          <p className="fs-5">
            <strong className="me-2">Genres:</strong>
            {book.genres.map((genre, index) => (
              <u key={index} className="mx-2">{genre}</u>
            ))}
          </p>
          <p>{book.description}</p>
        </Col>
        <Col className="border" xl={2} xs={0}></Col>
      </Row>
    </Container>
  );
}

export default BookInfo;