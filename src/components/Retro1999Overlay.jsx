import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, AlertTriangle, Send, RefreshCw, ChevronLeft, ChevronRight, MessageSquare, ExternalLink } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Retro1999Overlay({ isOpen, onClose }) {
  const [visitorCount, setVisitorCount] = useState(1337);
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestMsg, setGuestMsg] = useState('');
  const [guestbook, setGuestbook] = useState([
    { name: 'João (Dev)', text: 'Muito legal o seu site! Lembrou os velhos tempos da internet discada!', date: '08/08/1999' },
    { name: 'Ana', text: 'Como você fez esses botões em 3D? Que incrível!', date: '09/08/1999' },
    { name: 'Ricardo', text: 'Eu não lembro de ter colocado isso aqui... Pelo visto a máquina do tempo funcionou.', date: '14/08/1999' }
  ]);

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
          <a href="#hero" className="retro-btn px-3 py-1 text-black">INÍCIO</a>
          <a href="#sobre" className="retro-btn px-3 py-1 text-black">SOBRE MIM</a>
          <a href="#projetos" className="retro-btn px-3 py-1 text-black">PROJETOS</a>
          <a href="#livros" className="retro-btn px-3 py-1 text-black">LIVROS</a>
          <a href="#guestbook" className="retro-btn px-3 py-1 text-black">GUESTBOOK</a>
          <button onClick={onClose} className="retro-btn px-3 py-1 text-red-700 bg-yellow-200">
            [ RESTAURAR 2026 🔄 ]
          </button>
        </nav>

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
