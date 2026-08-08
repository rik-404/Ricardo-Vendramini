import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { statsData } from '../data/portfolioData';

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
      <div className="absolute top-0 right-0 w-16 h-16 bg-[#00ff88]/5 rounded-bl-full pointer-events-none group-hover:bg-[#00ff88]/15 transition-colors" />

      <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight mb-2 flex items-center justify-center">
        <span className="text-[#00ff88] mr-0.5">{item.prefix}</span>
        <span className="text-gradient-green">{count}</span>
        <span className="text-[#00ff88] ml-0.5">{item.suffix}</span>
      </div>

      <p className="text-xs sm:text-sm text-slate-300 font-medium tracking-wide">
        {item.label}
      </p>
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {statsData.map((stat) => (
            <CounterItem key={stat.id} item={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
