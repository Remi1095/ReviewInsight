import React from "react";
import bookCover from "../img/book-cover-placeholder.png"
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket, faDragon, faPuzzlePiece, faHeart, faPersonRunning, faSkull, faMasksTheater, faXmarksLines,
  faBookOpenReader, faLandmark, faFlask, faSackDollar, faBrain, faInfinity, faHandshakeSimple, faPalette
} from "@fortawesome/free-solid-svg-icons";
import BookCover from "./BookCover"

function Home() {
  return (
    <Container fluid>
      <h1 className="text-center mt-3">Find the right book</h1>
      <p className="text-center">Read and write reviews for the best and worst books available!</p>

      <Row className="mt-5">

        <Col xl={2}></Col>
        <Col xl={8}>

          <div className="genres-box mx-auto mb-5" style={{maxWidth:"900px"}}>

            <h3 className="ms-3 pt-2 mb-0">Fiction</h3>
            <hr className="mb-1" />

            <ListGroup horizontal className="genre-list justify-content-evenly">
              <ListGroup.Item> <span>Sci-Fi</span> <span><FontAwesomeIcon icon={faRocket} /></span> </ListGroup.Item>
              <ListGroup.Item> <span>Fantasy</span> <span><FontAwesomeIcon icon={faDragon} /></span> </ListGroup.Item>
              <ListGroup.Item> <span>Mystery</span> <span><FontAwesomeIcon icon={faPuzzlePiece} /></span> </ListGroup.Item>
              <ListGroup.Item> <span>Romance</span> <span><FontAwesomeIcon icon={faHeart} /></span> </ListGroup.Item>
            </ListGroup>
            <ListGroup horizontal className="genre-list justify-content-evenly">
              <ListGroup.Item> <span>Thriller</span> <span><FontAwesomeIcon icon={faPersonRunning} /></span> </ListGroup.Item>
              <ListGroup.Item> <span>Horror</span> <span><FontAwesomeIcon icon={faSkull} /></span> </ListGroup.Item>
              <ListGroup.Item> <span>Comedy</span> <span><FontAwesomeIcon icon={faMasksTheater} /></span> </ListGroup.Item>
              <ListGroup.Item> <span>Dystopia</span> <span><FontAwesomeIcon icon={faXmarksLines} /></span> </ListGroup.Item>
            </ListGroup>

            <h3 className="ms-3 pt-2 mb-0">Non-Fiction</h3>
            <hr className="mb-1" />

            <ListGroup horizontal className="genre-list justify-content-evenly">
              <ListGroup.Item> <span>Biography</span> <span><FontAwesomeIcon icon={faBookOpenReader} /></span> </ListGroup.Item>
              <ListGroup.Item> <span>History</span> <span><FontAwesomeIcon icon={faLandmark} /></span> </ListGroup.Item>
              <ListGroup.Item> <span>Science</span> <span><FontAwesomeIcon icon={faFlask} /></span> </ListGroup.Item>
              <ListGroup.Item> <span>Finance</span> <span><FontAwesomeIcon icon={faSackDollar} /></span> </ListGroup.Item>
            </ListGroup>
            <ListGroup horizontal className="genre-list justify-content-evenly pb-2">
              <ListGroup.Item> <span>Psychology</span> <span><FontAwesomeIcon icon={faBrain} /></span> </ListGroup.Item>
              <ListGroup.Item> <span>Philosophy</span> <span><FontAwesomeIcon icon={faInfinity} /></span> </ListGroup.Item>
              <ListGroup.Item> <span>Politics</span> <span><FontAwesomeIcon icon={faHandshakeSimple} /></span> </ListGroup.Item>
              <ListGroup.Item> <span>Art</span> <span><FontAwesomeIcon icon={faPalette} /></span> </ListGroup.Item>
            </ListGroup>

          </div>

          <h2 className="text-center mb-3">Recent contributions:</h2>

          <div className="book-list-box mx-auto mb-5" style={{backgroundColor:"var(--accent-1)", maxWidth:"900px"}}>
            <ListGroup horizontal className="justify-content-evenly">
              <ListGroup.Item> <img className="py-2" style={{ width: "100%" }} src={bookCover} alt="book1" /> </ListGroup.Item>
              <ListGroup.Item> <img className="py-2" style={{ width: "100%" }} src={bookCover} alt="book1" /> </ListGroup.Item>
              <ListGroup.Item> <img className="py-2" style={{ width: "100%" }} src={bookCover} alt="book1" /> </ListGroup.Item>
              <ListGroup.Item> <img className="py-2" style={{ width: "100%" }} src={bookCover} alt="book1" /> </ListGroup.Item>
              <ListGroup.Item> <img className="py-2" style={{ width: "100%" }} src={bookCover} alt="book1" /> </ListGroup.Item>
            </ListGroup>
          </div>

        </Col>
        <Col xl={2}></Col>
      </Row>
    </Container>
  );
}

export default Home;