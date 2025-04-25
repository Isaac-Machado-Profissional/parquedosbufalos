// Função modificada para receber um container e preencher o conteúdo nele
function showTextTransparency(code, container) {
  const texts = {
    '1-meio_ambiente': `
      <p><strong>O Meio Ambiente</strong> requere que observemos diretrizes e objetivos consistentes nos §§art. 1° - 2° da Lei n° 9.866/2007 que dispõe sobre normas para a proteção e recuperação das bacias hidrográficas dos mananciais de interesse regional do Estado de São Paulo, garantindo eles como prioritários para o abastecimento público das populações atuais e futuras. 
      <br>
      <img src="../../assets/transparency/naturalEnvironment/img1_Meio-Ambiente.jpg" alt="Imagens Aéreas da área de terreno do ano de 1958 do Parque dos Búfalos, recheada de árvores e natureza." class="img-fluid">
      <br>
      Requer observar diretrizes e objetivos consistentes nos arts 1o e 2o da Lei no 9.866/2007 que dispõe sobre diretrizes e normas para a proteção e recuperação das bacias hidrográficas dos mananciais de interesse regional do Estado de São Paulo, garantindo os mananciais como prioritários para o abastecimento público das populações atuais e futuras.
      A Área a qual esta denominada como “Parque dos Búfalos” foi desmatada e teve varias atividades ilegais que aconteceu em sua extensão,  crimes como queimadas, extração de minérios, e desmatamento como se pode observar na animação acima. Importante observar que a Lei obriga tanto o estado como os “proprietários de terras assegurar e potencializar a função da Bacia Hidrográfica do Reservatório Billings como produtora de água para a Região Metropolitana de São Paulo, garantindo sua qualidade e quantidade; estabelecer as condições e os instrumentos básicos para assegurar e ampliar a produção de água em quantidade e qualidade para abastecimento da população, com o objetivo de promover a preservação, recuperação e conservação dos mananciais da Bacia Hidrográfica do Reservatório Billings. O que é que não se observar ao decorrer do tempo, a área do Parque dos Búfalos foi desmatada todo este tempo, para em melhor hora servir a especulação imobiliária, com a desculpa de que é uma área degradada.
      <br>
    
      </p>
    `,
    '2-educacao': `
      <p><strong>A Educação aos redores do Jardim Apurá se mostra com uma constante dificuldade de acesso, principalmente às crianças, com mais de 8km de distância de uma escola<br></strong> 
      <br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet rhoncus nibh. Morbi a congue nisi. In rhoncus mauris varius urna elementum, nec sollicitudin velit lacinia. Vivamus nec purus eros. Ut ante ante, accumsan sed vestibulum eget, tempor in magna. Aliquam eu mauris quis dui mattis bibendum sed nec felis. Suspendisse potenti.
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet rhoncus nibh. Morbi a congue nisi. In rhoncus mauris varius urna elementum, nec sollicitudin velit lacinia. Vivamus nec purus eros. Ut ante ante, accumsan sed vestibulum eget, tempor in magna. Aliquam eu mauris quis dui mattis bibendum sed nec felis. Suspendisse potenti.</p>
    `,
    '3-construcao': `
      <p><strong>A Construção e reforma do Parque deve ser um ponto importante a </strong> 
      <br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet rhoncus nibh. Morbi a congue nisi. In rhoncus mauris varius urna elementum, nec sollicitudin velit lacinia. Vivamus nec purus eros. Ut ante ante, accumsan sed vestibulum eget, tempor in magna. Aliquam eu mauris quis dui mattis bibendum sed nec felis. Suspendisse potenti.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet rhoncus nibh. Morbi a congue nisi. In rhoncus mauris varius urna elementum, nec sollicitudin velit lacinia. Vivamus nec purus eros. Ut ante ante, accumsan sed vestibulum eget, tempor in magna. Aliquam eu mauris quis dui mattis bibendum sed nec felis. Suspendisse potenti.</p>
    `,
    '4-orgaos_publicos': `
      <p><strong>Os órgãos públicos deveriam dar a importância necessária a um parque tão grande quanto este, mais de 65 hectares originais de terra <br> </strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet rhoncus nibh. Morbi a congue nisi. In rhoncus mauris varius urna elementum, nec sollicitudin velit lacinia. Vivamus nec purus eros. Ut ante ante, accumsan sed vestibulum eget, tempor in magna. Aliquam eu mauris quis dui mattis bibendum sed nec felis. Suspendisse potenti.</p>
    `,
    '5-animais': `
      <p><strong>A fauna local do parque dos búfalos é de prestígio nacional, com... </strong>
      <br>Lorem Ipsum Morbi a congue nisi. adipiscing elit. Integer sit amet rhoncus nibh. Morbi a congue nisi. In rhoncus<br></p>
          <div class="row transparency-animals">
            <div class="col-6 col-md-4 col-lg-3 col-custom">
              <div class="custom-card">
                <img class="img-fluid" src="https://th.bing.com/th/id/OIP.wvM_yWrrGpOh4etfCwRV6wHaEQ?rs=1&pid=ImgDetMain" alt="Imagem 1">
                        <h7> Lobo Terrível </h7>
              </div>
            </div>

            <div class="col-6 col-md-4 col-lg-3 col-custom">
              <div class="custom-card">
                <img class="img-fluid" src="https://i.pinimg.com/736x/e2/41/d4/e241d40c48058183f08a348fcbc80514.jpg" alt="Imagem 2">
                        <h7> Cachorro </h7>
              </div>
            </div>

            <div class="col-6 col-md-4 col-lg-3 col-custom">
              <div class="custom-card">
                <img class="img-fluid" src="https://th.bing.com/th/id/OIP.GyAZttUj6ASIbA9OMmL1DAHaIS?w=685&h=766&rs=1&pid=ImgDetMain" alt="Imagem 3">
                          <h7> Cachorro </h7>
              </div>
            </div>

            <div class="col-6 col-md-4 col-lg-3 col-custom">
              <div class="custom-card">
                <img class="img-fluid" src="https://i.pinimg.com/736x/4a/8c/c7/4a8cc7b18d90d6b7abf19d130ac078dc.jpg" alt="Imagem 4">
                <h7> Cachorra </h7>
              </div>
            </div>
            <div class="col-6 col-md-4 col-lg-3 col-custom">
              <div class="custom-card">
                <img class="img-fluid" src="https://th.bing.com/th/id/OIP.SydGdkzEyM3f6spfKzmgRAAAAA?w=300&h=250&rs=1&pid=ImgDetMain" alt="Imagem 4">
                <h7> Pikachu </h7>
              </div>
            </div>
            <div class="col-6 col-md-4 col-lg-3 col-custom">
              <div class="custom-card">
                <img class="img-fluid" src="https://th.bing.com/th/id/OIP.1AoZz5SaP2nSFJX8Uw1ZZgHaH_?rs=1&pid=ImgDetMain" alt="Imagem 4">
                <h7> Squirdle </h7>
              </div>
            </div>
            <div class="col-6 col-md-4 col-lg-3 col-custom">
              <div class="custom-card">
                <img class="img-fluid" src="https://th.bing.com/th/id/OIP.880MLhVwckHNM8P-LjpdegHaHa?rs=1&pid=ImgDetMain" alt="Imagem 4">
                <h7> Celebi </h7>
              </div>
            </div>
            <div class="col-6 col-md-4 col-lg-3 col-custom">
              <div class="custom-card">
                <img class="img-fluid" src="https://th.bing.com/th/id/R.0c1d913edb60278c054710fc5a7d2689?rik=t1N94Mt79jMQXg&pid=ImgRaw&r=0&sres=1&sresct=1" alt="Imagem 4">
                <h7> Greeninja </h7>
              </div>
            </div>

          </div>
    `,
    '6-preservacao': `
      <p><strong>Preservação:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet rhoncus nibh. Morbi a congue nisi. In rhoncus mauris varius urna elementum, nec sollicitudin velit lacinia. Vivamus nec purus eros. Ut ante ante, accumsan sed vestibulum eget, tempor in magna. Aliquam eu mauris quis dui mattis bibendum sed nec felis. Suspendisse potenti.</p>
    `
  };

  container.innerHTML = texts[code] || '<p>Conteúdo não encontrado.</p>';
}

// Só pro zoom nao bugar tipo muito hard quando o acordion estiver aberto: 
window.addEventListener("resize", () => {
  document.querySelectorAll(".accordion-item.active .accordion-content").forEach(content => {
    // Atualiza a altura para refletir o novo tamanho do conteúdo
    content.style.maxHeight = content.scrollHeight + "px";
  });
});


function toggleAccordion(header, code) {
  const item = header.parentElement;
  const content = item.querySelector('.accordion-content');
  const isActive = item.classList.contains('active');

  // ABERTO 1 POR VEZ:
  document.querySelectorAll('.accordion-item.active').forEach(i => {
    if (i !== item) {
      i.classList.remove('active');
      const cc = i.querySelector('.accordion-content');
      cc.style.maxHeight = null; // Retira o max-height para fechar o item
    }
  });

  // Agora, alterna o estado (abrir ou fechar) do item clicado
  if (!isActive) {
    item.classList.add("active");
    // Carrega o conteúdo dinamicamente
    showTextTransparency(code, content);
    // Define a altura máxima para que o conteúdo expanda suavemente
    content.style.maxHeight = content.scrollHeight + "px";
  } else {
    item.classList.remove("active");
    // Fecha o item redefinindo a altura
    content.style.maxHeight = null;
  }

  // Caso haja imagens, reajusta a altura após o carregamento
  const imgs = content.querySelectorAll("img");
  imgs.forEach(img => {
    img.onload = () => {
      if (content.style.maxHeight) {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    };
  });
}
