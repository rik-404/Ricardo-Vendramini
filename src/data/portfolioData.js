/**
 * ARCHITECTURE DE DADOS CENTRALIZADA - PORTFÓLIO RICARDO VENDRAMINI
 * 
 * Todas as informações do site estão centralizadas neste arquivo.
 * Você pode alterar projetos, livros, experiências, números, links,
 * textos e tecnologias diretamente aqui sem precisar alterar o código dos componentes.
 */

import ricardoPhoto from '../images/Ricardo-Vendramini.jpeg';
import companyLogo from '../images/Icon-Vendramini-Informatica.png';
import timewalkerCover from '../images/books/image.png';
import eliteHouseImg from '../images/books/portifolio/Elite-House-Piracicaba.png';
import vendraminiSiteImg from '../images/books/portifolio/Vendramin-Informatica.png';
import reiDasRomsImg from '../images/books/portifolio/Rei-das-Roms.png';
import festaFacilImg from '../images/books/portifolio/Festa-Facil.png';

export const personalInfo = {
  name: "Ricardo Vendramini",
  companyName: "Vendramini Informática",
  companyWebsite: "https://vendraminiinformatica.com.br/",
  role: "Desenvolvedor, Líder & Criador de Soluções Digitais",
  headline: "Eu transformo ideias em experiências digitais.",
  subheadline: "Desenvolvedor, líder e criador de soluções digitais. Da primeira linha de código ao produto colocado em produção.",
  bioShort: "Profissional de tecnologia com visão holística de produto, combinando forte competência técnica em desenvolvimento de software com liderança, gestão e resolução estratégica de problemas.",
  aboutStory: [
    "Minha jornada na tecnologia começou impulsionada pela curiosidade insaciável de entender como as coisas funcionam por trás das telas. O que começou como linhas de código exploratórias transformou-se em uma paixão por criar soluções digitais reais e eficientes.",
    "Com a fundação da Vendramini Informática e ao longo da minha trajetória, percebi que tecnologia de ponta só cumpre seu propósito quando resolve problemas reais das pessoas e dos negócios. Por isso, desenvolvi uma visão abrangente que conecta a arquitetura técnica à experiência do usuário e à gestão de equipes.",
    "Hoje, atuo não apenas construindo software robusto e escalável, mas também liderando processos, otimizando fluxos de trabalho e transformando visão estratégica em produtos de alto valor entregues em produção."
  ],
  location: "Brasil",
  photoUrl: ricardoPhoto,
  companyLogoUrl: companyLogo,
  availableForWork: true,
  socialLinks: {
    instagram: "https://www.instagram.com/404_rik",
    github: "https://github.com/rik-404",
    facebook: "http://facebook.com/ricardo.cassimiro",
    linkedin: "https://www.linkedin.com/in/ricardovendraminicassimiro/",
    whatsapp: "https://wa.me/5500000000000",
    email: "contato@ricardovendramini.dev"
  }
};

export const statsData = [
  { id: 1, label: "Projetos desenvolvidos", value: 25, prefix: "+", suffix: "" },
  { id: 2, label: "Sistemas em produção", value: 12, prefix: "+", suffix: "" },
  { id: 3, label: "Plataformas & Sites publicados", value: 30, prefix: "+", suffix: "" },
  { id: 4, label: "Tecnologias no ecossistema", value: 18, prefix: "", suffix: "" },
  { id: 5, label: "Anos de experiência", value: 5, prefix: "+", suffix: "" },
  { id: 6, label: "Soluções ativas em produção", value: 10, prefix: "+", suffix: "" }
];

export const timelineData = [
  {
    year: "2025 - Presente",
    title: "Liderança Técnica & Arquitetura de Produtos",
    description: "Atuação na concepção, liderança de desenvolvimento e implantação de plataformas web e sistemas corporativos de alta disponibilidade pela Vendramini Informática.",
    projects: ["Elite House Piracicaba", "Vendramini Informática"],
    technologies: ["React", "TypeScript", "Node.js", "Supabase", "Vercel"],
    achievements: [
      "Modernização de arquitetura legada para microsserviços",
      "Redução expressiva no tempo de carregamento e resposta de APIs"
    ]
  },
  {
    year: "2022 - 2024",
    title: "Desenvolvedor Full Stack & Gestão de Soluções",
    description: "Construção de ecossistemas web completos, integração com bancos de dados relacionais e APIs de alta performance.",
    projects: ["Festa Fácil", "PetLife"],
    technologies: ["JavaScript", "React", "Node.js", "SQL", "Tailwind CSS"],
    achievements: [
      "Lançamento de 5+ produtos digitais em tempo recorde",
      "Implementação de pipeline CI/CD automatizado"
    ]
  },
  {
    year: "2020 - 2022",
    title: "Fundação Técnica & Projetos Especiais",
    description: "Imersão em infraestrutura Linux, redes, Git, desenvolvimento frontend interativo e primeiras automações de negócios.",
    projects: ["Cigana Morgana"],
    technologies: ["HTML5", "CSS3", "JavaScript", "Linux", "Git"],
    achievements: [
      "Criação de soluções personalizadas com alta interatividade",
      "Domínio de ambientes de servidor e configuração de rotas"
    ]
  }
];

export const skillsCategories = [
  { id: "all", label: "Todas" },
  { id: "core", label: "Linguagens & Core" },
  { id: "frameworks", label: "Frameworks & UI" },
  { id: "backend", label: "Backend & Cloud" },
  { id: "tools", label: "Ferramentas & OS" },
  { id: "deploy", label: "Deploy & Infraestrutura" }
];

export const skillsData = [
  // Linguagens & Core
  {
    name: "JavaScript",
    category: "core",
    level: "Especialista",
    percentage: 95,
    description: "Desenvolvimento de lógicas complexas, manipulação assíncrona, Web APIs e arquitetura de software reativa.",
    relatedProjects: ["Vendramini Informática", "Elite House Piracicaba"]
  },
  {
    name: "TypeScript",
    category: "core",
    level: "Avançado",
    percentage: 90,
    description: "Tipagem estática rigorosa, interfaces genéricas e código escalável à prova de erros.",
    relatedProjects: ["Elite House Piracicaba"]
  },
  {
    name: "HTML5",
    category: "core",
    level: "Especialista",
    percentage: 96,
    description: "Semântica web avançada, acessibilidade (a11y), SEO técnico e estruturas modernas.",
    relatedProjects: ["Vendramini Informática", "Elite House Piracicaba"]
  },
  {
    name: "CSS3",
    category: "core",
    level: "Especialista",
    percentage: 94,
    description: "Design responsivo avançado, variáveis CSS (HSL), glassmorphism, Flexbox, Grid e temas cyberpunk.",
    relatedProjects: ["Vendramini Informática", "Elite House Piracicaba"]
  },
  {
    name: "SQL / PostgreSQL",
    category: "core",
    level: "Avançado",
    percentage: 88,
    description: "Consultas relacionais otimizadas, modelagem de dados, migrações SQL e funções de banco de dados.",
    relatedProjects: ["Elite House Piracicaba"]
  },

  // Frameworks, UI & Web APIs
  {
    name: "React 18",
    category: "frameworks",
    level: "Avançado",
    percentage: 92,
    description: "Criação de Single Page Applications (SPAs) reativas, Hooks customizados e controle global de estado.",
    relatedProjects: ["Elite House Piracicaba"]
  },
  {
    name: "Vite",
    category: "frameworks",
    level: "Avançado",
    percentage: 92,
    description: "Ferramenta de build de nova geração para bundling ultrarrápido e servidor de desenvolvimento em tempo real.",
    relatedProjects: ["Elite House Piracicaba"]
  },
  {
    name: "Tailwind CSS",
    category: "frameworks",
    level: "Especialista",
    percentage: 96,
    description: "Estilização utilitária de alta velocidade com sistemas de design consistentes e dark mode nativo.",
    relatedProjects: ["Elite House Piracicaba", "Vendramini Informática"]
  },
  {
    name: "Shadcn / Radix UI",
    category: "frameworks",
    level: "Avançado",
    percentage: 88,
    description: "Componentes UI acessíveis e customizáveis para módulos de gestão imobiliária e CRM.",
    relatedProjects: ["Elite House Piracicaba"]
  },
  {
    name: "TanStack Query",
    category: "frameworks",
    level: "Avançado",
    percentage: 90,
    description: "Gerenciamento de estado de servidor, cache de dados remoto e revalidação de dados em segundo plano.",
    relatedProjects: ["Elite House Piracicaba"]
  },
  {
    name: "Canvas API",
    category: "frameworks",
    level: "Avançado",
    percentage: 88,
    description: "Renderização 2D em tempo real, efeito chuva Matrix a 60fps e manipulação gráfica via elementos canvas.",
    relatedProjects: ["Vendramini Informática"]
  },
  {
    name: "PWA & Service Worker",
    category: "frameworks",
    level: "Avançado",
    percentage: 85,
    description: "Aplicações instaláveis com suporte a acesso offline, cache estratégico e Service Workers.",
    relatedProjects: ["Vendramini Informática", "Elite House Piracicaba"]
  },

  // Backend & Cloud
  {
    name: "Supabase",
    category: "backend",
    level: "Avançado",
    percentage: 92,
    description: "Backend-as-a-Service com Postgres em tempo real, autenticação JWT/RBAC, Row Level Security (RLS) e Storage Buckets.",
    relatedProjects: ["Elite House Piracicaba"]
  },
  {
    name: "PostgreSQL & RLS",
    category: "backend",
    level: "Avançado",
    percentage: 90,
    description: "Isolamento total de dados sensíveis com políticas estritas de segurança em nível de linha (RLS).",
    relatedProjects: ["Elite House Piracicaba"]
  },
  {
    name: "Node.js",
    category: "backend",
    level: "Avançado",
    percentage: 88,
    description: "Execução de scripts de build, geradores estáticos de imóveis/SEO e integração de serviços.",
    relatedProjects: ["Elite House Piracicaba"]
  },
  {
    name: "REST API & Webhooks",
    category: "backend",
    level: "Especialista",
    percentage: 94,
    description: "Integração de Webhooks para captura automática de leads (Facebook Ads) e automação via WhatsApp.",
    relatedProjects: ["Elite House Piracicaba"]
  },

  // Ferramentas & OS
  {
    name: "Linux",
    category: "tools",
    level: "Avançado",
    percentage: 92,
    description: "Ambientes Linux (Debian, Ubuntu e servidores) para terminal shell, comandos CLI e gerenciamento de processos.",
    relatedProjects: ["Vendramini Informática", "Ambiente de Desenvolvimento"]
  },
  {
    name: "Git / GitHub",
    category: "tools",
    level: "Especialista",
    percentage: 96,
    description: "Versionamento de código, gerenciamento de branches, auditoria de commits e deploy remoto.",
    relatedProjects: ["Elite House Piracicaba", "Vendramini Informática"]
  },
  {
    name: "VSCode",
    category: "tools",
    level: "Especialista",
    percentage: 96,
    description: "IDE principal configurada com linters, formatadores e ambiente estendido para TypeScript e React.",
    relatedProjects: ["Todos os projetos"]
  },

  // Deploy & Infraestrutura
  {
    name: "Vercel",
    category: "deploy",
    level: "Especialista",
    percentage: 95,
    description: "Deploy automatizado, hospedagem serverless de alta performance, configuração de domínios e CI/CD.",
    relatedProjects: ["Elite House Piracicaba", "Vendramini Informática"]
  },
  {
    name: "Hostinger",
    category: "deploy",
    level: "Avançado",
    percentage: 90,
    description: "Hospedagem de sites e sistemas corporativos, gestão de zonas DNS, registros de domínio e certificados SSL.",
    relatedProjects: ["Vendramini Informática", "Elite House Piracicaba"]
  }
];

export const projectsData = [
  {
    id: "elite-house-piracicaba",
    name: "Elite House Piracicaba",
    subtitle: "EliteHouseHub — Plataforma Imobiliária & CRM",
    category: "Plataforma / SaaS",
    image: eliteHouseImg,
    badge: "CRECI 049210-J • Em Produção",
    shortDescription: "Plataforma imobiliária de alto desempenho para gestão de imóveis, CRM de clientes, controle de corretores (RBAC + RLS), agendamentos, captura automática de leads via Facebook Ads Webhooks e controle financeiro de comissões.",
    problem: "Necessidade de centralizar as operações da imobiliária em um único sistema de alta performance, reduzindo tarefas manuais, integrando o portal público de imóveis ao CRM de vendas e isolando dados sensíveis por corretor e coordenador com segurança RLS.",
    idea: "Desenvolver uma solução completa SPA desacoplada utilizando React 18, TypeScript e Supabase como BaaS (PostgreSQL relacional com Row Level Security), automatizando a captura de leads via Webhooks e fornecendo relatórios gráficos em tempo real.",
    construction: "Construído com React 18, TypeScript, Vite, Tailwind CSS, Shadcn UI / Radix UI, TanStack Query, React Router DOM, Recharts e Supabase (Autenticação RBAC de 5 níveis, PostgreSQL RLS e Storage Buckets público/privado). Geração estática de meta-tags otimizada para SEO e suporte nativo a PWA.",
    result: "Mais de 62.896 linhas de código em produção, 134+ componentes React reutilizáveis, 35 páginas/rotas ativas, 25 migrações SQL no Supabase e distribuição inteligente de leads de anúncios para a equipe comercial.",
    technologies: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Shadcn UI", "Supabase", "PostgreSQL", "TanStack Query", "Node.js", "PWA"],
    date: "2025",
    link: "https://elitehousepiracicaba.com.br",
    github: null,
    status: "Em Produção"
  },
  {
    id: "vendramini-informatica-site",
    name: "Vendramini Informática",
    subtitle: "Site Oficial & Showcase Institucional Digital",
    category: "Portal Institucional",
    image: vendraminiSiteImg,
    badge: "Oficial • Ativo",
    shortDescription: "Site oficial da Vendramini Informática com arquitetura ultrarrápida em HTML5 semântico, CSS3 com design system cyberpunk glassmorphism, suporte a PWA com Service Worker offline, efeito Matrix em Canvas API e internacionalização dinâmica (i18n PT/EN).",
    problem: "Criar um portal oficial de alta performance que funcionasse como cartão de visitas digital de grande impacto visual, exibindo serviços corporativos, FAQ interativo e portfólio de projetos com internacionalização instantânea.",
    idea: "Desenvolver uma arquitetura estática ultraleve com internacionalização dinâmica (PT 🇧🇷 / EN 🇺🇸) persistida em localStorage, efeito visual Matrix via Canvas API 60fps, cursor neon e pontuação 95+ no Google Lighthouse.",
    construction: "Construído em HTML5 semântico (Open Graph, Schema.org e meta-tags completas), CSS3 avançado (Design System com variáveis HSL, glassmorphism e responsive design), JavaScript ES6+ modular, Canvas API e Service Worker para suporte a PWA e cache offline.",
    result: "Lighthouse Score 95+ (Performance, Acessibilidade e SEO), tempo de carregamento inicial inferior a 1.5s, alternador de idioma instantâneo via disjuntor neon cyberpunk e página de portfólio detalhada com busca em tempo real.",
    technologies: ["HTML5", "CSS3", "JavaScript ES6+", "Canvas API", "PWA", "Service Worker", "i18n", "SEO"],
    date: "2025",
    link: "https://vendraminiinformatica.com.br/",
    github: null,
    status: "Ativo"
  },
  {
    id: "rei-das-roms",
    name: "Rei das Roms",
    subtitle: "Catalogação de Retrojogos, Consoles Clássicos & Emuladores",
    category: "Web App / Open Source",
    image: reiDasRomsImg,
    badge: "Open Source • Estudo",
    shortDescription: "Aplicação web interativa desenvolvida para fins educacionais de estudo Front-End (HTML5, CSS3 e JavaScript Vanilla), permitindo a visualização, catalogação e busca em tempo real de retrojogos e consoles clássicos.",
    problem: "Fãs e estudantes de jogos clássicos necessitavam de um catálogo web moderno, leve e totalmente responsivo para pesquisar informações de consoles retrô (Nintendo, PlayStation, SEGA, Xbox) e emuladores com busca dinâmica em tempo real.",
    idea: "Desenvolver uma plataforma estática ultrarápida com filtro dinâmico de busca por sistemas via JavaScript Vanilla, salvamento de preferências no localStorage e navegação modular por gerações de consoles.",
    construction: "Construído puramente com HTML5 semântico, CSS3 modular (reset CSS, variáveis customizadas, Flexbox/Grid e responsividade completa) e JavaScript ES6+ puro (manipulação da DOM, modais interativos, eventos assíncronos e localStorage).",
    result: "Catálogo abrangendo mais de 20 consoles históricos das gerações Nintendo, Sony PlayStation, SEGA e Xbox, mecanismo de busca em tempo real a 60fps e código aberto publicado no GitHub.",
    technologies: ["HTML5", "CSS3", "JavaScript Vanilla", "LocalStorage", "Web APIs", "Design Responsivo"],
    date: "2025",
    link: "https://rik-404.github.io/reisdasroms/",
    github: "https://github.com/rik-404/reisdasroms",
    status: "Open Source"
  },
  {
    id: "festa-facil-personalizados",
    name: "Festa Fácil Personalizados",
    subtitle: "Vitrine Digital & E-Commerce de Orçamentos via WhatsApp",
    category: "Plataforma / E-Commerce",
    image: festaFacilImg,
    badge: "Em Produção • Open Source",
    shortDescription: "Plataforma e-commerce e vitrine digital para empresa de papelaria personalizada em São Pedro/SP. Permite navegação por categorias inteligentes, busca em tempo real, montagem de carrinho e envio direto de orçamentos via WhatsApp com Painel Admin completo sincronizado via Supabase + LocalStorage offline fallback.",
    problem: "A loja de papelaria personalizada necessitava de uma vitrine digital intuitiva e sem burocracia de cadastro para exibir produtos (topos de bolo, canecas, caixinhas) e capturar orçamentos formatados diretamente no WhatsApp do atendimento.",
    idea: "Criar uma aplicação e-commerce resiliente com sincronização em tempo real de produtos e categorias via Supabase (PostgreSQL Cloud) e fallback automático offline via LocalStorage, acompanhada de Painel Admin completo.",
    construction: "Desenvolvido com HTML5 semântico, CSS3 Vanilla (variáveis HSL, glassmorphism, responsive grid), JavaScript ES6+ (Async/Await, Fetch API, manipulação de DOM) e Supabase JS v2 (PostgreSQL cloud com regras RLS).",
    result: "Aumento expressivo nas vendas e orçamentos via WhatsApp, gestão instantânea de estoque e configurações no Painel Admin e funcionamento garantido mesmo sem conexão de internet.",
    technologies: ["HTML5", "CSS3", "JavaScript ES6+", "Supabase", "PostgreSQL", "WhatsApp API", "LocalStorage"],
    date: "2026",
    link: "https://rik-404.github.io/Festa-Facil/",
    github: "https://github.com/rik-404/Festa-Facil",
    status: "Em Produção"
  }
];

export const experienceData = [
  {
    period: "2023 - Presente",
    role: "Líder de Tecnologia & Fundador",
    company: "Vendramini Informática",
    summary: "Atuação no direcionamento técnico de projetos, definição de stack arquitetural, desenvolvimento de módulos críticos e coordenação de cronogramas.",
    highlights: [
      "Arquitetura de sistemas web resilientes com foco em experiência do usuário e alta performance.",
      "Liderança direta em processos de tomada de decisão técnica, reduzindo débitos técnicos e otimizando fluxos.",
      "Integração contínua de novas tecnologias e padrões de desenvolvimento moderno."
    ]
  },
  {
    period: "2021 - 2023",
    role: "Especialista em Gestão de Processos & Soluções de TI",
    company: "Operações Corporativas",
    summary: "Coordenação de fluxos de atendimento, otimização de rotinas técnicas e intermediação entre requisitos de negócios e equipes de TI.",
    highlights: [
      "Mapeamento e redesenho de processos operacionais para eliminar gargalos e retrabalho.",
      "Implementação de ferramentas de suporte técnico e gestão de chamados com melhoria do SLA.",
      "Capacitação de equipes e promoção de cultura focada em resolução eficiente de problemas."
    ]
  },
  {
    period: "2019 - 2021",
    role: "Analista de Suporte Técnico & Infraestrutura",
    company: "Serviços de Tecnologia",
    summary: "Gerenciamento de ambiente Linux/Windows, configuração de servidores, diagnóstico de redes e manutenção de infraestrutura de TI.",
    highlights: [
      "Administração de sistemas e implementação de rotinas de backup e segurança.",
      "Atendimento técnico especializado resolvendo incidentes complexos de software e hardware.",
      "Automação de tarefas repetitivas através de scripts shell e ferramentas internas."
    ]
  }
];

export const leadershipPillars = [
  {
    icon: "Users",
    title: "Liderança Orientada a Pessoas",
    description: "Acredito que os melhores softwares são fruto de times empoderados, ouvidos e inspirados. Foco no desenvolvimento técnico e humano das pessoas."
  },
  {
    icon: "MessageSquare",
    title: "Comunicação Clara & Transparente",
    description: "Traduzo conceitos técnicos complexos para linguagem de negócios, mantendo todos os stakeholders alinhados com os objetivos do projeto."
  },
  {
    icon: "Workflow",
    title: "Organização & Processos Eficientes",
    description: "Eliminação de ruídos e gargalos operacionais através de processos claros, documentação acessível e acompanhamento sistemático de métricas."
  },
  {
    icon: "ShieldAlert",
    title: "Resolução Pragmática de Problemas",
    description: "Foco na busca por soluções simples, eficazes e duradouras em cenários de alta pressão ou incerteza técnica."
  },
  {
    icon: "Target",
    title: "Tomada de Decisão Estratégica",
    description: "Balanceio velocidade de entrega com sustentabilidade do código, priorizando entregas de valor real em cada etapa do desenvolvimento."
  },
  {
    icon: "Compass",
    title: "Visão Holística de Produto",
    description: "Olhar que vai além do código: compreendo a dor do cliente final, o modelo de negócios e como a tecnologia impulsiona esses resultados."
  }
];

export const booksData = [
  {
    id: "timewalker",
    title: "Timewalker: O paradoxo de Dante",
    subtitle: "O paradoxo de Dante",
    coverImage: timewalkerCover,
    year: "2025",
    synopsis: "Após a morte brutal de Lívian, Dante se recusa a aceitar o silêncio que fica. Consumido pelo luto e pela culpa, ele constrói um dispositivo capaz de romper o tempo não para mudá-lo por ambição, mas para tentar compreender onde tudo deu errado.\n\nCada viagem o leva ao mesmo lugar, em épocas diferentes, revelando fragmentos de uma realidade que insiste em se repetir. O que começa como uma busca por respostas transforma-se em um labirinto psicológico, onde o passado se torna instável, o futuro perde contornos definidos e a própria identidade de Dante começa a se dissolver.\n\nÀ medida que versões de si mesmo parecem emergir das fendas temporais, Dante é forçado a encarar uma verdade perturbadora: o tempo não se limita a obedecer leis físicas ele reage à obsessão, ao olhar, à insistência de quem se recusa a seguir em frente.\n\nEntre ciência e delírio, amor e culpa, Timewalker: O Paradoxo de Dante é um romance sobre até onde um homem pode ir para não aceitar o fim e o preço de tentar corrigir aquilo que talvez nunca tenha sido um erro do tempo, mas da própria natureza humana.\n\nPorque nem todo inferno é um lugar.\nAlguns são construídos dentro de quem insiste em olhar para trás.",
    creationProcess: "Ficção científica e suspense psicológico explorando temas como viagem no tempo, luto, obsessão e os limites da psique humana.",
    status: "Publicado / Disponível",
    tags: ["Paradoxo Temporal", "Ficção Científica", "Luto"],
    amazonLink: "https://www.amazon.com.br/Timewalker-paradoxo-Dante-jornada-identidade/dp/B0H1BTD61L/ref=sr_1_1",
    uiclapLink: "https://loja.uiclap.com/titulo/ua145366",
    link: "https://www.amazon.com.br/Timewalker-paradoxo-Dante-jornada-identidade/dp/B0H1BTD61L/ref=sr_1_1"
  }
];

export const achievementsData = [
  {
    number: "01",
    title: "Múltiplas Aplicações em Produção",
    category: "Projetos",
    description: "Lançamento bem-sucedido de ecossistemas web complexos atendendo usuários reais diariamente com alta taxa de uptime."
  },
  {
    number: "02",
    title: "Transformação Operacional",
    category: "Processos",
    description: "Redesenho de fluxos de trabalho técnicos que resultaram em entregas 30% mais rápidas e com menor índice de erros em produção."
  },
  {
    number: "03",
    title: "Publicação de Livros & Conteúdo",
    category: "Conhecimento",
    description: "Sistematização de experiências e conceitos de liderança em obras escritas e materiais de referência profissional."
  },
  {
    number: "04",
    title: "Ecossistema Tecnológico Completo",
    category: "Domínio Técnico",
    description: "Capacidade de transitar com fluidez por Frontend, Backend, Banco de Dados, Infraestrutura Linux e Governança de TI."
  }
];

export const terminalCommands = {
  welcome: [
    "RICARDO.DEV Terminal [Versão 4.2.0]",
    "(c) 2026 Ricardo Vendramini - Vendramini Informática.",
    "",
    "> Inicializando módulos do portfólio...",
    "[OK] Frontend Engine ....... 100%",
    "[OK] Backend Microservices . 100%",
    "[OK] Database Connector .... 100%",
    "[OK] Linux Infrastructure .. 100%",
    "[OK] Security Protocols .... 100%",
    "",
    "STATUS: SISTEMA ONLINE & OPERACIONAL",
    "",
    "Digite 'help' ou escolha os atalhos para explorar."
  ],
  help: [
    "Comandos disponíveis:",
    "  sobre      - Resumo sobre Ricardo Vendramini & Vendramini Informática",
    "  skills     - Lista das principais competências técnicas",
    "  projetos   - Lista dos projetos em destaque",
    "  livros     - Livros e publicações",
    "  contato    - Informações de contato direto",
    "  clear      - Limpa a tela do terminal",
    "  matrix     - Ativa o modo especial de código"
  ]
};

export const easterEggInfo = {
  triggerHint: "Dica: Digite 'matrix' no terminal ou aperte a sequência secreta para ativar o modo desenvolvedor místico.",
  title: "⚡ MODO MATRIX ATIVADO",
  message: "Parabéns por explorar além da superfície! Como desenvolvedores, vivemos curiosos para entender o que há por trás das cortinas do código.",
  quote: "“Existem 10 tipos de pessoas no mundo: as que entendem binário e as que não entendem.” — Ricardo Vendramini"
};
