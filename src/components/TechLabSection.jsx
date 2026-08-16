import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Atom, Server, Database, Cloud, Terminal, GitBranch, Globe, Shield, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const techNodeIds = ['core', 'ui', 'backend', 'os', 'deploy'];

const techIcons = {
  core: Atom,
  ui: Server,
  backend: Database,
  os: Terminal,
  deploy: Cloud,
};

export default function TechLabSection() {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState('core');
  const activeNode = { id: activeId, name: t(`techlab.nodes.${activeId}.name`), desc: t(`techlab.nodes.${activeId}.desc`) };

  return (
    <section className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c140e] border border-[#10b981]/30 mb-4">
            <Atom className="w-3.5 h-3.5 text-[#00ff88]" />
            <span className="text-xs font-mono text-[#00ff88] tracking-widest uppercase">{t('techlab.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            {t('techlab.title')} <span className="text-gradient-green">{t('techlab.accent')}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl font-light text-base">
            {t('techlab.subtitle')}
          </p>
        </div>

        {/* Interactive Visual Canvas Area */}
        <div className="relative min-h-[460px] glass-card rounded-3xl border border-[#10b981]/30 p-8 overflow-hidden flex flex-col justify-between">
          
          {/* Background Connecting Pulse Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
            <line x1="15%" y1="30%" x2="40%" y2="20%" stroke="#00ff88" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="40%" y1="20%" x2="65%" y2="30%" stroke="#00ff88" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="65%" y1="30%" x2="85%" y2="45%" stroke="#00ff88" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="15%" y1="30%" x2="25%" y2="70%" stroke="#10b981" strokeWidth="1.5" />
            <line x1="25%" y1="70%" x2="55%" y2="75%" stroke="#10b981" strokeWidth="1.5" />
            <line x1="55%" y1="75%" x2="75%" y2="70%" stroke="#10b981" strokeWidth="1.5" />
            <line x1="75%" y1="70%" x2="85%" y2="45%" stroke="#10b981" strokeWidth="1.5" />
          </svg>

          {/* Interactive Tech Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 relative z-10 my-auto">
            {techNodeIds.map((id, idx) => {
              const IconComp = techIcons[id];
              const isActive = activeId === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveId(id)}
                  className={`p-4 rounded-2xl border flex flex-col items-center text-center transition-[background-color,border-color,color,transform] duration-300 ${
                    isActive
                      ? 'bg-[#0c2e17] border-[#00ff88] shadow-glow-md scale-105 text-[#00ff88]'
                      : 'glass-panel border-white/10 text-slate-300 hover:border-[#10b981]/50 hover:text-white'
                  }`}
                >
                  <div className={`p-3 rounded-xl mb-3 ${isActive ? 'bg-[#00ff88]/20 text-[#00ff88]' : 'bg-white/5 text-slate-400'}`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold font-mono">{t(`techlab.nodes.${id}.name`)}</span>
                </button>
              );
            })}
          </div>

          {/* Active Node Detail Card Display */}
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="p-4 rounded-xl bg-[#040705]/90 border border-[#00ff88]/40 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 z-10"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#00ff88] shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white">{activeNode.name}</h4>
                <p className="text-xs text-slate-300 font-mono">{activeNode.desc}</p>
              </div>
            </div>
            <div className="px-3 py-1 rounded bg-[#00ff88]/10 text-[#00ff88] text-[11px] font-mono shrink-0">
              {t('techlab.activeConnection')}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
