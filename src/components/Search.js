import React from "react";
import jsonData from '../data.json';
import BookCard from "./BookCard";
import SortAndFilters from "./SortAndFilters";
import { Container, Row, Col } from 'react-bootstrap';


function Search() {
  return (
    <Container fluid>
      <h3 className="text-center fw-normal mb-3">Showing 1-6 of 600 books</h3>

      <Row>
        <Col xxl={2} xs={0}></Col>
        <Col xxl={6} xs={8}>
          {jsonData.books.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </Col>
        <Col className=" " xxl={2} xs={4}>
          <SortAndFilters />
        </Col>
        <Col className=" " xxl={2} xs={0}></Col>

      </Row>

    </Container >
  );
}

export default Search;