import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function PaginationBar({ totalPages, onPageChange }) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [currentPage, setCurrentPage] = useState(parseInt(queryParams.get('page')) || 1);

  useEffect(() => {
    const page = parseInt(queryParams.get('page')) || 1;
    setCurrentPage(page);
    onPageChange(page);
  }, [location.search]);

  function handlePageChange(page) {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('page', page);
    navigate(`${location.pathname}?${urlParams.toString()}`);
    console.log("scroll top");
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  function renderPageNumbers() {
    const pageNumbers = [];
    const pagesIn = 2;
    const pagesOut = 2;

    for (let i = 1; i <= totalPages; i++) {
      if ((currentPage - pagesIn <= i && i <= currentPage + pagesOut) ||
        i === 1 ||
        i === totalPages ||
        (i === currentPage - pagesIn - 1 && i === 2) ||
        (i === currentPage + pagesOut + 1 && i === totalPages - 1)) {
        pageNumbers.push(
          <li
            key={i}
            className={`page-item${currentPage === i ? ' active' : ''}`}
            onClick={() => handlePageChange(i)}
          >
            <span className="page-link">{i}</span>
          </li>
        );

      } else if (i === currentPage - pagesIn - 1 || i === currentPage + pagesOut + 1) {
        pageNumbers.push(
          <li
            key={i}
            className='page-item'
          >
            <span className="page-link">...</span>
          </li>
        );
      }

    }

    return pageNumbers;
  };

  return (
    <nav>
      <ul className="pagination">
        <li
          className={`page-item${currentPage === 1 ? ' disabled' : ''}`}
          onClick={currentPage !== 1 ? () => handlePageChange(currentPage - 1) : null}
        >
          <span className="page-link"><span><FontAwesomeIcon icon={faArrowLeft} /></span> Previous</span>
        </li>
        {renderPageNumbers()}
        <li
          className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}
          onClick={currentPage !== totalPages ? () => handlePageChange(currentPage + 1) : null}
        >
          <span className="page-link">Next <span><FontAwesomeIcon icon={faArrowRight} /></span></span>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationBar;