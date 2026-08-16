import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, AlertTriangle, Send, RefreshCw, ChevronLeft, ChevronRight, MessageSquare, ExternalLink, Play, Pause, Music, Volume2, ShieldCheck, Mail, Phone, Code, BookOpen, Award, CheckCircle, Globe, Terminal, Briefcase, Search, UserCheck, MessageCircle, Settings, Users } from 'lucide-react';
import { personalInfo, statsData, timelineData, getProjectsData, getSkillsData, getCertificatesData, getBooksData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function Retro1999Overlay({ isOpen, onClose }) {
  const { t, lang } = useLanguage();

  // Helper to ensure translation keys never render as raw tag paths if missing or uninitialized
  const getText = (key, defaultText) => {
    const val = t(key);
    return val && val !== key ? val : defaultText;
  };

  const [activeTab, setActiveTab] = useState(() => {
    try {
      return localStorage.getItem('ricardodev_1999_tab') || 'web';
    } catch { return 'web'; }
  });

  const [visitorCount, setVisitorCount] = useState(1337);
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [imWindowOpen, setImWindowOpen] = useState(false);
  const [imInput, setImInput] = useState('');
  const [imMessages, setImMessages] = useState([
    { sender: 'Ricardo (ICQ #99404199)', text: 'Uh-oh! Alguém te enviou uma mensagem no ICQ 99b!', time: '23:58' },
    { sender: 'Dante (ICQ #19998800)', text: 'Oi! Adicione meu UIN (#19998800) na sua lista do ICQ!', time: '23:59' }
  ]);

  const playUhOhSound = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, now);
      gain1.gain.setValueAtTime(0.15, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.12);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1320, now + 0.14);
      gain2.gain.setValueAtTime(0.2, now + 0.14);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.14);
      osc2.stop(now + 0.35);
    } catch (e) {
      // Audio fallback
    }
  };

  const [guestName, setGuestName] = useState('');
  const [guestMsg, setGuestMsg] = useState('');
  const [guestbook, setGuestbook] = useState([
    { name: 'Dante', text: 'Se você está lendo isso, eu já estive aqui antes de você.', date: '14/08/1999' },
    { name: 'João (Dev)', text: 'Muito legal o seu site! Lembrou os velhos tempos da internet discada e do Web 1.0!', date: '08/08/1999' },
    { name: 'Ana', text: 'Como você fez esse visual de 1999? Que nostálgico!', date: '09/08/1999' },
    { name: 'Ricardo', text: 'Eu não lembro de ter colocado isso aqui... Pelo visto a máquina do tempo funcionou.', date: '14/08/1999' }
  ]);

  // Audio MIDI player state
  const [midiPlaying, setMidiPlaying] = useState(false);
  const audioCtxRef = useRef(null);

  const toggleMidi = () => {
    if (midiPlaying) {
      if (audioCtxRef.current && audioCtxRef.current.midiInterval) {
        clearInterval(audioCtxRef.current.midiInterval);
      }
      setMidiPlaying(false);
    } else {
      try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!audioCtxRef.current) audioCtxRef.current = new Ctx();
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        setMidiPlaying(true);

        const notes = [261.63, 329.63, 392.00, 523.25, 392.00, 329.63];
        let noteIdx = 0;

        const interval = setInterval(() => {
          if (!audioCtxRef.current) {
            clearInterval(interval);
            return;
          }
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.value = notes[noteIdx % notes.length];
          gain.gain.value = 0.04;

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 0.14);

          noteIdx++;
        }, 220);

        audioCtxRef.current.midiInterval = interval;
      } catch (e) {
        setMidiPlaying(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.midiInterval) {
        clearInterval(audioCtxRef.current.midiInterval);
      }
    };
  }, []);

  // Contact form retro state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSent, setContactSent] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactName.trim() || !contactMsg.trim()) return;
    setContactSent(true);
    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactMsg('');
      setContactSent(false);
    }, 4000);
  };

  const handleImSubmit = (e) => {
    e.preventDefault();
    if (!imInput.trim()) return;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setImMessages((prev) => [...prev, { sender: 'Você', text: imInput, time: timeStr }]);
    setImInput('');
    playUhOhSound();

    setTimeout(() => {
      setImMessages((prev) => [
        ...prev,
        {
          sender: 'Ricardo (ICQ #99404199)',
          text: 'Uh-oh! Recebi sua mensagem no ICQ 99b! Muito obrigado por entrar em contato!',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      playUhOhSound();
    }, 1200);
  };

  // CLI MS-DOS state
  const [cliHistory, setCliHistory] = useState([
    'Microsoft(R) MS-DOS(R) Versao 6.22',
    '(C) Copyright Microsoft Corp 1981-1994.',
    '',
    'C:\\RICARDO>'
  ]);
  const [cliInput, setCliInput] = useState('');
  const [matrixMode, setMatrixMode] = useState(false);
  const [playMode, setPlayMode] = useState(false);
  const cliRef = useRef(null);

  const handleCliCommand = (e) => {
    e.preventDefault();
    const cmd = cliInput.trim().toLowerCase();
    const newHistory = [...cliHistory, `C:\\RICARDO>${cliInput}`];

    if (cmd === 'dir') {
      newHistory.push(
        ' Volume in drive C is RICARDO',
        ' Directory of C:\\RICARDO',
        '',
        'PROJETOS       <DIR>        14-08-1999  10:00',
        'SKILLS         <DIR>        14-08-1999  10:00',
        'CERTIFICADOS   <DIR>        14-08-1999  10:00',
        'TRAJETORIA     <DIR>        14-08-1999  10:00',
        'LIVROS         <DIR>        14-08-1999  10:00',
        'CONTATO    TXT          256  14-08-1999  10:00',
        ''
      );
    } else if (cmd === 'cls' || cmd === 'clear') {
      setCliHistory(['C:\\RICARDO>']);
      setCliInput('');
      return;
    } else if (cmd === 'help') {
      newHistory.push(
        'Comandos disponiveis:',
        '  DIR      - Lista arquivos e diretorios',
        '  CLS      - Limpa a tela',
        '  HELP     - Mostra esta lista de comandos',
        '  VER      - Versao MS-DOS',
        '  ABOUT    - Sobre Ricardo Vendramini',
        '  EXIT     - Volta para o site principal',
        '  TIMETRAVEL - Ativa sequencia de salto no tempo',
        '  CLEAR    - Limpa a tela da janela MS-DOS',
        ''
      );
    } else if (cmd === 'ver') {
      newHistory.push('', 'MS-DOS Versao 6.22 (Vendramini Edition)', '');
    } else if (cmd === 'about') {
      newHistory.push('', 'RICARDO VENDRAMINI — Desenvolvedor Full Stack', 'Site: ricardovendramini.com.br', '');
    } else if (cmd === 'timewalker') {
      newHistory.push('', '> Viajando de volta para 2026...', '');
      setTimeout(() => onClose(), 1500);
    } else if (cmd === 'exit') {
      onClose();
      return;
    } else if (cmd !== '') {
      newHistory.push(`Comando invalido: ${cliInput}`, '');
    }

    newHistory.push('C:\\RICARDO>');
    setCliHistory(newHistory);
    setCliInput('');
  };

  useEffect(() => {
    if (cliRef.current) {
      cliRef.current.scrollTop = cliRef.current.scrollHeight;
    }
  }, [cliHistory]);

  useEffect(() => {
    try {
      localStorage.setItem('ricardodev_1999_tab', activeTab);
    } catch {}
  }, [activeTab]);

  if (!isOpen) return null;

  const handleGuestSubmit = (e) => {
    e.preventDefault();
    if (!guestName.trim() || !guestMsg.trim()) return;
    setGuestbook([
      { name: guestName, text: guestMsg, date: '14/08/1999' },
      ...guestbook
    ]);
    setGuestName('');
    setGuestMsg('');
  };

  // Real data pulled from central architecture
  const realProjects = getProjectsData(lang || 'pt');
  const realSkills = getSkillsData(lang || 'pt');
  const realCertificates = getCertificatesData(lang || 'pt');
  const realBooks = getBooksData(lang || 'pt');

  return (
    <div className="fixed inset-0 z-[999999] overflow-y-auto bg-[#008080] font-sans text-black selection:bg-[#000080] selection:text-white" style={{ cursor: 'auto' }}>
      
      {/* AOL & Windows 95/98 Pure 1999 Web 1.0 Font Hierarchy & Quirky Styling */}
      <style>{`
        .retro-container {
          font-family: Verdana, Geneva, sans-serif !important;
        }
        .font-serif {
          font-family: "Times New Roman", Times, Georgia, serif !important;
        }
        .font-sans {
          font-family: Arial, Helvetica, sans-serif !important;
        }
        .font-verdana {
          font-family: Verdana, Geneva, sans-serif !important;
        }
        .font-mono {
          font-family: "Courier New", Courier, monospace !important;
        }
        .font-comic {
          font-family: "Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive, sans-serif !important;
        }
        .aol-win-box {
          background: #c0c0c0;
          border-top: 2px solid #ffffff;
          border-left: 2px solid #ffffff;
          border-right: 2px solid #404040;
          border-bottom: 2px solid #404040;
        }
        .aol-win-inset {
          background: #ffffff;
          border-top: 2px solid #404040;
          border-left: 2px solid #404040;
          border-right: 2px solid #ffffff;
          border-bottom: 2px solid #ffffff;
        }
        .aol-btn {
          background: #c0c0c0;
          border-top: 2px solid #ffffff;
          border-left: 2px solid #ffffff;
          border-right: 2px solid #404040;
          border-bottom: 2px solid #404040;
          font-weight: bold;
          cursor: pointer;
        }
        .aol-btn:active {
          border-top: 2px solid #404040;
          border-left: 2px solid #404040;
          border-right: 2px solid #ffffff;
          border-bottom: 2px solid #ffffff;
        }
        .aol-[#000080]-header {
          background: linear-gradient(to right, #000080, #1084d0);
        }
        .retro-blink {
          animation: blinkRetro 1s steps(2, start) infinite;
        }
        @keyframes blinkRetro {
          to { visibility: hidden; }
        }
        .retro-spin {
          animation: spinSlow 4s linear infinite;
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .retro-flag {
          animation: waveFlag 2s ease-in-out infinite;
        }
        @keyframes waveFlag {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        .aol-marquee {
          overflow: hidden;
          white-space: nowrap;
          box-sizing: border-box;
          animation: marqueeSlow 18s linear infinite;
        }
        @keyframes marqueeSlow {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .aol-link {
          color: #0000ee;
          text-decoration: underline;
          cursor: pointer;
        }
        .aol-link:visited {
          color: #551a8b;
        }
      `}</style>

      {/* Pop-up de alerta Horrível do Windows 95/98 */}
      {!alertDismissed && (
        <div className="fixed inset-0 z-[1000000] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm aol-win-box p-1 shadow-2xl">
            <div className="aol-[#000080]-header text-white font-bold px-2 py-1 flex items-center justify-between text-xs font-sans">
              <span>{getText('retro1999.notice.header', '⚠️ VENDRAMINI INFORMÁTICA — CONEXÃO DISCADA ATIVA')}</span>
              <button onClick={() => setAlertDismissed(true)} className="px-1.5 text-xs bg-[#c0c0c0] text-black font-bold border border-white font-sans">X</button>
            </div>
            <div className="p-4 flex items-start gap-3 bg-[#c0c0c0]">
              <AlertTriangle className="w-8 h-8 text-yellow-500 shrink-0" />
              <div className="text-xs font-verdana text-black leading-relaxed">
                <p className="font-bold mb-1 font-serif text-sm">{getText('retro1999.notice.title', "YOU'VE GOT MAIL! ✉️")}</p>
                <p className="font-verdana">{getText('retro1999.notice.welcomePrefix', 'Bem-vindo à réplica retrô da')} <b className="font-serif">{getText('retro1999.notice.welcomeBold', 'Vendramini Informática (Web 1.0 — 1999)')}</b>!</p>
                <p className="mt-2 text-slate-800 font-mono text-[11px]">{getText('retro1999.notice.sub', 'Conectado a 56kbps com som MIDI ativo!')}</p>
              </div>
            </div>
            <div className="p-2 flex justify-center bg-[#c0c0c0] border-t border-slate-400">
              <button onClick={() => setAlertDismissed(true)} className="aol-btn px-6 py-1 text-xs font-sans">
                {getText('retro1999.notice.enterBtn', '[ ENTRAR NO SITE ]')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ICQ 99b Popup Modal */}
      {imWindowOpen && (
        <div className="fixed bottom-6 right-6 z-[1000000] w-80 aol-win-box shadow-2xl p-1 bg-[#c0c0c0] font-sans">
          <div className="aol-[#000080]-header text-white font-bold px-2 py-1 flex items-center justify-between text-xs font-sans">
            <span className="flex items-center gap-1.5 font-sans">🌸 ICQ 99b — Vendramini Online (UIN: #99404199)</span>
            <button onClick={() => setImWindowOpen(false)} className="px-1 text-xs bg-[#c0c0c0] text-black font-bold border border-white font-sans">X</button>
          </div>

          <div className="p-2 bg-[#c0c0c0]">
            <div className="text-[10px] font-bold text-green-900 mb-1 flex items-center justify-between font-mono bg-green-100 p-1 border border-green-400">
              <span className="flex items-center gap-1">
                <span>🟢</span>
                <span>STATUS: ONLINE</span>
              </span>
              <span className="font-bold">UIN: #99404199</span>
            </div>
            
            <div className="h-40 overflow-y-auto aol-win-inset p-2 text-xs font-mono bg-white space-y-1.5 mb-2 border border-slate-500">
              {imMessages.map((msg, idx) => (
                <div key={idx} className="leading-tight">
                  <span className={`font-bold ${msg.sender === 'Você' ? 'text-blue-700' : 'text-red-700'}`}>
                    {msg.sender} ({msg.time}):
                  </span>{' '}
                  <span className="text-slate-900">{msg.text}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleImSubmit} className="flex gap-1">
              <input
                type="text"
                value={imInput}
                onChange={(e) => setImInput(e.target.value)}
                placeholder="Enviar mensagem no ICQ..."
                className="flex-1 p-1 aol-win-inset text-xs font-mono"
              />
              <button type="submit" className="aol-btn px-2 py-1 text-xs text-blue-950 font-bold font-sans cursor-pointer">
                [ Enviar ICQ 💬 ]
              </button>
            </form>
          </div>
        </div>
      )}

      {/* AMERICA ONLINE APPLICATION WINDOW FRAME */}
      <div className="w-full max-w-[1150px] mx-auto min-h-screen my-2 p-1.5 aol-win-box bg-[#c0c0c0] shadow-2xl flex flex-col">
        
        {/* 1. AOL Application Main Title Bar */}
        <div className="aol-[#000080]-header text-white font-bold px-2 py-1 flex items-center justify-between text-xs font-sans select-none">
          <div className="flex items-center gap-2">
            <span className="bg-yellow-400 text-black px-1 font-extrabold rounded-xs text-[10px]">WEB 1999</span>
            <span>{personalInfo.companyName} — [Bem-vindo, {personalInfo.name}!]</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={onClose} className="aol-btn px-2 py-0.5 text-[10px] bg-red-800 text-white font-bold hover:bg-red-900 border border-white" title="Retornar a 2026">
              {getText('retro1999.returnBtn', '[ ⏳ RETORNAR A 2026 ]')}
            </button>
          </div>
        </div>

        {/* Web 1.0 Marquee & GIF Banner Bar */}
        <div className="bg-yellow-300 border-b border-black text-black text-[11px] font-mono font-bold py-0.5 px-2 overflow-hidden flex items-center gap-2 select-none">
          <div className="bg-red-600 text-white px-1 text-[9px] font-mono font-black uppercase retro-blink flex items-center gap-0.5 shrink-0">
            <span>🔥 NOVO! 🔥</span>
          </div>
          <div className="retro-flag bg-gradient-to-r from-red-600 via-yellow-400 to-blue-600 text-white text-[9px] px-1.5 py-0.5 border border-black font-serif font-black flex items-center gap-1 shrink-0">
            <span>🚩 BEM-VINDO!</span>
          </div>
          <div className="aol-marquee flex-1 font-mono font-bold">
            ★★★ BEM-VINDO À PÁGINA PESSOAL DA VENDRAMINI INFORMÁTICA (WEB 1.0 — 1999) • MELHOR VISUALIZADO EM INTERNET EXPLORER 5.0 (800x600 — 256 CORES) • CONEXÃO DISCADA 56.0 Kbps ATIVA ★★★
          </div>
          <div className="flex items-center gap-1 shrink-0 font-mono text-[9px]">
            <span className="retro-spin inline-block text-xs">🌍</span>
            <span className="retro-spin inline-block text-xs">🌟</span>
            <span className="bg-blue-900 text-yellow-300 px-1">IE 5.0 ATIVO</span>
          </div>
        </div>







        {/* 5. MAIN WORKSPACE SPLIT LAYOUT (AOL Channels Sidebar + Main Content + Buddy List Panel) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-2 p-2 bg-[#d4d0c8]">

          {/* LEFT COLUMN: AOL Channels Sidebar (3 cols) */}
          <aside className="lg:col-span-3 space-y-2">
            
            {/* AOL Blue Logo Channel Box */}
            <div className="aol-win-box p-2 bg-[#000080] text-white text-center rounded-xs shadow-md">
              <div className="text-xl font-black italic tracking-tight text-white font-serif border-b border-blue-400 pb-1 mb-2">
                {personalInfo.companyName}
              </div>

              {/* AOL Channel Navigation Menu (Arial) */}
              <div className="space-y-1 text-xs text-left font-sans">
                {[
                  { id: 'web', label: 'Início', icon: '🌐' },
                  { id: 'projetos', label: 'Projetos & Dev', icon: '📁' },
                  { id: 'skills', label: 'Skills & Tech', icon: '⚡' },
                  { id: 'certificados', label: 'Certificados', icon: '📜' },
                  { id: 'trajetoria', label: 'Trajetória TI', icon: '💼' },
                  { id: 'livros', label: 'Livros & Obras', icon: '📚' },
                  { id: 'contato', label: 'Contato Direto', icon: '📞' },
                  { id: 'msdos', label: 'MS-DOS Prompt', icon: '💾' },
                  { id: 'mycomputer', label: 'Meu Computador', icon: '🖥️' }
                ].map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => setActiveTab(ch.id)}
                    className={`w-full text-left px-2 py-1 border border-slate-300 font-bold flex items-center justify-between text-xs transition-all font-sans ${
                      activeTab === ch.id
                        ? 'bg-yellow-400 text-black border-white'
                        : 'bg-[#1084d0] text-white hover:bg-blue-600'
                    }`}
                  >
                    <span>{ch.icon} {ch.label}</span>
                    <span>▸</span>
                  </button>
                ))}
              </div>
            </div>

            {/* AOL Action Big Buttons (Arial) */}
            <div className="grid grid-cols-2 gap-1.5 font-sans">
              <button 
                onClick={() => setActiveTab('contato')} 
                className="aol-btn p-2 text-center bg-[#ffffcc] hover:bg-yellow-100 flex flex-col items-center justify-center gap-1 font-sans"
              >
                <Mail className="w-5 h-5 text-red-700" />
                <span className="text-[10px] font-bold text-slate-900 leading-tight font-sans">Caixa de Entrada</span>
              </button>

              <button 
                onClick={() => {
                  setImWindowOpen(true);
                  playUhOhSound();
                }} 
                className="aol-btn p-2 text-center bg-[#e6ffe6] hover:bg-green-100 flex flex-col items-center justify-center gap-1 font-sans border-2 border-green-700"
              >
                <span className="text-base leading-none">🌸</span>
                <span className="text-[10px] font-bold text-green-950 leading-tight font-sans">ICQ 99b Online</span>
                <span className="text-[8px] font-mono text-green-800">UIN #99404199</span>
              </button>

              <button 
                onClick={toggleMidi} 
                className={`aol-btn p-2 text-center flex flex-col items-center justify-center gap-1 font-sans ${midiPlaying ? 'bg-green-200' : 'bg-[#e6ffe6]'}`}
              >
                <Music className="w-5 h-5 text-green-800" />
                <span className="text-[10px] font-bold text-slate-900 leading-tight font-sans">{midiPlaying ? 'Pausar MIDI' : 'Tocar MIDI 1999'}</span>
              </button>

              <button 
                onClick={() => setActiveTab('certificados')} 
                className="aol-btn p-2 text-center bg-[#ffe6ff] hover:bg-pink-100 flex flex-col items-center justify-center gap-1 font-sans"
              >
                <Award className="w-5 h-5 text-purple-800" />
                <span className="text-[10px] font-bold text-slate-900 leading-tight font-sans">Galeria de Fotos</span>
              </button>
            </div>

            {/* Dial-Up & Visitor Counter */}
            <div className="aol-win-box p-2 text-center bg-[#f0f0f0] text-xs space-y-1 rotate-[0.4deg]">
              <p className="font-bold text-[#000080] border-b border-slate-300 pb-1 flex items-center justify-center gap-1 font-sans">
                <span>🖥️</span>
                <span>DISCADA 56K CONECTADA</span>
              </p>
              <div className="aol-win-inset p-1 bg-black text-[#00ff00] font-mono font-bold text-base tracking-widest my-1 border-2 border-slate-600 flex items-center justify-center gap-1">
                <span className="retro-blink text-xs">📟</span>
                <span>{String(visitorCount).padStart(6, '0')}</span>
              </div>
              <p className="text-[9px] text-slate-600 font-mono">Visitantes desde 14/08/1999</p>
            </div>

            {/* 🚧 Retro Under Construction Badge */}
            <div className="aol-win-box p-1.5 bg-[#ffff00] text-center border-2 border-dashed border-red-600 font-mono font-bold text-[10px] text-red-900 rotate-[-0.6deg]">
              <div className="flex items-center justify-center gap-1">
                <span className="retro-spin">🚧</span>
                <span className="retro-blink font-black uppercase text-red-700">EM CONSTRUÇÃO</span>
                <span className="retro-spin">🚧</span>
              </div>
              <p className="leading-tight mt-0.5 text-[9px] font-verdana text-black">Página em constante atualização (1999)</p>
            </div>

            {/* ❌ Broken Netscape Download Button */}
            <button 
              onClick={() => alert("⚠️ HTTP 404 Not Found:\n\nO instalador 'netscape_communicator_47.exe' foi movido ou excluído do servidor Geocities! Tente conectar novamente via Disque-Internet.")} 
              className="aol-btn w-full py-1 text-[10px] text-red-800 font-mono font-bold hover:bg-red-100 border border-slate-500 cursor-pointer"
            >
              [ ❌ Baixar Netscape 4.7.exe ]
            </button>

          </aside>

          {/* CENTER COLUMN: Main Content Window (6 cols) */}
          <main className="lg:col-span-6 space-y-2">
            
            {/* Inner AOL Content Window */}
            <div className="aol-win-box p-1 bg-[#ffffff] min-h-[550px]">
              
              {/* Window Header */}
              <div className="aol-[#000080]-header text-white font-bold px-2 py-1 flex items-center justify-between text-xs font-sans">
                <span>Bem-vindo, Ricardo! Último Logout: 99-08-14 23:59:59</span>
              </div>

              {/* Dynamic Content Views */}
              <div className="p-3 bg-white space-y-3">
                
                {/* Banner Header */}
                <div className="border-b-2 border-[#000080] pb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-black text-[#000080] font-serif underline decoration-double">
                        Bem-vindo à Homepage Pessoal do Ricardo!
                      </h2>
                      <span 
                        className="bg-black text-[#00ff00] px-1.5 py-0.5 border border-white font-mono text-[10px] font-bold shadow-xs retro-blink cursor-help"
                        title="Anomalia Temporal: Como este domínio .DEV existia em 1999?!"
                      >
                        [ vendramini.dev ]
                      </span>
                    </div>
                    <p className="text-xs text-pink-700 italic font-comic font-bold mt-0.5">
                      "14 de Agosto de 1999 — Edição Especial Ricardo Vendramini 🌟"
                    </p>
                  </div>
                </div>

                {/* ABA 1: WELCOME / INÍCIO */}
                {activeTab === 'web' && (
                  <div className="space-y-3 text-xs">
                    
                    <div className="aol-win-box p-2.5 bg-[#ffffea] flex flex-col sm:flex-row gap-3 border-2 border-yellow-600 rotate-[-0.3deg]">
                      <img src={personalInfo.photoUrl} alt={personalInfo.name} className="w-24 h-28 object-cover aol-win-box p-0.5 bg-white shrink-0 border-2 border-black" />
                      <div className="space-y-1.5 leading-relaxed text-slate-800 font-verdana">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-sm text-[#000080] font-serif">{personalInfo.name} — {personalInfo.companyName}</p>
                          <span className="bg-red-600 text-white text-[9px] px-1 font-mono font-black uppercase retro-blink">NEW! 🔥</span>
                        </div>
                        <p className="italic text-slate-900 font-serif text-xs font-bold">"{getText('retro1999.headline1999', 'Welcome to my Personal Homepage on the Web! 🌐✨')}"</p>
                        <p className="font-verdana text-[11px] leading-normal text-slate-800">{getText('retro1999.bio1999', "Hi! I'm Ricardo! 👋 Welcome to my personal homepage! I'm a computer enthusiast and I love programming, the Internet, networks, and cool tech stuff. Check out my software projects, certifications, pictures and book collection. Don't forget to sign my Guestbook before you leave!")}</p>
                      </div>
                    </div>

                    {/* 1999 Retro Homepage Stats & My Computer Box */}
                    <div className="aol-win-box p-2.5 bg-[#e6f2ff] space-y-2 border-2 border-blue-900 shadow-sm">
                      <div className="flex items-center justify-between border-b-2 border-blue-900 pb-1">
                        <div className="flex items-center gap-1.5 font-sans font-bold text-xs text-[#000080]">
                          <span className="text-sm">💻</span>
                          <span className="font-serif text-sm">MEU COMPUTADOR & HOMEPAGE</span>
                        </div>
                        <span className="font-mono text-[9px] bg-black text-[#00ff00] px-1 py-0.5 border border-white">STAT_INFO.TXT</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 font-mono text-xs">
                        {[
                          { label: 'PÁGINAS HTML', val: '+32' },
                          { label: 'PROJETOS LEGAIS', val: '6' },
                          { label: 'SITES NA WEB', val: '+30' },
                          { label: 'DOWNLOADS', val: '18' },
                          { label: 'ANOS NA WEB', val: '+9' },
                          { label: 'LIVROS PUBLICADOS', val: '1' },
                        ].map((item, idx) => (
                          <div key={idx} className={`aol-win-box p-1.5 bg-white text-center border border-slate-400 ${idx % 2 === 0 ? 'rotate-[-0.4deg]' : 'rotate-[0.4deg]'}`}>
                            <p className="text-[9px] font-mono text-slate-600 font-bold uppercase">{item.label}</p>
                            <p className="text-sm font-black font-mono text-[#000080]">{item.val}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 🖼️ Simulação de Imagem Carregando no 56K (Slow Load 78%) */}
                    <div className="aol-win-box p-2 bg-[#f0f0f0] border border-slate-500 font-mono text-[10px] space-y-1">
                      <div className="flex justify-between font-bold text-blue-900">
                        <span>🖼️ foto_servidor_1999.jpg</span>
                        <span className="retro-blink text-red-700">Baixando 56Kbps... 78%</span>
                      </div>
                      <div className="w-full bg-slate-300 h-2 border border-slate-600 overflow-hidden">
                        <div className="bg-[#000080] h-full w-[78%] animate-pulse"></div>
                      </div>
                    </div>

                    {/* Rainbow Divider */}
                    <div className="h-1 bg-gradient-to-r from-red-500 via-yellow-400 via-green-500 via-cyan-500 to-purple-600 my-2.5"></div>

                    {/* Guestbook 1999 */}
                    <div className="aol-win-box p-3 bg-[#fdfdfd] space-y-2 border-2 border-slate-600 rotate-[0.2deg]">
                      <h3 className="font-bold text-sm text-[#000080] border-b border-black pb-1 font-serif flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4 text-blue-800" />
                        📖 Guestbook de 1999 (Assine Aqui!)
                      </h3>

                      <form onSubmit={handleGuestSubmit} className="space-y-1.5">
                        <input
                          type="text"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="Seu nome..."
                          className="w-full p-1 aol-win-inset text-xs font-comic"
                        />
                        <textarea
                          value={guestMsg}
                          onChange={(e) => setGuestMsg(e.target.value)}
                          placeholder="Sua mensagem..."
                          className="w-full p-1 aol-win-inset text-xs font-comic h-12"
                        />
                        <button type="submit" className="aol-btn px-4 py-1 text-xs text-blue-950 font-bold font-comic cursor-pointer">
                          [ Assinar Guestbook 🖊️ ]
                        </button>
                      </form>

                      <div className="space-y-1.5 pt-2 border-t border-slate-300">
                        {/* ❌ Classic 404 Image Not Found Glitch Box */}
                        <div className="aol-win-inset p-1.5 text-[10px] bg-white border border-slate-400 flex items-center gap-2">
                          <div className="w-5 h-5 bg-[#e0e0e0] border border-red-600 flex items-center justify-center text-red-600 font-mono font-bold text-xs shrink-0">
                            ❌
                          </div>
                          <span className="font-mono text-[10px] text-slate-600">
                            [ foto_encontro_devs99.gif — Erro 404: Imagem não encontrada no servidor ]
                          </span>
                        </div>

                        {guestbook.map((gb, idx) => (
                          <div key={idx} className="aol-win-inset p-1.5 text-[11px] bg-white border border-slate-400">
                            <div className="flex justify-between font-bold text-blue-900 border-b border-slate-200 pb-0.5 font-comic">
                              <span>&gt; {gb.name}</span>
                              <span className="text-[9px] text-slate-500 font-mono">{gb.date}</span>
                            </div>
                            <p className="text-slate-800 italic mt-0.5 font-comic">"{gb.text}"</p>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* ABA 2: PROJETOS */}
                {activeTab === 'projetos' && (
                  <div className="space-y-2 text-xs">
                    <h3 className="font-bold text-sm text-[#000080] border-b border-black pb-1 font-serif underline">📁 Catálogo de Projetos ({realProjects.length})</h3>
                    {realProjects.map((p, idx) => {
                      const title = p.title || p.name || 'Projeto';
                      const year = p.year || p.date || '';
                      const tag = p.tag || p.badge || p.category || '';
                      const desc = p.fullDesc || p.shortDescription || p.description || '';
                      const url = p.liveUrl || p.link;
                      return (
                        <div key={p.id || title} className={`aol-win-box p-2.5 bg-[#f8f9fa] space-y-1 border-2 border-blue-900 ${idx % 2 === 0 ? 'rotate-[-0.3deg]' : 'rotate-[0.3deg]'}`}>
                          <div className="flex justify-between font-bold text-[#000080]">
                            <span className="flex items-center gap-1.5 font-comic">
                              • {title} {year ? `(${year})` : ''}
                              {idx % 2 === 0 ? (
                                <span className="bg-red-600 text-white text-[8px] px-1 font-mono font-black uppercase retro-blink">HOT! 🌶️</span>
                              ) : (
                                <span className="bg-yellow-400 text-black text-[8px] px-1 font-mono font-black uppercase retro-blink">NEW! 🔥</span>
                              )}
                            </span>
                            {tag && <span className="text-[10px] text-pink-700 font-mono">[{tag}]</span>}
                          </div>
                          {desc && <p className="text-slate-800 text-[11px]">{desc}</p>}
                          {url && (
                            <a href={url} target="_blank" rel="noreferrer" className="aol-btn inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] text-blue-900 font-bold cursor-pointer">
                              <span>[ Acessar Projeto ]</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* ABA 3: SKILLS */}
                {activeTab === 'skills' && (
                  <div className="space-y-2 text-xs">
                    <h3 className="font-bold text-sm text-[#000080] border-b border-black pb-1 font-serif underline">⚡ Quadro de Skills ({realSkills.length})</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs border-4 border-double border-blue-900 bg-white" cellPadding="5" cellSpacing="2">
                        <thead>
                          <tr className="bg-[#000080] text-white font-bold font-comic">
                            <th className="p-1.5 text-left border border-white">TECNOLOGIA</th>
                            <th className="p-1.5 text-left border border-white">CATEGORIA</th>
                            <th className="p-1.5 text-left border border-white">DESCRIÇÃO</th>
                          </tr>
                        </thead>
                        <tbody>
                          {realSkills.map((s, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-[#ffffd0]' : 'bg-[#e6f2ff]'}>
                              <td className="p-1.5 font-bold text-[#000080] border border-slate-400 font-comic">{s.name}</td>
                              <td className="p-1.5 font-mono uppercase text-[10px] border border-slate-400 font-bold text-pink-800">{s.category}</td>
                              <td className="p-1.5 text-[11px] border border-slate-400">{s.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ABA 4: CERTIFICADOS */}
                {activeTab === 'certificados' && (
                  <div className="space-y-2 text-xs">
                    <h3 className="font-bold text-sm text-[#000080] border-b border-black pb-1">📜 Galeria de Certificados ({realCertificates.length})</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {realCertificates.map((c) => {
                        const title = c.title || c.name || 'Certificado';
                        const tag = c.tag || c.badge || c.category || '';
                        const year = c.year || c.date || '';
                        const desc = c.description || c.shortDescription || '';
                        return (
                          <div key={c.id || title} className="aol-win-box p-2 bg-[#fffffa] space-y-1">
                            <div className="flex justify-between font-bold text-[#000080]">
                              <span>{title}</span>
                              {tag && <span className="text-[9px] bg-[#000080] text-white px-1 font-mono">{tag}</span>}
                            </div>
                            {c.issuer && <p className="text-slate-700"><b>Emissor:</b> {c.issuer} {year ? `(${year})` : ''}</p>}
                            {desc && <p className="text-slate-800 text-[11px]">{desc}</p>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ABA 5: TRAJETÓRIA */}
                {activeTab === 'trajetoria' && (
                  <div className="space-y-2 text-xs">
                    <h3 className="font-bold text-sm text-[#000080] border-b border-black pb-1">💼 Linha do Tempo Corporativa</h3>
                    {timelineData.map((t, idx) => (
                      <div key={idx} className="aol-win-box p-2.5 bg-[#fdfdfd] space-y-1">
                        <div className="flex justify-between font-bold text-[#000080]">
                          <span>• {t.title}</span>
                          <span className="text-pink-800 font-mono text-[11px]">{t.year}</span>
                        </div>
                        <p className="text-slate-800 text-[11px]">{t.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* ABA 6: LIVROS */}
                {activeTab === 'livros' && (
                  <div className="space-y-2 text-xs">
                    <h3 className="font-bold text-sm text-[#000080] border-b border-black pb-1">📚 Livros & Obras ({realBooks.length})</h3>
                    {realBooks.map((b) => (
                      <div key={b.id} className="aol-win-box p-3 bg-[#f0f4ff] space-y-1.5">
                        <h4 className="font-bold text-sm text-[#000080]">{b.title}</h4>
                        {b.subtitle && <p className="italic text-slate-700">"{b.subtitle}"</p>}
                        <p className="text-slate-800">{b.synopsis || b.summary}</p>
                        {b.link && (
                          <a href={b.link} target="_blank" rel="noreferrer" className="aol-btn inline-flex items-center gap-1 px-3 py-1 text-xs text-blue-950 font-bold">
                            <span>[ Ver na Amazon / UICLAP 📖 ]</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* ABA 7: CONTATO */}
                {activeTab === 'contato' && (
                  <div className="space-y-2 text-xs">
                    <h3 className="font-bold text-sm text-[#000080] border-b border-black pb-1">📞 Canais de Contato Direto</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="aol-win-box p-3 bg-[#f4f4ff] space-y-1.5">
                        <p className="font-bold text-[#000080]">CONTATOS DIRETOS</p>
                        <p><b>Email:</b> <a href={`mailto:${personalInfo.socialLinks.email}`} className="aol-link font-mono">{personalInfo.socialLinks.email}</a></p>
                        <p><b>WhatsApp:</b> <a href={personalInfo.socialLinks.whatsapp} target="_blank" rel="noreferrer" className="aol-link font-mono">+55 19 99708-3087</a></p>
                        <p><b>GitHub:</b> <a href={personalInfo.socialLinks.github} target="_blank" rel="noreferrer" className="aol-link font-mono">{personalInfo.socialLinks.github}</a></p>
                        <p><b>LinkedIn:</b> <a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noreferrer" className="aol-link font-mono">{personalInfo.socialLinks.linkedin}</a></p>
                      </div>

                      <div className="aol-win-box p-3 bg-[#fffff0]">
                        {contactSent ? (
                          <p className="font-bold text-green-800 text-center py-4">✅ Mensagem enviada com sucesso!</p>
                        ) : (
                          <form onSubmit={handleContactSubmit} className="space-y-1.5">
                            <p className="font-bold text-[#000080]">Enviar Mensagem Direta</p>
                            <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Seu nome..." className="w-full p-1 aol-win-inset text-xs" required />
                            <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="Seu e-mail..." className="w-full p-1 aol-win-inset text-xs" required />
                            <textarea value={contactMsg} onChange={(e) => setContactMsg(e.target.value)} placeholder="Sua proposta..." className="w-full p-1 aol-win-inset text-xs h-14" required />
                            <button type="submit" className="aol-btn w-full py-1 text-xs text-blue-950 font-bold">[ Enviar Mensagem ✉️ ]</button>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ABA 8: MS-DOS */}
                {activeTab === 'msdos' && (
                  <div className="bg-black p-3 aol-win-box text-[#00ff00] font-mono min-h-[400px]">
                    <div className="border-b border-[#00ff00] pb-1 mb-2 text-xs flex justify-between">
                      <span>💾 MS-DOS 6.22 (Vendramini Prompt)</span>
                      <span>C:\WINDOWS</span>
                    </div>
                    <div ref={cliRef} className="h-72 overflow-y-auto text-xs space-y-1">
                      {cliHistory.map((l, i) => (
                        <div key={i} className="whitespace-pre">{l}</div>
                      ))}
                    </div>
                    <form onSubmit={handleCliCommand} className="flex gap-1 mt-2">
                      <input
                        type="text"
                        value={cliInput}
                        onChange={(e) => setCliInput(e.target.value)}
                        className="flex-1 bg-black text-[#00ff00] border border-[#00ff00] p-1 text-xs outline-none"
                        placeholder="Digite DIR, HELP, ABOUT..."
                      />
                      <button type="submit" className="aol-btn px-3 text-xs text-black">[ ENTER ]</button>
                    </form>
                  </div>
                )}

                {/* ABA 9: MEU COMPUTADOR (PROPRIEDADES DO SISTEMA 1999) */}
                {activeTab === 'mycomputer' && (
                  <div className="space-y-3 text-xs font-sans">
                    <h3 className="font-bold text-sm text-[#000080] border-b border-black pb-1 font-serif underline flex items-center gap-1.5">
                      <span>🖥️</span>
                      <span>Propriedades do Sistema — Meu Computador (1999)</span>
                    </h3>

                    {/* Windows 98 Style Dialog Box */}
                    <div className="aol-win-box p-3 bg-[#c0c0c0] border-2 border-white shadow-md space-y-3">
                      
                      {/* Windows 98 System Header */}
                      <div className="flex items-start gap-4 p-2.5 bg-white aol-win-inset border border-slate-500">
                        <div className="text-3xl shrink-0 p-2 bg-[#000080] text-white rounded-xs font-mono shadow-sm">🖥️</div>
                        <div className="space-y-1 text-slate-900 font-verdana">
                          <p className="font-bold text-sm font-serif text-[#000080]">Microsoft Windows 98 Segunda Edição</p>
                          <p className="text-[11px] font-mono text-slate-700">Versão 4.10.2222 A (4.10.1999)</p>
                          <p className="text-[10px] text-slate-600 font-mono">Registrado para: Ricardo Vendramini (Vendramini.DEV)</p>
                        </div>
                      </div>

                      {/* Computer Specs Card */}
                      <div className="aol-win-inset p-3 bg-[#fffff0] space-y-2 border-2 border-slate-600 font-mono text-[11px]">
                        <div className="font-bold text-[#000080] border-b border-slate-400 pb-1 flex items-center justify-between">
                          <span>⚙️ ESPECIFICAÇÕES DE HARDWARE & SISTEMA</span>
                          <span className="bg-yellow-400 text-black px-1.5 py-0.5 text-[9px] font-bold">1999 BENCHMARK</span>
                        </div>

                        <div className="space-y-1.5 leading-relaxed text-slate-900">
                          <div className="flex justify-between border-b border-dashed border-slate-300 pb-0.5">
                            <span className="font-bold">🖥️ Processador (CPU):</span>
                            <span className="text-[#000080] font-black">Intel Pentium II 350 MHz</span>
                          </div>
                          <div className="flex justify-between border-b border-dashed border-slate-300 pb-0.5">
                            <span className="font-bold">🧠 Memória RAM:</span>
                            <span className="text-[#000080] font-black">64.0 MB SDRAM (100MHz)</span>
                          </div>
                          <div className="flex justify-between border-b border-dashed border-slate-300 pb-0.5">
                            <span className="font-bold">💾 Disco Rígido (C:):</span>
                            <span className="text-[#000080] font-black">6.4 GB IDE Ultra ATA</span>
                          </div>
                          <div className="flex justify-between border-b border-dashed border-slate-300 pb-0.5">
                            <span className="font-bold">👾 Placa de Vídeo:</span>
                            <span className="text-[#000080] font-black">Trident 3D Image 9750 (4MB AGP)</span>
                          </div>
                          <div className="flex justify-between border-b border-dashed border-slate-300 pb-0.5">
                            <span className="font-bold">🔊 Placa de Som:</span>
                            <span className="text-[#000080] font-black">Sound Blaster 16 Plug & Play</span>
                          </div>
                          <div className="flex justify-between border-b border-dashed border-slate-300 pb-0.5">
                            <span className="font-bold">🌐 Conexão / Modem:</span>
                            <span className="text-[#000080] font-black">USRobotics 56K V.90 FaxModem</span>
                          </div>
                          <div className="flex justify-between border-b border-dashed border-slate-300 pb-0.5">
                            <span className="font-bold">🧭 Navegador Padrão:</span>
                            <span className="text-[#000080] font-black">Internet Explorer 5.0</span>
                          </div>
                          <div className="flex justify-between border-b border-dashed border-slate-300 pb-0.5">
                            <span className="font-bold">💿 Kit Multimídia:</span>
                            <span className="text-[#000080] font-black">CD-ROM Creative 32X Speed</span>
                          </div>
                          <div className="flex justify-between border-b border-dashed border-slate-300 pb-0.5">
                            <span className="font-bold">💾 Drive de Disquete:</span>
                            <span className="text-[#000080] font-black">1.44 MB 3.5" Floppy Disk Drive</span>
                          </div>
                        </div>
                      </div>

                      {/* Windows 98 Action Button */}
                      <div className="flex justify-end gap-2 pt-1 font-sans">
                        <button 
                          onClick={() => alert("🖥️ Diagnóstico do Windows 98: Todos os componentes de hardware estão operando em 100% de eficiência!")}
                          className="aol-btn px-4 py-1 text-xs text-blue-950 font-bold font-sans cursor-pointer"
                        >
                          [ OK / Testar Hardware ]
                        </button>
                      </div>

                    </div>
                  </div>
                )}

              </div>
            </div>

          </main>

          {/* RIGHT COLUMN: 1999 Retro Web Advertisements & Banner Ads (3 cols) */}
          <aside className="lg:col-span-3 space-y-2">
            
            {/* Retro Banner 1: Visitor #1.000.000 */}
            <div className="aol-win-box p-2 bg-[#ffff99] border-2 border-red-600 shadow-md text-center space-y-1.5 animate-pulse">
              <div className="bg-[#cc0000] text-white font-extrabold text-[10px] py-0.5 px-1 uppercase tracking-wider">
                🔥 PARABÉNS! VISITANTE #1.000.000
              </div>
              <p className="text-xs font-black text-red-700 leading-tight">
                VOCÊ GANHOU UM PALM PILOT V & DISCMAN MP3! 🎁
              </p>
              <p className="text-[10px] text-slate-800 italic">
                Sua conexão discada foi sorteada hoje!
              </p>
              <button
                onClick={() => alert("🎉 PARABÉNS! Você reivindicou o prêmio do Visitante nº 1.000.000 de 1999! Seu Palm Pilot V chegará via Correios em 5 a 10 dias úteis.")}
                className="aol-btn w-full py-1 text-[11px] bg-red-600 hover:bg-red-700 text-white font-black uppercase shadow-sm cursor-pointer"
              >
                [ CLIQUE AQUI & RESGATE GRÁTIS! ]
              </button>
            </div>

            {/* Retro Banner 2: ModemBooster 56K */}
            <div className="aol-win-box p-2 bg-[#000055] text-white text-center space-y-1.5 shadow-md">
              <div className="bg-[#00aaff] text-black font-extrabold text-[10px] py-0.5 px-1 uppercase">
                🚀 MODEM BOOSTER 99 (v3.0)
              </div>
              <p className="text-xs font-bold text-yellow-300">
                Seu Modem 56k está muito lento?
              </p>
              <p className="text-[10px] text-slate-200 leading-tight">
                Acelere o download de MP3 e páginas Web em até <b className="text-green-400">300%</b>!
              </p>
              <button
                onClick={() => alert("⚡ ModemBooster 99 ativado! Sua velocidade Dial-Up foi otimizada para 168.0 Kbps virtuais!")}
                className="aol-btn w-full py-1 text-[10px] bg-yellow-400 text-black font-bold hover:bg-yellow-300 cursor-pointer"
              >
                [ BAIXAR MODEMSPEED.EXE (120KB) ]
              </button>
            </div>

            {/* Retro Banner 3: Y2K Bug Alert */}
            <div className="aol-win-box p-2 bg-[#ffeedd] text-center space-y-1.5 border border-amber-600 shadow-md">
              <div className="bg-[#ff8800] text-white font-bold text-[10px] py-0.5 px-1 uppercase">
                ⚠️ ALERTA BUG DO MILÊNIO (Y2K)
              </div>
              <p className="text-[11px] font-bold text-amber-900 leading-tight">
                Seu PC vai parar em 31/12/1999?
              </p>
              <p className="text-[9px] text-slate-700">
                Verifique se o seu BIOS e Windows 98 são compatíveis com a virada do milênio!
              </p>
              <button
                onClick={() => alert("✅ VERIFICAÇÃO Y2K CONCLUÍDA! O sistema Ricardo.DEV é 100% à prova do Bug do Milênio!")}
                className="aol-btn w-full py-1 text-[10px] bg-amber-600 text-white font-bold hover:bg-amber-700 cursor-pointer"
              >
                [ FAZER SCAN Y2K GRATUITO 📟 ]
              </button>
            </div>

            {/* Retro Banner 4: Cursores Animados & Screensavers 3D */}
            <div className="aol-win-box p-2 bg-[#e6ffff] text-center space-y-1.5 shadow-md">
              <div className="bg-[#008888] text-white font-bold text-[10px] py-0.5 px-1 uppercase">
                🌟 CURSORES ANIMADOS & SCREENSAVERS
              </div>
              <p className="text-[11px] font-bold text-teal-900">
                Torradas Voadoras 3D & Neon Cursors
              </p>
              <p className="text-[9px] text-slate-700">
                Baixe o pacote completo com 500 cursores que piscam para o seu Windows 95/98!
              </p>
              <button
                onClick={() => alert("🌟 Pacote de Cursores 1999 instalado com sucesso no seu navegador!")}
                className="aol-btn w-full py-1 text-[10px] bg-teal-700 text-white font-bold hover:bg-teal-800 cursor-pointer"
              >
                [ INSTALAR PACOTE 3D 🖥️ ]
              </button>
            </div>

            {/* Retro Banner 5: Ganhe dinheiro navegando */}
            <div className="aol-win-box p-2 bg-[#e6ffe6] text-center space-y-1 border border-green-700 shadow-md">
              <div className="bg-[#006600] text-white font-bold text-[10px] py-0.5 px-1 uppercase">
                💵 GANHE $0.50 POR HORA NAVEGANDO
              </div>
              <p className="text-[10px] font-bold text-green-900 leading-tight">
                Instale a barra de anúncios na sua tela e receba cheques em dólares em casa!
              </p>
              <button
                onClick={() => alert("💸 Cadastro efetuado! Você receberá $0.50 por hora navegando na internet discada!")}
                className="aol-btn w-full py-1 text-[10px] bg-green-700 text-white font-bold hover:bg-green-800 cursor-pointer"
              >
                [ CADASTRAR AGORA 💸 ]
              </button>
            </div>

            {/* 🌐 WebRing de Informática 1999 com Links Azuis Sublinhados */}
            <div className="aol-win-box p-2 bg-[#fdfdfd] text-[10px] font-mono space-y-1 border border-slate-400">
              <p className="font-bold text-[#000080]">🌐 WEBRING INFORMÁTICA 1999:</p>
              <div className="flex flex-wrap gap-2 text-[9px]">
                <a href="#" onClick={(e) => { e.preventDefault(); alert("⚠️ Erro: O site parceiro 'geocities.com/siliconvalley/99' está temporariamente fora do ar!"); }} style={{ color: '#0000ee', textDecoration: 'underline' }}>[ &lt;&lt; Anterior ]</a>
                <a href="#" onClick={(e) => { e.preventDefault(); alert("🌐 Navegando para o próximo site do WebRing 1999..."); }} style={{ color: '#0000ee', textDecoration: 'underline' }}>[ Próximo &gt;&gt; ]</a>
                <a href="#" onClick={(e) => { e.preventDefault(); alert("🎲 Site Aleatório do WebRing selecionado!"); }} style={{ color: '#551a8b', textDecoration: 'underline' }}>[ Aleatório 🎲 ]</a>
              </div>
            </div>

            {/* Badges 88x31 Retrô Clássicos Web 1.0 */}
            <div className="aol-win-box p-2 bg-[#ffffeb] text-[9px] font-mono font-bold space-y-1 text-center">
              <div className="p-1 bg-[#000080] text-yellow-300 border border-white flex items-center justify-center gap-1 shadow-sm">
                <span className="retro-spin text-xs">🌐</span>
                <span>Melhor visualizado em IE 5.0</span>
              </div>
              <div className="p-1 bg-[#005500] text-white border border-white flex items-center justify-center gap-1 shadow-sm">
                <span>💻</span>
                <span>Otimizado para 800x600 — 256 Cores</span>
              </div>
              <div 
                onClick={() => setActiveTab('contato')}
                className="p-1 bg-[#880000] text-white border border-white flex items-center justify-center gap-1 cursor-pointer hover:bg-red-800 shadow-sm"
              >
                <span className="retro-blink text-yellow-300">✉️</span>
                <span className="retro-blink">ENVIAR E-MAIL AGORA!</span>
              </div>
            </div>

          </aside>

        </div>

        {/* 6. AOL Windows 95/98 Bottom Status Bar */}
        <footer className="aol-win-box mt-1 p-1 bg-[#c0c0c0] text-[10px] font-mono flex flex-col sm:flex-row justify-between items-center text-slate-700">
          <div>
            {getText('retro1999.footer.connected', '🌐 Connected to Vendramini Informática (Web 1.0) • Dial-Up 56.0 Kbps • TCP/IP Protocol Active')}
          </div>
          <div>
            © 1999 {personalInfo.name} — {getText('retro1999.footer.session', 'Vendramini Informática Interactive Session.')}
          </div>
        </footer>

      </div>
    </div>
  );
}
