import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBooks, getAverageScore, getBookCover, getBookValues } from '../bookUtils';
import RatingBox from './RatingBox';
import ShowMore from './ShowMore';
import BookCover from './BookCover';
import PaginationBar from './PaginationBar';
import AppDropdown from './AppDropdown';
import Autosuggest from './Autosuggest';
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
          <div className='pointer' onClick={toBookInfo} style={{ width: "90%" }}>
            <BookCover bgColor={book.fakeCover.bgColor} iconColor={book.fakeCover.iconColor} icon={book.fakeCover.icon} />
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


function GenresFilter() {

  const genres = getBookValues().genres;

  function handleGenreSelect(genres) {
    console.log(genres)
  }

  return (
    <div>
      <h6 className='mb-1'>Include:</h6>
      < Autosuggest suggestions={genres} handleElements={handleGenreSelect} placeholder={"Type genres..."}/>
      <h6 className='mt-2 mb-1'>Exlude:</h6>
      < Autosuggest suggestions={genres} handleElements={handleGenreSelect} placeholder={"Type genres..."}/>
    </div>
  )
}

function ClassificationFilter() {

}

function AuthorFilter() {
  const genres = getBookValues().genres;

  function handleGenreSelect(genres) {
    console.log(genres)
  }

  return (
    <div>
      <h6 className='mb-1'>Include:</h6>
      < Autosuggest suggestions={genres} handleElements={handleGenreSelect} placeholder={"Type genres..."}/>
      <h6 className='mt-2 mb-1'>Exlude:</h6>
      < Autosuggest suggestions={genres} handleElements={handleGenreSelect} placeholder={"Type genres..."}/>
    </div>
  )

}

function TitleFilter() {

}

function LanguageFilter() {

}

function WordsFilter() {

}

function ReviewsFilter() {

}

function DateFilter() {

}


function SortAndFilters() {

  return (
    <div className="filters-box">
      <ExpandMenu
        menuName="Sort"
        content={
          <GenresFilter />
        }
        headerNumber="3"
        headerClass="pt-2"
      />

      <ExpandMenu
        menuName="Filters"
        content={
          <div>
            <div className="mx-3 mt-2">
              <ExpandMenu
                menuName="Genres"
                content={
                  <GenresFilter />
                }
                headerNumber="5"
              />
            </div>
            <div className="mx-3 mt-2">
              <ExpandMenu
                menuName="Classification"
                content={
                  <GenresFilter />
                }
                headerNumber="5"
              />
            </div>
            <div className="mx-3 mt-2">
              <ExpandMenu
                menuName="Author"
                content={
                  <GenresFilter />
                }
                headerNumber="5"
              />
            </div>
            <div className="mx-3 mt-2">
              <ExpandMenu
                menuName="Title"
                content={
                  <GenresFilter />
                }
                headerNumber="5"
              />
            </div>
            <div className="mx-3 mt-2">
              <ExpandMenu
                menuName="Language"
                content={
                  <GenresFilter />
                }
                headerNumber="5"
              />
            </div>
            <div className="mx-3 mt-2">
              <ExpandMenu
                menuName="Number of words"
                content={
                  <GenresFilter />
                }
                headerNumber="5"
              />
            </div>
            <div className="mx-3 mt-2">
              <ExpandMenu
                menuName="Reviews"
                content={
                  <GenresFilter />
                }
                headerNumber="5"
              />
            </div>
            <div className="mx-3 mt-2">
              <ExpandMenu
                menuName="Date published"
                content={
                  <GenresFilter />
                }
                headerNumber="5"
              />
            </div>
          </div>
        }
        headerNumber="3"
        headerClass="pt-2"
      />

    </div>
  )

}


function Search() {

  const [bookIndexes, setBookIndexes] = useState([0, getAllBooks().length])
  const [booksDisplayed, setBooksDisplayed] = useState(getAllBooks());


  function onPageChange(page) {
    const startIndex = (page - 1) * 6;
    const endIndex = Math.min(page * 6, getAllBooks().length)
    setBooksDisplayed(getAllBooks().slice(startIndex, endIndex))
    setBookIndexes([startIndex, endIndex])
  }

  return (
    <Container fluid>
      <h3 className="text-center fw-normal mb-3">Showing {bookIndexes[0] + 1}-{bookIndexes[1]} of {getAllBooks().length} books</h3>
      <PaginationBar totalPages={Math.ceil(getAllBooks().length / 6)} onPageChange={onPageChange} />

      <Row>
        <Col xxl={2} xs={0}></Col>
        <Col xxl={6} xs={8}>
          {booksDisplayed.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </Col>
        <Col xxl={2} xs={4}>
          <SortAndFilters />
        </Col>
        <Col className=" " xxl={2} xs={0}></Col>

      </Row>

      <PaginationBar totalPages={Math.ceil(getAllBooks().length / 6)} onPageChange={onPageChange} />

    </Container >
  );
}

export default Search;