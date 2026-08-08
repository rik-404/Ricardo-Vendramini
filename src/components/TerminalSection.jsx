import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Play, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';
import { terminalCommands } from '../data/portfolioData';

export default function TerminalSection({ onTriggerEasterEgg }) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState(terminalCommands.welcome);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, `ricardo@dev:~$ ${inputVal}`];

    if (cmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (cmd === 'matrix') {
      newHistory.push('> Executando protocolo Matrix...');
      setHistory(newHistory);
      setInputVal('');
      if (onTriggerEasterEgg) onTriggerEasterEgg();
      return;
    }

    if (cmd === 'help') {
      setHistory([...newHistory, ...terminalCommands.help]);
    } else if (cmd === 'sobre') {
      setHistory([...newHistory, 'RICARDO VENDRAMINI: Desenvolvedor, Líder & Criador de Soluções Digitais com foco em produtos de alta performance.']);
    } else if (cmd === 'skills') {
      setHistory([...newHistory, 'SKILLS: React, TypeScript, Node.js, Next.js, Supabase, SQL, Linux, Git, Tailwind CSS, Liderança de Equipes.']);
    } else if (cmd === 'projetos') {
      setHistory([...newHistory, 'PROJETOS: ImobiFlow, Elite House Hub, Festa Fácil, PetLife, Cigana Morgana.']);
    } else if (cmd === 'livros') {
      setHistory([...newHistory, 'LIVROS: Código, Processos & Pessoas | Da Ideia à Produção']);
    } else if (cmd === 'contato') {
      setHistory([...newHistory, 'CONTATO: contato@ricardovendramini.dev | LinkedIn & GitHub: Ricardo Vendramini']);
    } else {
      setHistory([...newHistory, `Comando não reconhecido: '${cmd}'. Digite 'help' para ver comandos.`]);
    }

    setInputVal('');
  };

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c140e] border border-[#10b981]/30 mb-4">
            <TerminalIcon className="w-3.5 h-3.5 text-[#00ff88]" />
            <span className="text-xs font-mono text-[#00ff88] tracking-widest uppercase">CLI Interativo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            RICARDO.<span className="text-[#00ff88]">DEV</span> Terminal
          </h2>
          <p className="text-slate-400 max-w-xl font-light text-sm">
            Interaja com o sistema através de comandos em tempo real.
          </p>
        </div>

        {/* Terminal Window Mockup */}
        <div className="max-w-4xl mx-auto glass-card rounded-2xl border border-[#00ff88]/30 overflow-hidden shadow-glow-md font-mono text-xs sm:text-sm">
          
          {/* Top Bar */}
          <div className="bg-[#040705] px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="ml-2 text-slate-400 text-xs">bash - 80x24</span>
            </div>
            <div className="flex items-center gap-2 text-[#00ff88] text-xs">
              <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
              <span>ONLINE</span>
            </div>
          </div>

          {/* Terminal Screen Output */}
          <div className="p-6 bg-[#050906]/90 min-h-[300px] max-h-[420px] overflow-y-auto space-y-2 text-slate-200">
            {history.map((line, idx) => (
              <div
                key={idx}
                className={
                  line.startsWith('ricardo@dev')
                    ? 'text-[#00ff88] font-bold'
                    : line.startsWith('[OK]')
                    ? 'text-emerald-400'
                    : line.startsWith('STATUS:')
                    ? 'text-[#00ff88] font-extrabold'
                    : 'text-slate-300'
                }
              >
                {line}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Terminal Input Form */}
          <form onSubmit={handleCommandSubmit} className="bg-[#040705] px-4 py-3 border-t border-white/10 flex items-center gap-2">
            <span className="text-[#00ff88] font-bold shrink-0">ricardo@dev:~$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="digite 'help' ou 'matrix'..."
              className="w-full bg-transparent text-white focus:outline-none font-mono text-xs sm:text-sm placeholder-slate-600"
            />
            <button type="submit" className="p-1.5 rounded bg-[#10b981]/20 text-[#00ff88] hover:bg-[#10b981]/40">
              <Play className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

        <p className="text-center text-xs font-mono text-slate-400 mt-4">
          Tudo pronto. Agora explore minha história.
        </p>

      </div>
    </section>
  );
}
