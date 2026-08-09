import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, ExternalLink, Eye, ShoppingCart, Calendar, ShieldCheck, Tag } from 'lucide-react';
import { booksData, personalInfo } from '../data/portfolioData';
import Book3D from './Book3D';

export default function BooksSection({ onSelectBook }) {
  return (
    <section id="books" className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Perfectly matching site design system */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#071410] border border-[#00ff88]/30 mb-4">
            <BookOpen className="w-3.5 h-3.5 text-[#00ff88]" />
            <span className="text-xs font-mono text-[#00ff88] tracking-widest uppercase">Literatura & Publicações</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Além do <span className="text-gradient-green">código.</span>
          </h2>

          <p className="text-slate-400 max-w-2xl font-light text-base">
            Escrever é outra forma de criar. Obras autorais publicadas que unem ficção científica, suspense psicológico e reflexão sobre a natureza humana.
          </p>
        </div>

        {/* Books Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {booksData.map((book, index) => (
            <motion.div
              key={book.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-12 glass-card rounded-3xl border border-[#00ff88]/30 p-6 sm:p-8 lg:p-10 relative overflow-hidden bg-[#040705]/90 shadow-glow-sm hover:border-[#00ff88]/60 transition-all duration-500"
            >
              {/* Background ambient glow */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#00ff88]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 relative z-10">
                
                {/* 3D Book Interactive Preview Column */}
                <div className="shrink-0 flex flex-col items-center">
                  <div className="p-4 rounded-3xl bg-[#071910]/80 border border-[#00ff88]/20 shadow-2xl relative group">
                    <Book3D book={book} onClick={onSelectBook} />
                    <div className="mt-4 text-center">
                      <span className="text-[11px] font-mono text-[#00ff88] flex items-center justify-center gap-1">
                        <Sparkles className="w-3 h-3" /> Passe o mouse para interagir 3D
                      </span>
                    </div>
                  </div>
                </div>

                {/* Book Details & Synopsis Column */}
                <div className="flex-1 text-left space-y-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-[#0c2e17] border border-[#00ff88]/40 text-[#00ff88] text-xs font-mono flex items-center gap-1.5 shadow-sm">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#00ff88]" />
                      {book.status || 'Publicado'}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-slate-300 text-xs font-mono flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#00f2fe]" />
                      Lançamento: {book.year}
                    </span>
                  </div>

                  <div>
                    <h3 
                      onClick={() => onSelectBook && onSelectBook(book)}
                      className="text-2xl sm:text-4xl font-extrabold text-white hover:text-[#00ff88] transition-colors cursor-pointer tracking-tight"
                    >
                      {book.title}
                    </h3>
                    <p className="text-sm font-mono text-[#00f2fe] mt-1">{book.subtitle}</p>
                  </div>

                  {/* Synopsis Teaser */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#00ff88]" /> Sinopse Oficial:
                    </h4>
                    <p className="text-slate-300 text-sm font-light leading-relaxed line-clamp-4">
                      {book.synopsis}
                    </p>
                  </div>

                  {/* Tags / Gêneros */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {book.tags?.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-md bg-[#071910] border border-[#00ff88]/20 text-[#00ff88] text-xs font-mono flex items-center gap-1"
                      >
                        <Tag className="w-3 h-3" /> #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <button
                      onClick={() => onSelectBook && onSelectBook(book)}
                      className="px-6 py-3 rounded-xl bg-[#092415] hover:bg-[#00ff88] text-[#00ff88] hover:text-black font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 border border-[#00ff88]/40 flex items-center gap-2 shadow-glow-sm"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Ler Sinopse Completa</span>
                    </button>

                    <div className="flex flex-wrap items-center gap-3">
                      {book.amazonLink && (
                        <a
                          href={book.amazonLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-transform hover:scale-105 shadow-md"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Comprar na Amazon</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {book.uiclapLink && (
                        <a
                          href={book.uiclapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#059669] via-[#10b981] to-[#00ff88] text-black font-extrabold text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-transform hover:scale-105 shadow-glow-sm"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Comprar na UICLAP</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
