import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAllBooks, getAverageScore, getBookCover, getBookValues, getAllAuthors } from '../bookUtils';
import cloneDeep from 'lodash.clonedeep';
import RatingBox from './RatingBox';
import ShowMore from './ShowMore';
import BookCover from './BookCover';
import PaginationBar from './PaginationBar';
import AppDropdown from './AppDropdown';
import Autosuggest from './Autosuggest';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import RatingSlider from './RatingSlider';

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


function GenresFilter({ parameters, setParameters }) {

  const genres = getBookValues().genres;

  function handleIncludeGenre(genres) {
    const newParameters = { ...parameters };
    newParameters.genres.include = genres;
    setParameters(newParameters);
  }

  function handleExcludeGenre(genres) {
    const newParameters = { ...parameters };
    newParameters.genres.exclude = genres;
    setParameters(newParameters);
  }

  return (
    <div>
      <h6 className='mb-1'>Include:</h6>
      < Autosuggest suggestions={genres} handleElements={handleIncludeGenre} placeholder={"Type genres..."} initalElements={parameters.genres.include} />
      <h6 className='mt-2 mb-1'>Exclude:</h6>
      < Autosuggest suggestions={genres} handleElements={handleExcludeGenre} placeholder={"Type genres..."} initalElements={parameters.genres.exclude} />
    </div>
  )
}

function ClassificationFilter({ parameters, setParameters }) {

  const classifications = getBookValues().classifications;

  function handleClassificationSelect(classification) {
    const newParameters = { ...parameters };
    const index = newParameters.classifications.indexOf(classification);

    if (index !== -1) {
      newParameters.classifications.splice(index, 1);
    } else {
      newParameters.classifications.push(classification);
    }

    setParameters(newParameters);
  }

  return (
    <div>
      {classifications.map(classification => (
        <label key={classification} className='d-block ms-3'>
          <input
            type="checkbox"
            checked={parameters.classifications.includes(classification)}
            onChange={() => handleClassificationSelect(classification)}
            className='me-2'
          />
          {classification}
        </label>
      ))}
    </div>
  )
}

function AuthorFilter({ parameters, setParameters }) {

  const authors = getAllAuthors();

  function handleIncludeAuthor(authors) {
    const newParameters = { ...parameters };
    newParameters.authors.include = authors;
    setParameters(newParameters);
  }

  function handleExcludeAuthor(authors) {
    const newParameters = { ...parameters };
    newParameters.authors.exclude = authors;
    setParameters(newParameters);
  }


  return (
    <div>
      <h6 className='mb-1'>Include:</h6>
      < Autosuggest suggestions={authors} handleElements={handleIncludeAuthor} placeholder={"Author names..."} initalElements={parameters.authors.include} />
      <h6 className='mt-2 mb-1'>Exclude:</h6>
      < Autosuggest suggestions={authors} handleElements={handleExcludeAuthor} placeholder={"Author names..."} initalElements={parameters.authors.exclude} />
    </div>
  )

}

function TitleFilter({ parameters, setParameters }) {

  function handleTitleChange(event) {
    const newParameters = { ...parameters };
    newParameters.title = event.target.value;
    setParameters(newParameters);
  }

  return (
    <div className="mx-auto px-2">
      <input
        type='text'
        value={parameters.title}
        onChange={handleTitleChange}
        placeholder={'Book title...'}
        className='my-1'
        style={{ width: "100%" }}
      />
    </div>
  )
}

function LanguageFilter({ parameters, setParameters }) {

  const languages = getBookValues().languages;

  function handleLanguageSelect(language) {
    const newParameters = { ...parameters };
    newParameters.language = language;
    setParameters(newParameters);
  }

  return (
    <div className="ms-2">
      <AppDropdown
        emptyValue="Select language"
        initialValue={parameters.language}
        items={languages}
        handleItemSelect={handleLanguageSelect}
      />
    </div>
  )

}

function WordsFilter({ parameters, setParameters }) {

  function handleMinWordsChange(event) {
    const newParameters = { ...parameters };
    const value = event.target.value.replace(/\D/g, '');
    if (value === '') {
      newParameters.words.min = 0;
    } else {
      newParameters.words.min = parseInt(value);
    }
    setParameters(newParameters);
  }

  function handleMaxWordsChange(event) {
    const newParameters = { ...parameters };
    const value = event.target.value.replace(/\D/g, '');
    if (value === '') {
      newParameters.words.max = Infinity;
    } else {
      newParameters.words.max = parseInt(value);
    }
    setParameters(newParameters);
  }

  function parseNumber(number) {
    const digits = number.toString().split('').reverse();
    const formattedNumber = [];

    for (let i = 0; i < digits.length; i++) {
      if (i > 0 && i % 3 === 0) {
        formattedNumber.push(' ');
      }
      formattedNumber.push(digits[i]);
    }

    return formattedNumber.reverse().join('');
  }

  return (
    <div className="mx-auto px-2">
      <h6 className='mb-1'>Minimum:</h6>
      <input
        type='text'
        value={(parameters.words.min !== 0) ? parseNumber(parameters.words.min) : ''}
        onChange={handleMinWordsChange}
        placeholder={'10 000'}
        className='my-1'
        style={{ width: "100%" }}
      />
      <h6 className='mt-2 mb-1'>Maximum:</h6>
      <input
        type='text'
        value={(parameters.words.max !== Infinity) ? parseNumber(parameters.words.max) : ''}
        onChange={handleMaxWordsChange}
        placeholder={'500 000'}
        className='my-1'
        style={{ width: "100%" }}
      />
    </div>
  )
}

function ReviewsFilter({ parameters, setParameters }) {
  function handleRatingSelect(rating) {
    const newParameters = { ...parameters };
    newParameters.reviews.rating = rating;
    setParameters(newParameters);
  }

  function handleSampleChange(event) {
    const newParameters = { ...parameters };
    const value = event.target.value.replace(/\D/g, '');
    if (value === '') {
      newParameters.reviews.sample = 0;
    } else {
      newParameters.reviews.sample = parseInt(value);
    }
    setParameters(newParameters);
  }

  return (
    <div className="mx-auto px-2">
      <h6 className='mb-1'>Score:</h6>
      <RatingSlider handleRating={handleRatingSelect} initialRating={parameters.reviews.rating} />
      <h6 className='mt-2 mb-1'>Sample size:</h6>
      <input
        type='text'
        value={(parameters.reviews.sample !== 0) ? parameters.reviews.sample.toString() : ''}
        onChange={handleSampleChange}
        placeholder={'100'}
        className='my-1'
        style={{ width: "100%" }}
      />
    </div>
  )

}

function DateFilter({ parameters, setParameters }) {

  function handleMinDateChange(event) {
    const newParameters = { ...parameters };
    newParameters.date.min = event.target.value;
    setParameters(newParameters);
  }

  function handleMaxDateChange(event) {
    const newParameters = { ...parameters };
    newParameters.date.max = event.target.value;
    setParameters(newParameters);
  }

  return (
    <div className="mx-auto px-2">
      <h6 className='mb-1'>Minimum:</h6>
      <input
        type='date'
        value={parameters.date.min}
        onChange={handleMinDateChange}
        className='my-1'
        style={{ width: "100%" }}
      />
      <h6 className='mt-2 mb-1'>Maximum:</h6>
      <input
        type='date'
        value={parameters.date.max}
        onChange={handleMaxDateChange}
        className='my-1'
        style={{ width: "100%" }}
      />
    </div>
  )
}


function SortAndFilters({ parameters, setParameters, setURLParameters }) {

  return (
    <div className="filters-box">
      <div className='text-center mb-1 mt-2'>
        <u className="border border-dark px-2 py-1 pointer" style={{ backgroundColor: "var(--primary-1)" }} onClick={() => setURLParameters()}>
          Apply Filters and Sort
        </u>
      </div>

      <ExpandMenu
        menuName="Sort"
        content={
          <p>Unfinished</p>
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
                  <GenresFilter parameters={parameters} setParameters={setParameters} />
                }
                headerNumber="5"
              />
            </div>
            <div className="mx-3 mt-2">
              <ExpandMenu
                menuName="Classification"
                content={
                  <ClassificationFilter parameters={parameters} setParameters={setParameters} />
                }
                headerNumber="5"
              />
            </div>
            <div className="mx-3 mt-2">
              <ExpandMenu
                menuName="Author"
                content={
                  <AuthorFilter parameters={parameters} setParameters={setParameters} />
                }
                headerNumber="5"
              />
            </div>
            <div className="mx-3 mt-2">
              <ExpandMenu
                menuName="Title"
                content={
                  <TitleFilter parameters={parameters} setParameters={setParameters} />
                }
                headerNumber="5"
              />
            </div>
            <div className="mx-3 mt-2">
              <ExpandMenu
                menuName="Language"
                content={
                  <LanguageFilter parameters={parameters} setParameters={setParameters} />
                }
                headerNumber="5"
              />
            </div>
            <div className="mx-3 mt-2">
              <ExpandMenu
                menuName="Number of words"
                content={
                  <WordsFilter parameters={parameters} setParameters={setParameters} />
                }
                headerNumber="5"
              />
            </div>
            <div className="mx-3 mt-2">
              <ExpandMenu
                menuName="Reviews"
                content={
                  <ReviewsFilter parameters={parameters} setParameters={setParameters} />
                }
                headerNumber="5"
              />
            </div>
            <div className="mx-3 mt-2">
              <ExpandMenu
                menuName="Date published"
                content={
                  <DateFilter parameters={parameters} setParameters={setParameters} />
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

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const defaultParameters = {
    sort: '',
    genres: {
      include: [],
      exclude: []
    },
    classifications: [],
    authors: {
      include: [],
      exclude: []
    },
    title: '',
    language: '',
    words: {
      min: 0,
      max: Infinity
    },
    reviews: {
      rating: 1,
      sample: 0
    },
    date: {
      min: '',
      max: ''
    }
  }

  const [parameters, setParameters] = useState(getURLParameters());
  console.log('initial');
  console.log(parameters);

  const [bookIndexes, setBookIndexes] = useState([0, getAllBooks().length]);
  const [booksDisplayed, setBooksDisplayed] = useState(getAllBooks());

  function setURLParameters1() {
    console.log("set")
    console.log(parameters);

    const queryParams = new URLSearchParams();

    if (parameters.sort !== '') {
      queryParams.append('sort', parameters.sort);
    }
    if (parameters.genres.include.length > 0) {
      queryParams.append('genres.include', parameters.genres.include.join(','));
    }
    if (parameters.genres.exclude.length > 0) {
      queryParams.append('genres.exclude', parameters.genres.exclude.join(','));
    }
    if (parameters.classifications.length > 0) {
      queryParams.append('classifications', parameters.classifications.join(','));
    }
    if (parameters.authors.include.length > 0) {
      queryParams.append('authors.include', parameters.authors.include.join(','));
    }
    if (parameters.authors.exclude.length > 0) {
      queryParams.append('authors.exclude', parameters.authors.exclude.join(','));
    }
    if (parameters.title !== '') {
      queryParams.append('title', parameters.title);
    }
    if (parameters.language !== '') {
      queryParams.append('language', parameters.language);
    }
    if (parameters.words.min !== 0) {
      queryParams.append('words.min', parameters.words.min);
    }
    if (parameters.words.max !== Infinity) {
      queryParams.append('words.max', parameters.words.max);
    }
    if (parameters.reviews.rating !== 1) {
      queryParams.append('reviews.rating', parameters.reviews.rating);
    }
    if (parameters.reviews.sample !== 0) {
      queryParams.append('reviews.sample', parameters.reviews.sample);
    }
    if (parameters.date.min !== '') {
      queryParams.append('date.min', parameters.date.min);
    }
    if (parameters.date.max !== '') {
      queryParams.append('date.max', parameters.date.max);
    }

    navigate(`${location.pathname}?${queryParams.toString()}`)
  }

  function setURLParameters(obj = parameters, initialObj = defaultParameters, keyPath = []) {

    if (keyPath.length === 0) {
      obj = cloneDeep(obj);
      for (const param of searchParams.keys()) {
        searchParams.delete(param);
      }
      console.log(searchParams.toString())
      console.log(obj)
    }

    for (const key in obj) {
      const currentKeyPath = [...keyPath, key];
      
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && obj[key] !== null) {
        setURLParameters(obj[key], initialObj[key], currentKeyPath);

      } else if (typeof obj[key] === 'string' || typeof obj[key] === 'number') {
        if (obj[key] !== initialObj[key]) {
          searchParams.append(currentKeyPath.join('.'), obj[key]);
        }

      } else if (Array.isArray(obj[key])) {
        if (obj[key].length !== initialObj[key].length || !obj[key].every((element, index) => element === initialObj[key][index])) {
          searchParams.append(currentKeyPath.join('.'), obj[key].join(','));
        }

      } else {
      }
      
    }

    if (keyPath.length === 0) {
      navigate(`${location.pathname}?${searchParams.toString()}`)
    }
  }

  function getURLParameters(obj = defaultParameters, initialObj = defaultParameters, keyPath = []) {

    if (keyPath.length === 0) {
      obj = cloneDeep(obj);
    }

    for (const key in obj) {
      const currentKeyPath = [...keyPath, key];
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && obj[key] !== null) {
        getURLParameters(obj[key], initialObj[key], currentKeyPath);

      } else if (typeof obj[key] === 'string') {
        obj[key] = searchParams.get(currentKeyPath.join('.')) ?? initialObj[key];

      } else if (typeof obj[key] === 'number') {
        obj[key] = parseInt(searchParams.get(currentKeyPath.join('.'))) || initialObj[key];

      } else if (Array.isArray(obj[key])) {
        obj[key] = searchParams.get(currentKeyPath.join('.'))?.split(',') || initialObj[key];

      } else {
        console.log('Object not recognised');
        console.log(currentKeyPath);
        console.log(obj[key]);
      }
      
    }

    if (keyPath.length === 0) {
      return obj;
    }
  }

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
          <SortAndFilters parameters={parameters} setParameters={setParameters} setURLParameters={setURLParameters} />
        </Col>
        <Col className=" " xxl={2} xs={0}></Col>

      </Row>

      <PaginationBar totalPages={Math.ceil(getAllBooks().length / 6)} onPageChange={onPageChange} />

    </Container >
  );
}

export default Search;