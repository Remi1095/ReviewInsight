import React from "react";
import { useNavigate } from "react-router";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket, faDragon, faPuzzlePiece, faHeart, faPersonRunning, faSkull, faMasksTheater, faXmarksLines,
  faBookOpenReader, faLandmark, faFlask, faSackDollar, faBrain, faInfinity, faHandshakeSimple, faPalette
} from "@fortawesome/free-solid-svg-icons";
import BookCover from "./BookCover"
import { getAllBooks } from "../bookUtils";
import { useTranslation } from "react-i18next";


function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  function fiveRandomBooks() {
    const storedData = sessionStorage.getItem("fiveRandomBooks");

    if (storedData === null) {
      const books = getAllBooks();
      for (let i = books.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [books[i], books[j]] = [books[j], books[i]];
      }
      const fiveRandomBooksArray = books.slice(0, 5);
      sessionStorage.setItem("fiveRandomBooks", JSON.stringify(fiveRandomBooksArray));
      return fiveRandomBooksArray;
    } else {
      return JSON.parse(storedData);
    }
  }


  function toSearch(genre) {
    const queryParams = new URLSearchParams();
    queryParams.set('genres.include', [genre]);
    navigate(`/search?${queryParams.toString()}`);
  }

  function toBookInfo(bookid) {
    navigate(`/book-info/${bookid}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }


  return (
    <Container fluid className="mb-5">
      <h1 className="text-center mt-3">{t('findTheRightBook')}</h1>
      <p className="text-center">{t('readAndWriteReviews')}</p>

      <Row className="mt-5">

        <Col xl={2}></Col>
        <Col xl={8}>

          <div className="genres-box mx-auto mb-5" style={{ maxWidth: "900px" }}>

            <h3 className="ms-3 pt-2 mb-0">Fiction</h3>
            <hr className="mb-1" />

            <ListGroup horizontal className="genre-list justify-content-evenly">
              <ListGroup.Item onClick={() => toSearch("Sci-Fi")}>
                <span>{t('sci-fi')}</span> <span><FontAwesomeIcon icon={faRocket} /></span>
              </ListGroup.Item>
              <ListGroup.Item onClick={() => toSearch("Fantasy")}>
                <span>{t('fantasy')}</span> <span><FontAwesomeIcon icon={faDragon} /></span>
              </ListGroup.Item>
              <ListGroup.Item onClick={() => toSearch("Mystery")}>
                <span>{t('mystery')}</span> <span><FontAwesomeIcon icon={faPuzzlePiece} /></span>
              </ListGroup.Item>
              <ListGroup.Item onClick={() => toSearch("Romance")}>
                <span>{t('romance')}</span> <span><FontAwesomeIcon icon={faHeart} /></span>
              </ListGroup.Item>
            </ListGroup>

            <ListGroup horizontal className="genre-list justify-content-evenly">
              <ListGroup.Item onClick={() => toSearch("Thriller")}>
                <span>{t('thriller')}</span> <span><FontAwesomeIcon icon={faPersonRunning} /></span>
              </ListGroup.Item>
              <ListGroup.Item onClick={() => toSearch("Horror")}>
                <span>{t('horror')}</span> <span><FontAwesomeIcon icon={faSkull} /></span>
              </ListGroup.Item>
              <ListGroup.Item onClick={() => toSearch("Comedy")}>
                <span>{t('comedy')}</span> <span><FontAwesomeIcon icon={faMasksTheater} /></span>
              </ListGroup.Item>
              <ListGroup.Item onClick={() => toSearch("Dystopia")}>
                <span>{t('dystopia')}</span> <span><FontAwesomeIcon icon={faXmarksLines} /></span>
              </ListGroup.Item>
            </ListGroup>

            <h3 className="ms-3 pt-2 mb-0">Non-Fiction</h3>
            <hr className="mb-1" />

            <ListGroup horizontal className="genre-list justify-content-evenly">
              <ListGroup.Item onClick={() => toSearch("Biography")}>
                <span>{t('biography')}</span> <span><FontAwesomeIcon icon={faBookOpenReader} /></span>
              </ListGroup.Item>
              <ListGroup.Item onClick={() => toSearch("History")}>
                <span>{t('history')}</span> <span><FontAwesomeIcon icon={faLandmark} /></span>
              </ListGroup.Item>
              <ListGroup.Item onClick={() => toSearch("Science")}>
                <span>{t('science')}</span> <span><FontAwesomeIcon icon={faFlask} /></span>
              </ListGroup.Item>
              <ListGroup.Item onClick={() => toSearch("Finance")}>
                <span>{t('finance')}</span> <span><FontAwesomeIcon icon={faSackDollar} /></span>
              </ListGroup.Item>
            </ListGroup>

            <ListGroup horizontal className="genre-list justify-content-evenly pb-2">
              <ListGroup.Item onClick={() => toSearch("Psychology")}>
                <span>{t('psychology')}</span> <span><FontAwesomeIcon icon={faBrain} /></span>
              </ListGroup.Item>
              <ListGroup.Item onClick={() => toSearch("Philosophy")}>
                <span>{t('philosophy')}</span> <span><FontAwesomeIcon icon={faInfinity} /></span>
              </ListGroup.Item>
              <ListGroup.Item onClick={() => toSearch("Politics")}>
                <span>{t('politics')}</span> <span><FontAwesomeIcon icon={faHandshakeSimple} /></span>
              </ListGroup.Item>
              <ListGroup.Item onClick={() => toSearch("Art")}>
                <span>{t('art')}</span> <span><FontAwesomeIcon icon={faPalette} /></span>
              </ListGroup.Item>
            </ListGroup>

          </div>

          <h2 className="text-center mb-3">{t('recentContributions')}</h2>

          <div
            className="d-flex flex-wrap content-box p-2 mx-auto"
            style={{
              width: "100%",
              maxWidth: "900px",
              backgroundColor: 'var(--accent-2)',
              borderColor: "gray"
            }}
          >
            {fiveRandomBooks().map((book, index) => {
              return (
                <div key={index} className="p-1 pointer" style={{ flexBasis: "20%" }} onClick={() => toBookInfo(book.id)}>
                  <BookCover bgColor={book.fakeCover.bgColor} iconColor={book.fakeCover.iconColor} icon={book.fakeCover.icon} />
                </div>
              );
            })}
          </div>

        </Col>
        <Col xl={2}></Col>
      </Row>
    </Container>
  );
}

export default Home;