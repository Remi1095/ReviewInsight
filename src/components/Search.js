import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBooks, getAverageScore, getBookCover } from '../bookUtils';
import RatingBox from './RatingBox';
import ShowMore from './ShowMore';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";

function BookCard({ book }) {


  const navigate = useNavigate();

  function toBookInfo() {
    navigate(`/book-info/${book.id}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  const bookCover = getBookCover(book);
  const avgScore = getAverageScore(book).toFixed(1);

  return (
    <div className="content-box" style={{ marginBottom: "20px", padding: "15px" }}>

      <div className="d-flex">

        <div style={{ flex: '0 0 16.666%', maxWidth: '16.666%' }}>
          <div className='pointer' onClick={toBookInfo}>
            <img className="border book" style={{ width: "90%" }} src={bookCover} alt="book1" />
          </div>
        </div>

        <div style={{ flex: '0 0 83.333%', maxWidth: '83.333%' }}>

          <div className='pointer' onClick={toBookInfo}>
            <h4 className="d-inline">{book.title}</h4>
            <p className="mb-2 fs-5">by {book.author} - published {book.published}</p>
          </div>

          <div className="d-flex">

            <div style={{ flex: '0 0 16.666%', maxWidth: '16.666%' }}>
              <div className='pointer' onClick={toBookInfo}>
                <RatingBox score={avgScore} textTag="h2" style={{ width: "70%" }} />
                <p className="mb-0 text-center" style={{ fontSize: 'smaller' }}>{book.reviews.length} reviews<br />{book.scores.length} scores</p>
              </div>
            </div>

            <div style={{ flex: '0 0 83.333%', maxWidth: '83.333%' }}>
              <ShowMore text={book.description} lines={4} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function ExpandMenu({ menuName, content, headerNumber, headerClass = "" }) {
  const [isExpanded, setExpanded] = useState(false);

  function toggleMenu() {
    setExpanded(!isExpanded);
  }

  const Header = `h${headerNumber}`;

  return (
    <div>
      {isExpanded ? (
        <div>
          <Header className={`${headerClass} pointer`} onClick={toggleMenu}>
            <span className="mx-2"><FontAwesomeIcon icon={faCaretDown} /></span>
            <span>{menuName}</span>
            <hr />
          </Header>
          {content}
        </div>
      ) : (
        <Header className={`${headerClass} pointer`} onClick={toggleMenu}>
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
        <ExpandMenu
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
        <ExpandMenu
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
        <ExpandMenu
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
        <ExpandMenu
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
        <ExpandMenu
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
        <ExpandMenu
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
        <ExpandMenu
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
        <ExpandMenu
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
      <ExpandMenu
        menuName="Sort"
        content={
          <div></div>
        }
        headerNumber="3"
        headerClass="pt-2"
      />

      <ExpandMenu
        menuName="Include"
        content={
          <Filters />
        }
        headerNumber="3"
        headerClass="pt-2"
      />

      <ExpandMenu
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