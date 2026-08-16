import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, Calendar, Layers, Award, Rocket } from 'lucide-react';
import { getTimelineData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function TimelineSection() {
  const { lang, t } = useLanguage();
  const timelineItems = getTimelineData(lang);

  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c140e] border border-[#10b981]/30 mb-4">
            <GitCommit className="w-3.5 h-3.5 text-[#00ff88]" />
            <span className="text-xs font-mono text-[#00ff88] tracking-widest uppercase">
              {lang === 'en' ? 'Evolution & Milestones' : 'Evolução & Trajetória'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            {lang === 'en' ? 'Journey through ' : 'A jornada através do '}
            <span className="text-gradient-green">
              {lang === 'en' ? 'time.' : 'tempo.'}
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl font-light text-base">
            {lang === 'en'
              ? 'Key milestones of technical and professional evolution over the years.'
              : 'Marcos da evolução técnica e profissional de Ricardo Vendramini ao longo dos anos.'}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Green Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00ff88] via-[#10b981]/40 to-transparent -translate-x-1/2" />

          <div className="space-y-12">
            {timelineItems.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Center Node Circle */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-1.5 w-8 h-8 rounded-full bg-[#040705] border-2 border-[#00ff88] flex items-center justify-center shadow-glow-sm z-20">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00ff88] animate-ping opacity-75" />
                  </div>

                  {/* Card Content Container */}
                  <div className="pl-12 sm:pl-0 sm:w-1/2 sm:px-8">
                    <div className="glass-card p-6 rounded-2xl border border-[#10b981]/25 hover:border-[#00ff88]/50">
                      
                      {/* Year Badge */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0c2e17] border border-[#00ff88]/40 text-[#00ff88] text-xs font-mono mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.year}</span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-slate-300 text-sm font-light mb-4 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Related Projects */}
                      {item.projects && item.projects.length > 0 && (
                        <div className="mb-3">
                          <span className="text-[11px] font-mono text-slate-400 block mb-1 uppercase tracking-wider">
                            {t('timeline.projectsLabel')}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {item.projects.map((proj, pIdx) => (
                              <span
                                key={pIdx}
                                className="px-2.5 py-0.5 rounded-md bg-[#040705] border border-[#10b981]/30 text-xs font-medium text-[#00ff88]"
                              >
                                {proj}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tech Pills */}
                      <div className="mb-4">
                        <span className="text-[11px] font-mono text-slate-400 block mb-1 uppercase tracking-wider">
                          {t('timeline.technologiesLabel')}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {item.technologies.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded bg-white/5 text-[11px] text-slate-300 font-mono"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Key Achievements */}
                      {item.achievements && item.achievements.length > 0 && (
                        <div className="pt-3 border-t border-white/10">
                          <span className="text-[11px] font-mono text-[#00ff88] flex items-center gap-1 mb-1.5 uppercase">
                            <Award className="w-3.5 h-3.5" /> {t('timeline.achievementsLabel')}
                          </span>
                          <ul className="space-y-1">
                            {item.achievements.map((ach, aIdx) => (
                              <li key={aIdx} className="text-xs text-slate-400 flex items-start gap-1.5">
                                <span className="text-[#00ff88] font-bold">•</span>
                                <span>{ach}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
