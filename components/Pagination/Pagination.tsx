'use client';

import React from 'react';
import css from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className={css.pagination}>
      {pages.map((page) => (
        <li
          key={page}
          className={page === currentPage ? css.active : ''}
          onClick={() => onPageChange(page)}
        >
          <a>{page}</a>
        </li>
      ))}
    </ul>
  );
}