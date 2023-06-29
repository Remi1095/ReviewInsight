import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { averageScore, getAllBooks, getBookCover } from '../bookUtils';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";

function BookCard({ book }) {

  const navigate = useNavigate();

  function handleClick() {
    navigate(`/book-info/${book.id}`)
  }

  const bookCover = getBookCover(book);
  const avgScore = averageScore(book.scores, book.reviews).toFixed(1);

  return (
    <div className="book-box" onClick={handleClick}>

      <div style={{ flex: '0 0 16.666%', maxWidth: '16.666%' }}>
        <img className="border book" style={{ maxWidth:"90%" }} src={bookCover} alt="book1" />
      </div>

      <div style={{ flex: '0 0 83.333%', maxWidth: '83.333%' }}>

        <h4 className="d-inline">{book.title}</h4>
        <p className="mb-2 fs-5">by {book.author} - published {book.published}</p>

        <div className="d-flex">

          <div style={{ flex: '0 0 16.666%', maxWidth: '16.666%' }}>
            <div className="rating-box mx-auto">
              <div className="rating-fill" style={{ height: `${avgScore * 10}%` }}></div>
              <h2 className="rating-text">{avgScore}</h2>
            </div>
            <p className="mb-0 text-center" style={{ fontSize: 'smaller' }}>200 reviews<br />2000 scores</p>
          </div>

          <div style={{ flex: '0 0 83.333%', maxWidth: '83.333%' }}>
            <p className="overflow-auto ms-1 mb-0" style={{ maxBlockSize: '120px'}}>{book.description}</p>
          </div>

        </div>
      </div>
    </div>
  );
}

function ToggleFilter({ menuName, content, headerNumber, headerClass = "" }) {
  const [isExpanded, setExpanded] = useState(false);

  function toggleMenu() {
      setExpanded(!isExpanded);
  }

  const Header = `h${headerNumber}`;

  return (
      <div>
          {isExpanded ? (
              <div>
                  <Header className={headerClass} onClick={toggleMenu}>
                      <span className="mx-2"><FontAwesomeIcon icon={faCaretDown} /></span>
                      <span>{menuName}</span>
                      <hr />
                  </Header>
                  {content}
              </div>
          ) : (
              <Header className={headerClass} onClick={toggleMenu}>
                  <span className="mx-2"><FontAwesomeIcon icon={faCaretRight} /></span>
                  <span>{menuName}</span>
                  <hr />
              </Header>
          )}
      </div>
  );
}


function Filters() {
  return (
      <div>
          <div className="mx-3 mt-2">
              <ToggleFilter
                  menuName="Genres"
                  content={
                      <ul>
                          <li>Menu 2 Item 1</li>
                          <li>Menu 2 Item 2</li>
                          <li>Menu 2 Item 3</li>
                      </ul>
                  }
                  headerNumber="5"
              />
          </div>
          <div className="mx-3 mt-2">
              <ToggleFilter
                  menuName="Classification"
                  content={
                      <ul>
                          <li>Menu 2 Item 1</li>
                          <li>Menu 2 Item 2</li>
                          <li>Menu 2 Item 3</li>
                      </ul>
                  }
                  headerNumber="5"
              />
          </div>
          <div className="mx-3 mt-2">
              <ToggleFilter
                  menuName="Author"
                  content={
                      <ul>
                          <li>Menu 2 Item 1</li>
                          <li>Menu 2 Item 2</li>
                          <li>Menu 2 Item 3</li>
                      </ul>
                  }
                  headerNumber="5"
              />
          </div>
          <div className="mx-3 mt-2">
              <ToggleFilter
                  menuName="Title"
                  content={
                      <ul>
                          <li>Menu 2 Item 1</li>
                          <li>Menu 2 Item 2</li>
                          <li>Menu 2 Item 3</li>
                      </ul>
                  }
                  headerNumber="5"
              />
          </div>
          <div className="mx-3 mt-2">
              <ToggleFilter
                  menuName="Language"
                  content={
                      <ul>
                          <li>Menu 2 Item 1</li>
                          <li>Menu 2 Item 2</li>
                          <li>Menu 2 Item 3</li>
                      </ul>
                  }
                  headerNumber="5"
              />
          </div>
          <div className="mx-3 mt-2">
              <ToggleFilter
                  menuName="Number of words"
                  content={
                      <ul>
                          <li>Menu 2 Item 1</li>
                          <li>Menu 2 Item 2</li>
                          <li>Menu 2 Item 3</li>
                      </ul>
                  }
                  headerNumber="5"
              />
          </div>
          <div className="mx-3 mt-2">
              <ToggleFilter
                  menuName="Reviews"
                  content={
                      <ul>
                          <li>Menu 2 Item 1</li>
                          <li>Menu 2 Item 2</li>
                          <li>Menu 2 Item 3</li>
                      </ul>
                  }
                  headerNumber="5"
              />
          </div>
          <div className="mx-3 mt-2">
              <ToggleFilter
                  menuName="Date published"
                  content={
                      <ul>
                          <li>Menu 2 Item 1</li>
                          <li>Menu 2 Item 2</li>
                          <li>Menu 2 Item 3</li>
                      </ul>
                  }
                  headerNumber="5"
              />
          </div>
      </div>
  )
}


function SortAndFilters() {

  return (
      <div className="filters-box">
          <ToggleFilter
              menuName="Sort"
              content={
                  <div></div>
              }
              headerNumber="3"
              headerClass="pt-2"
          />

          <ToggleFilter
              menuName="Include"
              content={
                  <Filters />
              }
              headerNumber="3"
              headerClass="pt-2"
          />

          <ToggleFilter
              menuName="Exclude"
              content={
                  <Filters />
              }
              headerNumber="3"
              headerClass="pt-2"
          />

      </div>
  )

}


function Search() {
  return (
    <Container fluid>
      <h3 className="text-center fw-normal mb-3">Showing 1-6 of 600 books</h3>

      <Row>
        <Col xxl={2} xs={0}></Col>
        <Col xxl={6} xs={8}>
          {getAllBooks().map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </Col>
        <Col xxl={2} xs={4}>
          <SortAndFilters />
        </Col>
        <Col className=" " xxl={2} xs={0}></Col>

      </Row>

    </Container >
  );
}

export default Search;