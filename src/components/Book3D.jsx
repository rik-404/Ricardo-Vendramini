import React from 'react';
import { motion } from 'framer-motion';

export default function Book3D({ book, onClick }) {
  if (!book) return null;

  return (
    <div className="book3d-wrapper">
      <motion.button
        type="button"
        className="book3d"
        onClick={() => onClick?.(book)}
        initial={{ rotateX: 8, rotateY: -22, rotateZ: -2 }}
        whileHover={{
          scale: 1.06,
          rotateX: 4,
          rotateY: -12,
          rotateZ: -1,
          y: -8,
        }}
        transition={{
          type: 'spring',
          stiffness: 220,
          damping: 18,
        }}
        aria-label={`Abrir detalhes do livro ${book.title}`}
      >
        {/* Contracapa */}
        <div className="book-back" />

        {/* Bloco de páginas */}
        <div className="book-pages">
          <div className="page-lines" />
        </div>

        {/* Lombada */}
        <div className="book-spine" />

        {/* Capa frontal */}
        <div className="book-cover">
          <img
            src={book.coverImage}
            alt={`Capa do livro ${book.title}`}
          />

          <div className="cover-overlay" />

          <div className="cover-shine" />
        </div>
      </motion.button>
    </div>
  );
}
