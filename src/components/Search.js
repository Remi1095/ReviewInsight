import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAllBooks, getAverageRating, getBookValues, getAllAuthors } from '../bookUtils';
import { iterateObject } from '../iterateObject';
import _ from 'lodash'
import RatingBox from './RatingBox';
import ShowMore from './ShowMore';
import BookCover from './BookCover';
import PaginationBar from './PaginationBar';
import AppDropdown from './AppDropdown';
import AutoSuggest from './AutoSuggest';
import RatingSlider from './RatingSlider';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";

function BookCard({ book }) {


  const navigate = useNavigate();

  function toBookInfo() {
    navigate(`/book-info/${book.id}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  const avgRating = getAverageRating(book).toFixed(1);

  return (
    <div className="content-box d-flex" style={{ marginBottom: "20px", padding: "15px" }}>

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


function Sort({ parameters, setParameters }) {
  const sortOptions = ['Rating', 'Reviews', 'Date', 'Title', 'Author', 'Words', 'Random'];

  function handleSortSelect(type) {
    const newParameters = _.cloneDeep(parameters);
    newParameters.sort.type = type;
    setParameters(newParameters);
  }

  function handleDirectionSelect(event) {
    const newParameters = _.cloneDeep(parameters);
    newParameters.sort.ascending = event.target.value === "ascending";
    setParameters(newParameters);
  }

  return (
    <div className="ms-2">
      <div className='text-center'>
        <h6 className='d-inline me-2'>Sort by:</h6>
        <AppDropdown
          emptyValue="Sort by..."
          selectedItem={parameters.sort.type}
          items={sortOptions}
          handleItemSelect={handleSortSelect}
          hasReset={false}
          className='d-inline'
        />
      </div>

      <div className="mt-2 text-center">
        <label className="me-3">
          <input
            name="direction"
            type="radio"
            value="ascending"
            checked={parameters.sort.ascending}
            onChange={handleDirectionSelect}
          />
          <span className="ms-2">Ascending</span>
        </label>
        <label>
          <input
            name="direction"
            type="radio"
            value="descending"
            checked={!parameters.sort.ascending}
            onChange={handleDirectionSelect}
          />
          <span className="ms-2">Descending</span>
        </label>
      </div>
    </div>
  )

}

function GenresFilter({ parameters, setParameters }) {

  const genres = getBookValues().genres;

  function handleIncludeGenre(genres) {
    const newParameters = _.cloneDeep(parameters);
    newParameters.genres.include = genres;
    setParameters(newParameters);
  }

  function handleExcludeGenre(genres) {
    const newParameters = _.cloneDeep(parameters);
    newParameters.genres.exclude = genres;
    setParameters(newParameters);
  }

  return (
    <div className="mx-auto px-2">
      <h6 className='mb-1'>Include:</h6>
      < AutoSuggest elements={parameters.genres.include} handleElements={handleIncludeGenre} suggestions={genres} placeholder={"Type genres..."} />
      <h6 className='mt-2 mb-1'>Exclude:</h6>
      < AutoSuggest elements={parameters.genres.exclude} handleElements={handleExcludeGenre} suggestions={genres} placeholder={"Type genres..."} />
    </div>
  )
}

function ClassificationFilter({ parameters, setParameters }) {

  const classifications = getBookValues().classifications;

  function handleClassificationSelect(classification) {
    const newParameters = _.cloneDeep(parameters);
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
    const newParameters = _.cloneDeep(parameters);
    newParameters.authors.include = authors;
    setParameters(newParameters);
  }

  function handleExcludeAuthor(authors) {
    const newParameters = _.cloneDeep(parameters);
    newParameters.authors.exclude = authors;
    setParameters(newParameters);
  }


  return (
    <div className="mx-auto px-2">

      <h6 className='mb-1'>Include:</h6>
      < AutoSuggest elements={parameters.authors.include} handleElements={handleIncludeAuthor} suggestions={authors} placeholder={"Author names..."} />
      <h6 className='mt-2 mb-1'>Exclude:</h6>
      < AutoSuggest elements={parameters.authors.exclude} handleElements={handleExcludeAuthor} suggestions={authors} placeholder={"Author names..."} />
    </div>
  )

}

function TitleFilter({ parameters, setParameters }) {

  function handleTitleChange(event) {
    const newParameters = _.cloneDeep(parameters);
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
    const newParameters = _.cloneDeep(parameters);
    newParameters.language = language;
    setParameters(newParameters);
  }

  return (
    <div className="ms-2">
      <AppDropdown
        emptyValue="Select language"
        selectedItem={parameters.language}
        items={languages}
        handleItemSelect={handleLanguageSelect}
      />
    </div>
  )

}

function WordsFilter({ parameters, setParameters }) {

  function handleMinWordsChange(event) {
    const newParameters = _.cloneDeep(parameters);
    const value = event.target.value.replace(/\D/g, '');
    if (value === '') {
      newParameters.words.min = 0;
    } else {
      newParameters.words.min = parseInt(value);
    }
    setParameters(newParameters);
  }

  function handleMaxWordsChange(event) {
    const newParameters = _.cloneDeep(parameters);
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
    const newParameters = _.cloneDeep(parameters);
    newParameters.reviews.rating = rating;
    setParameters(newParameters);
  }

  function handleSampleChange(event) {
    const newParameters = _.cloneDeep(parameters);
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
      <RatingSlider rating={parameters.reviews.rating} handleRating={handleRatingSelect} />
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
    const newParameters = _.cloneDeep(parameters);
    newParameters.date.min = event.target.value;
    setParameters(newParameters);
  }

  function handleMaxDateChange(event) {
    const newParameters = _.cloneDeep(parameters);
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


function SortAndFilters({ parameters, defaultParameters, setParameters, setURLParameters }) {

  function setExpandedMenus() {
    const callbacks = {
      onValue: (value, keyPath, [expandedMenus, defaultParameters]) => {
        const defaultValue = _.get(defaultParameters, keyPath);

        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
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
          console.log('Object not recognized in setExpandedMenus');
        }
      },
      onFinal: (value, [expandedMenus, defaultParameters]) => {
        return expandedMenus;
      }
    };
    return iterateObject(parameters, callbacks, [{}, defaultParameters]);

  }

  const expandedMenus = setExpandedMenus();

  function resetParameters() {
    setParameters(defaultParameters);
  }

  return (
    <div className="filters-box">

      <div className='text-center mt-2 mb-3'>
        <u
          className="border border-dark px-2 py-1 me-5 pointer"
          style={{ backgroundColor: "var(--primary-1)" }}
          onClick={() => setURLParameters()}
        >
          Apply All
        </u>
        <u
          className="border border-dark px-2 py-1 pointer"
          style={{ backgroundColor: "lightgray" }}
          onClick={() => resetParameters()}
        >
          Reset All
        </u>
      </div>

      <ExpandMenu
        menuName="Sort"
        content={
          <Sort parameters={parameters} setParameters={setParameters} />
        }
        headerNumber="3"
        headerClass="mt-1"
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
        headerClass="mt-3"
        initalExpanded={Object.entries(expandedMenus).some(([key, value]) => key !== 'sort' && value === true)}
      />

    </div>
  )

}


function Search() {

  const navigate = useNavigate();
  const location = useLocation();
  const defaultParameters = {
    sort: {
      type: 'Date',
      ascending: false
    },
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
  //console.log(parameters);

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
          } else if (typeof value === 'boolean') {
            _.set(newParams, keyPath, newValue === 'true');
          } else if (Array.isArray(value)) {
            _.set(newParams, keyPath, newValue.split(','));
          } else {
            console.log('Object not recognised in getURLParameters');
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

        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
          if (value !== defaultValue) {
            queryParams.append(keyPath.join('.'), value);
          }

        } else if (Array.isArray(value)) {
          if (value.length !== defaultValue.length || !value.every((element, index) => element === defaultValue[index])) {
            queryParams.append(keyPath.join('.'), value.join(','));
          }

        } else {
          console.log('Object not recognised in setURLParameters');
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
        (params.language === '' || book.language === params.language) &&
        book.words >= params.words.min && book.words <= params.words.max &&
        getAverageRating(book) >= params.reviews.rating &&
        book.ratings.length + book.reviews.length >= params.reviews.sample &&
        (params.date.min === '' || new Date(book.published) >= new Date(params.date.min)) &&
        (params.date.max === '' || new Date(book.published) <= new Date(params.date.max))
    );
    newFilteredBooks.sort((a, b) => {
      let comparison = 0; // Default value (for cases where params.sort.type is unknown)

      switch (params.sort.type) {
        case 'Rating':
          comparison = getAverageRating(b) - getAverageRating(a);
          break;
        case 'Reviews':
          comparison = (b.ratings.length + b.reviews.length) - (a.ratings.length + a.reviews.length);
          break;
        case 'Date':
          comparison = new Date(b.published) - new Date(a.published);
          break;
        case 'Title':
          comparison = b.title.localeCompare(a.title);
          break;
        case 'Author':
          comparison = b.author.localeCompare(a.author);
          break;
        case 'Words':
          comparison = b.words - a.words;
          break;
        case 'Random':
          comparison = Math.random() - 0.5; // Randomize the order
          break;
        default:
          console.log('Unknown value');
      }

      // Adjust the order based on params.sort.ascending
      return params.sort.ascending ? -comparison : comparison;
    });


    return newFilteredBooks;
  }

  function onPageChange(page) {
    const startIndex = (page - 1) * 6;
    const endIndex = Math.min(page * 6, filteredBooks.length)
    setBooksDisplayed(filteredBooks.slice(startIndex, endIndex))
    setBookIndexes([startIndex, endIndex])
  }



  return (
    <Container fluid className="mb-5">
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
