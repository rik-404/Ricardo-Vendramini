/* =====================================================================
 * MUNDO — o portfólio do Ricardo Vendramini em forma de jogo.
 *
 * Mesmo motor visual do Oathbound (Three.js r128, tudo em voxel, luz de
 * entardecer, sombra dura): você anda pela vila com o boneco do Ricardo e,
 * chegando perto de um quadro, abre o projeto.
 *
 * Os dados vêm de dados.js, gerado a partir de src/data/portfolioData.js
 * (tools/gerar-dados-mundo.cjs). Projeto novo no site = quadro novo aqui,
 * sem mexer neste arquivo: a avenida cresce sozinha.
 *
 * Mapa (y para cima, -z é o norte):
 *   praça com o logo ......... (0, 0)       onde você nasce
 *   avenida dos projetos ..... norte (z < -8), quadros dos dois lados
 *   Vendramini Informática ... oeste         "sobre mim" + números
 *   banca do livro ........... leste         Timewalker
 *   caixa de correio ......... sudoeste      contato
 *   fliperama ................ sudeste       Oathbound
 * ===================================================================== */
(function () {
  'use strict';
  const D = window.MUNDO_DADOS || { pessoa: {}, projetos: [], numeros: [], livros: [] };
  const $ = s => document.querySelector(s);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d } catch (e) { return d } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)) } catch (e) { } }
  };
  const isTouch = matchMedia('(hover: none)').matches || 'ontouchstart' in window;
  const reduzMovimento = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const P = D.pessoa || {}, PROJ = D.projetos || [], LIVRO = (D.livros || [])[0] || null;
  const OATHBOUND = 'https://jogue-oathbound.online/';

  /* ================= RENDER ================= */
  const canvas = $('#cena');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: !isTouch, powerPreference: 'high-performance' });
  } catch (e) {
    $('#carregando').textContent = 'Seu navegador não abriu o 3D. Veja a lista de projetos.';
    $('#comecar').hidden = true;
    ligarLista(true); return;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isTouch ? 1.5 : 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  const CEU = 0xb6d6de;
  scene.background = new THREE.Color(CEU);
  scene.fog = new THREE.Fog(CEU, 34, 90);
  const camera = new THREE.PerspectiveCamera(42, 1, .1, 220);
  const hemi = new THREE.HemisphereLight(0xcfe4e8, 0x5a6a33, .62); scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffd9a0, .8);
  sun.castShadow = true;
  const SM = isTouch ? 1024 : 2048; sun.shadow.mapSize.set(SM, SM);
  Object.assign(sun.shadow.camera, { left: -24, right: 24, top: 24, bottom: -24, near: 1, far: 80 });
  sun.shadow.bias = -.0008; sun.shadow.camera.updateProjectionMatrix();
  scene.add(sun, sun.target);
  function resize() {
    const w = innerWidth, h = innerHeight;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  addEventListener('resize', resize); resize();

  /* ================= VOXEL =================
     Igual ao Oathbound: um cubo só, escalado; materiais em cache por cor. */
  const boxGeo = new THREE.BoxGeometry(1, 1, 1);
  const mats = {};
  function mat(c, e = 0, t = 0) {
    const k = c + '|' + e + '|' + t;
    if (!mats[k]) {
      const m = new THREE.MeshLambertMaterial({ color: c });
      if (e) { m.emissive = new THREE.Color(c); m.emissiveIntensity = e }
      if (t) { m.transparent = true; m.opacity = t }
      mats[k] = m;
    }
    return mats[k];
  }
  function vox(p, x, y, z, w, h, d, c, e, t) {
    const m = new THREE.Mesh(boxGeo, mat(c, e, t));
    m.position.set(x, y, z); m.scale.set(w, h, d);
    m.castShadow = true; m.receiveShadow = true;
    p.add(m); return m;
  }
  /* Cenário estático vira InstancedMesh por cor: centenas de caixas, poucas chamadas. */
  const lote = {};
  function bloco(x, y, z, w, h, d, c, sombra = true) {
    const k = c + (sombra ? 's' : 'n');
    (lote[k] || (lote[k] = { c, sombra, l: [] })).l.push([x, y, z, w, h, d]);
  }
  function fecharLote() {
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), pos = new THREE.Vector3(), sc = new THREE.Vector3();
    for (const k in lote) {
      const L = lote[k], im = new THREE.InstancedMesh(boxGeo, mat(L.c), L.l.length);
      L.l.forEach((b, i) => { pos.set(b[0], b[1], b[2]); sc.set(b[3], b[4], b[5]); m4.compose(pos, q, sc); im.setMatrixAt(i, m4) });
      im.castShadow = L.sombra; im.receiveShadow = true; scene.add(im);
    }
  }
  /* Texto em textura (placas, letreiros). */
  function texto(linhas, o = {}) {
    const W = o.w || 512, H = o.h || 128, cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    const g = cv.getContext('2d');
    g.fillStyle = o.fundo || '#2a1d12'; g.fillRect(0, 0, W, H);
    if (o.borda !== false) { g.strokeStyle = o.cBorda || '#f2c14b'; g.lineWidth = 6; g.strokeRect(5, 5, W - 10, H - 10) }
    g.textAlign = 'center'; g.textBaseline = 'middle';
    const n = linhas.length;
    linhas.forEach((ln, i) => {
      const [t, tam, cor, fonte] = Array.isArray(ln) ? ln : [ln];
      g.font = (fonte || '700 ') + (tam || 44) + 'px "Silkscreen","Chakra Petch",monospace';
      g.fillStyle = cor || '#f2c14b';
      let tx = String(t);
      while (g.measureText(tx).width > W - 36 && tx.length > 3) tx = tx.slice(0, -2) + '…';
      g.fillText(tx, W / 2, H * (i + .5) / n + (o.dy || 0));
    });
    const tex = new THREE.CanvasTexture(cv); tex.anisotropy = 4;
    return tex;
  }
  const carregador = new THREE.LoadingManager();
  const texLoader = new THREE.TextureLoader(carregador);
  carregador.onLoad = () => { const c = $('#carregando'); c.textContent = 'mundo pronto'; c.classList.add('pronto') };
  carregador.onError = () => { };

  /* ================= CHÃO, PRAÇA E AVENIDA ================= */
  const nQuadros = PROJ.length;
  const fileiras = Math.ceil(nQuadros / 2);
  const Z_INI = -13, PASSO = 8.5;
  const Z_FIM = Z_INI - (fileiras - 1) * PASSO - 9;     // fim da avenida
  const LIM = { x0: -27, x1: 27, z0: Z_FIM - 4, z1: 17 };  // onde dá para andar

  const chao = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshLambertMaterial({ color: 0x6aa34a }));
  chao.rotation.x = -Math.PI / 2; chao.receiveShadow = true; scene.add(chao);
  // semente fixa: o mundo é o mesmo para todo mundo
  let sem = 7; const rnd = () => (sem = (sem * 16807) % 2147483647) / 2147483647;
  // tufos de grama
  for (let i = 0; i < 900; i++) {
    const x = (rnd() - .5) * 120, z = (rnd() - .5) * 140 - 20;
    if (Math.hypot(x, z) < 8 || (Math.abs(x) < 3 && z < -6 && z > Z_FIM)) continue;
    bloco(x, .04, z, .5 + rnd() * .8, .08, .5 + rnd() * .8, rnd() < .5 ? 0x5f9842 : 0x78b154, false);
  }
  // praça: ladrilhos em anel, com o logo no meio
  const PEDRA = [0xb9b2a0, 0xa9a290, 0xc4bdac];
  for (let x = -7; x <= 7; x++) for (let z = -7; z <= 7; z++) {
    const r = Math.hypot(x, z); if (r > 7.2) continue;
    bloco(x, .05, z, .96, .1, .96, PEDRA[(x * 7 + z * 3 + 99) % 3], false);
  }
  for (let a = 0; a < 48; a++) { const t = a / 48 * Math.PI * 2; bloco(Math.cos(t) * 7.6, .09, Math.sin(t) * 7.6, .9, .18, .9, 0x8a8372) }
  // avenida dos projetos
  for (let z = -7; z >= Z_FIM; z--) for (let x = -2; x <= 2; x++) bloco(x, .05, z, .96, .1, .96, PEDRA[(x * 5 + z * 7 + 99) % 3], false);
  for (let z = -7; z >= Z_FIM; z -= 1) { bloco(-2.75, .08, z, .4, .16, .96, 0x8a8372); bloco(2.75, .08, z, .4, .16, .96, 0x8a8372) }
  // trilhas até os pontos laterais
  const trilha = (x0, z0, x1, z1) => {
    const n = Math.ceil(Math.hypot(x1 - x0, z1 - z0));
    for (let i = 0; i <= n; i++) { const t = i / n, x = x0 + (x1 - x0) * t, z = z0 + (z1 - z0) * t; bloco(Math.round(x), .045, Math.round(z), .96, .09, .96, PEDRA[(i + 1) % 3], false); bloco(Math.round(x) + (Math.abs(z1 - z0) > Math.abs(x1 - x0) ? 1 : 0), .045, Math.round(z) + (Math.abs(z1 - z0) > Math.abs(x1 - x0) ? 0 : 1), .96, .09, .96, PEDRA[i % 3], false) }
  };
  trilha(-7, 0, -15, 0); trilha(7, 0, 15, 0); trilha(-5, 5, -9, 10); trilha(5, 5, 9, 10);

  // logo da Vendramini Informática no chão da praça
  if (P.logo) {
    const t = texLoader.load(P.logo);
    const logo = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 4.6), new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false }));
    logo.rotation.x = -Math.PI / 2; logo.position.set(0, .115, 0); scene.add(logo);
  }

  /* ================= COLISÃO =================
     Círculos (árvores, postes) e caixas (prédios, quadros). */
  const solidos = [];
  const circ = (x, z, r) => solidos.push({ t: 'c', x, z, r });
  const caixa = (x, z, w, d) => solidos.push({ t: 'b', x0: x - w / 2, x1: x + w / 2, z0: z - d / 2, z1: z + d / 2 });

  /* ================= DECORAÇÃO (estilo do campo do Oathbound) ================= */
  function arvore(x, z, s = 1) {
    const h = 1.3 * s;
    bloco(x, h / 2, z, .36 * s, h, .36 * s, 0x6b4a2a);
    const F = [0x3f7d35, 0x4f9440, 0x5fa64b];
    bloco(x, h + .45 * s, z, 1.7 * s, .9 * s, 1.7 * s, F[0]);
    bloco(x, h + 1.15 * s, z, 1.25 * s, .7 * s, 1.25 * s, F[1]);
    bloco(x - .1 * s, h + 1.7 * s, z + .05 * s, .75 * s, .5 * s, .75 * s, F[2]);
    circ(x, z, .45 * s);
  }
  function arbusto(x, z) { bloco(x, .3, z, .9, .6, .8, 0x4c8c3c); bloco(x + .2, .62, z - .1, .5, .3, .5, 0x5fa64b) }
  function flor(x, z, c) { bloco(x, .14, z, .05, .28, .05, 0x3f7d35, false); bloco(x, .3, z, .14, .1, .14, c, false) }
  function pedra(x, z, s = 1) { bloco(x, .18 * s, z, .7 * s, .36 * s, .55 * s, 0x8f8a80); bloco(x + .12 * s, .42 * s, z, .4 * s, .2 * s, .35 * s, 0xa39e93) }
  const postes = [];
  function poste(x, z) {
    bloco(x, 1.1, z, .14, 2.2, .14, 0x2a2a30); bloco(x, .1, z, .34, .2, .34, 0x2a2a30);
    const g = new THREE.Group(); g.position.set(x, 2.35, z); scene.add(g);
    vox(g, 0, 0, 0, .34, .3, .34, 0x1a1a20); vox(g, 0, 0, 0, .24, .22, .24, 0xffd890, 1.2);
    postes.push(g); circ(x, z, .25);
  }
  function banco(x, z, ry) {
    const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry; scene.add(g);
    vox(g, 0, .42, 0, 1.6, .1, .5, 0x8a5a32); vox(g, 0, .75, -.22, 1.6, .5, .08, 0x8a5a32);
    for (const s of [-1, 1]) vox(g, s * .65, .2, 0, .1, .4, .44, 0x2a2a30);
    caixa(x, z, Math.abs(Math.cos(ry)) * 1.6 + Math.abs(Math.sin(ry)) * .6, Math.abs(Math.sin(ry)) * 1.6 + Math.abs(Math.cos(ry)) * .6);
  }
  // borda de árvores em volta de tudo
  for (let x = -34; x <= 34; x += 3.2) { arvore(x + rnd() * 1.4, LIM.z1 + 3 + rnd() * 2, .9 + rnd() * .4); arvore(x + rnd() * 1.4, LIM.z0 - 3 - rnd() * 2, .9 + rnd() * .4) }
  for (let z = LIM.z0; z <= LIM.z1; z += 3.2) { arvore(LIM.x0 - 3 - rnd() * 2, z + rnd(), .9 + rnd() * .4); arvore(LIM.x1 + 3 + rnd() * 2, z + rnd(), .9 + rnd() * .4) }
  // bosques entre a avenida e as bordas
  for (let i = 0; i < 46; i++) {
    const lado = rnd() < .5 ? -1 : 1, x = lado * (11 + rnd() * 14), z = Z_FIM + 2 + rnd() * (-12 - Z_FIM);
    if (Math.abs(x) < 10) continue; arvore(x, z, .8 + rnd() * .5);
  }
  for (let i = 0; i < 26; i++) { const x = (rnd() - .5) * 50, z = 9 + rnd() * 7; if (Math.abs(x) > 12 || z > 13) arvore(x, z, .8 + rnd() * .4) }
  const CORES_FLOR = [0xff6f8f, 0xffd84a, 0xffffff, 0x9ab8ff, 0xff9a3a];
  for (let i = 0; i < 160; i++) {
    const x = (rnd() - .5) * 50, z = 14 - rnd() * (14 - Z_FIM);
    if (Math.hypot(x, z) < 8.5 || Math.abs(x) < 3.4) continue;
    flor(x, z, CORES_FLOR[i % 5]);
  }
  for (let i = 0; i < 14; i++) { const x = (rnd() - .5) * 48, z = 12 - rnd() * (12 - Z_FIM); if (Math.hypot(x, z) > 9 && Math.abs(x) > 8) pedra(x, z, .7 + rnd() * .6) }
  for (const [x, z] of [[-9, -4], [9, -4], [-9, 4.5], [9, 4.5], [-4.5, 9], [4.5, 9]]) arbusto(x, z);
  banco(-5.2, -5.2, Math.PI / 4); banco(5.2, -5.2, -Math.PI / 4);
  for (const s of [-1, 1]) { poste(s * 5.5, 5.5); poste(s * 5.5, -5.5) }

  /* ================= QUADROS DOS PROJETOS ================= */
  const pois = [];   // pontos de interesse: { x, z, r, tipo, dado, nome, marcador }
  const vistos = new Set(store.get('mundo.vistos', []).filter(id => PROJ.some(p => p.id === id)));
  const SELO = s => /estudo/i.test(s || '') ? 'estudo' : /portf/i.test(s || '') ? 'portfolio' : '';
  function quadro(p, i) {
    const fila = Math.floor(i / 2), lado = i % 2 === 0 ? -1 : 1;
    const ultimoSozinho = nQuadros % 2 === 1 && i === nQuadros - 1;
    const z = ultimoSozinho ? Z_FIM + 3.2 : Z_INI - fila * PASSO;
    const x = ultimoSozinho ? 0 : lado * 6.4;
    const ry = ultimoSozinho ? 0 : (lado < 0 ? Math.PI / 2 : -Math.PI / 2);
    const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry; scene.add(g);
    const MAD = 0x5a3a22, MAD_D = 0x3a2414, OURO = 0xf2c14b;
    // pés e moldura (o quadro olha para +z local)
    for (const s of [-1, 1]) { vox(g, s * 1.75, 1.2, -.26, .18, 2.4, .18, MAD_D); vox(g, s * 1.75, .08, -.26, .5, .16, .5, MAD_D) }
    vox(g, 0, 2.55, -.1, 3.9, 2.35, .14, MAD);                         // moldura
    vox(g, 0, 3.78, -.1, 4.1, .14, .2, OURO, .15);                     // friso de cima
    vox(g, 0, 1.33, -.1, 4.1, .12, .2, OURO, .15);
    // print do site (MeshBasic: a cor do print não muda com a luz)
    const tela = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 2.02), new THREE.MeshBasicMaterial({ color: 0x222222 }));
    tela.position.set(0, 2.55, -.025); g.add(tela);
    if (p.img) texLoader.load(p.img, t => { tela.material = new THREE.MeshBasicMaterial({ map: t }) });
    // placa com o nome
    const placa = new THREE.Mesh(new THREE.PlaneGeometry(3.4, .62), new THREE.MeshBasicMaterial({
      map: texto([[p.nome, 46, '#f2c14b'], [p.categoria || '', 26, '#d8cdb8', '400 ']], { w: 720, h: 132 })
    }));
    placa.position.set(0, .86, .02); g.add(placa);
    vox(g, 0, .86, -.04, 3.5, .7, .08, MAD_D);
    // marcador flutuante: losango dourado (não visto) ou verde (visto)
    const marc = new THREE.Group(); marc.position.set(0, 4.35, 0); g.add(marc);
    const losango = vox(marc, 0, 0, 0, .34, .34, .34, OURO, .6); losango.rotation.set(Math.PI / 4, 0, Math.PI / 4);
    // pedestal no chão, na frente do quadro, onde você para
    const pad = vox(g, 0, .07, 1.7, 1.6, .06, 1.1, vistos.has(p.id) ? 0x5fe08a : 0xf2c14b, .25);
    // colisão do quadro (em coordenadas do mundo)
    if (ultimoSozinho) caixa(x, z - .1, 4.2, .6); else caixa(x - lado * .1, z, .6, 4.2);
    const fx = x + Math.sin(ry) * 1.9, fz = z + Math.cos(ry) * 1.9;
    pois.push({ x: fx, z: fz, r: 2.4, tipo: 'projeto', dado: p, nome: p.nome, marc, losango, pad, g });
  }
  PROJ.forEach(quadro);
  // postes ao longo da avenida, entre os quadros
  for (let f = 0; f <= fileiras; f++) { const z = Z_INI + PASSO / 2 - f * PASSO; if (z > Z_FIM + 1) { poste(-3.3, z); poste(3.3, z) } }

  /* ================= VENDRAMINI INFORMÁTICA (sobre mim) ================= */
  (function loja() {
    const X = -19.5, Z = 0, g = new THREE.Group(); g.position.set(X, 0, Z); g.rotation.y = Math.PI / 2; scene.add(g); // frente para +x
    const PAREDE = 0xeceae2, PAREDE_D = 0xcfcabd, TETO = 0x1f8f86, TETO_L = 0x37b06a, VIDRO = 0x8fd8ff;
    vox(g, 0, 1.6, 0, 7, 3.2, 5, PAREDE);
    vox(g, 0, .15, 0, 7.2, .3, 5.2, PAREDE_D);
    // telhado em degraus com o degradê do logo (azul → verde)
    vox(g, 0, 3.35, 0, 7.6, .3, 5.6, 0x1b6fa8);
    vox(g, 0, 3.65, 0, 6.6, .3, 4.6, TETO);
    vox(g, 0, 3.95, 0, 5.4, .3, 3.4, TETO_L);
    vox(g, 0, 4.2, 0, 4, .2, 2, 0x6fdc4a);
    // porta e vitrines
    vox(g, 0, 1.15, 2.51, 1.3, 2.1, .06, 0x3a4a5a);
    vox(g, .4, 1.15, 2.55, .08, .08, .04, 0xf2c14b, .4);
    for (const s of [-1, 1]) { vox(g, s * 2.2, 1.55, 2.51, 1.9, 1.3, .06, VIDRO, .25); vox(g, s * 2.2, .85, 2.53, 2.1, .1, .1, PAREDE_D) }
    // letreiro com o logo e o nome
    const let1 = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 1), new THREE.MeshBasicMaterial({ map: texto([[P.empresa || 'Vendramini Informática', 40, '#7dff9a']], { w: 900, h: 160, fundo: '#0e1a22', cBorda: '#3fc8ff' }) }));
    let1.position.set(0, 2.75, 2.53); g.add(let1);
    if (P.logo) { const lg = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.2), new THREE.MeshBasicMaterial({ map: texLoader.load(P.logo), transparent: true })); lg.position.set(0, 4.75, 1.2); lg.rotation.x = -.2; g.add(lg) }
    caixa(X, Z, 5.4, 7.4);
    pois.push({ x: X + 4.2, z: Z, r: 2.6, tipo: 'sobre', nome: 'Sobre mim — ' + (P.empresa || 'Vendramini Informática') });
  })();

  /* ================= BANCA DO LIVRO ================= */
  if (LIVRO) (function banca() {
    const X = 18.5, Z = 0, g = new THREE.Group(); g.position.set(X, 0, Z); g.rotation.y = -Math.PI / 2; scene.add(g);
    vox(g, 0, .55, 0, 3.2, 1.1, 1.6, 0x6a3a22);                     // balcão
    vox(g, 0, 1.12, 0, 3.4, .06, 1.8, 0x8a5a32);
    for (const s of [-1, 1]) vox(g, s * 1.55, 1.9, -.6, .14, 2.6, .14, 0x3a2414);
    vox(g, 0, 3.25, -.1, 3.8, .14, 2.4, 0x7a1e2c); vox(g, 0, 3.4, -.1, 3.4, .14, 2, 0x9a2a3a); // toldo
    // o livro em pé, com a capa de verdade
    const capa = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.65), new THREE.MeshBasicMaterial({ color: 0x333333 }));
    capa.position.set(0, 2.1, .2); capa.rotation.x = -.12; g.add(capa);
    vox(g, 0, 2.08, .14, 1.2, 1.75, .1, 0x1a1410);
    if (LIVRO.capa) texLoader.load(LIVRO.capa, t => { capa.material = new THREE.MeshBasicMaterial({ map: t }) });
    for (let i = 0; i < 5; i++) vox(g, -1.2 + i * .22, 1.3, .3, .18, .3, .5, [0x2a4a8a, 0x8a2a3a, 0x3a7a3a, 0xc8a048, 0x5a3a7a][i]);
    const pl = new THREE.Mesh(new THREE.PlaneGeometry(2.8, .5), new THREE.MeshBasicMaterial({ map: texto([['Meu livro', 44, '#f2c14b']], { w: 600, h: 108 }) }));
    pl.position.set(0, .7, .81); g.add(pl);
    caixa(X, Z, 1.8, 3.4);
    pois.push({ x: X - 2.4, z: Z, r: 2.6, tipo: 'livro', nome: 'Livro — ' + LIVRO.titulo });
  })();

  /* ================= CAIXA DE CORREIO (contato) ================= */
  (function correio() {
    const X = -10, Z = 10.5, g = new THREE.Group(); g.position.set(X, 0, Z); g.rotation.y = Math.PI / 5; scene.add(g);
    vox(g, 0, .6, 0, .16, 1.2, .16, 0x3a2414);
    vox(g, 0, 1.35, 0, .7, .5, 1, 0xc8302a); vox(g, 0, 1.62, 0, .6, .12, .9, 0xe04a3a);
    vox(g, 0, 1.38, .51, .5, .1, .02, 0x1a1a1a);
    const band = new THREE.Group(); band.position.set(.38, 1.5, 0); g.add(band); vox(band, 0, .18, 0, .04, .36, .04, 0x2a2a2a); vox(band, 0, .32, .1, .04, .14, .22, 0xf2c14b, .4);
    const pl = new THREE.Mesh(new THREE.PlaneGeometry(1.8, .4), new THREE.MeshBasicMaterial({ map: texto([['Contato', 44, '#f2c14b']], { w: 420, h: 96 }) }));
    pl.position.set(0, 2.2, .1); g.add(pl);
    circ(X, Z, .7);
    pois.push({ x: X + 1.2, z: Z - 1.4, r: 2.3, tipo: 'contato', nome: 'Falar comigo', marcContato: band });
  })();

  /* ================= FLIPERAMA (Oathbound) ================= */
  (function fliperama() {
    const X = 10, Z = 10.5, g = new THREE.Group(); g.position.set(X, 0, Z); g.rotation.y = -Math.PI / 5; scene.add(g);
    vox(g, 0, 1.1, 0, 1.3, 2.2, 1.1, 0x1a1a2a);
    for (const s of [-1, 1]) vox(g, s * .68, 1.15, 0, .06, 2.3, 1.15, 0x7a3ad8, .3);
    vox(g, 0, 1.55, .5, 1.05, .8, .08, 0x0a0a12);
    const tela = new THREE.Mesh(new THREE.PlaneGeometry(.95, .7), new THREE.MeshBasicMaterial({ map: texto([['OATH', 70, '#f2c14b'], ['BOUND', 70, '#f2c14b'], ['aperte start', 30, '#7dff9a', '400 ']], { w: 380, h: 280, fundo: '#120a1e', borda: false }) }));
    tela.position.set(0, 1.55, .55); g.add(tela);
    vox(g, 0, .95, .62, 1.2, .1, .5, 0x2a2a3a);
    vox(g, -.25, 1.04, .7, .08, .14, .08, 0xe04a3a); vox(g, .15, 1.02, .72, .12, .06, .12, 0xf2c14b, .4); vox(g, .35, 1.02, .66, .12, .06, .12, 0x3fc8ff, .4);
    vox(g, 0, 2.35, .2, 1.3, .4, .7, 0x2a1a3a);
    const marq = new THREE.Mesh(new THREE.PlaneGeometry(1.2, .32), new THREE.MeshBasicMaterial({ map: texto([['FLIPERAMA', 40, '#ffd84a']], { w: 420, h: 110, fundo: '#2a0a3a', cBorda: '#c890ff' }) }));
    marq.position.set(0, 2.35, .56); g.add(marq);
    circ(X, Z, .9);
    pois.push({ x: X - 1.3, z: Z - 1.5, r: 2.3, tipo: 'jogo', nome: 'Jogar Oathbound' });
  })();

  /* ================= PLACA DE BOAS-VINDAS ================= */
  (function placa() {
    const g = new THREE.Group(); g.position.set(0, 0, 9.2); scene.add(g);
    vox(g, 0, .9, 0, .18, 1.8, .18, 0x5a3a22);
    const linhas = [['↑  Projetos', 40, '#f2c14b'], ['←  Sobre mim     Livro  →', 34, '#efe6d6', '400 '], ['↙ Contato      Jogo ↘', 34, '#efe6d6', '400 ']];
    const pl = new THREE.Mesh(new THREE.PlaneGeometry(3, 1.5), new THREE.MeshBasicMaterial({ map: texto(linhas, { w: 640, h: 320 }) }));
    pl.position.set(0, 1.9, .1); g.add(pl); vox(g, 0, 1.9, 0, 3.1, 1.6, .1, 0x3a2414);
    circ(0, 9.2, .4);
  })();
  // estátua de troféu no fim da avenida (lugar de "zerar" o portfólio)
  (function trofeu() {
    const g = new THREE.Group(); g.position.set(0, 0, Z_FIM - 1); scene.add(g);
    vox(g, 0, .5, 0, 1.6, 1, 1.6, 0x8f8a80); vox(g, 0, 1.1, 0, 1.2, .2, 1.2, 0xa39e93);
    vox(g, 0, 1.55, 0, .3, .7, .3, 0xd8a828); vox(g, 0, 2.1, 0, .8, .5, .8, 0xf2c14b, .3);
    for (const s of [-1, 1]) vox(g, s * .5, 2.15, 0, .14, .3, .14, 0xd8a828);
    circ(0, Z_FIM - 1, 1);
  })();
  fecharLote();

  /* ================= O RICARDO (boneco) =================
     Do retrato: cabelo escuro, cheio e ondulado; blazer cinza sobre camisa
     preta aberta, corrente prata; calça escura. */
  const heroi = (function () {
    const SK = 0xe8c0a0, SK_D = 0xc89c7e, CAB = 0x3a2618, CAB_L = 0x52361f, CAB_D = 0x24160c;
    const BLZ = 0x6e7278, BLZ_D = 0x50545a, BLZ_L = 0x868a90, CAM = 0x16161a, CAL = 0x1e2026, SAP = 0x0e0e10;
    const root = new THREE.Group(); scene.add(root);
    const perna = x => { const l = new THREE.Group(); l.position.set(x, .34, 0); root.add(l); vox(l, 0, -.15, 0, .16, .32, .18, CAL); vox(l, 0, -.3, .03, .18, .08, .24, SAP); return l };
    const legL = perna(-.11), legR = perna(.11);
    const torso = new THREE.Group(); torso.position.y = .34; root.add(torso);
    vox(torso, 0, .22, 0, .44, .44, .28, BLZ);
    vox(torso, 0, .25, .142, .14, .38, .01, CAM);                    // camisa preta no V
    for (const s of [-1, 1]) { const lp = vox(torso, s * .1, .3, .146, .08, .26, .012, BLZ_D); lp.rotation.z = s * .25 } // lapelas
    vox(torso, 0, .36, .15, .1, .014, .008, 0xd8dce4, .2);            // corrente prata
    vox(torso, 0, .03, 0, .46, .06, .3, CAL);                        // cinto
    vox(torso, -.1, .14, .148, .02, .02, .008, 0x2a2a2a); vox(torso, -.1, .08, .148, .02, .02, .008, 0x2a2a2a); // botões
    const cab = new THREE.Group(); cab.position.y = .62; torso.add(cab);
    vox(cab, 0, 0, 0, .34, .34, .34, SK);
    // rosto
    for (const s of [-1, 1]) {
      vox(cab, s * .075, .02, .174, .055, .045, .012, 0x2a1a12);
      vox(cab, s * .07, .028, .182, .018, .016, .006, 0xf4ece4);
      vox(cab, s * .08, .07, .175, .08, .02, .012, CAB_D);          // sobrancelhas
    }
    vox(cab, 0, -.02, .185, .04, .07, .03, SK);
    vox(cab, 0, -.09, .174, .07, .014, .008, 0x9a5a50);
    vox(cab, 0, -.13, .172, .2, .05, .01, SK_D);                     // barba por fazer
    // cabelo: volume em cima, ondas para os lados
    vox(cab, 0, .19, -.01, .38, .08, .38, CAB);
    vox(cab, -.04, .25, .02, .3, .07, .3, CAB_L);
    vox(cab, .06, .3, .0, .2, .06, .22, CAB);
    vox(cab, -.08, .2, .17, .2, .08, .06, CAB);                      // onda caindo na testa
    vox(cab, .1, .17, .175, .12, .06, .04, CAB_D);
    for (const s of [-1, 1]) { vox(cab, s * .182, .06, -.02, .04, .24, .3, CAB); vox(cab, s * .19, .17, .05, .04, .08, .2, CAB_L) }
    vox(cab, 0, .04, -.182, .38, .28, .04, CAB);
    const braco = x => {
      const a = new THREE.Group(); a.position.set(x, .42, 0); torso.add(a);
      vox(a, 0, -.15, 0, .14, .34, .16, BLZ); vox(a, 0, .0, 0, .16, .08, .18, BLZ_L);
      vox(a, 0, -.3, 0, .145, .03, .165, CAM);                         // punho da camisa
      vox(a, 0, -.36, 0, .12, .1, .13, SK); return a
    };
    const armL = braco(-.3), armR = braco(.3);
    // celular na mão (a foto é uma selfie no espelho)
    const cel = vox(armR, 0, -.4, .09, .1, .16, .02, 0x14141a); vox(armR, 0, -.4, .101, .07, .12, .004, 0x2a3a5a, .5);
    // sombra redonda
    const somb = new THREE.Mesh(new THREE.CircleGeometry(.42, 20), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: .22, depthWrite: false }));
    somb.rotation.x = -Math.PI / 2; somb.position.y = .02; root.add(somb);
    return { root, torso, cab, legL, legR, armL, armR, cel };
  })();

  /* ================= ESTADO ================= */
  const pos = new THREE.Vector3(0, 0, 5.5);
  let dir = Math.PI, vel = 0, passo = 0;      // dir: para onde o boneco olha (π = norte)
  heroi.root.position.copy(pos); heroi.root.rotation.y = dir;
  const teclas = {};
  let jogando = false, pausado = true, perto = null;
  const joy = { on: false, id: null, x0: 0, y0: 0, dx: 0, dy: 0 };

  addEventListener('keydown', e => {
    if (pausado) { if (e.key === 'Escape') fecharTudo(); return }
    const k = e.key.toLowerCase();
    if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) { teclas[k] = true; e.preventDefault() }
    if ((k === 'e' || k === 'enter' || k === ' ') && perto) { e.preventDefault(); abrir(perto) }
  });
  addEventListener('keyup', e => { teclas[e.key.toLowerCase()] = false });
  addEventListener('blur', () => { for (const k in teclas) teclas[k] = false });

  // joystick: o dedo encosta em qualquer lugar da tela e arrasta
  const joyEl = $('#joy'), joyBola = joyEl.querySelector('i');
  canvas.addEventListener('pointerdown', e => {
    if (pausado || e.pointerType === 'mouse') return;
    joy.on = true; joy.id = e.pointerId; joy.x0 = e.clientX; joy.y0 = e.clientY; joy.dx = joy.dy = 0;
    joyEl.style.left = e.clientX + 'px'; joyEl.style.top = e.clientY + 'px'; joyEl.hidden = false; joyBola.style.transform = '';
  });
  addEventListener('pointermove', e => {
    if (!joy.on || e.pointerId !== joy.id) return;
    let dx = e.clientX - joy.x0, dy = e.clientY - joy.y0; const m = Math.hypot(dx, dy), R = 46;
    if (m > R) { dx *= R / m; dy *= R / m }
    joy.dx = dx / R; joy.dy = dy / R; joyBola.style.transform = `translate(${dx}px,${dy}px)`;
  });
  const soltar = e => { if (e.pointerId === joy.id) { joy.on = false; joy.dx = joy.dy = 0; joyEl.hidden = true } };
  addEventListener('pointerup', soltar); addEventListener('pointercancel', soltar);
  // clique com o mouse num quadro também abre
  const ray = new THREE.Raycaster(), mouse = new THREE.Vector2();
  canvas.addEventListener('click', e => {
    if (pausado) return;
    mouse.set(e.clientX / innerWidth * 2 - 1, -e.clientY / innerHeight * 2 + 1); ray.setFromCamera(mouse, camera);
    for (const p of pois) if (p.g && ray.intersectObject(p.g, true).length) {
      if (Math.hypot(p.x - pos.x, p.z - pos.z) < 7) abrir(p); else toast('Chegue mais perto de <b>' + esc(p.nome) + '</b>');
      return;
    }
  });

  /* ================= MOVIMENTO E COLISÃO ================= */
  const RAIO = .32;
  function resolve(nx, nz) {
    nx = Math.max(LIM.x0, Math.min(LIM.x1, nx)); nz = Math.max(LIM.z0, Math.min(LIM.z1, nz));
    for (const s of solidos) {
      if (s.t === 'c') {
        const dx = nx - s.x, dz = nz - s.z, d = Math.hypot(dx, dz), m = s.r + RAIO;
        if (d < m && d > 1e-4) { nx = s.x + dx / d * m; nz = s.z + dz / d * m }
      } else {
        const cx = Math.max(s.x0, Math.min(s.x1, nx)), cz = Math.max(s.z0, Math.min(s.z1, nz)), dx = nx - cx, dz = nz - cz, d = Math.hypot(dx, dz);
        if (d < RAIO) {
          if (d > 1e-4) { nx = cx + dx / d * RAIO; nz = cz + dz / d * RAIO }
          else { // dentro da caixa: sai pelo lado mais perto
            const op = [[s.x0 - RAIO - nx, 0], [s.x1 + RAIO - nx, 0], [0, s.z0 - RAIO - nz], [0, s.z1 + RAIO - nz]].sort((a, b) => Math.abs(a[0] + a[1]) - Math.abs(b[0] + b[1]))[0];
            nx += op[0]; nz += op[1];
          }
        }
      }
    }
    return [nx, nz];
  }

  /* ================= INTERFACE ================= */
  const hud = $('#hud'), dica = $('#dica'), acao = $('#acao');
  $('#hud-total').textContent = PROJ.length;
  $('#entrada-cargo').textContent = P.cargo || '';
  function atualizaHud() {
    $('#hud-vistos').textContent = vistos.size;
    $('#hud-barra').style.width = (PROJ.length ? vistos.size / PROJ.length * 100 : 0) + '%';
  }
  atualizaHud();
  let toastT = 0;
  function toast(html, ms = 2600) { const t = $('#toast'); t.innerHTML = html; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), ms) }
  const ROTULO = { projeto: 'Ver projeto', sobre: 'Entrar', livro: 'Ver o livro', contato: 'Abrir', jogo: 'Jogar' };
  function mostraDica(p) {
    if (p === perto) return; perto = p;
    if (!p) { dica.hidden = true; acao.hidden = true; return }
    dica.innerHTML = '<kbd>E</kbd>' + esc(ROTULO[p.tipo] || 'Abrir') + ': <b>' + esc(p.nome) + '</b>';
    dica.hidden = false;
    if (isTouch) { acao.textContent = ROTULO[p.tipo] || 'Abrir'; acao.hidden = false }
  }
  acao.addEventListener('click', () => { if (perto) abrir(perto) });

  const painel = $('#painel'), corpo = $('#pn-corpo');
  let ultimoFoco = null;
  function abrePainel(html) {
    corpo.innerHTML = html; painel.hidden = false; pausado = true; joy.on = false; joyEl.hidden = true;
    for (const k in teclas) teclas[k] = false;
    ultimoFoco = document.activeElement; setTimeout(() => $('#pn-fechar').focus(), 30);
  }
  function fecharTudo() {
    painel.hidden = true; $('#lista').hidden = true;
    if (jogando) { pausado = false; (ultimoFoco && ultimoFoco.focus ? ultimoFoco : canvas).focus && canvas.focus() }
  }
  $('#pn-fechar').addEventListener('click', fecharTudo);
  painel.addEventListener('click', e => { if (e.target === painel) fecharTudo() });
  $('#lista').addEventListener('click', e => { if (e.target.id === 'lista') fecharTudo() });
  $('#ls-fechar').addEventListener('click', fecharTudo);

  const btnLink = (href, txt, cls = '') => href ? `<a class="btn ${cls}" href="${esc(href)}" target="_blank" rel="noopener">${txt}</a>` : '';
  function htmlProjeto(p) {
    return `<img class="pn-img" src="${esc(p.img || '')}" alt="Print do site ${esc(p.nome)}">
      <div class="pn-txt">
        <span class="pn-selo ${SELO(p.status)}">${esc(p.selo || p.status || '')}</span>
        <h2 id="pn-titulo">${esc(p.nome)}</h2>
        <p class="pn-sub">${esc(p.sub || '')}</p>
        <div class="pn-meta">${esc(p.categoria || '')}${p.ano ? ' · ' + esc(p.ano) : ''}</div>
        <p>${esc(p.resumo || '')}</p>
        ${p.resultado ? `<p><b>Resultado:</b> ${esc(p.resultado)}</p>` : ''}
        <div class="chips">${(p.techs || []).map(t => `<span>${esc(t)}</span>`).join('')}</div>
        <div class="pn-acoes">${btnLink(p.link, 'Abrir o site ↗')}${btnLink(p.github, 'Código no GitHub', 'fantasma')}</div>
      </div>`;
  }
  function htmlSobre() {
    const n = (D.numeros || []).slice(0, 6).map(x => `<div><b>${esc(x.pre)}${esc(x.valor)}${esc(x.pos)}</b><small>${esc(x.rotulo)}</small></div>`).join('');
    return `<div class="pn-txt">
      <h2 id="pn-titulo">${esc(P.nome || '')}</h2>
      <p class="pn-sub">${esc(P.cargo || '')}</p>
      ${(P.bio || []).map(t => `<p>${esc(t)}</p>`).join('')}
      ${P.citacao ? `<p><i>“${esc(P.citacao)}”</i></p>` : ''}
      ${n ? `<div class="pn-numeros">${n}</div>` : ''}
      <div class="pn-acoes">${btnLink(P.siteEmpresa, (P.empresa || 'Empresa') + ' ↗')}${btnLink('/', 'Portfólio completo', 'fantasma')}</div>
    </div>`;
  }
  function htmlLivro() {
    const b = LIVRO;
    return `<div class="pn-txt"><div class="pn-livro">${b.capa ? `<img src="${esc(b.capa)}" alt="Capa de ${esc(b.titulo)}">` : ''}
      <div><h2 id="pn-titulo">${esc(b.titulo)}</h2><p class="pn-sub">Romance de ficção científica${b.ano ? ' · ' + esc(b.ano) : ''}</p>
      ${String(b.sinopse || '').split(/\n+/).map(t => `<p>${esc(t)}</p>`).join('')}
      <div class="pn-acoes">${btnLink(b.link, 'Conhecer o livro ↗')}</div></div></div></div>`;
  }
  function htmlContato() {
    const R = P.redes || {}, NOMES = { whatsapp: 'WhatsApp', email: 'E-mail', linkedin: 'LinkedIn', github: 'GitHub', instagram: 'Instagram', facebook: 'Facebook' };
    const links = Object.keys(NOMES).filter(k => R[k]).map(k => {
      const href = k === 'email' ? 'mailto:' + R[k] : R[k];
      return `<a class="btn ${k === 'whatsapp' ? 'verde' : k === 'email' ? '' : 'fantasma'}" href="${esc(href)}" target="_blank" rel="noopener">${NOMES[k]}</a>`;
    }).join('');
    return `<div class="pn-txt"><h2 id="pn-titulo">Vamos conversar?</h2>
      <p class="pn-sub">${P.disponivel ? 'Disponível para novos projetos.' : 'Me chame por aqui.'}</p>
      <p>Viu algo que te interessou ou tem uma ideia na cabeça? Me manda uma mensagem.</p>
      <div class="pn-redes">${links}</div></div>`;
  }
  function htmlJogo() {
    return `<div class="pn-txt"><h2 id="pn-titulo">Oathbound</h2><p class="pn-sub">O jogo que eu desenvolvo — este mundo usa o mesmo motor.</p>
      <p>Um survivor de navegador em voxel: escolha um herói, aguente as hordas, junte ouro e libere skins. Grátis, sem instalar nada.</p>
      <div class="pn-acoes">${btnLink(OATHBOUND, 'Jogar Oathbound ↗')}</div></div>`;
  }
  function marcarVisto(p) {
    if (vistos.has(p.id)) return;
    vistos.add(p.id); store.set('mundo.vistos', [...vistos]); atualizaHud();
    const poi = pois.find(x => x.dado === p); if (poi) poi.pad.material = mat(0x5fe08a, .25);
    if (vistos.size === PROJ.length) toast('<b>Você viu todos os projetos!</b> Que tal conversar? A caixa de correio fica no sudoeste.', 5200);
    else toast('<b>Projeto descoberto</b> · ' + vistos.size + '/' + PROJ.length);
  }
  function abrir(p) {
    if (p.tipo === 'projeto') { abrePainel(htmlProjeto(p.dado)); marcarVisto(p.dado) }
    else if (p.tipo === 'sobre') abrePainel(htmlSobre());
    else if (p.tipo === 'livro') abrePainel(htmlLivro());
    else if (p.tipo === 'contato') abrePainel(htmlContato());
    else if (p.tipo === 'jogo') abrePainel(htmlJogo());
  }
  function ligarLista(sem3d) {
    const grade = $('#ls-grade');
    const visto = id => { try { return vistos.has(id) } catch (e) { return false } };
    const pinta = () => {
      grade.innerHTML = PROJ.map((p, i) => `<button class="item" type="button" data-i="${i}"><img src="${esc(p.img || '')}" alt="" loading="lazy">
        <div><b>${esc(p.nome)}</b><small>${esc(p.sub || '')}</small>${visto(p.id) ? '<div class="visto">✓ visto no mundo</div>' : ''}</div></button>`).join('');
    };
    const abreLista = () => { pinta(); $('#lista').hidden = false; if (!sem3d) pausado = true; setTimeout(() => $('#ls-fechar').focus(), 30) };
    grade.addEventListener('click', e => {
      const b = e.target.closest('.item'); if (!b) return; const p = PROJ[+b.dataset.i];
      if (sem3d) { if (p.link) open(p.link, '_blank', 'noopener'); return }
      $('#lista').hidden = true; abrePainel(htmlProjeto(p)); marcarVisto(p);
    });
    $('#entrada-lista').addEventListener('click', abreLista);
    const hl = $('#hud-lista'); if (hl) hl.addEventListener('click', abreLista);
  }
  ligarLista();
  $('#hud-contato').addEventListener('click', () => abrePainel(htmlContato()));

  /* ================= INÍCIO ================= */
  let intro = 0;
  $('#comecar').addEventListener('click', () => {
    $('#entrada').hidden = true; hud.hidden = false; jogando = true; pausado = false; intro = reduzMovimento ? 1 : 0;
    canvas.setAttribute('tabindex', '0'); canvas.focus();
    if (!vistos.size) setTimeout(() => toast(isTouch ? 'Arraste o dedo para andar. Os <b>projetos</b> ficam na avenida ao norte.' : 'Use <b>WASD</b> ou as setas. Os <b>projetos</b> ficam na avenida ao norte.', 4200), 900);
  });

  /* ================= LOOP ================= */
  const camPos = new THREE.Vector3(0, 40, 40), alvo = new THREE.Vector3(0, 1, -8);
  let enquadra = 0, ultimoQ = null;
  let ultimo = performance.now(), tempo = 0;
  function frame(agora) {
    const dt = Math.min(.05, (agora - ultimo) / 1000); ultimo = agora; tempo += dt;
    // entrada
    let mx = 0, mz = 0;
    if (!pausado) {
      if (teclas.w || teclas.arrowup) mz -= 1; if (teclas.s || teclas.arrowdown) mz += 1;
      if (teclas.a || teclas.arrowleft) mx -= 1; if (teclas.d || teclas.arrowright) mx += 1;
      if (joy.on) { mx += joy.dx; mz += joy.dy }
    }
    const m = Math.hypot(mx, mz);
    if (m > .12) {
      mx /= Math.max(1, m); mz /= Math.max(1, m);
      const sp = 6.2 * Math.min(1, m);
      const [nx, nz] = resolve(pos.x + mx * sp * dt, pos.z + mz * sp * dt);
      vel = Math.hypot(nx - pos.x, nz - pos.z) / Math.max(dt, 1e-4); pos.x = nx; pos.z = nz;
      const alvoDir = Math.atan2(mx, mz);
      let dd = alvoDir - dir; while (dd > Math.PI) dd -= Math.PI * 2; while (dd < -Math.PI) dd += Math.PI * 2;
      dir += dd * Math.min(1, dt * 12);
    } else vel = Math.max(0, vel - dt * 30);
    // animação do boneco (mesma lógica de passada do Oathbound)
    const anda = Math.min(1, vel / 6);
    passo += dt * (4 + vel * 1.4);
    const sw = Math.sin(passo) * .7 * anda;
    heroi.legL.rotation.x = sw; heroi.legR.rotation.x = -sw;
    heroi.armL.rotation.x = -sw * .8; heroi.armR.rotation.x = sw * .8 - (anda < .1 ? .5 : 0); // parado, olha o celular
    heroi.root.position.set(pos.x, Math.abs(Math.sin(passo)) * .05 * anda + (anda < .1 ? Math.sin(tempo * 2) * .008 : 0), pos.z);
    heroi.root.rotation.y = dir;
    heroi.cab.rotation.y = anda < .1 ? Math.sin(tempo * .7) * .15 : 0;
    // câmera: abre do alto e desce até atrás do boneco
    if (jogando) intro = Math.min(1, intro + dt * .55);
    const e = intro < 1 ? 1 - Math.pow(1 - intro, 3) : 1;
    const segue = new THREE.Vector3(pos.x, 5.4, pos.z + 7.4);
    const geral = new THREE.Vector3(0, 30, 26);
    /* Perto de um quadro, a câmera vira para ele: o print fica de frente
       para quem joga (de costas, o quadro lateral aparecia de perfil). */
    const q = perto && perto.tipo === 'projeto' && !pausado ? perto : null;
    enquadra += ((q ? 1 : 0) - enquadra) * Math.min(1, dt * 3);
    if (q) ultimoQ = q;
    let desejada = jogando ? geral.clone().lerp(segue, e) : new THREE.Vector3(Math.sin(tempo * .08) * 26, 22, Math.cos(tempo * .08) * 26 - 8);
    const alvoBase = new THREE.Vector3(jogando ? pos.x : 0, 1.2, jogando ? pos.z - 2.2 : -8);
    if (ultimoQ && enquadra > .01) {
      const gq = ultimoQ.g.position, fx = ultimoQ.x - gq.x, fz = ultimoQ.z - gq.z, fl = Math.hypot(fx, fz) || 1;
      const dQ = Math.max(8, 2.5 / (Math.tan(21 * Math.PI / 180) * camera.aspect));   // celular em pé: recua até o quadro caber
      const camQ = new THREE.Vector3(gq.x + fx / fl * dQ + (pos.x - ultimoQ.x) * .4, 3.2 + dQ * .06, gq.z + fz / fl * dQ + (pos.z - ultimoQ.z) * .4);
      desejada = desejada.lerp(camQ, enquadra);
      alvoBase.lerp(new THREE.Vector3(gq.x, 2.2, gq.z), enquadra);
    }
    camPos.lerp(desejada, jogando ? Math.min(1, dt * (intro < 1 ? 6 : 5)) : Math.min(1, dt * 2));
    camera.position.copy(camPos);
    alvo.lerp(alvoBase, jogando ? Math.min(1, dt * 6) : 1);
    camera.lookAt(alvo);
    sun.position.set(pos.x + 13, 18, pos.z + 9); sun.target.position.set(pos.x, 0, pos.z);
    // marcadores girando e quicando
    for (const p of pois) if (p.losango) {
      p.losango.rotation.y = tempo * 1.6; p.marc.position.y = 4.35 + Math.sin(tempo * 2 + p.x) * .12;
      const visto = vistos.has(p.dado.id); p.losango.material = mat(visto ? 0x5fe08a : 0xf2c14b, .6);
    }
    for (const g of postes) g.children[1].material = mat(0xffd890, 1 + Math.sin(tempo * 3 + g.position.z) * .08);
    // o que está perto
    if (!pausado) {
      let melhor = null, md = 1e9;
      for (const p of pois) { const d = Math.hypot(p.x - pos.x, p.z - pos.z); if (d < p.r && d < md) { md = d; melhor = p } }
      mostraDica(melhor);
    } else if (perto) mostraDica(null);
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  window.MUNDO = { pos, pois, abrir, teleporte(x, z) { pos.x = x; pos.z = z }, vistos };
})();
