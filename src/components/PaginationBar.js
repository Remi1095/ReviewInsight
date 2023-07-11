import React, { useState } from 'react';

const PaginationBar = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (var i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item${currentPage === i ? ' active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          <span className="page-link">{i}</span>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <nav>
      <ul className="pagination">
        <li
          className={`page-item${currentPage === 1 ? ' disabled' : ''}`}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <span className="page-link">Previous</span>
        </li>
        {renderPageNumbers()}
        <li
          className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <span className="page-link">Next</span>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationBar;