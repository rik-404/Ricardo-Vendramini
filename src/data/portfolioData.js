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
import menuDeliveryImg from '../images/books/portifolio/Menu delivery.png';
import petLifeImg from '../images/books/portifolio/Pet-Life.png';
import designer5kImg from '../images/certificados/web/designer5k.png';
import htmlCssCertImg from '../images/certificados/HTML-CSS.png';
import analistaRedesCertImg from '../images/certificados/Analista-Redes.png';
import inteligenciaEmocionalCertImg from '../images/certificados/Itelegigencia emocional.png.png';
import carismaCertImg from '../images/certificados/Carisma.png';
import excelAvançadoCertImg from '../images/certificados/Excle2010-Avançado.png';
import lovableCertImg from '../images/certificados/Lovable-Workshop.png.png';
import pythonCertImg from '../images/certificados/python-fundamental1.png';

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
    title: "Primeiro Contato & Início na TI — Menor Aprendiz MYOUNG SHIN BRASIL",
    description: "Entrada no mercado de trabalho como Menor Aprendiz de Assistente Administrativo no departamento de TI da Myoung Shin Brasil. Primeira imersão prática com suporte operacional, rotinas técnicas e o início da trajetória profissional no universo da tecnologia.",
    projects: ["Suporte Operacional & Infraestrutura MYOUNG SHIN BRASIL"],
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
    year: "2022 - 2023",
    title: "Técnico de Apoio ao Usuário de Informática — SRG TELECOM LTDA",
    description: "Atuação no setor de telecomunicações. Atendimento ao público, operação do sistema de gerência óptica UNM2000, cadastro de produtos e planos de internet, liberação de acessos PPPoE, abertura e gestão analítica de Ordens de Serviço (O.S.).",
    projects: ["Infraestrutura de Telecom & Provisionamento UNM2000"],
    technologies: ["Sistema UNM2000", "Autenticação PPPoE", "Redes Ópticas", "Ordens de Serviço (O.S.)", "Atendimento ao Cliente"],
    achievements: [
      "Operação avançada do sistema NMS UNM2000 para provisionamento de equipamentos ópticos",
      "Abertura, acompanhamento e resolução eficiente de Ordens de Serviço operacionais"
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
  { id: "frameworks", label: "Frameworks & CMS" },
  { id: "backend", label: "Backend & Cloud" },
  { id: "tools", label: "Ferramentas & Design" },
  { id: "deploy", label: "Redes, Deploy & Infra" }
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
    name: "Python 3",
    category: "core",
    level: "Avançado",
    percentage: 88,
    description: "Desenvolvimento de rotinas algorítmicas, manipulação avançada de dados, automações, scripts e lógica estruturada.",
    relatedProjects: ["Certificação Python 3 Fundamentos", "Automações"]
  },
  {
    name: "HTML5",
    category: "core",
    level: "Especialista",
    percentage: 96,
    description: "Semântica web avançada, acessibilidade (a11y), SEO técnico e estruturas modernas validadas em certificação.",
    relatedProjects: ["Vendramini Informática", "Certificação HTML5 & CSS3"]
  },
  {
    name: "CSS3",
    category: "core",
    level: "Especialista",
    percentage: 94,
    description: "Design responsivo avançado, variáveis CSS (HSL), glassmorphism, Flexbox, Grid e temas cyberpunk.",
    relatedProjects: ["Vendramini Informática", "Certificação HTML5 & CSS3"]
  },
  {
    name: "Web Design & UI/UX",
    category: "core",
    level: "Especialista",
    percentage: 94,
    description: "Composição estético-visual, hierarquia tipográfica, arquitetura de informação, conversão e percepção de valor.",
    relatedProjects: ["Certificação Designer 5k", "Cigana Morgana"]
  },
  {
    name: "SQL / PostgreSQL",
    category: "core",
    level: "Avançado",
    percentage: 88,
    description: "Consultas relacionais otimizadas, modelagem de dados, migrações SQL e funções de banco de dados.",
    relatedProjects: ["Elite House Piracicaba"]
  },

  // Frameworks, CMS & Web APIs
  {
    name: "React 18",
    category: "frameworks",
    level: "Avançado",
    percentage: 92,
    description: "Criação de Single Page Applications (SPAs) reativas, Hooks customizados e controle global de estado.",
    relatedProjects: ["Elite House Piracicaba"]
  },
  {
    name: "WordPress",
    category: "frameworks",
    level: "Avançado",
    percentage: 92,
    description: "Desenvolvimento de sites corporativos, portfólios, blogs e páginas profissionais de alta performance com temas e plugins customizados.",
    relatedProjects: ["Certificação Designer 5k"]
  },
  {
    name: "Elementor Pro",
    category: "frameworks",
    level: "Especialista",
    percentage: 90,
    description: "Criação de landing pages de alta conversão, layouts dinâmicos, componentes reutilizáveis e integração de formulários.",
    relatedProjects: ["Certificação Designer 5k"]
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

  // Ferramentas & Design
  {
    name: "Figma",
    category: "tools",
    level: "Avançado",
    percentage: 88,
    description: "Prototipagem de telas, criação de design systems, wireframes interativos e protótipos navegáveis.",
    relatedProjects: ["Certificação Designer 5k", "Vendramini Informática"]
  },
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
    name: "Inteligência Emocional & Soft Skills",
    category: "tools",
    level: "Especialista",
    percentage: 95,
    description: "Autogestão emocional, empatia, escuta ativa, comunicação assertiva, resiliência e inteligência interpessoal em ambientes sob pressão.",
    relatedProjects: ["Certificação Inteligência Emocional", "Conexão Marketing"]
  },
  {
    name: "Liderança & Gestão de Pessoas",
    category: "tools",
    level: "Especialista",
    percentage: 95,
    description: "Desenvolvimento contínuo de equipes, mediação estratégica de conflitos, gestão de clima e promoção de alta performance operacional.",
    relatedProjects: ["Conexão Marketing", "Certificação Inteligência Emocional"]
  },
  {
    name: "Carisma & Comunicação Persuasiva",
    category: "tools",
    level: "Especialista",
    percentage: 94,
    description: "Presença executiva, magnetismo interpessoal, oratória, linguagem corporal, escuta ativa e construção de parcerias de alto valor.",
    relatedProjects: ["Certificação Carisma & Comunicação", "Conexão Marketing"]
  },
  {
    name: "Microsoft Excel Avançado & Análise de Dados",
    category: "tools",
    level: "Avançado",
    percentage: 92,
    description: "Modelagem de dados corporativos, tabelas dinâmicas (Pivot), funções avançadas (PROCV, ÍNDICE/CORRESP), dashboards e automação com Macros.",
    relatedProjects: ["Certificação Excel Avançado", "Conexão Marketing"]
  },
  {
    name: "Desenvolvimento Assistido por IA (Lovable / Agentic)",
    category: "tools",
    level: "Avançado",
    percentage: 94,
    description: "Aceleração de engenharia de software com ferramentas de IA generativa (Lovable AI), prototipagem de produtos full-stack e engenharia de prompts.",
    relatedProjects: ["Certificação Lovable AI Workshop", "Projetos Pessoais"]
  },
  {
    name: "VSCode",
    category: "tools",
    level: "Especialista",
    percentage: 96,
    description: "IDE principal configurada com linters, formatadores e ambiente estendido para TypeScript e React.",
    relatedProjects: ["Todos os projetos"]
  },

  // Redes, Deploy & Infraestrutura
  {
    name: "Redes & TCP/IP",
    category: "deploy",
    level: "Avançado",
    percentage: 90,
    description: "Arquitetura de redes de computadores, modelo OSI, protocolo TCP/IP, endereçamento IPv4/IPv6, sub-redes e roteamento.",
    relatedProjects: ["Certificação Analista de Redes", "Vendramini Informática"]
  },
  {
    name: "Serviços de Rede (DNS / DHCP)",
    category: "deploy",
    level: "Avançado",
    percentage: 88,
    description: "Gerenciamento de zonas DNS, configuração DHCP, servidores web HTTP/HTTPS e segurança de infraestrutura.",
    relatedProjects: ["Certificação Analista de Redes", "Vendramini Informática"]
  },
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
    description: "Deploy automatizado, hospedagem serverless de alta performance e integração de domínios.",
    relatedProjects: ["Vendramini Informática", "C4T4T4U Eletrônicos", "Cigana Morgana"]
  },
  {
    name: "Git / GitHub Pages",
    category: "deploy",
    level: "Especialista",
    percentage: 96,
    description: "Versionamento de código e hospedagem de aplicações estáticas e projetos open source.",
    relatedProjects: ["Rei das Roms", "Festa Fácil Personalizados"]
  }
];

export const projectsData = [
  {
    id: "pet-life",
    name: "PetLife",
    subtitle: "Página Institucional para Clínica Veterinária & Petshop",
    category: "Landing Page / One Page",
    image: petLifeImg,
    badge: "Estudo • OneBitCode",
    shortDescription: "Página web responsiva no estilo One Page projetada para clínicas veterinárias e petshops. Oferece apresentação detalhada dos serviços de saúde animal, vitrine de produtos e medicamentos da farmácia veterinária, seção de dúvidas frequentes (FAQ) e formulário direto de agendamento de consultas.",
    problem: "Clínicas veterinárias e petshops necessitam de uma presença digital acolhedora e informativa que centralize serviços médicos, farmácia e agendamentos para tutores de pets em uma navegação fluida.",
    idea: "Desenvolver uma landing page moderna em conceito One Page com design suave e amigável, seções estruturadas para clínica e farmácia, chamada clara para ação (CTA) para marcação de consultas e formulário de contato integrado.",
    construction: "Desenvolvido como projeto de consolidação do curso Start na Programação da OneBitCode utilizando HTML5 semântico, CSS3 (layout responsivo com Flexbox, estilização personalizada e media queries) e JavaScript ES6+ para interatividade e navegação.",
    result: "Interface amigável de alta clareza para tutores de animais, apresentação completa dos serviços veterinários e facilidade na marcação de consultas online com excelente adaptação para telas mobile.",
    technologies: ["HTML5", "CSS3", "JavaScript ES6+", "Design Responsivo", "One Page Architecture"],
    date: "2025",
    link: "https://rik-404.github.io/petlife/",
    github: "https://github.com/rik-404/petlife",
    status: "Estudo"
  },
  {
    id: "sabor-express",
    name: "Sabor Express",
    subtitle: "Cardápio Digital & Delivery Interativo",
    category: "Plataforma / E-Commerce / Delivery",
    image: menuDeliveryImg,
    badge: "Ativo • Supabase",
    shortDescription: "Plataforma completa de cardápio digital e delivery interativo projetada para restaurantes, lanchonetes e hamburguerias. Possui suporte híbrido de persistência (localStorage + Supabase cloud com RLS), checkout via WhatsApp, Painel Administrativo em tempo real com gestão CRUD, notificações sonoras e dashboard de métricas com Chart.js.",
    problem: "Estabelecimentos gastronômicos necessitavam de um cardápio digital moderno, ágil e responsivo para exibição de produtos por categoria, captação direta de pedidos via WhatsApp sem taxas abusivas de aplicativos e gerenciamento administrativo de estoque e vendas em tempo real.",
    idea: "Desenvolver uma plataforma de delivery com experiência híbrida (modo local offline e nuvem via Supabase), carrinho de compras dinâmico com cálculo de taxa de entrega, checkout instantâneo formatado para WhatsApp e Painel Admin com Dashboard estatístico Chart.js, notificação sonora de novos pedidos e autenticação segura.",
    construction: "Desenvolvido com HTML5 semântico, CSS3 Vanilla (Flexbox, CSS Grid, variáveis de design system, micro-animações responsivas Mobile-First), JavaScript ES6+ nativo e Supabase (PostgreSQL relacional cloud com RLS e WebSockets Real-time Engine). Hospedado com Clean URLs e suporte a Chart.js para analytics no painel admin.",
    result: "Autonomia total para o estabelecimento gerenciar produtos e pedidos, redução do tempo de atendimento com mensagens padronizadas no WhatsApp, métricas financeiras em tempo real e operabilidade imediata mesmo sem backend via localStorage.",
    technologies: ["HTML5", "CSS3", "JavaScript ES6+", "Supabase", "PostgreSQL", "RLS", "WhatsApp API", "Chart.js", "LocalStorage"],
    date: "2025",
    link: "https://menu-de-delivery.vercel.app/",
    github: "https://github.com/rik-404/menu-de-delivery",
    status: "Ativo"
  },
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
    period: "2022 - 2023",
    role: "Técnico de Apoio ao Usuário de Informática",
    company: "SRG TELECOM LTDA",
    summary: "Atendimento especializado ao cliente corporativo e residencial no setor de telecomunicações. Operação avançada do sistema NMS UNM2000 para provisionamento de equipamentos ópticos, cadastro de planos de internet, autenticação PPPoE, abertura e gestão de Ordens de Serviço (O.S.).",
    highlights: [
      "Operação do sistema de gerência óptica UNM2000 para cadastros, liberação e provisionamento de ONUs/OLTs.",
      "Gerenciamento de autenticação PPPoE, controle de bandas e liberação de acessos a clientes de internet.",
      "Abertura, triagem e resolução de Ordens de Serviço (O.S.) operacionais com atendimento direto ao público."
    ]
  },
  {
    period: "2020 - 2021",
    role: "Aprendiz de Logística",
    company: "FMM METALMECANICA LTDA",
    summary: "Atuação direta em Planejamento e Controle de Produção (PCP), coordenação de processos de recebimento, expedição de mercadorias e controle analítico de estoque corporativo.",
    highlights: [
      "Responsável pelo PCP (Planejamento e Controle de Produção), otimizando o fluxo produtivo e de suprimentos.",
      "Gestão de recebimento, triagem de materiais e expedição de produtos em ambiente industrial.",
      "Controle contínuo de estoque, inventário e comunicação técnica com a linha de produção."
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
    company: "MYOUNG SHIN BRASIL",
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

export const certificatesData = [
  {
    id: "designer-5k",
    title: "Designer 5k",
    subtitle: "Certificação Profissional em Web Design & WordPress",
    issuer: "Designer 5k",
    category: "Web Design / WordPress / UI/UX",
    date: "2026",
    image: designer5kImg,
    description: "Certificação profissional focada em criação de sites e landing pages de alta conversão. Domínio de técnicas avançadas de Web Design, arquitetura UI/UX, prototipagem no Figma e desenvolvimento corporativo com WordPress, Elementor e estratégias de design de alto valor percebido.",
    skills: ["WordPress", "Elementor", "Web Design", "UI/UX", "Figma", "Design Responsivo", "Conversão & UX"],
    badge: "Certificado Oficial"
  },
  {
    id: "html5-css3",
    title: "HTML5 & CSS3",
    subtitle: "Certificação em Desenvolvimento Front-End & Estilização Semântica",
    issuer: "Curso em Vídeo / Gustavo Guanabara",
    category: "Front-End / Web Development",
    date: "2025",
    image: htmlCssCertImg,
    description: "Certificação completa em desenvolvimento web moderno com HTML5 semântico e CSS3 avançado. Domínio de estruturação de páginas, layouts responsivos com Flexbox e CSS Grid, variáveis CSS, acessibilidade web (a11y), animações e boas práticas de Front-End.",
    skills: ["HTML5", "CSS3", "Flexbox", "CSS Grid", "Design Responsivo", "SEO Técnico", "Acessibilidade"],
    badge: "Certificado Oficial"
  },
  {
    id: "analista-redes",
    title: "Analista de Redes",
    subtitle: "Certificação em Infraestrutura de Redes, Arquitetura & Segurança",
    issuer: "Curso em Vídeo / Gustavo Guanabara",
    category: "Infraestrutura / Redes & Segurança",
    date: "2023",
    image: analistaRedesCertImg,
    description: "Certificação especializada em arquitetura e análise de redes de computadores. Aborda conceitos avançados de modelo OSI/TCP-IP, endereçamento IPv4/IPv6, sub-redes, roteamento, comutação (Switching), segurança de redes, protocolos DNS/DHCP/HTTP e infraestrutura corporativa.",
    skills: ["Redes de Computadores", "TCP/IP", "IPv4 / IPv6", "Roteamento & Switch", "DNS & DHCP", "Segurança de Redes", "Infraestrutura IT"],
    badge: "Certificado Oficial"
  },
  {
    id: "inteligencia-emocional",
    title: "Inteligência Emocional",
    subtitle: "Certificação Profissional em Inteligência Emocional & Soft Skills",
    issuer: "Certificação Profissional em Liderança & Desenvolvimento",
    category: "Soft Skills / Liderança",
    date: "2025",
    image: inteligenciaEmocionalCertImg,
    description: "Certificação focada no desenvolvimento de inteligência emocional, autogestão, empatia, inteligência interpessoal, mediação de conflitos, resiliência e liderança de alta performance no ambiente corporativo e gestão de pessoas.",
    skills: ["Inteligência Emocional", "Soft Skills", "Liderança de Pessoas", "Autogestão", "Comunicação Assertiva", "Resolução de Conflitos"],
    badge: "Certificado Oficial"
  },
  {
    id: "carisma",
    title: "Carisma & Comunicação",
    subtitle: "Certificação em Carisma, Comunicação Persuasiva & Presença Executiva",
    issuer: "Certificação Profissional em Desenvolvimento Pessoal & Soft Skills",
    category: "Soft Skills / Comunicação",
    date: "2025",
    image: carismaCertImg,
    description: "Certificação focada no desenvolvimento de carisma, presença executiva, comunicação persuasiva, magnetismo interpessoal, linguagem corporal, escuta ativa e construção de relacionamentos profissionais de alto impacto.",
    skills: ["Carisma", "Comunicação Persuasiva", "Linguagem Corporal", "Presença Executiva", "Oratória & Influência", "Networking"],
    badge: "Certificado Oficial"
  },
  {
    id: "excel-avancado",
    title: "Excel Avançado",
    subtitle: "Certificação Profissional em Excel Avançado, Análise de Dados & Automação",
    issuer: "Certificação Profissional em Informática & Análise de Dados",
    category: "Análise de Dados / Produtividade",
    date: "2020",
    image: excelAvançadoCertImg,
    description: "Certificação avançada em Microsoft Excel. Domínio de funções lógicas avançadas (PROCV, ÍNDICE/CORRESP), tabelas dinâmicas (Pivot Tables), gráficos dinâmicos, validação de dados, relatórios corporativos, automação com Macros e análise financeira.",
    skills: ["Excel Avançado", "Tabelas Dinâmicas", "Funções Avançadas", "Análise de Dados", "Macros & Automação", "Dashboards Corporativos"],
    badge: "Certificado Oficial"
  },
  {
    id: "lovable-workshop",
    title: "Lovable AI Workshop",
    subtitle: "Certificação em Desenvolvimento Assistido por IA, Prototipagem & Lovable",
    issuer: "Lovable Workshop",
    category: "Inteligência Artificial / Low-Code & Prototipagem",
    date: "2025",
    image: lovableCertImg,
    description: "Certificação em desenvolvimento de produtos digitais com ferramentas assistidas por Inteligência Artificial (Lovable AI). Aborda criação acelerada de SPAs, engenharia de prompts avançada, prototipagem full-stack de alta velocidade e integração de IAs generativas no fluxo de engenharia de software.",
    skills: ["Lovable AI", "AI-Driven Development", "Engenharia de Prompts", "Prototipagem de Produtos", "Full-Stack AI", "Produtividade com IA"],
    badge: "Certificado Oficial"
  },
  {
    id: "python-fundamentos",
    title: "Python 3 — Fundamentos",
    subtitle: "Certificação em Lógica de Programação, Estruturas de Dados & Python 3",
    issuer: "Curso em Vídeo / Gustavo Guanabara",
    category: "Linguagens & Backend / Python",
    date: "2026",
    image: pythonCertImg,
    description: "Certificação nos fundamentos da linguagem Python 3. Aborda sintaxe moderna, tipos primitivos, operadores aritméticos/lógicos, tratamento de dados, módulos, manipulação de texto, estruturas condicionais e resolução algorítmica de problemas.",
    skills: ["Python 3", "Lógica de Programação", "Algoritmos", "Manipulação de Dados", "Tratamento de Strings", "Estruturas Condicionais"],
    badge: "Certificado Oficial"
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
    "  sobre    - Resumo sobre Ricardo Vendramini & Vendramini Informática",
    "  skills   - Lista das principais competências técnicas",
    "  projetos - Lista dos projetos em destaque",
    "  livros   - Livros e publicações",
    "  contato  - Informações de contato direto",
    "  navinha  - Jogo Space Invaders Arcade 🎮",
    "  breakout - Jogo Breakout de destruir blocos neon 🧱",
    "  starwars - Abertura 3D Star Wars Crawl 🌌",
    "  clean    - Limpeza Total: deixa o site 100% limpo e limpo 🧹",
    "  restore  - Restaura todos os elementos e seções do site ✨",
    "  english  - Alterne o idioma do site para Inglês (English) 🌐",
    "  portugues- Alterne o idioma do site para Português 🇧🇷",
    "  reset    - Zera todas as conquistas e easter eggs 🔄",
    "  clear    - Limpa o histórico do terminal",
    "",
    "Digite qualquer comando para executar."
  ],
  games: [
    "⚡ ARCADE CENTER — Jogos Disponíveis:",
    "",
    "★ navinha    - Space Invaders Geometric: destrua aliens com formas geométricas 👾",
    "★ breakout   - Breakout Arcade: controle a raquete e destrua os blocos neon da tela 🧱",
    "★ starwars   - Star Wars 3D Crawl: texto de abertura galáctico em 3D 🌌",
    "",
    "Digite o nome do jogo para iniciar."
  ]
};

export const terminalCommandsEn = {
  welcome: [
    "RICARDO.DEV Terminal [Version 4.2.0]",
    "(c) 2026 Ricardo Vendramini - Vendramini Informática.",
    "",
    "> Loading portfolio modules...",
    "[OK] Frontend Engine ....... 100%",
    "[OK] Backend Microservices . 100%",
    "[OK] Database Connector .... 100%",
    "[OK] Linux Infrastructure .. 100%",
    "[OK] Security Protocols .... 100%",
    "",
    "STATUS: SYSTEM ONLINE & OPERATIONAL",
    "",
    "Type 'help' or choose one of the shortcuts to explore."
  ],
  help: [
    "Available commands:",
    "",
    "  about    - Summary about Ricardo Vendramini & Vendramini Informática",
    "  skills   - List of main technical competencies",
    "  projects - List of featured projects",
    "  books    - Books and publications",
    "  contact  - Direct contact information",
    "  navinha  - Space Invaders Arcade Game 🎮",
    "  breakout - Breakout Game: destroy the neon blocks 🧱",
    "  starwars - 3D Star Wars Crawl opening 🌌",
    "  clean    - Total Clean: leaves the site 100% clean 🧹",
    "  restore  - Restores all site elements and sections ✨",
    "  english  - Switch site language to English 🌐",
    "  portugues- Switch site language to Portuguese 🇧🇷",
    "  reset    - Resets all achievements and easter eggs 🔄",
    "  clear    - Clears the terminal history",
    "",
    "Type any command to run it."
  ],
  games: [
    "⚡ ARCADE CENTER — Available Games:",
    "",
    "★ navinhab - Space Invaders Geometric: destroy aliens with geometric shapes 👾",
    "★ breakout - Breakout Arcade: control the paddle and destroy the neon blocks on screen 🧱",
    "★ starwars - Star Wars 3D Crawl: galactic opening text in 3D 🌌",
    "",
    "Type the game name to start."
  ]
};

export const easterEggInfo = {
  triggerHint: "Dica: Digite 'matrix' no terminal ou aperte a sequência secreta para ativar o modo desenvolvedor místico.",
  title: "⚡ MODO MATRIX ATIVADO",
  message: "Parabéns por explorar além da superfície! Como desenvolvedores, vivemos curiosos para entender o que há por trás das cortinas do código.",
  quote: "“Existem 10 tipos de pessoas no mundo: as que entendem binário e as que não entendem.” — Ricardo Vendramini"
};

export const easterEggInfoEn = {
  triggerHint: "Tip: Type 'matrix' in the terminal or press the secret sequence to activate the mystic developer mode.",
  title: "⚡ MATRIX MODE ACTIVATED",
  message: "Congratulations for exploring beyond the surface! As developers, we stay curious to understand what lies behind the curtains of code.",
  quote: "“There are 10 types of people in the world: those who understand binary and those who don't.” — Ricardo Vendramini"
};

// ==================== I18N DATA HELPERS ====================

export function getStatsData(lang = 'pt') {
  if (lang === 'en') {
    return [
      { id: 1, label: "Repositories Created", value: 32, prefix: "+", suffix: "" },
      { id: 2, label: "Production Systems", value: 6, prefix: "", suffix: "" },
      { id: 3, label: "Published Platforms & Sites", value: 30, prefix: "+", suffix: "" },
      { id: 4, label: "Tech Stack Tools", value: 18, prefix: "", suffix: "" },
      { id: 5, label: "Years of Experience", value: 9, prefix: "+", suffix: "" },
      { id: 6, label: "Active Commercial Solutions", value: 6, prefix: "", suffix: "" }
    ];
  }
  return statsData;
}

export function getTimelineData(lang = 'pt') {
  if (lang === 'en') {
    return [
      {
        year: "2017 - 2018",
        title: "First IT Experience — Junior Administrative Apprentice at MYOUNG SHIN BRASIL",
        description: "Entered the job market as an IT administrative apprentice at Myoung Shin Brasil. First hands-on immersion with tech support, operating routines, and IT infrastructure.",
        projects: ["IT Support & Infrastructure at MYOUNG SHIN BRASIL"],
        technologies: ["IT Assistance", "Technical Support", "Admin Routines"],
        achievements: [
          "First professional experience in IT operations and technology management",
          "Developing key discipline in technical support, organization, and IT processes"
        ]
      },
      {
        year: "2018 - Present",
        title: "Founding & Launch of Vendramini Informática",
        description: "Creation of Vendramini Informática. Initially operated from home focusing on hardware maintenance, system diagnostics, and specialized tech support, steadily evolving into web software engineering.",
        projects: ["Vendramini Informática", "Tech Support & Hardware Repair"],
        technologies: ["Hardware Maintenance", "System Diagnostics", "Networking", "Client Support"],
        achievements: [
          "Company founding and launch of hardware assistance operations",
          "Building a solid client base and gradual transition to web software engineering"
        ]
      },
      {
        year: "2019 - 2023",
        title: "Multidisciplinary Roles & Parallel Company Operations",
        description: "Professional experience across corporate sectors while maintaining continuous technical operations, client support, and IT services at Vendramini Informática.",
        projects: ["Vendramini Informática", "Parallel Client Management"],
        technologies: ["Time Management", "Customer Service", "Hardware Support", "Autodidactic IT"],
        achievements: [
          "Active maintenance of client portfolio and technical reputation",
          "Developing high resilience, routine organization, and operational discipline"
        ]
      },
      {
        year: "2022 - 2023",
        title: "IT User Support Technician — SRG TELECOM LTDA",
        description: "Operations in the telecommunications sector. Customer service, UNM2000 NMS optical network system management, internet plan setup, PPPoE access provisioning, and Service Order (S.O.) management.",
        projects: ["Telecom Infrastructure & UNM2000 Provisioning"],
        technologies: ["UNM2000 System", "PPPoE Authentication", "Optical Networks", "Service Orders (S.O.)", "Customer Support"],
        achievements: [
          "Advanced operation of NMS UNM2000 system for optical device provisioning",
          "Efficient creation, tracking, and resolution of operational Service Orders"
        ]
      },
      {
        year: "2023",
        title: "Junior IT Technician — ORION SOFTWARES E EQUIPAMENTOS LTDA",
        description: "Junior IT technician at ORION Softwares. Specialized technical support focused on hardware and proprietary software troubleshooting, combining user assistance with immersion into software development.",
        projects: ["Orion Proprietary Software", "HW/SW Diagnostics"],
        technologies: ["Proprietary Software", "Level 2/3 Tech Support", "HW/SW Diagnostics", "Dev Environments"],
        achievements: [
          "Deep technical experience resolving incidents in proprietary software systems",
          "Close technical alignment with software development lifecycles"
        ]
      },
      {
        year: "2023 - Present",
        title: "Customer Service Supervisor — Conexão Marketing",
        description: "Customer Service Supervisor at Conexão Marketing. Team leadership, corporate process organization, project control, SLA/KPI tracking, analytical conflict resolution, and operational excellence.",
        projects: ["Operations & Service Supervision", "Project & People Management"],
        technologies: ["People Leadership", "Project Management", "Conflict Resolution", "KPI Control", "Operations"],
        achievements: [
          "Strategic team leadership focused on process organization and human mediation",
          "Constant tracking of project timelines and service level agreements (SLAs)"
        ]
      }
    ];
  }
  return timelineData;
}

export function getExperienceData(lang = 'pt') {
  if (lang === 'en') {
    return [
      {
        period: "2023 - Present",
        role: "Customer Service Supervisor",
        company: "Conexão Marketing",
        summary: "Strategic leadership of customer service teams, corporate process organization, operational project management, KPI/SLA tracking, and analytical conflict resolution.",
        highlights: [
          "Team leadership, continuous employee development, and interpersonal conflict resolution.",
          "Structuring operational workflows with strict schedule and SLA tracking.",
          "Direct stakeholder communication and customer service optimization."
        ]
      },
      {
        period: "2023",
        role: "Junior IT Technician",
        company: "ORION SOFTWARES E EQUIPAMENTOS LTDA",
        summary: "Specialized technical support focused on hardware and proprietary software troubleshooting, combining user assistance with immersion into the software engineering ecosystem.",
        highlights: [
          "Technical support focused on analytical incident resolution for proprietary software.",
          "Specialized hardware, peripheral, and diagnostic system maintenance.",
          "Technical liaison between end-users and product engineering teams."
        ]
      },
      {
        period: "2022 - 2023",
        role: "IT User Support Technician",
        company: "SRG TELECOM LTDA",
        summary: "Specialized customer service for corporate and residential telecom clients. Advanced operation of the UNM2000 NMS optical management system for device provisioning, internet plan setup, PPPoE authentication, and Service Order management.",
        highlights: [
          "Optical network management (UNM2000 NMS) for ONU/OLT provisioning and subscriber setup.",
          "PPPoE authentication management, bandwidth control, and broadband provisioning.",
          "Service Order creation, triage, and resolution with direct public interaction."
        ]
      },
      {
        period: "2020 - 2021",
        role: "Logistics Apprentice",
        company: "FMM METALMECANICA LTDA",
        summary: "Production Planning and Control (PCP), coordination of receiving processes, goods dispatching, and industrial inventory control.",
        highlights: [
          "Responsible for PCP (Production Planning & Control), optimizing production flow and supply chain.",
          "Material receiving, sorting, and product dispatching in an industrial setting.",
          "Continuous inventory control, auditing, and technical communication with the assembly line."
        ]
      },
      {
        period: "2018 - Present",
        role: "Tech Lead & Founder",
        company: "Vendramini Informática",
        summary: "Founded the company, initially operated from home focusing on hardware maintenance and tech support, evolving into web software architecture, production system development, and tech leadership.",
        highlights: [
          "Building and publishing complete web applications (React, TypeScript, Supabase, Tailwind).",
          "Continuous company evolution from hardware support into software engineering.",
          "Active maintenance of corporate client portfolio and active solutions."
        ]
      },
      {
        period: "2017 - 2018",
        role: "Junior IT Administrative Apprentice",
        company: "MYOUNG SHIN BRASIL",
        summary: "First professional experience in the IT department providing administrative assistance, operational support, and initial technology routines.",
        highlights: [
          "Initial hands-on experience with IT infrastructure, internal ticketing, and tech processes.",
          "Developing discipline, user support, and technical routine organization."
        ]
      }
    ];
  }
  return experienceData;
}

export function getLeadershipPillars(lang = 'pt') {
  if (lang === 'en') {
    return [
      {
        icon: "Users",
        title: "People-Oriented Leadership",
        description: "I believe the best software stems from empowered, heard, and inspired teams. Focus on human and technical growth."
      },
      {
        icon: "MessageSquare",
        title: "Clear & Transparent Communication",
        description: "Translating complex technical concepts into business language, keeping all stakeholders aligned with project goals."
      },
      {
        icon: "Workflow",
        title: "Organization & Efficient Processes",
        description: "Eliminating operational bottlenecks through clear documentation, process clarity, and metrics tracking."
      },
      {
        icon: "ShieldAlert",
        title: "Pragmatic Problem Solving",
        description: "Focus on searching for simple, effective, and lasting solutions under high-pressure technical scenarios."
      },
      {
        icon: "Target",
        title: "Strategic Decision Making",
        description: "Balancing delivery speed with code sustainability, prioritizing real value delivery at every development stage."
      },
      {
        icon: "Compass",
        title: "Holistic Product Vision",
        description: "Looking beyond code: understanding end-user pain points, business models, and how tech drives business results."
      }
    ];
  }
  return leadershipPillars;
}

export function getBooksData(lang = 'pt') {
  if (lang === 'en') {
    return booksData.map(b => ({
      ...b,
      title: "Timewalker: Dante's Paradox",
      subtitle: "Dante's Paradox",
      synopsis: "After the brutal death of Lívian, Dante refuses to accept the silence that remains. Consumed by grief and guilt, he constructs a device capable of breaking time—not out of ambition, but to understand where everything went wrong.\n\nEvery journey brings him to the same place in different eras, revealing fragments of a reality that insists on repeating itself. What begins as a search for answers turns into a psychological labyrinth where the past becomes unstable, the future loses definition, and Dante's own identity starts to dissolve.\n\nAs versions of himself emerge from temporal rifts, Dante is forced to confront a disturbing truth: time does not merely obey physical laws—it reacts to obsession, to the gaze, to the insistence of one who refuses to move on.\n\nBetween science and delusion, love and guilt, Timewalker: Dante's Paradox is a novel about how far a man will go to deny the end, and the price of attempting to fix what was never a mistake of time, but of human nature itself.\n\nBecause not every hell is a place.\nSome are built inside those who insist on looking back.",
      creationProcess: "Sci-fi and psychological suspense exploring time travel, grief, obsession, and the limits of the human mind.",
      status: "Published / Available",
      tags: ["Temporal Paradox", "Sci-Fi", "Grief & Suspense"]
    }));
  }
  return booksData;
}

export function getAchievementsData(lang = 'pt') {
  if (lang === 'en') {
    return [
      {
        number: "01",
        title: "Multiple Production Applications",
        category: "Projects",
        description: "Successful launch of complex web ecosystems serving active users daily with high uptime."
      },
      {
        number: "02",
        title: "Operational Transformation",
        category: "Processes",
        description: "Redesign of technical workflows resulting in 30% faster deliveries and lower production error rates."
      },
      {
        number: "03",
        title: "Book & Content Publication",
        category: "Knowledge",
        description: "Structuring technical experiences and leadership concepts into published literature and reference material."
      },
      {
        number: "04",
        title: "Comprehensive Tech Ecosystem",
        category: "Technical Mastery",
        description: "Fluency across Frontend, Backend, Relational Databases, Linux Infrastructure, and IT Governance."
      }
    ];
  }
  return achievementsData;
}

export function getSkillsData(lang = 'pt') {
  if (lang === 'en') {
    const ex = (index, overrides) => ({ ...skillsData[index], ...overrides });
    return [
      ex(0, { level: 'Expert', description: 'Development of complex logic, async manipulation, Web APIs, and reactive software architecture.', relatedProjects: ['Vendramini Informática', 'Elite House Piracicaba'] }),
      ex(1, { level: 'Advanced', description: 'Strict static typing, generic interfaces, and error-proof scalable code.', relatedProjects: ['Elite House Piracicaba'] }),
      ex(2, { level: 'Advanced', description: 'Development of algorithmic routines, advanced data manipulation, automation, scripts, and structured logic.', relatedProjects: ['Python 3 Fundamentals Certification', 'Automation'] }),
      ex(3, { level: 'Expert', description: 'Advanced web semantics, accessibility (a11y), technical SEO, and modern, certification-validated structures.', relatedProjects: ['Vendramini Informática', 'HTML5 & CSS3 Certification'] }),
      ex(4, { level: 'Expert', description: 'Advanced responsive design, CSS variables (HSL), glassmorphism, Flexbox, Grid, and cyberpunk themes.', relatedProjects: ['Vendramini Informática', 'HTML5 & CSS3 Certification'] }),
      ex(5, { level: 'Expert', description: 'Aesthetic-visual composition, typographic hierarchy, information architecture, conversion, and perceived value.', relatedProjects: ['Designer 5k Certification', 'Cigana Morgana'] }),
      ex(6, { level: 'Advanced', description: 'Optimized relational queries, data modeling, SQL migrations, and database functions.', relatedProjects: ['Elite House Piracicaba'] }),
      ex(7, { level: 'Advanced', description: 'Building reactive Single Page Applications (SPAs), custom Hooks, and global state control.', relatedProjects: ['Elite House Piracicaba'] }),
      ex(8, { level: 'Advanced', description: 'Development of corporate sites, portfolios, blogs, and high-performance professional pages with custom themes and plugins.', relatedProjects: ['Designer 5k Certification'] }),
      ex(9, { level: 'Expert', description: 'Creation of high-conversion landing pages, dynamic layouts, reusable components, and form integration.', relatedProjects: ['Designer 5k Certification'] }),
      ex(10, { level: 'Advanced', description: 'Next-generation build tool for ultra-fast bundling and real-time development server.', relatedProjects: ['Elite House Piracicaba'] }),
      ex(11, { level: 'Expert', description: 'High-speed utility styling with consistent design systems and native dark mode.', relatedProjects: ['Elite House Piracicaba', 'Vendramini Informática'] }),
      ex(12, { level: 'Advanced', description: 'Accessible and customizable UI components for real estate management and CRM modules.', relatedProjects: ['Elite House Piracicaba'] }),
      ex(13, { level: 'Advanced', description: 'Server state management, remote data caching, and background data invalidation.', relatedProjects: ['Elite House Piracicaba'] }),
      ex(14, { level: 'Advanced', description: 'Real-time 2D rendering, 60fps Matrix rain effect, and graphic manipulation via canvas elements.', relatedProjects: ['Vendramini Informática'] }),
      ex(15, { level: 'Advanced', description: 'Installable applications with offline access, strategic caching, and Service Workers.', relatedProjects: ['Vendramini Informática', 'Elite House Piracicaba'] }),
      ex(16, { level: 'Advanced', description: 'Backend-as-a-Service with real-time Postgres, JWT/RBAC authentication, Row Level Security (RLS), and Storage Buckets.', relatedProjects: ['Elite House Piracicaba'] }),
      ex(17, { level: 'Advanced', description: 'Total isolation of sensitive data with strict row-level security policies (RLS).', relatedProjects: ['Elite House Piracicaba'] }),
      ex(18, { level: 'Advanced', description: 'Build script execution, static generators for real estate/SEO, and service integration.', relatedProjects: ['Elite House Piracicaba'] }),
      ex(19, { level: 'Expert', description: 'Webhook integration for automatic lead capture (Facebook Ads) and WhatsApp automation.', relatedProjects: ['Elite House Piracicaba'] }),
      ex(20, { level: 'Advanced', description: 'Screen prototyping, design systems creation, interactive wireframes, and navigable prototypes.', relatedProjects: ['Designer 5k Certification', 'Vendramini Informática'] }),
      ex(21, { level: 'Advanced', description: 'Linux environments (Debian, Ubuntu, servers) for shell terminal, CLI commands, and process management.', relatedProjects: ['Vendramini Informática', 'Development Environment'] }),
      ex(22, { level: 'Expert', description: 'Code versioning, branch management, commit auditing, and remote deployment.', relatedProjects: ['Elite House Piracicaba', 'Vendramini Informática'] }),
      ex(23, { level: 'Expert', description: 'Emotional self-management, empathy, active listening, assertive communication, resilience, and interpersonal intelligence under pressure.', relatedProjects: ['Emotional Intelligence Certification', 'Conexão Marketing'] }),
      ex(24, { level: 'Expert', description: 'Continuous team development, strategic conflict mediation, climate management, and high operational performance.', relatedProjects: ['Conexão Marketing', 'Emotional Intelligence Certification'] }),
      ex(25, { level: 'Expert', description: 'Executive presence, interpersonal magnetism, public speaking, body language, active listening, and high-value partnerships.', relatedProjects: ['Charisma & Communication Certification', 'Conexão Marketing'] }),
      ex(26, { level: 'Advanced', description: 'Corporate data modeling, Pivot Tables, advanced functions (VLOOKUP, INDEX/MATCH), dashboards, and Macro automation.', relatedProjects: ['Advanced Excel Certification', 'Conexão Marketing'] }),
      ex(27, { level: 'Advanced', description: 'Software engineering acceleration with generative AI tools (Lovable AI), full-stack product prototyping, and prompt engineering.', relatedProjects: ['Lovable AI Workshop Certification', 'Personal Projects'] }),
      ex(28, { level: 'Expert', description: 'Main IDE configured with linters, formatters, and extended environment for TypeScript and React.', relatedProjects: ['All projects'] }),
      ex(29, { level: 'Advanced', description: 'Computer network architecture, OSI model, TCP/IP, IPv4/IPv6, subnetting, and routing.', relatedProjects: ['Network Analyst Certification', 'Vendramini Informática'] }),
      ex(30, { level: 'Advanced', description: 'DNS zone management, DHCP configuration, HTTP/HTTPS web servers, and infrastructure security.', relatedProjects: ['Network Analyst Certification', 'Vendramini Informática'] }),
      ex(31, { level: 'Advanced', description: 'Hosting, domains, DNS zone management, and SSL certificates applied to production projects.', relatedProjects: ['Elite House Piracicaba'] }),
      ex(32, { level: 'Expert', description: 'Automated deployment, high-performance serverless hosting, and domain integration.', relatedProjects: ['Vendramini Informática', 'C4T4T4U Electronics', 'Cigana Morgana'] }),
      ex(33, { level: 'Expert', description: 'Code versioning and hosting of static applications and open source projects.', relatedProjects: ['King of ROMs', 'Festa Fácil Custom'] }),
    ];
  }
  return skillsData;
}

export function getCertificatesData(lang = 'pt') {
  if (lang === 'en') {
    return [
      {
        ...certificatesData[0],
        title: "Designer 5k",
        subtitle: "Professional Certification in Web Design & WordPress",
        description: "Professional certification focused on building high-converting websites and landing pages. Mastery of advanced Web Design techniques, UI/UX architecture, Figma prototyping, and enterprise WordPress development with Elementor.",
        category: "Web Design / UI UX",
        skills: ["WordPress", "Elementor", "Web Design", "UI/UX", "Figma", "Responsive Design", "Conversion & UX"],
        badge: "Official Certificate"
      },
      {
        ...certificatesData[1],
        title: "HTML5 & CSS3",
        subtitle: "Certification in Front-End Development & Semantic Styling",
        description: "Comprehensive certification in modern web development with semantic HTML5 and advanced CSS3. Mastery of page structuring, responsive layouts with Flexbox and CSS Grid, CSS variables, web accessibility (a11y), and Front-End best practices.",
        category: "Front-End / Web Development",
        skills: ["HTML5", "CSS3", "Flexbox", "CSS Grid", "Responsive Design", "Technical SEO", "Accessibility"],
        badge: "Official Certificate"
      },
      {
        ...certificatesData[2],
        title: "Network Analyst",
        subtitle: "Certification in Network Infrastructure, Architecture & Security",
        description: "Specialized certification in computer network architecture and analysis. Covers advanced concepts of OSI/TCP-IP models, IPv4/IPv6 addressing, subnetting, routing, switching, network security, DNS/DHCP/HTTP protocols, and IT infrastructure.",
        category: "Infrastructure / Networks & Security",
        skills: ["Computer Networks", "TCP/IP", "IPv4 / IPv6", "Routing & Switching", "DNS & DHCP", "Network Security", "IT Infrastructure"],
        badge: "Official Certificate"
      },
      {
        ...certificatesData[3],
        title: "Emotional Intelligence",
        subtitle: "Professional Certification in Emotional Intelligence & Soft Skills",
        description: "Certification focused on emotional intelligence, self-management, empathy, interpersonal intelligence, conflict resolution, resilience, and high-performance leadership in corporate environments.",
        category: "Soft Skills / Leadership",
        skills: ["Emotional Intelligence", "Soft Skills", "People Leadership", "Self-Management", "Assertive Communication", "Conflict Resolution"],
        badge: "Official Certificate"
      },
      {
        ...certificatesData[4],
        title: "Charisma & Communication",
        subtitle: "Certification in Charisma, Persuasive Communication & Executive Presence",
        description: "Certification focused on developing charisma, executive presence, persuasive communication, body language, active listening, and building high-impact professional relationships.",
        category: "Soft Skills / Communication",
        skills: ["Charisma", "Persuasive Communication", "Body Language", "Executive Presence", "Public Speaking", "Networking"],
        badge: "Official Certificate"
      },
      {
        ...certificatesData[5],
        title: "Advanced Excel",
        subtitle: "Professional Certification in Advanced Excel, Data Analysis & Automation",
        description: "Certification in advanced Microsoft Excel spreadsheet techniques, complex formulas (VLOOKUP, INDEX/MATCH), Pivot Tables, dynamic charts, data auditing, financial dashboards, and process automation.",
        category: "Data Analysis / Productivity",
        skills: ["Advanced Excel", "Pivot Tables", "Advanced Functions", "Data Analysis", "Macros & Automation", "Corporate Dashboards"],
        badge: "Official Certificate"
      },
      {
        ...certificatesData[6],
        title: "Lovable AI Workshop",
        subtitle: "Certification in AI-Driven Development & Full-Stack Prototyping",
        description: "Hands-on workshop certification focused on full-stack application development accelerated by Artificial Intelligence (Lovable.dev). Rapid UI prototyping, prompt engineering, database integration, and cloud deployment.",
        category: "Artificial Intelligence / Low-Code & Prototyping",
        skills: ["Lovable AI", "AI-Driven Development", "Prompt Engineering", "Product Prototyping", "Full-Stack AI", "AI Productivity"],
        badge: "Official Certificate"
      },
      {
        ...certificatesData[7],
        title: "Python 3 Fundamentals",
        subtitle: "Certification in Programming Logic, Data Structures & Python 3",
        description: "Certification in Python 3 programming fundamentals. Covers modern syntax, primitive data types, arithmetic/logical operators, data handling, modules, string manipulation, control structures, and algorithmic problem solving.",
        category: "Languages & Backend / Python",
        skills: ["Python 3", "Programming Logic", "Algorithms", "Data Handling", "String Manipulation", "Conditional Structures"],
        badge: "Official Certificate"
      }
    ];
  }
  return certificatesData;
}

export function getProjectsData(lang = 'pt') {
  if (lang === 'en') {
    return [
      {
        ...projectsData[0],
        title: "PetLife",
        subtitle: "Veterinary Clinic & Pet Shop Landing Page",
        category: "Landing Page / One Page",
        badge: "Study • OneBitCode",
        name: "PetLife",
        shortDescription: "Responsive One Page website designed for veterinary clinics and pet shops. Features detailed animal health services, products showcase, veterinary pharmacy, FAQ section, and direct consultation booking form.",
        problem: "Veterinary clinics and pet shops need a warm and informative digital presence centralizing medical services, pharmacy, and appointments in a fluid navigation.",
        idea: "Develop a modern One Page landing page with a friendly design, structured sections for clinic and pharmacy, clear CTA for appointment bookings, and an integrated contact form.",
        construction: "Built during the OneBitCode Start na Programação course using semantic HTML5, CSS3 (responsive Flexbox layout, custom styling, media queries), and ES6+ JavaScript for interactivity.",
        result: "User-friendly interface for pet owners, comprehensive presentation of veterinary services, and seamless mobile responsiveness.",
        status: "Study"
      },
      {
        ...projectsData[1],
        title: "Sabor Express",
        subtitle: "Digital Menu & Interactive Delivery",
        category: "Platform / E-Commerce / Delivery",
        badge: "Active • Supabase",
        name: "Sabor Express",
        shortDescription: "Complete digital menu and interactive delivery platform designed for restaurants, diners, and burger shops. Features hybrid persistence support (localStorage + Supabase cloud with RLS), WhatsApp checkout, real-time Admin Panel with CRUD management, audio notifications, and Chart.js metrics dashboard.",
        problem: "Food establishments needed a modern, agile, and responsive digital menu to display products by category, capture orders directly via WhatsApp without app fees, and manage inventory and sales in real time.",
        idea: "Develop a delivery platform with hybrid operational experience (local offline mode and Supabase cloud), dynamic shopping cart with delivery fee calculations, formatted WhatsApp checkout, and Admin Panel with Chart.js analytics dashboard and audio alerts.",
        construction: "Built with semantic HTML5, Vanilla CSS3 (Flexbox, CSS Grid, Mobile-First responsive design system), native ES6+ JavaScript, and Supabase (PostgreSQL relacional cloud with RLS and WebSockets Real-time Engine). Clean URLs hosting and Chart.js analytics.",
        result: "Complete autonomy for the establishment to manage products and orders, faster customer response times with formatted WhatsApp messages, real-time financial metrics, and instant operability even without backend via localStorage.",
        status: "Active"
      },
      {
        ...projectsData[2],
        title: "Cigana Morgana",
        subtitle: "Holistic Portal, Consultations & E-Commerce",
        category: "Corporate Portal / Landing Page",
        badge: "In Production • Vercel",
        name: "Cigana Morgana",
        shortDescription: "Institutional and consultation scheduling portal for holistic services. Features appointment bookings, service packages showcase, direct WhatsApp checkout, and dark mystic UI design.",
        problem: "Need to digitize holistic consultation bookings, service showcases, and direct customer service.",
        idea: "Develop an elegant SPA with mystic dark design, direct WhatsApp booking integration, and instant service catalog.",
        construction: "Built with HTML5, CSS3 Vanilla glassmorphism, ES6+ JavaScript, and responsive layouts. Deployed on Vercel.",
        result: "Increased direct consultation inquiries, instant appointment booking via WhatsApp, and Lighthouse score of 95+.",
        status: "In Production"
      },
      {
        ...projectsData[3],
        title: "C4T4T4U Electronics",
        subtitle: "E-Commerce, Quotes & Service Order Management (S.O.)",
        category: "E-Commerce / SaaS",
        badge: "v1.0.2 • In Production",
        name: "C4T4T4U Electronics",
        shortDescription: "Complete e-commerce and corporate management platform for electronics and technical service shop. Integrates virtual store, WhatsApp checkout, Quotes module with auto-conversion to Service Orders (#OS-xxxx), 2-way A4 printing, and Supabase cloud backend.",
        problem: "The electronics and repair shop needed an integrated platform to simultaneously manage virtual product showcases, quote requests, and technical service orders with printed warranty receipts.",
        idea: "Develop a robust decoupled SPA with WhatsApp quote checkout, smart conversion of approved quotes to Service Orders (#OS-xxxx), RBAC permission control, and Supabase cloud sync.",
        construction: "Built with semantic HTML5, Vanilla CSS3 (Design System glassmorphism, HSL themes, @media print for 2-way A4 receipts), pure ES6+ JavaScript (+140 native functions), and Supabase (PostgreSQL cloud with RLS).",
        result: "Over 40 operational screens and modals, instant quote-to-SO conversion, 2-way printed service receipts (Store and Customer), direct WhatsApp notifications, and zero heavy framework dependencies.",
        status: "In Production"
      },
      {
        ...projectsData[4],
        title: "Elite House Piracicaba",
        subtitle: "EliteHouseHub — Real Estate & CRM Platform",
        name: "Elite House Piracicaba",
        badge: "CRECI 049210-J • In Production",
        category: "Platform / SaaS",
        shortDescription: "High-performance real estate platform for property management, customer CRM, broker controls (RBAC + RLS), scheduling, automatic Facebook Ads lead capture via Webhooks, and commission financial tracking.",
        problem: "Need to centralize real estate operations into a single high-performance system, reducing manual tasks and isolating sensitive broker data with RLS security.",
        idea: "Develop a full decoupled SPA using React 18, TypeScript, and Supabase BaaS (PostgreSQL RLS), automating lead capture via Webhooks and providing real-time chart reports.",
        construction: "Built with React 18, TypeScript, Vite, Tailwind CSS, Shadcn UI / Radix UI, TanStack Query, React Router DOM, Recharts, and Supabase (5-level RBAC, PostgreSQL RLS).",
        result: "Over 62,896 lines of production code, 134+ reusable React components, 35 active routes, and smart lead distribution for the sales team.",
        status: "In Production"
      },
      {
        ...projectsData[5],
        title: "Vendramini Informática",
        subtitle: "Official Website & Digital Institutional Showcase",
        name: "Vendramini Informática",
        badge: "Official • Active",
        category: "Corporate Portal",
        shortDescription: "Official portal for Vendramini Informática built with semantic HTML5, cyberpunk glassmorphism CSS3, offline PWA support with Service Worker, 60fps Canvas Matrix effect, and dynamic i18n.",
        problem: "Create an official high-performance portal acting as a high-impact digital business card displaying corporate services, interactive FAQ, and project portfolio with instant internationalization.",
        idea: "Develop a lightweight static architecture with dynamic internationalization (PT / EN), 60fps Canvas Matrix effect, neon cursor, and Lighthouse 95+ score.",
        construction: "Built with semantic HTML5, advanced CSS3 (HSL variables, glassmorphism, responsive design), modular ES6+ JavaScript, Canvas API, and Service Worker for PWA offline cache.",
        result: "Lighthouse Score 95+ (Performance, Accessibility, SEO), initial page load under 1.5s, instant neon language switcher, and real-time searchable portfolio page.",
        status: "Active"
      },
      {
        ...projectsData[6],
        title: "King of ROMs",
        subtitle: "Digital Catalog & Gaming Media Preservation",
        category: "Web App / Open Source",
        badge: "Open Source • Study",
        name: "King of ROMs",
        shortDescription: "Web platform dedicated to preserving retro video game history and digital media. Features clean categorizations, instant search, and smooth responsive design.",
        problem: "Catalog and organize retro gaming information into a fast, accessible, and structured digital platform.",
        idea: "Create a modern retro showcase with dark theme, responsive grid cards, and real-time category filtering.",
        construction: "Built with semantic HTML5, CSS3 Grid/Flexbox, JavaScript ES6+, and Vercel hosting.",
        result: "Fast catalog access, structured retro gaming data, and seamless mobile experience.",
        status: "Active"
      },
      {
        ...projectsData[7],
        title: "Festa Fácil",
        subtitle: "Event Budgeting & Celebration Management",
        name: "Festa Fácil",
        badge: "In Production • Open Source",
        category: "Platform / E-Commerce",
        shortDescription: "Smart web calculator and planner for parties and events. Estimates food, drinks, and supply quantities based on guest counts, outputting instant budgets and shopping lists.",
        problem: "Planning event supplies manually often leads to overbuying or food shortages during celebrations.",
        idea: "Build an intuitive web calculator that takes guest counts (adults, children) and calculates exact food, beverage, and disposable supply quantities.",
        construction: "Built with HTML5, CSS3, JavaScript ES6+ algorithms, and GitHub Pages hosting.",
        result: "Instant party supply calculations, budget PDF export, and reduced event planning waste.",
        status: "In Production"
      }
    ];
  }
  return projectsData;
}
