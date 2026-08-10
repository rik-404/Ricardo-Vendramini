import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, AlertTriangle, Send, RefreshCw, ChevronLeft, ChevronRight, MessageSquare, ExternalLink } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Retro1999Overlay({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState(() => {
    try {
      return localStorage.getItem('ricardodev_1999_tab') || 'web';
    } catch { return 'web'; }
  });
  const [visitorCount, setVisitorCount] = useState(1337);
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestMsg, setGuestMsg] = useState('');
  const [guestbook, setGuestbook] = useState([
    { name: 'Dante', text: 'Se você está lendo isso, eu já estive aqui antes de você.', date: '14/08/1999' },
    { name: 'João (Dev)', text: 'Muito legal o seu site! Lembrou os velhos tempos da internet discada!', date: '08/08/1999' },
    { name: 'Ana', text: 'Como você fez esses botões em 3D? Que incrível!', date: '09/08/1999' },
    { name: 'Ricardo', text: 'Eu não lembro de ter colocado isso aqui... Pelo visto a máquina do tempo funcionou.', date: '14/08/1999' }
  ]);

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
        ' Volume Serial Number is 1999-1998',
        ' Directory of C:\\RICARDO',
        '',
        '.              <DIR>        14-08-1999  10:00',
        '..             <DIR>        14-08-1999  10:00',
        'PROJETOS       <DIR>        14-08-1999  10:00',
        'LIVROS         <DIR>        14-08-1999  10:00',
        'CONTATO    TXT          256  14-08-1999  10:00',
        'SOBRE      TXT         1024  14-08-1999  10:00',
        'README     TXT          512  14-08-1999  10:00',
        '        3 arquivo(s)         1.792 bytes',
        '        2 diretorio(s)    52.428.800 bytes livres',
        ''
      );
    } else if (cmd === 'cls') {
      setCliHistory(['C:\\RICARDO>']);
      setCliInput('');
      return;
    } else if (cmd === 'help') {
      newHistory.push(
        'Comandos disponiveis:',
        '',
        '  DIR      - Lista arquivos e diretorios',
        '  CLS      - Limpa a tela',
        '  HELP     - Mostra esta ajuda',
        '  VER      - Mostra versao do MS-DOS',
        '  DATE     - Mostra a data atual',
        '  TIME     - Mostra a hora atual',
        '  ECHO     - Exibe uma mensagem',
        '  ABOUT    - Sobre Ricardo Vendramini',
        '  EXIT     - Volta para o site 1999',
        ''
      );
    } else if (cmd === 'ver') {
      newHistory.push('', 'MS-DOS Versao 6.22', '');
    } else if (cmd === 'date') {
      newHistory.push('Data atual: 14/08/1999 (como nos bons tempos!)', '');
    } else if (cmd === 'time') {
      newHistory.push('Hora atual: 23:59:59 (sempre noite na internet discada!)', '');
    } else if (cmd.startsWith('echo ')) {
      newHistory.push(cliInput.substring(5), '');
    } else if (cmd === 'echo') {
      newHistory.push('');
    } else if (cmd === 'about') {
      newHistory.push(
        '',
        '╔══════════════════════════════════════════════╗',
        '║  RICARDO VENDRAMINI                         ║',
        '║  Desenvolvedor & Escritor                    ║',
        '║                                              ║',
        '║  "Navegando pela web desde 1999!"            ║',
        '║                                              ║',
        '║  Site: ricardodev.com.br                     ║',
        '╚══════════════════════════════════════════════╝',
        ''
      );
    } else if (cmd === 'matrix') {
      setMatrixMode(true);
      newHistory.push('', '> Ativando Matrix... Preparando codigo fonte...', '');
    } else if (cmd === 'breakout') {
      setPlayMode(true);
      newHistory.push('', '> Carregando Breakout 8-bit...', '> Use as setas ← → para mover a raquete', '');
    } else if (cmd === 'timewalker') {
      newHistory.push('', '> PROTOCOLO TIMEWALKER ATIVADO!', '> Viajando de volta para 2026...', '');
      setTimeout(() => {
        onClose();
      }, 1500);
    } else if (cmd === 'exit') {
      onClose();
      return;
    } else if (cmd !== '') {
      newHistory.push(`Comando nao encontrado: ${cliInput}`, 'Digite HELP para ver os comandos disponiveis.', '');
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

  return (
    <div className="fixed inset-0 z-[999999] overflow-y-auto bg-[#c0c0c0] font-serif text-black selection:bg-[#000080] selection:text-white" style={{ cursor: 'auto' }}>
      
      {/* Retrô CSS overrides inline for pure 1999 Web 1.0 */}
      <style>{`
        .retro-box {
          background: #c0c0c0;
          border-top: 2px solid #ffffff;
          border-left: 2px solid #ffffff;
          border-right: 2px solid #404040;
          border-bottom: 2px solid #404040;
        }
        .retro-box-inset {
          background: #ffffff;
          border-top: 2px solid #404040;
          border-left: 2px solid #404040;
          border-right: 2px solid #ffffff;
          border-bottom: 2px solid #ffffff;
        }
        .retro-btn {
          background: #c0c0c0;
          border-top: 2px solid #ffffff;
          border-left: 2px solid #ffffff;
          border-right: 2px solid #404040;
          border-bottom: 2px solid #404040;
          font-family: 'Times New Roman', serif;
          font-weight: bold;
          cursor: pointer;
        }
        .retro-btn:active {
          border-top: 2px solid #404040;
          border-left: 2px solid #404040;
          border-right: 2px solid #ffffff;
          border-bottom: 2px solid #ffffff;
        }
        .retro-marquee {
          overflow: hidden;
          white-space: nowrap;
          box-sizing: border-box;
          animation: marqueeSlow 18s linear infinite;
        }
        @keyframes marqueeSlow {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .retro-link {
          color: #0000ee;
          text-decoration: underline;
        }
        .retro-link:visited {
          color: #551a8b;
        }
        .retro-link:active {
          color: #ff0000;
        }
      `}</style>

      {/* Pop-up de alerta de erro Horrível do Windows 95/98 */}
      {!alertDismissed && (
        <div className="fixed inset-0 z-[1000000] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm retro-box p-1 shadow-2xl">
            <div className="bg-[#000080] text-white font-bold px-2 py-1 flex items-center justify-between text-xs font-sans">
              <span>⚠️ AVISO AO VISITANTE DA INTERNET</span>
              <button onClick={() => setAlertDismissed(true)} className="px-1 text-xs bg-[#c0c0c0] text-black font-bold border border-white">X</button>
            </div>
            <div className="p-4 flex items-start gap-3">
              <AlertTriangle className="w-8 h-8 text-yellow-500 shrink-0" />
              <div className="text-xs font-sans text-black leading-relaxed">
                <p className="font-bold mb-1">ATENÇÃO!</p>
                <p>Este site contém scripts em <b>JavaScript habilitado</b> e efeitos visuais avançados de 1999.</p>
                <p className="mt-2 text-slate-700">Você está preparado para navegar na web discada?</p>
              </div>
            </div>
            <div className="p-2 flex justify-center bg-[#c0c0c0]">
              <button
                onClick={() => setAlertDismissed(true)}
                className="retro-btn px-6 py-1 text-xs"
              >
                [ OK ]
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Container Principal de 800px Centralizado */}
      <div className="max-w-[820px] mx-auto min-h-screen my-4 p-2 bg-[#ffffff] border-4 border-double border-[#000080] shadow-2xl">

        {/* 1. Header do Site 1999 */}
        <header className="retro-box p-3 text-center mb-2 bg-[#ffffcc]">
          <div className="flex justify-between items-center text-[11px] font-mono border-b border-black pb-1 mb-2 text-slate-700">
            <span>★ EST. 1999 ★</span>
            <span className="font-bold text-[#000080]">RICARDO VENDRAMINI'S HOMEPAGE</span>
            <span className="text-red-600 font-mono">[ SYSTEM TIME: 2026 ]</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#000080] font-sans tracking-wide mb-1">
            RICARDO'S HOME PAGE
          </h1>
          <p className="text-xs font-serif italic text-pink-700">
            "Bem-vindo ao meu cantinho pessoal na Web 1.0! — Atualizado em 14/08/1999"
          </p>

          {/* Banner Fake Marquee */}
          <div className="retro-box-inset mt-3 p-1 bg-black text-[#00ff00] font-mono text-xs overflow-hidden">
            <div className="retro-marquee font-bold">
              &gt;&gt;&gt; BEM-VINDO AO SITE OFICIAL DE RICARDO VENDRAMINI! ★ VOCÊ ESTÁ NAVEGANDO PELA INTERNET DE 1999 ★ !!! NOVO !!! VISITE MINHA PÁGINA DE PROJETOS E LIVROS !!! &lt;&lt;&lt;
            </div>
          </div>
        </header>

        {/* Menu de Navegação em Botões 3D */}
        <nav className="flex flex-wrap justify-center gap-1 mb-3 p-1 bg-[#c0c0c0] retro-box text-xs">
          <button 
            onClick={() => setActiveTab('web')} 
            className={`retro-btn px-3 py-1 ${activeTab === 'web' ? 'bg-[#000080] text-white' : 'text-black'}`}
          >
            🌐 SITE 1999
          </button>
          <button 
            onClick={() => setActiveTab('msdos')} 
            className={`retro-btn px-3 py-1 ${activeTab === 'msdos' ? 'bg-[#000080] text-white' : 'text-black'}`}
          >
             💾 MS-DOS
           </button>
         </nav>

        {/* Conteúdo baseado na aba ativa */}
        {activeTab === 'web' ? (
          <>
            {/* 2. Grid de Conteúdo com Barra Lateral e Conteúdo */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              
              {/* Coluna Esquerda: Contador & Placas Retrô */}
              <aside className="md:col-span-1 space-y-2">
                
                {/* Box Contador de Visitantes */}
                <div className="retro-box p-2 text-center bg-[#ffff99]">
                  <p className="text-[10px] font-bold font-sans uppercase">VOCÊ É O VISITANTE</p>
                  <div className="retro-box-inset my-1 py-1 px-2 bg-black text-[#00ff00] font-mono font-bold text-lg tracking-widest">
                    {String(visitorCount).padStart(6, '0')}
                  </div>
                  <p className="text-[9px] italic">desde 14/08/1999</p>
                </div>

                {/* GIF Em Construção */}
                <div className="retro-box p-2 text-center bg-[#ffcccc]">
                  <div className="text-2xl mb-1">🚧 🚧 🚧</div>
                  <p className="font-bold text-xs text-red-800 uppercase font-sans animate-pulse">SITE EM CONSTRUÇÃO</p>
                  <p className="text-[10px] text-slate-800 mt-1 leading-snug">
                    "Volte em breve! Estou trabalhando neste site desde 1999."
                  </p>
                </div>

                {/* WebRing 1999 */}
                <div className="retro-box p-2 text-center bg-[#e6e6ff] text-xs">
                  <p className="font-bold border-b border-black pb-1 mb-1 text-[#000080]">WEB RING 1999</p>
                  <p className="text-[10px] text-slate-700 mb-1">Ring dos Desenvolvedores Perdidos</p>
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="retro-link cursor-pointer">◀ Anterior</span>
                    <span>|</span>
                    <span className="retro-link cursor-pointer">Próximo ▶</span>
                  </div>
                </div>

                {/* Recomendações & Plaquinhas */}
                <div className="retro-box p-2 text-center text-[10px]">
                  <p className="font-bold text-blue-900 border-b border-black pb-1 mb-1">MELHOR VISUALIZADO EM:</p>
                  <p className="font-mono text-slate-800">[ Internet Explorer 5.0 ]</p>
                  <p className="font-mono text-slate-800">[ Netscape Navigator ]</p>
                  <p className="text-[9px] mt-1 text-slate-600">Resolução: 800 × 600</p>
                </div>

              </aside>

              {/* Coluna Principal */}
              <main className="md:col-span-3 space-y-3">
                
                {/* Box Bem-Vindo */}
                <section className="retro-box p-3 bg-[#f0f0f0]">
                  <h2 className="text-base font-bold text-[#000080] border-b-2 border-[#000080] pb-1 mb-2 font-sans flex items-center justify-between">
                    <span>BEM-VINDO AO MEU SITE PESSOAL DE 1999!</span>
                    <span className="text-xs text-pink-600 font-mono">NEW!</span>
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <img
                      src={personalInfo.photoUrl}
                      alt={personalInfo.name}
                      className="w-28 h-32 object-cover retro-box p-1 bg-white"
                    />
                    <div className="text-xs space-y-2 text-slate-800">
                      <p>
                        Olá! Meu nome é <b>Ricardo Vendramini</b>. Sou um apaixonado por programação, hardware, computadores e escrita.
                      </p>
                      <p>
                        Esta é a minha página pessoal hospedada na web dos anos 90! Aqui você encontra meus programas, contatos e novidades da saga de livros <i>Timewalker</i>.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Seção Meus Projetos */}
                <section id="projetos" className="retro-box p-3 bg-[#ffffff]">
                  <h3 className="text-sm font-bold text-[#000080] border-b border-black pb-1 mb-2 font-sans">
                    📂 MINHA PASTA DE PROJETOS & SOFTWARES
                  </h3>
                  <ul className="text-xs space-y-1.5 list-disc pl-4">
                    <li><a href="https://vendraminiinformatica.com.br/" target="_blank" rel="noreferrer" className="retro-link font-bold">Vendramini Informática</a> — Assistência Técnica e Soluções Digitais.</li>
                    <li><a href="https://c4t4t4ueletronicos.vercel.app/" target="_blank" rel="noreferrer" className="retro-link font-bold">C4T4T4U Eletrônicos</a> — Orçamentos e Ordens de Serviço (O.S.).</li>
                    <li><a href="https://elitehousepiracicaba.com.br" target="_blank" rel="noreferrer" className="retro-link font-bold">Elite House Piracicaba</a> — Plataforma Imobiliária & CRM.</li>
                    <li><a href="https://ciganamorgana.vercel.app/" target="_blank" rel="noreferrer" className="retro-link font-bold">Cigana Morgana</a> — Consultoria Mística & Oráculos.</li>
                  </ul>
                </section>

                {/* Seção Guestbook 1999 */}
                <section id="guestbook" className="retro-box p-3 bg-[#ffffeb]">
                  <h3 className="text-sm font-bold text-[#000080] border-b border-black pb-1 mb-2 font-sans flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-800" />
                    📖 ASSINE MEU GUESTBOOK DE 1999
                  </h3>

                  <form onSubmit={handleGuestSubmit} className="space-y-2 mb-3 text-xs">
                    <div>
                      <label className="block font-bold mb-0.5">Seu nome:</label>
                      <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="Ex: Visitante..."
                        className="w-full p-1 retro-box-inset text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-0.5">Deixe uma mensagem:</label>
                      <textarea
                        value={guestMsg}
                        onChange={(e) => setGuestMsg(e.target.value)}
                        placeholder="Escreva algo legal no meu livro de visitas..."
                        className="w-full p-1 retro-box-inset text-xs font-mono h-14"
                      />
                    </div>
                    <button type="submit" className="retro-btn px-4 py-1 text-xs">
                      [ ASSINAR GUESTBOOK 🖊️ ]
                    </button>
                  </form>

                  {/* Mensagens do Guestbook */}
                  <div className="space-y-2 border-t border-slate-400 pt-2">
                    <p className="font-bold text-[11px] text-slate-700">Últimas assinaturas no Guestbook:</p>
                    {guestbook.map((gb, idx) => (
                      <div key={idx} className="retro-box-inset p-2 text-xs bg-white">
                        <div className="flex justify-between font-bold text-blue-900 border-b border-slate-200 pb-0.5 mb-1">
                          <span>&gt; {gb.name}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{gb.date}</span>
                        </div>
                        <p className="text-slate-800 italic">"{gb.text}"</p>
                      </div>
                    ))}
                  </div>
                </section>

              </main>
            </div>
          </>
        ) : (
          /* Aba MS-DOS - Tela inteira preta estilo terminal */
          <div className="bg-black min-h-[500px] p-4 retro-box relative">
            {/* Matrix Effect Overlay */}
            {matrixMode && (
              <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
                <MatrixPixelado />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
                  <button 
                    onClick={() => setMatrixMode(false)}
                    className="retro-btn px-6 py-2 text-xs text-black bg-[#003300] border border-[#00ff00] hover:bg-[#004400]"
                  >
                    [ FECHAR MATRIX ]
                  </button>
                </div>
              </div>
            )}

            {/* Play Mode - Breakout 8-bit */}
            {playMode && (
              <div className="absolute inset-0 z-10 overflow-hidden bg-[#0f380f]">
                <BreakoutGameboy onExit={() => setPlayMode(false)} />
              </div>
            )}
            
            {/* Header MS-DOS */}
            <div className="flex items-center justify-between mb-3 border-b border-[#00ff00] pb-2">
              <h2 className="text-lg font-bold text-[#00ff00] font-mono flex items-center gap-2">
                💾 MICROSOFT MS-DOS 6.22 — Prompt
              </h2>
              <span className="text-[10px] text-[#00ff00] font-mono">C:\WINDOWS\SYSTEM</span>
            </div>
            
            {/* Terminal */}
            <div 
              ref={cliRef}
              className="h-96 overflow-y-auto font-mono text-sm text-[#00ff00] bg-black p-3 border border-[#00ff00]"
            >
              {cliHistory.map((line, i) => (
                <div key={i} className="whitespace-pre">{line}</div>
              ))}
            </div>
            
            {/* Input */}
            <form onSubmit={handleCliCommand} className="mt-3 flex items-center gap-2">
              <input
                type="text"
                value={cliInput}
                onChange={(e) => setCliInput(e.target.value)}
                className="flex-1 p-2 bg-black text-[#00ff00] font-mono text-sm border border-[#00ff00] focus:outline-none focus:border-[#00ff00]"
                placeholder="Digite um comando..."
                autoFocus
              />
              <button type="submit" className="retro-btn px-4 py-2 text-xs text-black">
                [ ENTER ]
              </button>
            </form>
            
            {/* Dicas */}
            <div className="mt-3 text-[10px] text-[#00ff00] font-mono border-t border-[#00ff00] pt-2">
              <p>💡 Comandos: DIR, HELP, VER, DATE, TIME, ECHO, ABOUT, MATRIX, CLS, EXIT</p>
            </div>
          </div>
        )}

        {/* 3. Rodapé de Barra de Status do Windows 95/98 */}
        <footer className="retro-box mt-3 p-2 bg-[#c0c0c0] text-[11px] font-sans">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 border-b border-slate-500 pb-2 mb-2">
            <div className="flex items-center gap-2 font-mono">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-ping inline-block" />
              <span>🌐 Conectado via Dial-Up (56kbps) • Visitante nº {String(visitorCount).padStart(6, '0')}</span>
            </div>
            <span className="font-mono text-slate-700">Última atualização: 14/08/1999</span>
          </div>

          <div className="flex flex-wrap justify-between items-center text-[10px] text-slate-700 font-mono">
            <div>
              🔥 100% HTML &nbsp;|&nbsp; 🔥 100% CSS &nbsp;|&nbsp; 🔥 100% JS &nbsp;|&nbsp; 🔥 0% Bom Senso
            </div>
            <div>
              © 1999 Ricardo Vendramini — All rights reserved.
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}

/* Matrix Pixelado - Easter Egg visual estilo 1999 */
function MatrixPixelado() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Pixelado: usar pixelSize grande
    const pixelSize = 8;
    const cols = Math.floor(window.innerWidth / pixelSize);
    const rows = Math.floor(window.innerHeight / pixelSize);

    canvas.width = cols * pixelSize;
    canvas.height = rows * pixelSize;

    // Caracteres Matrix (katakana + numeros)
    const chars = 'ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ0123456789ABCDEF';
    const charArr = chars.split('');

    // Colunas de chuva
    const drops = new Array(cols).fill(0);
    const speeds = new Array(cols).fill(0).map(() => Math.random() * 0.5 + 0.3);

    const draw = () => {
      // Fade preto com transparencia
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${pixelSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Char aleatorio
        const char = charArr[Math.floor(Math.random() * charArr.length)];
        const x = i * pixelSize;
        const y = drops[i] * pixelSize;

        // Cor verde com variaçao de brilho
        const brightness = Math.random();
        if (brightness > 0.95) {
          ctx.fillStyle = '#ffffff'; // Branco (destaque)
        } else if (brightness > 0.7) {
          ctx.fillStyle = '#00ff41'; // Verde claro
        } else {
          ctx.fillStyle = '#00cc33'; // Verde escuro
        }

        // Pixelado: desenhar quadrado ao inves de texto
        ctx.fillRect(x, y, pixelSize - 1, pixelSize - 1);
        
        // Char no centro do pixel
        ctx.fillStyle = '#000000';
        ctx.fillText(char, x + 1, y + pixelSize - 2);

        // Reset quando chega no fim
        if (drops[i] * pixelSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += speeds[i];
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div className="absolute inset-0 bg-black">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        style={{ imageRendering: 'pixelated' }}
      />
      {/* Overlay titulo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-center z-20">
        <h1 className="text-4xl font-bold text-[#00ff41] font-mono animate-pulse drop-shadow-[0_0_20px_#00ff41]">
          THE MATRIX
        </h1>
        <p className="text-sm text-[#00cc33] font-mono mt-2">
          "Siga o coelho branco..."
        </p>
        <p className="text-xs text-[#009926] font-mono mt-4">
          - RICARDO VENDRAMINI, 1999 -
        </p>
      </div>
    </div>
  );
}

/* Breakout 8-bit Gameboy Style */
function BreakoutGameboy({ onExit }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const keysRef = useRef({});
  const gameRef = useRef({
    paddle: { x: 170, w: 60, h: 8 },
    ball: { x: 200, y: 280, dx: 3, dy: -3, r: 4 },
    bricks: [],
    score: 0,
    lives: 3,
    running: true,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = 400;
    const H = 320;
    canvas.width = W;
    canvas.height = H;

    // Cores Gameboy (4 tons de verde)
    const COLORS = {
      bg: '#0f380f',
      dark: '#306230',
      mid: '#8bac0f',
      light: '#9bbc0f',
    };

    // Criar blocos
    const g = gameRef.current;
    const brickRows = 5;
    const brickCols = 8;
    const brickW = 44;
    const brickH = 12;
    const brickPad = 4;
    const brickOffsetX = 12;
    const brickOffsetY = 40;
    const rowColors = [COLORS.light, COLORS.mid, COLORS.dark, COLORS.light, COLORS.mid];

    g.bricks = [];
    for (let r = 0; r < brickRows; r++) {
      for (let c = 0; c < brickCols; c++) {
        g.bricks.push({
          x: brickOffsetX + c * (brickW + brickPad),
          y: brickOffsetY + r * (brickH + brickPad),
          w: brickW,
          h: brickH,
          color: rowColors[r],
          alive: true,
        });
      }
    }

    const handleKey = (e) => {
      keysRef.current[e.key] = e.type === 'keydown';
    };
    window.addEventListener('keydown', handleKey);
    window.addEventListener('keyup', handleKey);

    const drawPixel = (x, y, w, h, color) => {
      ctx.fillStyle = color;
      ctx.fillRect(Math.floor(x), Math.floor(y), w, h);
    };

    const drawText = (text, x, y, color) => {
      ctx.fillStyle = color;
      ctx.font = '10px monospace';
      ctx.fillText(text, x, y);
    };

    const resetBall = () => {
      g.ball.x = W / 2;
      g.ball.y = H - 40;
      g.ball.dx = 3 * (Math.random() > 0.5 ? 1 : -1);
      g.ball.dy = -3;
    };

    const gameLoop = () => {
      if (!g.running) return;

      // Movimento da raquete
      if (keysRef.current['ArrowLeft'] && g.paddle.x > 0) {
        g.paddle.x -= 5;
      }
      if (keysRef.current['ArrowRight'] && g.paddle.x < W - g.paddle.w) {
        g.paddle.x += 5;
      }

      // Movimento da bola
      g.ball.x += g.ball.dx;
      g.ball.y += g.ball.dy;

      // Colisão com paredes
      if (g.ball.x <= 0 || g.ball.x >= W) g.ball.dx *= -1;
      if (g.ball.y <= 0) g.ball.dy *= -1;

      // Colisão com raquete
      if (
        g.ball.y + g.ball.r >= H - 20 &&
        g.ball.x >= g.paddle.x &&
        g.ball.x <= g.paddle.x + g.paddle.w &&
        g.ball.dy > 0
      ) {
        g.ball.dy *= -1;
        const hit = (g.ball.x - g.paddle.x) / g.paddle.w;
        g.ball.dx = 4 * (hit - 0.5);
      }

      // Colisão com blocos
      for (const brick of g.bricks) {
        if (!brick.alive) continue;
        if (
          g.ball.x + g.ball.r > brick.x &&
          g.ball.x - g.ball.r < brick.x + brick.w &&
          g.ball.y + g.ball.r > brick.y &&
          g.ball.y - g.ball.r < brick.y + brick.h
        ) {
          brick.alive = false;
          g.ball.dy *= -1;
          g.score += 10;
          break;
        }
      }

      // Bola caiu
      if (g.ball.y > H) {
        g.lives--;
        if (g.lives <= 0) {
          g.running = false;
        } else {
          resetBall();
        }
      }

      // Victoria
      if (g.bricks.every((b) => !b.alive)) {
        g.running = false;
      }

      // Draw
      ctx.fillStyle = COLORS.bg;
      ctx.fillRect(0, 0, W, H);
      
      drawText(`SCORE: ${g.score}`, 10, 15, COLORS.light);
      drawText(`LIVES: ${g.lives}`, W - 80, 15, COLORS.light);

      // Raquete
      drawPixel(g.paddle.x, H - 20, g.paddle.w, g.paddle.h, COLORS.light);

      // Bola
      drawPixel(g.ball.x - g.ball.r, g.ball.y - g.ball.r, g.ball.r * 2, g.ball.r * 2, COLORS.light);

      // Blocos
      for (const brick of g.bricks) {
        if (brick.alive) {
          drawPixel(brick.x, brick.y, brick.w, brick.h, brick.color);
        }
      }

      // Game over
      if (!g.running) {
        const won = g.bricks.every((b) => !b.alive);
        drawText(won ? 'VOCE VENCEU!' : 'GAME OVER', W / 2 - 40, H / 2, COLORS.light);
        drawText('Pressione ENTER para sair', W / 2 - 70, H / 2 + 20, COLORS.mid);
      }

      animRef.current = requestAnimationFrame(gameLoop);
    };

    const handleEnter = (e) => {
      if (e.key === 'Enter' && !g.running) {
        onExit();
      }
    };
    window.addEventListener('keydown', handleEnter);

    gameLoop();

    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('keydown', handleEnter);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [onExit]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0f380f]">
      <div className="mb-2 text-[#9bbc0f] font-mono text-sm font-bold">
        BREAKOUT 8-BIT
      </div>
      <canvas
        ref={canvasRef}
        className="border-4 border-[#306230]"
        style={{ imageRendering: 'pixelated' }}
      />
      <button
        onClick={onExit}
        className="mt-3 px-4 py-1 text-xs text-[#0f380f] bg-[#9bbc0f] font-mono font-bold hover:bg-[#8bac0f]"
      >
        [ SAIR ]
      </button>
    </div>
  );
}
