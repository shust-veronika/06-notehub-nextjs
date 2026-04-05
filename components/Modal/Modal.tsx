'use client';

import React from 'react';
import css from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div
        className={css.modal}
        onClick={(e) => e.stopPropagation()} 
      >
        <button className={css.closeBtn} onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}