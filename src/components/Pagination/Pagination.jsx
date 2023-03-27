import React from "react";
import classnames from "classnames";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { usePagination, DOTS } from "../../usePagination/usePagination";
import "./pagination.css";
export const Pagination = (props) => {
  const navigate = useNavigate();
  // const [inputText, setInputText] = useState(false);
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
    handleSubmit,
    inputText,
    setInputText,
    genreId,
  } = props;
  const paginationRange = [];
  const data = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (data) paginationRange.push(...data);

  // If there are less than 2 times in pagination range we shall not render the component

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
    navigate(`/${currentPage + 1}`);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
    navigate(`/${currentPage - 1}`);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div
      className={classnames("pagination-container", { [className]: className })}
    >
      {/* Left navigation arrow */}
      <div
        className={classnames("pagination-item", {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </div>
      {paginationRange.map((pageNumber, i) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          if (inputText === i)
            return (
              <div className="pagination-item">
                <input
                  type="text"
                  pattern="[0-9]"
                  autoFocus
                  onBlur={() => {
                    setInputText(0);
                  }}
                />
              </div>
            );
          return (
            <div
              className="pagination-item dots cursor-pointer"
              key={i}
              onClick={(e) => {
                e.preventDefault();
                setInputText(i);
              }}
            >
              &#8230;
            </div>
          );
        }

        // Render our Page Pills
        return (
          <Link
            className={classnames("pagination-item", {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
            to={`/${pageNumber}`}
          >
            {pageNumber}
          </Link>
        );
      })}
      {/*  Right Navigation arrow */}
      <div
        className={classnames("pagination-item", {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </div>
    </div>
  );
};
