
/*
{
  "status": "success",
  "total": 100,
  "count": 15,
  "data": [...]
}

const totalPage = Math.ceil(100 / 15) 		// => 7 
const currentPage = 4


Say currentPage = 4, and totalPages = 7, then display:

1 ... 2 3 [4] 5 6 ... 7

Goal:
	. Always show: First and last page
	. Always show: 2 before and after current
	. Show ... where needed to indicate skipped ranges

*/

import { useState } from 'react';

interface PaginationProps {
  total: number; // total number of items (e.g., 100)
  count: number; // items per page (e.g., 15)
	onPageChange?: (page: number) => void
}

const generatePagination = (
  currentPage: number,
  totalPages: number
): (number | string)[] => {
  const delta = 1;
  const range: number[] = [];
  const rangeWithDots: (number | string)[] = [];
  let l: number | undefined;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l !== undefined) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l > 2) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
};

export const Pagination = ({ total, count, onPageChange }: PaginationProps) => {
  const totalPages = Math.ceil(total / count);
  const [currentPage, setCurrentPage] = useState(1);

  const pagination = generatePagination(currentPage, totalPages);

	// In your `setCurrentPage` calls:
	const handlePageChange = (page: number) => () => {
		setCurrentPage(page)
		onPageChange?.(page)
	};

  return (
    <nav className="flex items-center gap-x-1" aria-label="Pagination">
      {/* Previous */}
      <button
        type="button"
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        className="min-h-9.5 min-w-9.5 py-2 px-2.5 cursor-pointer inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
        aria-label="Previous"
      >
        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        <span>Previous</span>
      </button>

      {/* Page Buttons */}
      {pagination.map((item, idx) =>
        typeof item === 'number' ? (
          <button
            key={idx}
            onClick={handlePageChange(item)}
            className={`min-h-9.5 min-w-9.5 cursor-pointer flex justify-center items-center py-2 px-3 text-sm rounded-lg
              ${
                currentPage === item
                  ? 'bg-gray-200 text-gray-800 dark:bg-neutral-600 dark:text-white'
                  : 'text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-white/10'
              }`}
            aria-current={currentPage === item ? 'page' : undefined}
          >
            {item}
          </button>
        ) : (
          <span
            key={`dots-${idx}`}
            className="min-h-9.5 min-w-9.5 flex justify-center items-center text-gray-500 py-2 px-3 text-sm dark:text-neutral-500"
          >
            ...
          </span>
        )
      )}

      {/* Next */}
      <button
        type="button"
        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="min-h-9.5 min-w-9.5 py-2 px-2.5 cursor-pointer inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
        aria-label="Next"
      >
        <span>Next</span>
        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </button>
    </nav>
  );
};
