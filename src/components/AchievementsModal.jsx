import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Check, Trophy, Sparkles, HelpCircle, Eye, EyeOff } from 'lucide-react';
import { ACHIEVEMENTS_META, ACHIEVEMENT_IDS } from './AchievementToast';
import { useLanguage } from '../context/LanguageContext';

const DISPLAY_IDS = [...ACHIEVEMENT_IDS, 'sacrificio'];

export default function AchievementsModal({ isOpen, onClose, achievements: externalAchievements }) {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'unlocked' | 'locked'
  const [revealedHints, setRevealedHints] = useState({});
  const [achievements, setAchievements] = useState(() => {
    try {
      const saved = localStorage.getItem('ricardodev_achievements');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const loadAchievements = () => {
    try {
      const saved = localStorage.getItem('ricardodev_achievements');
      setAchievements(saved ? new Set(JSON.parse(saved)) : new Set());
    } catch {}
  };

  useEffect(() => {
    if (isOpen) {
      loadAchievements();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleUnlock = () => {
      loadAchievements();
    };
    window.addEventListener('ricardodev-achievement-unlocked', handleUnlock);
    return () => window.removeEventListener('ricardodev-achievement-unlocked', handleUnlock);
  }, []);

  const toggleHint = (id) => {
    setRevealedHints((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const activeAchievements = externalAchievements || achievements;
  const unlockedCount = DISPLAY_IDS.filter((id) => activeAchievements.has(id)).length;
  const lockedCount = DISPLAY_IDS.length - unlockedCount;
  const allOthersUnlocked = ACHIEVEMENT_IDS.every(id => activeAchievements.has(id));

  const filteredIds = DISPLAY_IDS.filter((id) => {
    const isUnlocked = activeAchievements.has(id);
    if (activeTab === 'unlocked') return isUnlocked;
    if (activeTab === 'locked') return !isUnlocked;
    return true;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="achv-modal fixed inset-0 z-[99998] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className="relative w-full max-w-lg rounded-3xl border border-[#00ff88]/40 bg-[#060b08]/95 backdrop-blur-xl shadow-[0_0_50px_rgba(0,255,136,0.2)] overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#08120b] shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0c2e17] to-[#06200e] border border-[#00ff88]/50 flex items-center justify-center shadow-[0_0_15px_rgba(0,255,136,0.3)]">
                  <Trophy className="w-5 h-5 text-[#00ff88]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {lang === 'en' ? 'Achievements & Secret Gallery' : 'Galeria de Conquistas & Segredos'}
                  </h3>
                  <p className="text-[11px] font-mono text-[#00ff88]">
                    {lang === 'en'
                      ? `${unlockedCount} of ${DISPLAY_IDS.length} achievements unlocked`
                      : `${unlockedCount} de ${DISPLAY_IDS.length} conquistas desbloqueadas`}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title={lang === 'en' ? 'Close' : 'Fechar'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>


            {/* Tabs Selector Bar */}
            <div className="px-6 pt-4 pb-2 border-b border-white/10 flex items-center justify-center gap-2 bg-[#050b07] shrink-0">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all duration-200 border flex items-center gap-1.5 ${
                  activeTab === 'all'
                    ? 'bg-[#0c2e17] text-[#00ff88] border-[#00ff88]/50 shadow-[0_0_12px_rgba(0,255,136,0.2)]'
                    : 'bg-slate-900/60 text-slate-400 border-white/5 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'All' : 'Todas'}</span>
                <span className="px-1.5 py-0.2 rounded-full bg-white/10 text-[10px]">
                  {DISPLAY_IDS.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('unlocked')}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all duration-200 border flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'unlocked'
                    ? 'bg-[#0c2e17] text-[#00ff88] border-[#00ff88]/50 shadow-[0_0_12px_rgba(0,255,136,0.2)]'
                    : 'bg-slate-900/60 text-slate-400 border-white/5 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Check className="w-3.5 h-3.5 text-[#00ff88]" />
                <span>{lang === 'en' ? 'Unlocked' : 'Liberadas'}</span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#00ff88]/20 text-[#00ff88] text-[10px]">
                  {unlockedCount}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('locked')}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all duration-200 border flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'locked'
                    ? 'bg-[#0c2e17] text-[#00ff88] border-[#00ff88]/50 shadow-[0_0_12px_rgba(0,255,136,0.2)]'
                    : 'bg-slate-900/60 text-slate-400 border-white/5 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'en' ? 'Locked' : 'Bloqueadas'}</span>
                <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-400 text-[10px]">
                  {lockedCount}
                </span>
              </button>
            </div>

            {/* List of Achievements */}
            <div className="px-4 py-4 overflow-y-auto space-y-3 flex-1">
              {filteredIds.length === 0 ? (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  {activeTab === 'unlocked' ? (
                    <>
                      <Lock className="w-10 h-10 text-slate-600 mb-3" />
                      <p className="text-sm font-bold text-white mb-1">{t('achievements.noneUnlocked')}</p>
                      <p className="text-xs text-slate-400 max-w-xs font-mono">
                        {t('achievements.noneUnlockedHint')}
                      </p>
                    </>
                  ) : (
                    <>
                      <Trophy className="w-10 h-10 text-[#00ff88] mb-3 animate-bounce" />
                      <p className="text-base font-bold text-white mb-1">{t('achievements.allDone')}</p>
                      <p className="text-xs text-[#00ff88] max-w-xs font-mono leading-relaxed mt-1">
                        {t('achievements.allDoneHint').replace('{cmd}', '`achievements reset`')}
                      </p>
                    </>
                  )}
                </div>
              ) : (
                filteredIds.map((id) => {
                  const meta = ACHIEVEMENTS_META[id];
                  const unlocked = activeAchievements.has(id);
                  const Icon = meta.icon;
                  const globalIndex = DISPLAY_IDS.indexOf(id) + 1;
                  const isHintRevealed = !!revealedHints[id];

                  return (
                    <div
                      key={id}
                      className={`flex items-start gap-4 p-3.5 rounded-2xl border transition-all duration-300 ${
                        unlocked
                          ? 'bg-[#0c2e17]/60 border-[#10b981]/50 shadow-[0_0_15px_rgba(0,255,136,0.05)]'
                          : 'bg-black/50 border-white/10 opacity-85 hover:opacity-100'
                      }`}
                    >
                      <div
                        className={`relative flex-shrink-0 w-11 h-11 rounded-xl border flex items-center justify-center mt-0.5 ${
                          unlocked
                            ? 'border-[#00ff88]/60 bg-gradient-to-br from-[#0c2e17] to-[#06200e] text-[#00ff88] shadow-[0_0_12px_rgba(0,255,136,0.25)]'
                            : 'border-slate-800 bg-slate-950 text-amber-500/70'
                        }`}
                      >
                        {unlocked ? <Icon className="w-5 h-5" /> : <HelpCircle className="w-5 h-5 text-amber-500/70" />}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className={`text-sm font-bold ${unlocked ? 'text-white' : 'text-amber-400/90 font-mono'}`}>
                            {unlocked ? t(`achievements.meta.${id}.title`) : `${t('achievements.lockedTitle')} #${globalIndex}`}
                          </h4>
                          {unlocked ? (
                            <span className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-[#00ff88] shrink-0 bg-[#00ff88]/10 px-2 py-0.5 rounded-md border border-[#00ff88]/30">
                              <Check className="w-3 h-3" /> {t('achievements.unlockedLabel')}
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-amber-400/80 shrink-0 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                              <Lock className="w-3 h-3" /> {t('achievements.hidden')}
                            </span>
                          )}
                        </div>

                        {unlocked ? (
                          <p className="text-xs text-slate-300 font-light leading-relaxed mt-1">
                            {t(`achievements.meta.${id}.description`)}
                          </p>
                        ) : id === 'sacrificio' && !allOthersUnlocked ? (
                          <div className="mt-2 p-2.5 rounded-xl bg-black/40 border border-white/5">
                            <p className="text-[11px] font-mono text-slate-500 italic">
                              {lang === 'en' ? '🔒 Complete all other achievements first...' : '🔒 Desbloqueie todas as outras conquistas primeiro...'}
                            </p>
                          </div>
                        ) : id === 'sacrificio' && allOthersUnlocked ? (
                          <div className="mt-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                            <p className="text-[11px] font-mono text-amber-400 leading-relaxed italic">
                              {lang === 'en' ? '🎯 Now type "achievements reset" in the terminal!' : '🎯 Agora digite "achievements reset" no terminal!'}
                            </p>
                          </div>
                        ) : isHintRevealed ? (
                          <div className="mt-2 p-2.5 rounded-xl bg-black/60 border border-amber-500/30 flex items-start justify-between gap-2 animate-fadeIn">
                            <p className="text-[11px] font-mono text-amber-300/90 leading-relaxed italic">
                              {t(`achievements.meta.${id}.hint`)}
                            </p>
                            <button
                              onClick={() => toggleHint(id)}
                              className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white shrink-0 transition-colors"
                              title={t('achievements.hideHint')}
                            >
                              <EyeOff className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="mt-2 flex items-center justify-between gap-2 bg-black/40 p-2.5 rounded-xl border border-white/5">
                            <span className="text-[11px] font-mono text-slate-500 italic">
                              {t('achievements.hintHidden')}
                            </span>
                            <button
                              onClick={() => toggleHint(id)}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-mono transition-colors"
                              title={t('achievements.revealHint')}
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>{t('achievements.viewHint')}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/10 bg-[#040805] text-center shrink-0">
              <p className="text-[11px] font-mono text-slate-400">
                {unlockedCount === DISPLAY_IDS.length ? (
                  <span className="text-[#00ff88]">
                    {t('achievements.allDoneHint').replace('{cmd}', 'achievements reset')}
                  </span>
                ) : (
                  t('achievements.footerHint')
                )}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}