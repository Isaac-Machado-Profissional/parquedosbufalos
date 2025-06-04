const path = require('path'); 
const fs = require('fs');
const ejs = require('ejs');
const noticias = require('./noticias.json');

// Função para escapar atributos do HTML vinculados a imagem para o GLightbox buildar corretamente
function escapeAttr(str) {
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
}

// Função para processar imagens com GLightbox no conteúdo
function processarConteudoComGLightbox(conteudo) {
  return conteudo.replace(
    /<img\b([^>]*?)\bsrc=(['"])([^'"]+)\2([^>]*?)\/?>/gi,
    (match, antesAttrs, quote, src, depoisAttrs) => {
      const imgTag = `<img${antesAttrs} src="${src}"${depoisAttrs.trim()} />`;
      return `<a href="${src}" class="glightbox">${imgTag}</a>`;
    }
  ).replace(/(<\/a>)(\S)/g, '$1 $2');
}


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

    // Primeiro, escapa o atributo alt das imagens dentro do conteúdo da notícia
    noticia.conteudo = (noticia.conteudo || '').replace(
      /<img\b([^>]*?)alt=(['"])(.*?)\2([^>]*?)>/gi,
      (match, beforeAlt, quote, altText, afterAlt) => {
        const escapedAlt = escapeAttr(altText);
        return `<img${beforeAlt}alt=${quote}${escapedAlt}${quote}${afterAlt}>`;
      }
    );

    // Depois, envolve as imagens com <a> para PhotoSwipe
    noticia.conteudo = processarConteudoComGLightbox(noticia.conteudo);

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

gerarPaginas()
  .then(() => { 
    console.log('✨ Todas as notícias foram buildadas e copiadas com sucesso pro Front-END!');
    console.log('✨ Arquivos com mesmo nome de HTML e LINKS serão atualizados.')
})
  .catch(err => {
    console.error('❌ Ocorreu um erro ao buildar as páginas de notícias')
    console.error(err);
  });
