# 🚀 Ricardo Vendramini — Web Portfolio & Gamified CLI Experience

[![React 18](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4.14-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.18.2-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

> **Portfólio Interativo, Plataforma Institucional & Sistema Gamificado de Conquistas**  
> Desenvolvido por **Ricardo Vendramini** (Líder de Tecnologia & Fundador da Vendramini Informática).

---

## 🌟 Visão Geral

Este projeto é mais do que um portfólio profissional tradicional: é uma **experiência digital imersiva** projetada com estética *cyberpunk/glassmorphism*, animações a 60fps em HTML5 Canvas, um **terminal CLI interativo** integrado com minijogo arcade e um **sistema gamificado de segredos e conquistas (Easter Eggs)**.

- 🔗 **Website Oficial**: [vendraminiinformatica.com.br](https://vendraminiinformatica.com.br/)
- 👨‍💻 **GitHub**: [@rik-404](https://github.com/rik-404)

---

## ✨ Recursos & Diferenciais

### 1. 🖥️ Terminal CLI Interativo & Minijogo Arcade
- **CLI funcional** no próprio site com suporte a diversos comandos de sistema (`help`, `sobre`, `skills`, `projetos`, `livros`, `contato`, `clear`, `reset`).
- **Space Invaders Arcade (`navinha`)**: Minijogo de nave 2D em HTML5 Canvas renderizado dentro da própria janela do terminal com suporte a teclado e controles mobile.
- **Efeitos de Sistema**: Protocolo Matrix (`matrix`), Efeito de Terremoto 3D (`tilt`), e Acesso Root simulado com recado post-it e Rickroll (`root`).

### 2. 🏆 Sistema Gamificado de Conquistas & Segredos
- **7 Conquistas Ocultas**: Segredos espalhados pelo site e terminal (Caçador de Bugs, Tenha Raiva de Mim, Código Konami, Protocolo Matrix, Arcade Space Invaders, Acesso Root, Modo Tilt).
- **Galeria Modal com Abas**: Filtros por *Todas*, *Liberadas* e *Bloqueadas*, barra de progresso visual, selos de status e notificações com áudio em Web Audio API.
- **Dicas Ocultas com Revelação**: Botão de olho (`Eye` / `EyeOff`) para revelar/esconder dicas enigmáticas das conquistas bloqueadas.
- **Reset do Progresso**: Comando `reset` no terminal para zerar e permitir jogar a experiência de novo.

### 3. 🎨 Design System & Estética Cyberpunk
- Estilização moderna com **Glassmorphism**, gradientes neons adaptativos em HSL/RGB, modo escuro profundo (`#040705`) e partículas interativas.
- Cursor customizado reativo com animações suaves e interações especiais.
- Modais completos de detalhes de projetos, catálogo total de tecnologias, biografia de liderança e publicações de livros.

---

## 🛠️ Tecnologias Utilizadas

### Core & Frameworks
- **React 18**: Construção de componentes reativos e gerenciamento de estado.
- **Vite 5**: Bundler e servidor de desenvolvimento ultrarrápido.
- **Tailwind CSS 3**: Sistema de design utilitário de alta performance.
- **Framer Motion 11**: Animações de transição, modais e scroll reativo.
- **Lucide React**: Biblioteca de ícones vetoriais modernos.
- **Canvas API 2D**: Renderização do starfield, efeito Matrix e jogo Arcade a 60fps.
- **Web Audio API**: Efeitos sonoros sintéticos para notificações de conquista e ruídos de inseto.

---

## 📁 Estrutura de Arquivos

```
sites/ricardo-vendramini/
├── src/
│   ├── components/
│   │   ├── AchievementsModal.jsx      # Modal de conquistas com abas e dicas
│   │   ├── AchievementsSection.jsx    # Seção principal de marcos e feitos
│   │   ├── AchievementToast.jsx      # Notificação flutuante de conquista desbloqueada
│   │   ├── FlyEasterEgg.jsx           # Animação interativa da mosquinha no Hero
│   │   ├── HeroCanvas.jsx             # Fundo de partículas e efeito chuva Matrix
│   │   ├── HeroSection.jsx            # Apresentação inicial do portfólio
│   │   ├── Navbar.jsx                 # Cabeçalho flutuante com suporte a glitching
│   │   ├── TerminalSection.jsx        # CLI interativo e jogo Arcade Space Invaders
│   │   └── ...                        # Demais modais e seções de conteúdo
│   ├── data/
│   │   └── portfolioData.js           # Arquivo centralizado de dados do portfólio
│   ├── App.jsx                        # Layout raiz, estados globais e rotas
│   ├── index.css                      # Estilos base, animações e utilities Tailwind
│   └── main.jsx                       # Ponto de entrada React
├── package.json
└── vite.config.js
```

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- **Node.js** (v18.0.0 ou superior)
- **npm** (v9.0.0 ou superior)

### Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/rik-404/Ricardo-Vendramini.git
   cd Ricardo-Vendramini
   ```

2. **Instalar as dependências:**
   ```bash
   npm install
   ```

3. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acessar no navegador:**
   Abra [http://localhost:3000](http://localhost:3000) (ou a porta exibida no terminal).

---

## 🎮 Comandos do Terminal CLI & Segredos

| Comando | Descrição |
| :--- | :--- |
| `help` | Lista os comandos disponíveis no terminal CLI |
| `sobre` | Exibe a trajetória profissional de Ricardo Vendramini |
| `skills` | Lista as principais competências técnicas |
| `projetos` | Exibe os principais sistemas e plataformas em produção |
| `livros` | Apresenta as obras publicadas |
| `contato` | Exibe os canais oficiais de comunicação |
| `navinha` | Inicia o jogo **Space Invaders Arcade** no terminal |
| `matrix` | Ativa a chuva de caracteres da Matrix por 10s |
| `tilt` | Faz toda a estrutura do site balançar em 3D |
| `root` | Solicita credenciais de superusuário e libera o memo post-it |
| `reset` | Zera todas as conquistas e easter eggs salvos |
| `clear` | Limpa o histórico de telas do terminal |

---

## 👨‍💻 Autor

**Ricardo Vendramini**  
*Desenvolvedor, Líder & Criador de Soluções Digitais*  
- 🏢 **Empresa**: Vendramini Informática
- 📧 **E-mail**: [contato@ricardovendramini.dev](mailto:contato@ricardovendramini.dev)
- 💼 **LinkedIn**: [Ricardo Vendramini Cassimiro](https://www.linkedin.com/in/ricardovendraminicassimiro/)
- 📷 **Instagram**: [@404_rik](https://www.instagram.com/404_rik)

---

<p center="text-center">
  Desenvolvido com 💚 por <b>Ricardo Vendramini</b> — 2026
</p>
