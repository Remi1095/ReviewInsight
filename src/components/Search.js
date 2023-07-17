import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAllBooks, getAverageRating, getBookCover, getBookValues, getAllAuthors } from '../bookUtils';
import _ from 'lodash'
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

function iterateObject(obj, callbacks = {}, ...args) {
  const { onValue, onFinal } = callbacks;

  for (const key in obj) {
    iterateObjectRecursive(obj[key], onValue, [key], ...args);
  }
  if (typeof onFinal === 'function') {
    return onFinal(obj, ...args);
  }
}

function iterateObjectRecursive(obj, onValue, keyPath = [], ...args) {

  if (typeof obj === 'object' && !Array.isArray(obj) && obj !== null) {
    for (const key in obj) {
      iterateObjectRecursive(obj[key], onValue, [...keyPath, key], ...args);
    }
  } else if (typeof onValue === 'function') {
    onValue(obj, keyPath, ...args);
  }

}


function BookCard({ book }) {


  const navigate = useNavigate();

  function toBookInfo() {
    navigate(`/book-info/${book.id}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  const bookCover = getBookCover(book);
  const avgRating = getAverageRating(book).toFixed(1);

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
                <RatingBox rating={avgRating} textTag="h2" style={{ width: "70%" }} />
                <p className="mb-0 text-center" style={{ fontSize: 'smaller' }}>{book.reviews.length} reviews<br />{book.ratings.length} ratings</p>
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


function ExpandMenu({ menuName, content, headerNumber, headerClass = "", initalExpanded = false }) {
  const [isExpanded, setExpanded] = useState(initalExpanded);

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
      <h6 className='mb-1'>Rating:</h6>
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


function SortAndFilters({ parameters, defaultParameters, setParameters, setURLParameters}) {

  function setExpandedMenus() {
    const callbacks = {
      onValue: (value, keyPath, [expandedMenus, defaultParameters]) => {
        const defaultValue = _.get(defaultParameters, keyPath);
  
        if (typeof value === 'string' || typeof value === 'number') {
          const isDefault = value === defaultValue;
  
          if (expandedMenus.hasOwnProperty(keyPath[0])) {
            expandedMenus[keyPath[0]] = expandedMenus[keyPath[0]] || !isDefault;
          } else {
            expandedMenus[keyPath[0]] = !isDefault;
          }
  
        } else if (Array.isArray(value)) {
          const defaultValue = keyPath.reduce((obj, key) => obj?.[key], defaultParameters);
          const isDefault = value.length === defaultValue.length && value.every((element) => defaultValue.includes(element));
  
          if (expandedMenus.hasOwnProperty(keyPath[0])) {
            expandedMenus[keyPath[0]] = expandedMenus[keyPath[0]] || !isDefault;
          } else {
            expandedMenus[keyPath[0]] = !isDefault;
          }
  
        } else if (typeof onUnknown === 'function') {
          console.log('Object not recognized');
        }
      },
      onFinal: (value, [expandedMenus, defaultParameters]) => {
        return expandedMenus;
      }
    };
    return iterateObject(parameters, callbacks, [{}, defaultParameters]);

  }

  const expandedMenus = setExpandedMenus();

  return (
    <div className="filters-box">
      <div className='text-center mb-1 mt-2'>
        <u
          className="border border-dark px-2 py-1 pointer"
          style={{ backgroundColor: "var(--primary-1)" }}
          onClick={() => setURLParameters()}
        >
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
        initalExpanded={expandedMenus.sort}
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
                initalExpanded={expandedMenus.genres}
              />
            </div>
            <div className="mx-3 mt-2">
              <ExpandMenu
                menuName="Classification"
                content={
                  <ClassificationFilter parameters={parameters} setParameters={setParameters} />
                }
                headerNumber="5"
                initalExpanded={expandedMenus.classifications}
              />
            </div>
            <div className="mx-3 mt-2">
              <ExpandMenu
                menuName="Author"
                content={
                  <AuthorFilter parameters={parameters} setParameters={setParameters} />
                }
                headerNumber="5"
                initalExpanded={expandedMenus.authors}
              />
            </div>
            <div className="mx-3 mt-2">
              <ExpandMenu
                menuName="Title"
                content={
                  <TitleFilter parameters={parameters} setParameters={setParameters} />
                }
                headerNumber="5"
                initalExpanded={expandedMenus.title}
              />
            </div>
            <div className="mx-3 mt-2">
              <ExpandMenu
                menuName="Language"
                content={
                  <LanguageFilter parameters={parameters} setParameters={setParameters} />
                }
                headerNumber="5"
                initalExpanded={expandedMenus.language}
              />
            </div>
            <div className="mx-3 mt-2">
              <ExpandMenu
                menuName="Number of words"
                content={
                  <WordsFilter parameters={parameters} setParameters={setParameters} />
                }
                headerNumber="5"
                initalExpanded={expandedMenus.words}
              />
            </div>
            <div className="mx-3 mt-2">
              <ExpandMenu
                menuName="Reviews"
                content={
                  <ReviewsFilter parameters={parameters} setParameters={setParameters} />
                }
                headerNumber="5"
                initalExpanded={expandedMenus.reviews}
              />
            </div>
            <div className="mx-3 mt-2">
              <ExpandMenu
                menuName="Date published"
                content={
                  <DateFilter parameters={parameters} setParameters={setParameters} />
                }
                headerNumber="5"
                initalExpanded={expandedMenus.date}
              />
            </div>
          </div>
        }
        headerNumber="3"
        headerClass="pt-2"
        initalExpanded={Object.entries(expandedMenus).some(([key, value]) => key !== 'sort' && value === true)}
      />

    </div>
  )

}


function Search() {

  const navigate = useNavigate();
  const location = useLocation();
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
  const [filteredBooks, setFilteredBooks] = useState(getFilteredBooks(getURLParameters()));
  const [booksDisplayed, setBooksDisplayed] = useState([]);
  const [bookIndexes, setBookIndexes] = useState([0, 0]);

  useEffect(() => {
    setFilteredBooks(getFilteredBooks(getURLParameters()));
  }, []);

  function getURLParameters() {
    const callbacks = {
      onValue: (value, keyPath, [newParams, queryParams]) => {
        const newValue = queryParams.get(keyPath.join('.'));
        
        if (newValue !== null) {
          if (typeof value === 'string') {
            _.set(newParams, keyPath, newValue);
          } else if (typeof value === 'number') {
            _.set(newParams, keyPath, parseInt(newValue));
          } else if (Array.isArray(value)) {
            _.set(newParams, keyPath, newValue.split(','));
          } else {
            console.log('Object not recognised');
          }
        }
      },
      onFinal: (obj, [newParams, queryParams]) => {
        return newParams;
      }
    }
    return iterateObject(_.cloneDeep(defaultParameters), callbacks, [_.cloneDeep(defaultParameters), new URLSearchParams(location.search)]);
  }

  function setURLParameters() {
    const callbacks = {
      onValue: (value, keyPath, [defaultParameters, queryParams]) => {
        const defaultValue = _.get(defaultParameters, keyPath);
  
        if (typeof value === 'string' || typeof value === 'number') {
          if (value !== defaultValue) {
            queryParams.append(keyPath.join('.'), value);
          }
  
        } else if (Array.isArray(value)) {
          if (value.length !== defaultValue.length || !value.every((element, index) => element === defaultValue[index])) {
            queryParams.append(keyPath.join('.'), value.join(','));
          }
  
        } else {
          console.log('Object not recognised');
        }
      },
      onFinal: (obj, [defaultParameters, queryParams]) => {
        navigate(`${location.pathname}?${queryParams.toString()}`);
        setFilteredBooks(getFilteredBooks(obj))
      }
    }
    iterateObject(parameters, callbacks, [defaultParameters, new URLSearchParams()])
  }

  function getFilteredBooks(params) {
    const newFilteredBooks = getAllBooks().filter(
      (book) => params.genres.include.every((genre) => book.genres.includes(genre)) &&
        params.genres.exclude.every((genre) => !book.genres.includes(genre)) &&
        (params.classifications.length === 0 || params.classifications.includes(book.classification)) &&
        (params.authors.include.length === 0 || params.authors.include.includes(book.author)) &&
        (params.authors.exclude.length === 0 || !params.authors.exclude.includes(book.author)) &&
        book.title.toLowerCase().includes(params.title.toLowerCase()) &&
        (params.language === "" || book.language === params.language) &&
        book.words >= params.words.min && book.words <= params.words.max &&
        getAverageRating(book) >= params.reviews.rating &&
        book.ratings.length + book.reviews.length >= params.reviews.sample
        
    );
    return newFilteredBooks;
  }

  function onPageChange(page) {
    const startIndex = (page - 1) * 6;
    const endIndex = Math.min(page * 6, filteredBooks.length)
    setBooksDisplayed(filteredBooks.slice(startIndex, endIndex))
    setBookIndexes([startIndex, endIndex])
  }



  return (
    <Container fluid>
      <h3 className="text-center fw-normal mb-3">Showing {bookIndexes[0] + 1}-{bookIndexes[1]} of {filteredBooks.length} books</h3>
      <PaginationBar totalPages={Math.ceil(filteredBooks.length / 6)} onPageChange={onPageChange} />

      <Row>
        <Col xxl={2} xs={0}></Col>
        <Col xxl={6} xs={8}>
          {booksDisplayed.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </Col>
        <Col xxl={2} xs={4}>
          <SortAndFilters
            parameters={parameters}
            defaultParameters={defaultParameters}
            setParameters={setParameters}
            setURLParameters={setURLParameters}
          />
        </Col>
        <Col className=" " xxl={2} xs={0}></Col>

      </Row>

      <PaginationBar totalPages={Math.ceil(filteredBooks.length / 6)} onPageChange={onPageChange} />

    </Container >
  );
}

export default Search;