const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;
    const pageButtonsToShow = 10;

    const handlePageChange = (pageNumber) => {
      if (pageNumber !== currentPage) {
        onPageChange(pageNumber);
      }
    };

    const renderPageButtons = () => {
      const pageButtons = [];
      const startPage = Math.max(currentPage - Math.floor(pageButtonsToShow / 2), 1);
      const endPage = Math.min(startPage + pageButtonsToShow - 1, totalPages);

      if (startPage > 1) {
        pageButtons.push(
          <button
            key={1}
            onClick={() => handlePageChange(1)}
            className={`px-2 py-1 mx-1 rounded ${
              isFirstPage ? "bg-gray-300 text-gray-600" : "bg-white text-blue-500"
            }`}
          >
            1
          </button>
        );
        if (startPage > 2) {
          pageButtons.push(<span key="ellipsis-start">...</span>);
        }
      }

      for (let page = startPage; page <= endPage; page++) {
        pageButtons.push(
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 mx-1 rounded ${
              currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 text-blue-500"
            }`}
          >
            {page}
          </button>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageButtons.push(<span key="ellipsis-end">...</span>);
        }
        pageButtons.push(
          <button
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
            className={`px-2 py-1 mx-1 rounded ${
              isLastPage ? "bg-gray-300 text-gray-600" : "bg-white text-blue-500"
            }`}
          >
            {totalPages}
          </button>
        );
      }

      return pageButtons;
    };

    return <div className="flex justify-center mt-5">{renderPageButtons()}</div>;
  };
export default Pagination
