const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const noticias = require('./noticias.json');

// Caminho da pasta front-end onde serão copiadas as páginas e JSON
const frontendNoticiaDir = path.resolve(__dirname, '..', '..', '..', 'front-end', 'src', 'html', 'noticias', 'todas');
const frontendJsonPath = path.resolve(__dirname, '..', '..', '..', 'front-end', 'src', 'html', 'noticias', 'todas', 'noticias.json');

async function gerarPaginas() {
  const templatePath = path.join(__dirname, 'template.ejs');

  // Garante que a pasta de destino exista
  fs.mkdirSync(frontendNoticiaDir, { recursive: true });

  for (const noticia of noticias) {
    if (!noticia.nomeArquivo) {
      console.error('Erro: noticia sem nomeArquivo:', noticia.titulo || noticia);
      continue;
    }

    const contexto = { ...noticia };

    // Gera o HTML na pasta de back-end
    const caminhoArquivo = path.join(__dirname, 'html', 'noticias', 'todas', noticia.nomeArquivo);
    fs.mkdirSync(path.dirname(caminhoArquivo), { recursive: true });
    
    const html = await ejs.renderFile(templatePath, contexto);
    fs.writeFileSync(caminhoArquivo, html, 'utf-8');
    console.log(`✅ Arquivo criado: ${caminhoArquivo}`);

    // Copia/atualiza o HTML para a pasta de front-end
    const destinoFront = path.join(frontendNoticiaDir, noticia.nomeArquivo);
    fs.writeFileSync(destinoFront, html, 'utf-8');
    console.log(`➡️ Copiado para front-end: ${destinoFront}`);
  }

  // Copia/atualiza o JSON para a pasta de front-end
  fs.copyFileSync(path.join(__dirname, 'noticias.json'), frontendJsonPath);
  console.log(`📄 JSON copiado para front-end: ${frontendJsonPath}`);
}

gerarPaginas().catch(err => console.error(err));
