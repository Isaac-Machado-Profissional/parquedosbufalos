import { showAnimals } from './animais.js';

document.querySelectorAll('.accordion-header').forEach(btn => {
  btn.addEventListener('click', () => {
    const code = btn.dataset.code;
    toggleAccordion(btn, code);
  });
});

// Delegação de eventos para capturar hover em qualquer custom-card
let overflowTimeout = null;
let activeCard = null;
let lastInteractionTime = 10; // Timestamp da última interação

const INTERACTION_DELAY = 10; // Delay em milissegundos
const HIDE_OVERFLOW_DELAY = 700; // Delay para esconder o overflow ao desativar o hover

// Hover: ativa mesmo se estiver desativado
document.body.addEventListener('mouseover', e => {
  const now = Date.now();
  if (now - lastInteractionTime < INTERACTION_DELAY) return;
  lastInteractionTime = now;

  const card = e.target.closest('.custom-card');
  if (!card) return;

  if (overflowTimeout) {
    clearTimeout(overflowTimeout);
    overflowTimeout = null;
  }

  // Remove a classe 'hover-desativado' ao passar o mouse
  card.classList.remove('hover-desativado');

  activeCard = card;
  applyOverflow(card, true);
});

document.body.addEventListener('mouseout', e => {
  const card = e.target.closest('.custom-card');
  if (!card || card !== activeCard) return;

  overflowTimeout = setTimeout(() => {
    applyOverflow(card, false);
    activeCard = null;
    overflowTimeout = null;
  }, HIDE_OVERFLOW_DELAY); // Delay ajustado para transição mais suave
});

// Clique: alterna hover ativo/desativo e aplica overflow corretamente
document.body.addEventListener('click', e => {
  const now = Date.now();
  if (now - lastInteractionTime < INTERACTION_DELAY) return;
  lastInteractionTime = now;

  const card = e.target.closest('.custom-card');
  if (!card) return;

  const desativado = card.classList.toggle('hover-desativado');

  if (desativado) {
    // Desativando o hover: aguarda o delay para esconder overflow
    if (overflowTimeout) {
      clearTimeout(overflowTimeout);
      overflowTimeout = null;
    }

    overflowTimeout = setTimeout(() => {
      applyOverflow(card, false); // Remove overflow após o delay
      activeCard = null;
    }, HIDE_OVERFLOW_DELAY);
  } else {
    // Reativando o hover
    if (overflowTimeout) {
      clearTimeout(overflowTimeout);
      overflowTimeout = null;
    }

    applyOverflow(card, true);
    activeCard = card;
  }
});

function applyOverflow(card, show) {
  const elements = [
    card,
    card.closest('.accordion-content'),
    card.closest('.accordion-item'),
    card.closest('.accordion')
  ].filter(Boolean);

  elements.forEach(el => {
    el.classList[show ? 'add' : 'remove']('libera-overflow');
  });
}

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
    '3-agua' : '<p> <strong>A questão Hídrica</strong> que cerca os arredores do Parque dos Búfalos se faz necessário conhecimento prévio de sua situação, com a qual brevemente podemos descrever como de extrema poluição por volta do que cerca toda a <strong>Represa Billings</strong></p>',

    '4-construcao': `
      <p><strong>A Construção e reforma do Parque deve ser um ponto importante a </strong> 
      <br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet rhoncus nibh. Morbi a congue nisi. In rhoncus mauris varius urna elementum, nec sollicitudin velit lacinia. Vivamus nec purus eros. Ut ante ante, accumsan sed vestibulum eget, tempor in magna. Aliquam eu mauris quis dui mattis bibendum sed nec felis. Suspendisse potenti.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet rhoncus nibh. Morbi a congue nisi. In rhoncus mauris varius urna elementum, nec sollicitudin velit lacinia. Vivamus nec purus eros. Ut ante ante, accumsan sed vestibulum eget, tempor in magna. Aliquam eu mauris quis dui mattis bibendum sed nec felis. Suspendisse potenti.</p>
    `,
    '5-orgaos_publicos': `
      <p><strong>Os órgãos públicos deveriam dar a importância necessária a um parque tão grande quanto este, mais de 65 hectares originais de terra <br> </strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet rhoncus nibh. Morbi a congue nisi. In rhoncus mauris varius urna elementum, nec sollicitudin velit lacinia. Vivamus nec purus eros. Ut ante ante, accumsan sed vestibulum eget, tempor in magna. Aliquam eu mauris quis dui mattis bibendum sed nec felis. Suspendisse potenti.</p>
    `,
    '6-animais': showAnimals,
    '7-preservacao': `
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
