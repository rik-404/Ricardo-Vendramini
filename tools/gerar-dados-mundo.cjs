/* Gera public/mundo/dados.js a partir de src/data/portfolioData.js e copia as
 * imagens para public/mundo/img. Assim o Mundo (portfólio jogável) usa sempre
 * os mesmos projetos do site — adicionou um projeto lá, ele aparece aqui.
 *
 * Roda sozinho (node tools/gerar-dados-mundo.cjs) e antes do build.
 * Nunca derruba o build: se algo falhar, mantém o dados.js anterior. */
const fs = require('fs'), path = require('path');
const RAIZ = path.join(__dirname, '..');
const SAIDA = path.join(RAIZ, 'public', 'mundo');
try {
  let s = fs.readFileSync(path.join(RAIZ, 'src/data/portfolioData.js'), 'utf8');
  s = s.replace(/^import ([^ ]+) from '([^']+)';/gm, (m, a, b) => 'const ' + a + '=' + JSON.stringify(b) + ';')
       .replace(/export const (\w+)/g, 'const $1 = exports.$1')
       .replace(/export function (\w+)/g, 'exports.$1 = function $1')
       .replace(/export default/g, 'exports.default =');
  const mod = { exports: {} };
  new Function('exports', 'module', s)(mod.exports, mod);
  const E = mod.exports;

  const copiar = (rel, destino) => {
    if (!rel) return null;
    const origem = path.join(RAIZ, 'src', 'data', rel);
    if (!fs.existsSync(origem)) return null;
    /* Já existe uma versão otimizada (.jpg menor, feita uma vez)? Usa ela —
       os PNG originais dos prints somam mais de 7 MB. */
    const otimizada = path.join(SAIDA, 'img', destino + '.jpg');
    if (fs.existsSync(otimizada) && /\.png$/i.test(origem)) return 'img/' + destino + '.jpg';
    const alvo = path.join(SAIDA, 'img', destino + path.extname(origem).toLowerCase());
    fs.mkdirSync(path.dirname(alvo), { recursive: true });
    fs.copyFileSync(origem, alvo);
    return 'img/' + destino + path.extname(origem).toLowerCase();
  };

  const P = E.personalInfo || {};
  const dados = {
    pessoa: {
      nome: P.name, cargo: P.role, frase: P.headline, sub: P.subheadline,
      bio: P.aboutStory || [], citacao: P.aboutQuote, empresa: P.companyName,
      siteEmpresa: P.companyWebsite, disponivel: !!P.availableForWork,
      redes: P.socialLinks || {}, foto: copiar(P.photoUrl, 'ricardo'), logo: copiar(P.companyLogoUrl, 'logo')
    },
    numeros: (E.statsData || []).map(x => ({ rotulo: x.label, valor: x.value, pre: x.prefix || '', pos: x.suffix || '' })),
    projetos: (E.projectsData || []).map(p => ({
      id: p.id, nome: p.name, sub: p.subtitle, categoria: p.category, selo: p.badge, status: p.status, ano: p.date,
      resumo: p.shortDescription, problema: p.problem, resultado: p.result,
      techs: p.technologies || [], link: p.link || null, github: p.github || null,
      img: copiar(p.image, 'projetos/' + p.id)
    })),
    livros: (E.booksData || []).map(b => ({
      id: b.id, titulo: b.title, ano: b.year, sinopse: b.synopsis, link: b.link || b.buyLink || null,
      capa: copiar(b.coverImage, 'livros/' + b.id)
    }))
  };
  const js = '/* GERADO por tools/gerar-dados-mundo.cjs a partir de src/data/portfolioData.js — não edite à mão. */\n' +
             'window.MUNDO_DADOS=' + JSON.stringify(dados, null, 1) + ';\n';
  fs.writeFileSync(path.join(SAIDA, 'dados.js'), js);
  console.log('mundo: ' + dados.projetos.length + ' projetos, ' + dados.livros.length + ' livro(s)');
} catch (e) {
  console.warn('mundo: não deu para gerar os dados (' + e.message + ') — mantendo o anterior');
}
