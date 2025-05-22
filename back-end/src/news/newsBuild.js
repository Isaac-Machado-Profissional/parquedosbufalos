const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const noticias = require('./noticias.json');

// Caminho base da pasta do front-end
const frontendBaseDir = path.resolve(__dirname, '..', '..', '..', 'front-end', 'src', 'html', 'noticias');
const frontendJsonPath = path.join(frontendBaseDir, 'noticias.json');

async function gerarPaginas() {
  const templatePath = path.join(__dirname, 'template.ejs');

  for (const noticia of noticias) {
    if (!noticia.nomeArquivo) {
      console.error('❌ Erro: notícia sem nomeArquivo:', noticia.titulo || noticia);
      continue;
    }

    const data = new Date(noticia.dataPublicacao);
    const ano = data.getFullYear();

    const contexto = { ...noticia };
    
    // Caminho do arquivo no back-end
    const caminhoArquivoBack = path.join(__dirname, 'html', 'noticias', String(ano), noticia.nomeArquivo);
    fs.mkdirSync(path.dirname(caminhoArquivoBack), { recursive: true });

    const html = await ejs.renderFile(templatePath, contexto);
    fs.writeFileSync(caminhoArquivoBack, html, 'utf-8');
    console.log(`✅ Arquivo criado: ${caminhoArquivoBack}`);

    // Caminho no front-end por ano
    const destinoFront = path.join(frontendBaseDir, String(ano), noticia.nomeArquivo);
    fs.mkdirSync(path.dirname(destinoFront), { recursive: true });
    fs.writeFileSync(destinoFront, html, 'utf-8');
    console.log(`➡️ Copiado para front-end: ${destinoFront}`);
  }

  // Copia/atualiza o JSON para o front-end
  fs.copyFileSync(path.join(__dirname, 'noticias.json'), frontendJsonPath);
  console.log(`📄 JSON copiado para front-end: ${frontendJsonPath}`);
}

gerarPaginas().catch(err => console.error(err));
