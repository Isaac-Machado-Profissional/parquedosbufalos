// Função modificada para receber um container e preencher o conteúdo nele
function showTextTransparency(code, container) {
  const texts = {
    '1-meio_ambiente': `
      <p><strong>O Meio Ambiente se desenvolve de modo que</strong> 
      <br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet rhoncus nibh. Morbi a congue nisi. In rhoncus mauris varius urna elementum, nec sollicitudin velit lacinia. Vivamus nec purus eros. Ut ante ante, accumsan sed vestibulum eget, tempor in magna. Aliquam eu mauris quis dui mattis bibendum sed nec felis. Suspendisse potenti.
      <br>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    `,
    '2-educacao': `
      <p><strong>A Educação aos redores do Jardim Apurá se mostra com uma constante dificuldade de acesso, principalmente às crianças, com mais de 8km de distância de uma escola<br></strong> Onde, dessa forma, se torna um grande impeditivo muitas vezes da própria presença da criança na escola. 
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
      <p><strong>A fauna local do parque dos búfalos é de prestígio nacional, capivaras, corujas, patos... </strong>
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
                <img class="img-fluid" src="https://i.pinimg.com/736x/b8/0f/70/b80f70409611cbb9ec27aecd96c59f4e.jpg" alt="Imagem 4">
                <h7> Cachorro </h7>
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
  // document.querySelectorAll('.accordion-item.active').forEach(i => {
  //   if (i !== item) {
  //     i.classList.remove('active');
  //     const cc = i.querySelector('.accordion-content');
  //     cc.style.maxHeight = null; // Retira o max-height para fechar o item
  //   }
  // });

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
