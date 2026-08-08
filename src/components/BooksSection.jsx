import React from 'react';
import { booksData } from '../data/portfolioData';
import Book3D from './Book3D';

export default function BooksSection({ onSelectBook }) {
  return (
    <section id="books" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Left-Aligned Header strictly matching design */}
        <div className="flex flex-col text-left mb-12 max-w-3xl">
          <span className="text-xs font-mono text-[#00ff88] tracking-widest uppercase mb-3">
            // LIVROS
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4">
            Além do <span className="text-[#00ff88]">código.</span>
          </h2>
          <p className="text-[#22c55e]/90 text-lg sm:text-xl font-light leading-relaxed">
            Escrever é outra forma de criar. Meus livros são projetos que saem do papel — literalmente.
          </p>
        </div>

        {/* Left-Aligned 3D Books Grid */}
        <div className="flex flex-wrap items-start gap-12 mt-8">
          {booksData.map((book) => (
            <div key={book.id} className="flex flex-col items-start text-left group">
              {/* Standalone 3D Book Icon */}
              <Book3D book={book} onClick={onSelectBook} />

              {/* Title & Tag Underneath Book */}
              <div className="mt-3 text-left">
                <h4
                  onClick={() => onSelectBook && onSelectBook(book)}
                  className="text-base font-bold text-[#00ff88] group-hover:text-[#00f2fe] transition-colors cursor-pointer tracking-wide"
                >
                  {book.title}
                </h4>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mt-0.5">
                  {book.status || book.year}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
