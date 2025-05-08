import { showAnimals } from './animais.js';
// --- Variáveis de estado (JS puro) ---
let overflowTimeout = null;
let activeCard = null;
let lastInteractionTime = 0;

const INTERACTION_DELAY = 0;
const HIDE_DELAY        = 50000;

// --- Listeners de hover / click em .custom-card ---------------------

document.body.addEventListener('mouseover', e => {
  const now = Date.now();
  if (now - lastInteractionTime < INTERACTION_DELAY) return;
  lastInteractionTime = now;

  const card = e.target.closest('.custom-card');
  if (!card) return;

  if (overflowTimeout !== null) {
    clearTimeout(overflowTimeout);
    overflowTimeout = null;
  }

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
  }, HIDE_DELAY);
});

document.body.addEventListener('click', e => {
  const now = Date.now();
  if (now - lastInteractionTime < INTERACTION_DELAY) return;
  lastInteractionTime = now;

  const card = e.target.closest('.custom-card');
  if (!card) return;

  const desativado = card.classList.toggle('hover-desativado');
  clearTimeout(overflowTimeout);

  if (desativado) {
    overflowTimeout = setTimeout(() => {
      applyOverflow(card, false);
      activeCard = null;
      overflowTimeout = null;
    }, HIDE_DELAY);
  } else {
    activeCard = card;
    applyOverflow(card, true);
  }
});

// --- Accordion -------------------------------------------------------

document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const code = header.dataset.code;
    toggleAccordion(header, code);
  });
});

function toggleAccordion(header, code) {
  const item    = header.parentElement;
  const content = item.querySelector('.accordion-content');
  const wasActive = item.classList.contains('active');

  // Fecha todos os outros
  document.querySelectorAll('.accordion-item.active').forEach(other => {
    if (other !== item) closeAccordionItem(other);
  });

  // Abre ou fecha o clicado
  if (wasActive) {
    closeAccordionItem(item);
  } else {
    openAccordionItem(item, code);
  }
}

function openAccordionItem(item, code) {
  const header  = item.querySelector('.accordion-header');
  const content = item.querySelector('.accordion-content');

  item.classList.add('active');
  showTextTransparency(code, content);
  content.style.maxHeight = content.scrollHeight + 'px';

  header.querySelector('.toggle-icon')?.classList.add('active');
  header.querySelector('.arrow')?.classList.add('active');

  applyOverflow(item, true);
}

function closeAccordionItem(item) {
  const header  = item.querySelector('.accordion-header');
  const content = item.querySelector('.accordion-content');

  item.classList.remove('active');
  content.style.maxHeight = null;

  header.querySelector('.toggle-icon')?.classList.remove('active');
  header.querySelector('.arrow')?.classList.remove('active');

  applyOverflow(item, false);
}

// --- Overflow Utility ----------------------------------------------

function applyOverflow(card, show) {
  const els = [
    card,
    card.closest('.accordion-content'),
    card.closest('.accordion-item'),
    card.closest('.accordion')
  ].filter(Boolean);

  els.forEach(el => {
    if (show) el.classList.add('libera-overflow');
    else      el.classList.remove('libera-overflow');
  });
}

function showTextTransparency(code, container) {
  const texts = {
    '1-meio_ambiente': `
      <p>
        <strong>O Meio Ambiente</strong> requere que observemos diretrizes e objetivos consistentes nos §§art. 1° - 2° da Lei n° 9.866/2007 que dispõe sobre normas para a proteção e recuperação das bacias hidrográficas dos mananciais de interesse regional do Estado de São Paulo, garantindo eles como prioritários para o abastecimento público das populações atuais e futuras. 
        <br>
          <img src="../../assets/transparency/naturalEnvironment/img1_Meio-Ambiente.jpg" alt="Imagens Aéreas da área de terreno do ano de 1958 do Parque dos Búfalos, recheada de árvores e natureza." class="img-fluid">
        <br>
          Requer observar diretrizes e objetivos consistentes nos arts 1o e 2o da Lei no 9.866/2007 que dispõe sobre diretrizes e normas para a proteção e recuperação das bacias hidrográficas dos mananciais de interesse regional do Estado de São Paulo, garantindo os mananciais como prioritários para o abastecimento público das populações atuais e futuras.
          A Área a qual esta denominada como “Parque dos Búfalos” foi desmatada e teve varias atividades ilegais que aconteceu em sua extensão,  crimes como queimadas, extração de minérios, e desmatamento como se pode observar na animação acima. Importante observar que a Lei obriga tanto o estado como os “proprietários de terras assegurar e potencializar a função da Bacia Hidrográfica do Reservatório Billings como produtora de água para a Região Metropolitana de São Paulo, garantindo sua qualidade e quantidade; estabelecer as condições e os instrumentos básicos para assegurar e ampliar a produção de água em quantidade e qualidade para abastecimento da população, com o objetivo de promover a preservação, recuperação e conservação dos mananciais da Bacia Hidrográfica do Reservatório Billings. O que é que não se observar ao decorrer do tempo, a área do Parque dos Búfalos foi desmatada todo este tempo, para em melhor hora servir a especulação imobiliária, com a desculpa de que é uma área degradada.
        <br>
      </p>
    `,
    
    '2-educacao': `
      <h4 class="text-center">Luta por escolas</h4>
      <p> 
        A luta por escolas, embora não seja diretamente mencionada nos resultados da pesquisa, é um direito fundamental e uma necessidade urgente para garantir o acesso à educação e ao desenvolvimento da comunidade do Jardim Apurá.
        A falta de escolas adequadas pode gerar desigualdades sociais, prejudicar o desenvolvimento da população e limitar as oportunidades de aprendizado e crescimento.
        É importante que as autoridades locais e regionais priorizem a construção e melhoria de escolas no Jardim Apurá, com o objetivo de garantir o acesso à educação de qualidade para todos os moradores. 
        Em resumo, a luta no Jardim Apurá envolve tanto a transformação de um terreno em parque, como o Parque dos Búfalos, quanto a necessidade de garantir o acesso à educação e a melhoria da qualidade de vida dos moradores, incluindo a construção e melhoria de escolas.
      </p>
      <h6 class="text-center"> 
        "Propaganda era bonita, mas realidade é frustrante."
      </h6>
      <p> 
        A propaganda<strong>(do Residencial Espanha)</strong> era muito bonita, o projeto era lindo, maravilhoso, mas na prática não supera a expectativa. Pelo contrário. Falavam que a gente ia ter um parque maravilhoso para passear com as crianças com segurança, falavam que ia ter escolas próximas, que ia ter posto de saúde perto de casa, comércio, creche. Cheguei aqui e vi que não é isso. Acabou ficando um sonho bem frustrado.
        <br>As necessidades do Jardim Apurá são até maiores do que as do bairro de onde vim. Comecei a sofrer para ir atrás de posto de saúde e de vaga escolar. Tive que ir no Conselho Tutelar para conseguir a vaga do meu filho de oito anos numa escola estadual e tenho que pagar transporte escolar.
      </p>
      <p>
        
      </p>

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

