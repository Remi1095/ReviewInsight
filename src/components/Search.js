import React, { useState, useEffect, useRef } from 'react';
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
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";

function BookCard({ book }) {
  const navigate = useNavigate();

  const [showMore, setShowMore] = useState(false);

  function toggleShowMore() {
    setShowMore(!showMore);
  }

  function toBookInfo() {
    navigate(`/book-info/${book.id}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  const avgRating = getAverageRating(book).toFixed(1);

  return (
    <section className="content-box d-flex" style={{ marginBottom: "20px", padding: "15px" }}>

      <aside style={{ flex: '0 0 16.666%', maxWidth: '16.666%' }}>
        <a className='pointer no-style' onClick={toBookInfo} style={{ width: "90%" }}>
          <BookCover bgColor={book.fakeCover.bgColor} iconColor={book.fakeCover.iconColor} icon={book.fakeCover.icon} />
        </a>
      </aside>

      <article style={{ flex: '0 0 83.333%', maxWidth: '83.333%' }}>

        <header className='ms-3 pointer' onClick={toBookInfo}>
          <h4 className="d-inline">{book.title}</h4>
          <p className="mb-2 fs-5">by {book.author} - published {book.published}</p>
        </header>

        <div className="d-flex">

          <aside style={{ flex: '0 0 16.666%', maxWidth: '16.666%' }}>
            <a className='pointer no-style' onClick={toBookInfo}>
              <RatingBox rating={avgRating} textTag="h2" style={{ width: "70%" }} />
              <p className="mb-0 text-center" style={{ fontSize: 'smaller' }}>{book.reviews.length} reviews<br />{book.ratings.length} ratings</p>
            </a>
          </aside>

          <main style={{ flex: '0 0 83.333%', maxWidth: '83.333%' }}>
            <ShowMore text={book.description} lines={4} showMore={showMore} handleShowMore={toggleShowMore} />
          </main>

        </div>      </article>
    </section>
  );
}

function HelpModal({ show, handleClose, name, content }) {

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
    >
      <Modal.Header className='py-1'>
        <Modal.Title className="fs-5">{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='py-1'>
        {content}
      </Modal.Body>
    </Modal>
  );
};


function ExpandMenu({ menuName, content, helpContent = "", className = "", initalExpanded = false }) {
  const [isExpanded, setExpanded] = useState(initalExpanded);
  const [showHelp, setShowHelp] = useState(false);


  return (
    <>
      <HelpModal show={showHelp} handleClose={() => setShowHelp(false)} name={menuName} content={helpContent} />
      <header className={`${className} d-flex justify-content-between mb-2`} style={{ borderBottom: "2px solid black" }}>
        <button className="no-style" onClick={() => setExpanded(!isExpanded)}>
          <span className="mx-2"><FontAwesomeIcon icon={isExpanded ? faCaretDown : faCaretRight} /></span>
          <span>{menuName}</span>
        </button>
        <button className="mx-2 no-style" onClick={() => setShowHelp(true)}><FontAwesomeIcon icon={faCircleQuestion} /></button>
      </header>
      {isExpanded && (content)}
    </>
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
    <section className="ms-2">
      <header className='text-center'>
        <h6 className='d-inline me-2'>Sort by:</h6>
        <AppDropdown
          emptyValue="Sort by..."
          selectedItem={parameters.sort.type}
          items={sortOptions}
          handleItemSelect={handleSortSelect}
          hasReset={false}
          className='d-inline'
        />
      </header>
      <fieldset className='d-flex flex-wrap justify-content-evenly mt-2'>
        <legend className="sr-only">Sort direction</legend>
        <label>
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
      </fieldset>
    </section>
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
    <section className="mx-auto px-2">
      <div>
        <h6 className='mb-1'>Include:</h6>
        <AutoSuggest elements={parameters.genres.include} handleElements={handleIncludeGenre} suggestions={genres} placeholder={"Type genres..."} />
      </div>

      <div className='mt-2'>
        <h6 className='mb-1'>Exclude:</h6>
        <AutoSuggest elements={parameters.genres.exclude} handleElements={handleExcludeGenre} suggestions={genres} placeholder={"Type genres..."} />
      </div>
    </section>

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
    <fieldset>
      <legend className="sr-only">Select classifications</legend>
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
    </fieldset>
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
    <section className="mx-auto px-2">
      <div>
        <h6 className='mb-1'>Include:</h6>
        <AutoSuggest elements={parameters.authors.include} handleElements={handleIncludeAuthor} suggestions={authors} placeholder={"Author names..."} />
      </div>

      <div className='mt-2'>
        <h6 className='mb-1'>Exclude:</h6>
        <AutoSuggest elements={parameters.authors.exclude} handleElements={handleExcludeAuthor} suggestions={authors} placeholder={"Author names..."} />
      </div>
    </section>
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
    <section className="mx-auto px-2">
      <div>
        <label htmlFor="min-words" className='m-0'><h6 className='m-0 mb-1'>Minimum:</h6></label>
        <input
          id="min-words"
          type='text'
          value={(parameters.words.min !== 0) ? parseNumber(parameters.words.min) : ''}
          onChange={handleMinWordsChange}
          placeholder={'10 000'}
          className='m-0'
          style={{ width: "100%" }}
        />
      </div>

      <div className='mt-2'>
        <label htmlFor="max-words" className='m-0'><h6 className='m-0 mb-1'>Maximum:</h6></label>
        <input
          id="max-words"
          type='text'
          value={(parameters.words.max !== Infinity) ? parseNumber(parameters.words.max) : ''}
          onChange={handleMaxWordsChange}
          placeholder={'500 000'}
          className='m-0 mb-1'
          style={{ width: "100%" }}
        />
      </div>
    </section>
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
    <section className="mx-auto px-2">
      <div>
        <label htmlFor="rating-slider" className='m-0'><h6 className='m-0'>Rating:</h6></label>
        <RatingSlider id="rating-slider" rating={parameters.reviews.rating} handleRating={handleRatingSelect} />
      </div>

      <div className='mt-2'>
        <label htmlFor="sample-size" className='m-0'><h6 className='m-0'>Sample size:</h6></label>
        <input
          id="sample-size"
          type='text'
          value={(parameters.reviews.sample !== 0) ? parameters.reviews.sample.toString() : ''}
          onChange={handleSampleChange}
          placeholder={'100'}
          className='m-0 mb-1'
          style={{ width: "100%" }}
        />
      </div>
    </section>
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
    <section className="mx-auto px-2">
      <div>
        <label htmlFor="min-date" className='m-0'><h6 className='m-0'>Minimum:</h6></label>
        <input
          id="min-date"
          type='date'
          value={parameters.date.min}
          onChange={handleMinDateChange}
          className='m-0'
          style={{ width: "100%" }}
        />
      </div>

      <div className='mt-2'>
        <label htmlFor="max-date" className='m-0'><h6 className='m-0'>Maximum:</h6></label>
        <input
          id="max-date"
          type='date'
          value={parameters.date.max}
          onChange={handleMaxDateChange}
          className='m-0 mb-1'
          style={{ width: "100%" }}
        />
      </div>
    </section>

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
    <section className="filters-box">

      <div className='d-flex flex-wrap justify-content-evenly mt-2 mb-3'>
        <button className='no-style'>
          <u
            className="border border-dark px-2 py-1 pointer"
            style={{ backgroundColor: "var(--primary-1)" }}
            onClick={() => setURLParameters()}
          >
            Apply All
          </u>
        </button>
        <button className='no-style'>
          <u
            className="border border-dark px-2 py-1 pointer"
            style={{ backgroundColor: "lightgray" }}
            onClick={() => resetParameters()}
          >
            Reset All
          </u>
        </button>
      </div>

      <ExpandMenu
        menuName="Sort"
        content={
          <Sort parameters={parameters} setParameters={setParameters} />
        }
        helpContent={
          <>
            <p className='mb-1'>Sort books by specified field:</p>
            <ul>
              <li>Rating: Average rating score</li>
              <li>Reviews: Total number of reviews</li>
              <li>Date: Publication date</li>
              <li>Title: Book title</li>
              <li>Author: Author name</li>
              <li>Words: Number of words</li>
              <li>Random: Random order</li>
            </ul>
            <p className='mb-0'>Sort by ascending (lowest to highest value)</p>
            <p className='mb-1'>or descending (highest to lowest value).</p>
            <p className='mb-1'>Will sort by date descending by default.</p>
          </>
        }
        className="mt-1 fs-3 light-bold"
        initalExpanded={expandedMenus.sort}
      />

      <ExpandMenu
        menuName="Filters"
        content={
          <>
            <div className="mx-3 mt-2">
              <ExpandMenu
                menuName="Genres"
                content={
                  <GenresFilter parameters={parameters} setParameters={setParameters} />
                }
                helpContent={
                  <>
                    <p className='mb-1'>Filter books by genre:</p>
                    <ul>
                      <li>Include: Books must include all genres specified.</li>
                      <li>Reviews: Books must exclude all genres specified.</li>
                    </ul>
                    <p className='mb-0'>Press Enter or select item to auto-complete.</p>
                    <p className='mb-1'>Press Enter again to add new item.</p>
                  </>
                }
                className='fs-5 light-bold'
                initalExpanded={expandedMenus.genres}
              />
            </div>
            <div className="mx-3 mt-2">
              <ExpandMenu
                menuName="Classification"
                content={
                  <ClassificationFilter parameters={parameters} setParameters={setParameters} />
                }
                helpContent={
                  <>
                    <p className='mb-1'>Filter books by classification:</p>
                    <ul>
                      <li>General: Book suitable for all ages.</li>
                      <li>Teen: Book suitable for all teens and young adults.</li>
                      <li>Mature: Book suitable for adults.</li>
                      <li>Explicit: Book contains NSFW content.</li>
                    </ul>
                    <p className='mb-0'>Will show books that match one of the selected classification.</p>
                  </>
                }
                className='fs-5 light-bold'
                initalExpanded={expandedMenus.classifications}
              />
            </div>
            <div className="mx-3 mt-2">
              <ExpandMenu
                menuName="Author"
                content={
                  <AuthorFilter parameters={parameters} setParameters={setParameters} />
                }
                helpContent={
                  <>
                    <p className='mb-1'>Filter books by author name:</p>
                    <ul>
                      <li>Include: Books must include one of the authors specified.</li>
                      <li>Reviews: Books must exclude all of the authors specified.</li>
                    </ul>
                    <p className='mb-0'>Press Enter or select item to auto-complete.</p>
                    <p className='mb-1'>Press Enter again to add new item.</p>
                  </>
                }
                className='fs-5 light-bold'
                initalExpanded={expandedMenus.authors}
              />
            </div>
            <div className="mx-3 mt-2">
              <ExpandMenu
                menuName="Title"
                content={
                  <TitleFilter parameters={parameters} setParameters={setParameters} />
                }
                helpContent={
                  <>
                    <p className='mb-1'>Filter books by book title.</p>
                    <p className='mb-1'>Will show books whose title contain the text entered.</p>
                  </>
                }
                className='fs-5 light-bold'
                initalExpanded={expandedMenus.title}
              />
            </div>
            <div className="mx-3 mt-2">
              <ExpandMenu
                menuName="Language"
                content={
                  <LanguageFilter parameters={parameters} setParameters={setParameters} />
                }
                helpContent={
                  <>
                    <p className='mb-1'>Filter books by language.</p>
                    <p className='mb-1'>Will only show books which are in the specified language.</p>
                  </>
                }
                className='fs-5 light-bold'
                initalExpanded={expandedMenus.language}
              />
            </div>
            <div className="mx-3 mt-2">
              <ExpandMenu
                menuName="Words"
                content={
                  <WordsFilter parameters={parameters} setParameters={setParameters} />
                }
                helpContent={
                  <>
                    <p className='mb-1'>Filter books by word count:</p>
                    <ul>
                      <li>Minimum: Word count must be higher than this.</li>
                      <li>Maximum: Word count must be lower than this.</li>
                    </ul>
                    <p className='mb-0'>100 000 words is around 300 pages.</p>
                  </>
                }
                className='fs-5 light-bold'
                initalExpanded={expandedMenus.words}
              />
            </div>
            <div className="mx-3 mt-2">
              <ExpandMenu
                menuName="Reviews"
                content={
                  <ReviewsFilter parameters={parameters} setParameters={setParameters} />
                }
                helpContent={
                  <>
                    <p className='mb-1'>Filter books by reviews:</p>
                    <ul>
                      <li>Rating: Specifies the minimum average rating.</li>
                      <li>Sample size: Specifies the minimum number of total reviews plus ratings.</li>
                    </ul>
                    <p className='mb-0'>Ratings are scores left by users while reviews are scores with an associated text review.</p>
                  </>
                }
                className='fs-5 light-bold'
                initalExpanded={expandedMenus.reviews}
              />
            </div>
            <div className="mx-3 mt-2">
              <ExpandMenu
                menuName="Date"
                content={
                  <DateFilter parameters={parameters} setParameters={setParameters} />
                }
                helpContent={
                  <>
                    <p className='mb-1'>Filter books by published date:</p>
                    <ul>
                      <li>Minimum: Specifies the minimum date.</li>
                      <li>Maximum: Specifies the maximum date.</li>
                    </ul>
                  </>
                }
                className='fs-5 light-bold'
                initalExpanded={expandedMenus.date}
              />
            </div>
          </>
        }
        helpContent={
          <>
            <p className='mb-1'>Filter books that do not satisfy all conditions:</p>
            <ul>
              <li>Genres: Includes and excludes all specified genres.</li>
              <li>Classification: Includes one of the selected classification.</li>
              <li>Author: Includes one of the authors specified.</li>
              <li>Title: Book title must include the specified text.</li>
              <li>Language: Book must be in the selected language.</li>
              <li>Words: Book must have a minimum or maximum of words.</li>
              <li>Reviews: Average rating and sample size must be higher than the number specified.</li>
              <li>Date: Book must be published withing date range.</li>
            </ul>
            <p className='mb-0'>Leaving fields empty will not apply the associated filter.</p>
            <p className='mb-1'>More detail in each sub-menu.</p>
          </>
        }
        className="mt-3 fs-3 light-bold"
        initalExpanded={Object.entries(expandedMenus).some(([key, value]) => key !== 'sort' && value === true)}
      />

    </section>
  )

}


function Search() {

  const navigate = useNavigate();
  const location = useLocation();
  const showingRef = useRef(null);
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

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const filteredBooks = getFilteredBooks(getURLParameters())
    setFilteredBooks(filteredBooks);
    const page = parseInt(queryParams.get('page')) || 1;
    const startIndex = (page - 1) * 6;
    const endIndex = Math.min(page * 6, filteredBooks.length)
    setBooksDisplayed(filteredBooks.slice(startIndex, endIndex))
    setBookIndexes([startIndex, endIndex])
  }, [location.search]);

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
      let comparison = 0;

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

  return (
    <main className="mb-5">
      <Container fluid>
        <header>
          <h3 ref={showingRef} className="text-center fw-normal mb-3">
            Showing {bookIndexes[0] + 1}-{bookIndexes[1]} of {filteredBooks.length} books
          </h3>
        </header>

        <PaginationBar totalPages={Math.ceil(filteredBooks.length / 6)} scrollTopRef={showingRef} />

        <Row as="section">
          <Col xxl={2}></Col>
          <Col xxl={6} xs={8}>
            <section>
              {booksDisplayed.map((book) => (
                <article key={book.id}>
                  <BookCard book={book} />
                </article>
              ))}
            </section>
          </Col>
          <Col className='mb-3' xxl={2} xs={4}>
            <SortAndFilters
              parameters={parameters}
              defaultParameters={defaultParameters}
              setParameters={setParameters}
              setURLParameters={setURLParameters}
            />
          </Col>

          <Col xxl={2}></Col>
        </Row>

        <PaginationBar totalPages={Math.ceil(filteredBooks.length / 6)} scrollTopRef={showingRef} />

      </Container>
    </main>
  );
}

export default Search;
