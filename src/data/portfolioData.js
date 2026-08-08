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
import c4t4t4uImg from '../images/books/portifolio/C4t4t4u-Eletronicos.png';
import ciganaMorganaImg from '../images/books/portifolio/Cigana-Morgana.png';

export const personalInfo = {
  name: "Ricardo Vendramini",
  companyName: "Vendramini Informática",
  companyWebsite: "https://vendraminiinformatica.com.br/",
  role: "Desenvolvedor, Líder & Criador de Soluções Digitais",
  headline: "Eu transformo ideias em experiências digitais.",
  subheadline: "Desenvolvedor, líder e criador de soluções digitais. Da primeira linha de código ao produto colocado em produção.",
  bioShort: "Profissional de tecnologia com visão holística de produto, combinando forte competência técnica em desenvolvimento de software com liderança, gestão e resolução estratégica de problemas.",
  aboutTitle: "Minha trajetória, minha visão e o que me move",
  aboutStory: [
    "Minha relação com a tecnologia começou pela curiosidade de entender como as coisas funcionam. O que começou com experiências e linhas de código se transformou em uma busca constante por criar soluções que realmente façam diferença.",
    "Ao longo dessa jornada, passei a enxergar o desenvolvimento de uma forma mais ampla. Para mim, criar software não é apenas escrever código: é entender um problema, pensar na experiência de quem vai utilizar a solução e encontrar uma maneira eficiente de transformar uma ideia em algo real.",
    "Hoje, uno desenvolvimento, tecnologia, gestão e liderança para construir projetos que vão além da parte técnica. Gosto de participar de todo o processo — da ideia e planejamento à implementação, publicação e evolução do produto."
  ],
  aboutQuote: "Não quero apenas escrever código. Quero construir coisas que façam sentido.",
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
  { id: 1, label: "Repositórios Criados", value: 32, prefix: "+", suffix: "" },
  { id: 2, label: "Sistemas em Produção", value: 6, prefix: "", suffix: "" },
  { id: 3, label: "Plataformas & Sites Publicados", value: 30, prefix: "+", suffix: "" },
  { id: 4, label: "Tecnologias no Ecossistema", value: 18, prefix: "", suffix: "" },
  { id: 5, label: "Anos de Trajetória", value: 9, prefix: "+", suffix: "" },
  { id: 6, label: "Soluções Comerciais Ativas", value: 6, prefix: "", suffix: "" }
];

export const timelineData = [
  {
    year: "2017 - 2018",
    title: "Primeiro Contato & Início na TI — Menor Aprendiz MSB",
    description: "Entrada no mercado de trabalho como Menor Aprendiz de Assistente Administrativo no departamento de TI da MSB. Primeira imersão prática com suporte operacional, rotinas técnicas e o início da trajetória profissional no universo da tecnologia.",
    projects: ["Suporte Operacional & Infraestrutura MSB"],
    technologies: ["Assistência de TI", "Suporte Operacional", "Rotinas Administrativas"],
    achievements: [
      "Primeiro contato profissional com rotinas e gestão de tecnologia",
      "Desenvolvimento de disciplinas de suporte, organização e processos de TI"
    ]
  },
  {
    year: "2018 - Presente",
    title: "Fundação & Abertura da Vendramini Informática",
    description: "Nascimento da Vendramini Informática. Inicialmente operada na sala de casa, focada na manutenção de hardware, diagnóstico de computadores e assistência técnica especializada, evoluindo progressivamente para o desenvolvimento de soluções digitais e engenharia de software.",
    projects: ["Vendramini Informática", "Suporte Técnico & Manutenção de Hardware"],
    technologies: ["Manutenção de Hardware", "Diagnóstico Técnico", "Redes & Infraestrutura", "Atendimento a Clientes"],
    achievements: [
      "Fundação da empresa e início das operações em assistência de hardware",
      "Construção de base sólida de clientes e transição gradual para soluções digitais web"
    ]
  },
  {
    year: "2019 - 2023",
    title: "Atuação Multidisciplinar & Gestão Paralela da Empresa",
    description: "Período de atuação profissional em outros segmentos no mercado corporativo, enquanto mantinha em paralelo a operação contínua, atendimento a clientes e serviços técnicos da Vendramini Informática.",
    projects: ["Vendramini Informática", "Gestão de Atendimentos Paralelos"],
    technologies: ["Gestão de Tempo", "Atendimento ao Cliente", "Manutenção de Hardware", "Autodidatismo em TI"],
    achievements: [
      "Manutenção ativa da carteira de clientes e reputação técnica da Vendramini Informática",
      "Desenvolvimento de alta resiliência, capacidade de conciliação de rotinas e disciplina"
    ]
  },
  {
    year: "2023",
    title: "Técnico de Informática Júnior — ORION SOFTWARES E EQUIPAMENTOS LTDA",
    description: "Atuação como Técnico de Informática Júnior na ORION Softwares e Equipamentos LTDA. Atendimento especializado focado na resolução de problemas de hardware e softwares proprietários, aliando suporte técnico a uma imersão no universo do desenvolvimento de software.",
    projects: ["Softwares Proprietários Orion", "Diagnóstico HW/SW"],
    technologies: ["Softwares Proprietários", "Suporte Técnico Nível 2/3", "Diagnóstico HW/SW", "Ambientes de Desenvolvimento"],
    achievements: [
      "Experiência aprofundada na resolução técnica de incidentes em sistemas proprietários",
      "Proximidade técnica com os fluxos e ciclo de vida de desenvolvimento de software"
    ]
  },
  {
    year: "2023 - Presente",
    title: "Supervisor de Atendimento — Conexão Marketing",
    description: "Atuação como Supervisor de Atendimento na Conexão Marketing. Liderança de equipe, organização de processos corporativos, controle de projetos, acompanhamento de metas, resolução analítica de conflitos de colaboradores e promoção de alta performance operacional.",
    projects: ["Supervisão de Operações & Atendimento", "Gestão de Projetos & Pessoas"],
    technologies: ["Liderança de Pessoas", "Gestão de Projetos", "Resolução de Conflitos", "Controle de KPIs", "Gestão de Operações"],
    achievements: [
      "Liderança estratégica de equipe com foco em organização de processos e mediação humana",
      "Controle e acompanhamento constante de cronogramas de projetos e SLAs de atendimento"
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
    name: "Hostinger",
    category: "deploy",
    level: "Avançado",
    percentage: 90,
    description: "Hospedagem, domínios, gestão de zonas DNS e certificados SSL aplicados em projetos como Elite House Piracicaba.",
    relatedProjects: ["Elite House Piracicaba"]
  },
  {
    name: "Vercel",
    category: "deploy",
    level: "Especialista",
    percentage: 95,
    description: "Deploy automatizado, hospedagem serverless de alta performance e integração de domínios em projetos como Vendramini Informática, C4T4T4U Eletrônicos e Cigana Morgana.",
    relatedProjects: ["Vendramini Informática", "C4T4T4U Eletrônicos", "Cigana Morgana"]
  },
  {
    name: "Git / GitHub Pages",
    category: "deploy",
    level: "Especialista",
    percentage: 96,
    description: "Versionamento de código e hospedagem de aplicações estáticas e projetos open source (Rei das Roms, Festa Fácil).",
    relatedProjects: ["Rei das Roms", "Festa Fácil Personalizados"]
  }
];

export const projectsData = [
  {
    id: "cigana-morgana",
    name: "Cigana Morgana",
    subtitle: "Landing Page Mística, Oráculos & Agendamentos Online",
    category: "Portal Institucional / Landing Page",
    image: ciganaMorganaImg,
    badge: "Em Produção • Vercel",
    shortDescription: "Landing page moderna e imersiva para consultoria mística (Tarot, Baralho Cigano, Mesa Radiônica e eventos). Possui animação de fundo interativa em HTML5 Canvas (starfield com rastro de brilhos no cursor), galeria interativa com lightbox, carrossel de depoimentos, FAQ sanfonado e agendamento direto via WhatsApp API.",
    problem: "A consultora mística necessitava de uma vitrine digital sofisticada e envolvente que transmitisse autoridade, beleza visual e facilitasse o agendamento direto de consultas online e presenciais.",
    idea: "Desenvolver um portal místico com estética cyberpunk/glassmorphism em tons de roxo profundo e dourado imperial, efeitos gráficos interativos em Canvas API 2D e conversão em 1-clique pelo WhatsApp.",
    construction: "Construído puramente em HTML5 semântico (meta tags OpenGraph e acessibilidade), CSS3 Vanilla (Design System com variáveis, backdrop-filter glassmorphism, animações fluidas) e JavaScript ES6+ (Canvas 2D starfield, manipulação da DOM, sliders, modais e lightbox). Hospedado na Vercel.",
    result: "Experiência visual mística de alto valor percebido, tempo de resposta instantâneo sem frameworks pesados, galeria de eventos e canal de agendamento automatizado no WhatsApp.",
    technologies: ["HTML5", "CSS3", "JavaScript ES6+", "Canvas API 2D", "Vercel", "WhatsApp API", "SEO"],
    date: "2026",
    link: "https://ciganamorgana.vercel.app/",
    github: null,
    status: "Em Produção"
  },
  {
    id: "c4t4t4u-eletronicos",
    name: "C4T4T4U Eletrônicos",
    subtitle: "E-Commerce, Orçamentos & Gestão de Ordens de Serviço (O.S.)",
    category: "E-Commerce / SaaS",
    image: c4t4t4uImg,
    badge: "v1.0.2 • Em Produção",
    shortDescription: "Plataforma completa de e-commerce e gestão corporativa para loja de eletrônicos e assistência técnica. Integra vitrine virtual com carrinho drawer, checkout via WhatsApp, módulo de Orçamentos com conversão automática para Ordens de Serviço (O.S.), emissão impressa em 2 vias A4, cadastro PF/PJ, controle RBAC de 3 níveis e backend Supabase cloud.",
    problem: "A empresa de eletrônicos e assistência técnica necessitava de um ecossistema integrado para gerenciar simultaneamente a vitrine de produtos online, a captação de orçamentos e a operação técnica de ordens de serviço (O.S.) com emissão de comprovantes de garantia impressos.",
    idea: "Desenvolver uma aplicação SPA robusta desacoplada com checkout de orçamentos via WhatsApp, conversão inteligente de cotações aprovadas para Ordens de Serviço (#OS-xxxx), controle de permissões por vendedor/admin (RBAC) e sincronização cloud no Supabase.",
    construction: "Construído com HTML5 semântico, CSS3 Vanilla (Design System glassmorphism, temas HSL/RGB, @media print para folha A4 em 2 vias), JavaScript ES6+ puro (+140 funções nativas para CRUD, estado e filtros) e Supabase (PostgreSQL cloud com RLS). Hospedado na Vercel com Clean URLs.",
    result: "Mais de 40 telas e modais operacionais, conversão instantânea de orçamentos aprovados em O.S., emissão de ordens de serviço em 2 vias impressas (Loja e Cliente), notificações diretas via WhatsApp e zero dependência de frameworks pesados.",
    technologies: ["HTML5", "CSS3", "JavaScript ES6+", "Supabase", "PostgreSQL", "Vercel", "WhatsApp API"],
    date: "2026",
    link: "https://c4t4t4ueletronicos.vercel.app/",
    github: null,
    status: "Em Produção"
  },
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
    role: "Supervisor de Atendimento",
    company: "Conexão Marketing",
    summary: "Liderança estratégica de equipe de atendimento, organização de processos corporativos, controle operacional de projetos, acompanhamento de metas (KPIs/SLAs) e mediação analítica de conflitos de colaboradores.",
    highlights: [
      "Liderança de pessoas, desenvolvimento contínuo da equipe e mediação de conflitos interpessoais.",
      "Organização e estruturação de processos operacionais com acompanhamento rigoroso de cronogramas.",
      "Comunicação direta com stakeholders e otimização dos fluxos de atendimento corporativo."
    ]
  },
  {
    period: "2023",
    role: "Técnico de Informática Júnior",
    company: "ORION SOFTWARES E EQUIPAMENTOS LTDA",
    summary: "Atuação em suporte técnico especializado focado em resolução de problemas de hardware e softwares proprietários, aliando atendimento a uma imersão técnica no ecossistema de desenvolvimento de software.",
    highlights: [
      "Atendimento técnico focado na resolução analítica de incidentes em softwares proprietários.",
      "Manutenção e suporte especializado em hardware, periféricos e sistemas de diagnóstico.",
      "Intermediação técnica com as equipes de engenharia de desenvolvimento de produtos."
    ]
  },
  {
    period: "2018 - Presente",
    role: "Líder de Tecnologia & Fundador",
    company: "Vendramini Informática",
    summary: "Fundação da empresa, operada inicialmente na sala de casa com foco em manutenção de hardware e assistência técnica, evoluindo para arquitetura de software web, criação de sistemas em produção e liderança técnica.",
    highlights: [
      "Construção e publicação de soluções web completas (React, TypeScript, Supabase, Tailwind).",
      "Evolução contínua da empresa da assistência técnica em hardware para engenharia de software.",
      "Manutenção ativa da carteira de clientes corporativos e soluções ativas."
    ]
  },
  {
    period: "2017 - 2018",
    role: "Menor Aprendiz de Assistente Administrativo em TI",
    company: "MSB",
    summary: "Primeira experiência profissional atuando no departamento de TI em assistência administrativa, suporte operacional e rotinas técnicas iniciais de tecnologia.",
    highlights: [
      "Primeiro contato prático com infraestrutura, chamados internos e processos de TI.",
      "Desenvolvimento de disciplina, suporte ao usuário e organização de rotinas técnicas."
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
    "",
    "  sobre      - Resumo sobre Ricardo Vendramini & Vendramini Informática",
    "  skills     - Lista das principais competências técnicas",
    "  projetos   - Lista dos projetos em destaque",
    "  livros     - Livros e publicações",
    "  contato    - Informações de contato direto",
    "  clear      - Limpa a tela do terminal",
    "",
    "⚡ EASTER EGGS — Comandos Secretos:",
    "",
    "★ game       - Lista os jogos Arcade disponíveis no terminal",
    "★ matrix     - Protocolo Matrix: ativa chuva de código no background",
    "★ sudo rm    - Tente deletar o portfólio... se tiver coragem 😈",
    "★ admin      - Acesse o painel root secreto do sistema 🔐",
    "★ konami     - Sequência secreta: ↑↑↓↓←→←→ B A (no teclado)"
  ],
  games: [
    "⚡ ARCADE CENTER — Jogos Disponíveis:",
    "",
    "★ navinha    - Space Invaders Geometric: destrua aliens com formas geométricas",
    "",
    "Digite o nome do jogo para iniciar."
  ]
};

export const easterEggInfo = {
  triggerHint: "Dica: Digite 'matrix' no terminal ou aperte a sequência secreta para ativar o modo desenvolvedor místico.",
  title: "⚡ MODO MATRIX ATIVADO",
  message: "Parabéns por explorar além da superfície! Como desenvolvedores, vivemos curiosos para entender o que há por trás das cortinas do código.",
  quote: "“Existem 10 tipos de pessoas no mundo: as que entendem binário e as que não entendem.” — Ricardo Vendramini"
};
