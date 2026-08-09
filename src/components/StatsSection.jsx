import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { getStatsData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

function CounterItem({ item }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = item.value;
    const duration = 1500; // ms
    const incrementTime = 30;
    const steps = Math.ceil(duration / incrementTime);
    const stepValue = end / steps;

    const timer = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, item.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card p-6 rounded-2xl border border-[#10b981]/20 flex flex-col items-center text-center relative overflow-hidden group hover:border-[#00ff88]/50"
    >
      <div className="text-3xl sm:text-4xl font-extrabold font-mono text-gradient-green mb-2">
        {item.prefix}{count}{item.suffix}
      </div>
      <div className="text-xs sm:text-sm font-medium text-slate-300">
        {item.label}
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  const { lang } = useLanguage();
  const stats = getStatsData(lang);

  return (
    <section className="py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((item) => (
            <CounterItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
