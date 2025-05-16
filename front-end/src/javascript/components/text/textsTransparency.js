import { showAnimals } from './animais.js';
// --- Variáveis de estado (JS puro) ---
let overflowTimeout = null;
let activeCard = null;
let lastInteractionTime = 0;

const INTERACTION_DELAY = 0;
const HIDE_DELAY = 50000;

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
  const item = header.parentElement;
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
  const header = item.querySelector('.accordion-header');
  const content = item.querySelector('.accordion-content');

  item.classList.add('active');
  showTextTransparency(code, content);

  // Primeiro define a altura baseada no conteúdo inicial (pode não incluir imagem ainda)
  content.style.maxHeight = content.scrollHeight + 'px';

  header.querySelector('.toggle-icon')?.classList.add('active');
  header.querySelector('.arrow')?.classList.add('active');

  applyOverflow(item, true);

  // Agora garante que, ao carregar cada imagem, a altura seja atualizada
  const imgs = content.querySelectorAll('img');
  imgs.forEach(img => {
    if (img.complete) {
      // Se já estiver carregada do cache, ajusta imediatamente
      content.style.maxHeight = content.scrollHeight + 'px';
    } else {
      img.addEventListener('load', () => {
        content.style.maxHeight = content.scrollHeight + 'px';
      });
    }
  });
}


function closeAccordionItem(item) {
  const header = item.querySelector('.accordion-header');
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
    else el.classList.remove('libera-overflow');
  });
}

function showTextTransparency(code, container) {
  const texts = {
    '1-meio_ambiente': `
      <p>
       Seu conhecimento e proteção requer que observemos que a área a qual está denominada como “Parque dos Búfalos” foi desmatada e teve várias atividades ilegais que aconteceram em sua extensão, crimes como: Queimadas, extração de minérios e desmatamento em toda a sua história. 
      </p>
      <p>
        Observe como era a área antes de ser populada pelas pessoas onde imagens áreas do ano de 1958 revela a área como um grande terreno com árvores e natureza:
      </p>
          <img src="../../assets/transparency/naturalEnvironment/img1_Meio-Ambiente.jpg" alt="Imagens Aéreas da área de terreno do ano de 1958 do Parque dos Búfalos, recheada de árvores e natureza." class="img-fluid">
      <p>
        Observe a notória diferença entre as áreas verdes sendo cada vez mais desmatadas e o verde sendo substituído por prédios e casas, como mostra a imagem dentre os anos de 2003-2007:
      </p>
          <img src="../../assets/transparency/naturalEnvironment/img2_Meio-Ambiente.jpg" alt="Imagens do ano de 2007" class="img-fluid">

      <p>
        No Parque dos Búfalos, se encontra 18 APP(Áreas de Preservação Permanente).
      </p>
      <p>
        A flora local, ricamente populada, com cerca de 150 espécies de árvores, entre: Arbustivas; arbóreas; trepadeiras, herbáceas; epífitas; subartivas; palmeiras estipe, dentre muitas outras, que podem ser naturalmente vistas ao entorno do Parque dos Búfalos e que precisam continuar lá, provendo nosso ar, este que precisa de melhoria, ou seja, mais árvores em áreas verdes, não menos.  
      </p>
    `,

    '2-educacao': `
      <p> 
        <strong>A luta por escolas</strong>, é um direito fundamental e uma necessidade urgente para garantir o acesso à educação e ao desenvolvimento de crianças da comunidade do Jardim Apurá.
        <br>
      </p>
      <div class="map-container d-flex justify-content-center" style="overflow: hidden; height: 430px;">
        <iframe src="https://www.google.com/maps/d/u/7/embed?mid=1pcR0O3odPY7fj8Pghi9h3_RIl4d4zQ8&ehbc=2E312F&noprof=1" width="640" height="480" style="border: none; margin-top: -50px;"></iframe>
      </div>
      <p>
        Como podemos ver acima, destacado em vermelho todas as escolas que atendem não só a região do Jardim Apurá, como também ao Município de Pedreira(este que soma mais de 40 mil pessoas[IBGE]), além de outras regiões próximas e <strong> metade dos pontos em vermelho sendo de Ensino Infantil particular.</strong>
        <br>
        Fazendo então seu entorno populacional, que necessita de uma escola pro seu filho, se vendo na condição de poucas opções de escolas públicas, contribuindo com uma demanda ainda maior de pessoas querendo colocar seus filhos em escolas e ouvindo não, por não haver vagas.
      </p>
      <p>
        Com o crescimento imobiliário na região do Jardim Apurá e com a construção do conjunto de prédios - o Residencial Espanha em 2016, o bairro teve um adensamento extremo e a infraestrutura infelizmente não acompanhou essa demanda crescente de pessoas no bairro. Então serviços básicos ainda hoje ano 2025 estão em falta, como: Hospital, postos de saúde, escolas, creches, transporte público de qualidade...
      </p>
      <br>
      <h5 class="text-center">Luta por escolas</h5>
      <p>
        A falta de escolas adequadas pode gerar desigualdades sociais, prejudicando o desenvolvimento infantojuvenil e limitando as oportunidades de aprendizado, crescimento e obtenção de trabalho.
        <br>
        É importante que as autoridades locais e regionais garantam a construção e melhoria de escolas no Jardim Apurá, com o objetivo de que o acesso à educação de qualidade, sejam a todos os moradores.
      </p>
      
      <p>
        É um grave problema muito relatado pelos moradores, a falta de escolas na região, pois somente as escolas existentes não suporta a alta demanda de alunos na região. Mães relatam que precisam procurar escolas fora do bairro a alguns quilômetros de distância pois se veem sem saída. Muitas crianças que moram no Jardim Apurá estudam em escolas, que não no próprio bairro do Jardim Apurá, afetando não só a demanda e a educação, mas também ao transporte público, que já é precário e não atende a demanda de pessoas que precisam se deslocar para estudar.
        Se formos pensar, em um bairro, onde a população de uma hora pra outra cresceu de forma tão rápida, com a chegada de moradias populares. O número de escolas e creches visivelmente não é suficiente para todos os moradores. 
      </p>
 `,
    '3-agua': `
      <p>
        <strong>A questão Hídrica</strong> que cerca os arredores do Parque dos Búfalos se faz necessário conhecimento prévio de sua situação e localização, dado que o parque fica colado à Represa Billings.
      </p>
      <br>
      <img src="../../assets/transparency/water/img1_Agua.png" alt="Imagem da Represa Billings cercando o Parque dos Búfalos" class="img-fluid">
      <br>

      <h5 class="text-center">Represa Billings</h5>
      <p>
        A Represa Billings, inauguradada no ano de 1925 pelo engenheiro norte-americano Asa White Kenney Billings, reflete uma das maiores reservas de água potável da região metropolitana de São Paulo, capacitada a receber cerca de 11,21 bi. litros de água, com aproximadamente 127 km² de superfície abrangendo terras de vários municípios. 
        <br>
        Na época de sua construção, foi responsável por abastecer a Usina Hidrelétrica Henry Borden, localizada em Cubatão e assim suprir a crescente demanda do setor industrial que se instalava nos arredores, o que permitiu o crescimento econômico da região, transformando São Paulo no maior polo industrial da América Latina.
      </p>

      <p> 
        Como sociedade, requer que observemos diretrizes e objetivos consistentes do <a href="https://www.al.sp.gov.br/repositorio/legislacao/lei/1997/lei-9866-28.11.1997.html"> 1° ao 2° artigo da lei n° 9.866/1997</a> que dispõe sobre normas para a proteção e recuperação das bacias hidrográficas dos mananciais de interesse regional do Estado de São Paulo, garantindo os mananciais como prioritários para o abastecimento público das populações atuais e futuras.

      </p>
      <p>
        Área em questão decorre principalmente da proximidade com a área inundável do Reservatório Billings que é responsável pelo fornecimento de água para 1,6 milhões de habitantes nos municípios de Diadema, São Bernardo e parte de Santo André. O terreno está integralmente inserido na Área de Proteção e Recuperação dos Mananciais da Bacia Hidrográfica do Reservatório Billings - APRM-B, instituída pela <a href="https://www.al.sp.gov.br/repositorio/legislacao/lei/2009/lei-13579-13.07.2009.html">lei 13.579/2009</a> que diz respeito a assegurar e potencializar a função da Bacia Hidrográfica do Reservatório Billings como produtora de água para a Região Metropolitana de São Paulo, garantindo sua qualidade e quantidade; estabelecer as condições e os instrumentos básicos para assegurar e ampliar a produção de água em quantidade e qualidade para abastecimento da população, com o objetivo de promover a preservação, recuperação e conservação dos mananciais da Bacia Hidrográfica do Reservatório Billings.
      </p>
      `,

    '4-comunidade': `
      <p><strong>A Construção e reforma do Parque deve ser um ponto importante a </strong> 
      <br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet rhoncus nibh. Morbi a congue nisi. In rhoncus mauris varius urna elementum, nec sollicitudin velit lacinia. Vivamus nec purus eros. Ut ante ante, accumsan sed vestibulum eget, tempor in magna. Aliquam eu mauris quis dui mattis bibendum sed nec felis. Suspendisse potenti.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet rhoncus nibh. Morbi a congue nisi. In rhoncus mauris varius urna elementum, nec sollicitudin velit lacinia. Vivamus nec purus eros. Ut ante ante, accumsan sed vestibulum eget, tempor in magna. Aliquam eu mauris quis dui mattis bibendum sed nec felis. Suspendisse potenti.</p>
    `,
    '5-orgaos_publicos': `
      <p><strong>Os órgãos públicos deveriam dar a importância necessária a um parque tão grande quanto este, mais de 65 hectares originais de terra <br> </strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet rhoncus nibh. Morbi a congue nisi. In rhoncus mauris varius urna elementum, nec sollicitudin velit lacinia. Vivamus nec purus eros. Ut ante ante, accumsan sed vestibulum eget, tempor in magna. Aliquam eu mauris quis dui mattis bibendum sed nec felis. Suspendisse potenti.</p>
    `,
    '6-animais': showAnimals,
    '7-preservacao': `
      <p>
        Sem árvores, sem ar, nisso, todos perdem: a fauna e flora locais perdem, os cidadãos e cidadãs perdem a qualidade de vida, os mananciais perdem, perde-se o direito ao lazer, cultura e esportes… eu, você e a natureza perdemos.
      </p>
        <img src="../../assets/transparency/preservation/img1_Preservacao.jpg" alt="Imagem com escritura na parede "Sem floresta, não tem água, sem águam não tem vida... Parque dos Búfalos"" class="img-fluid">
      <p>
      <p>
        Diante desse cenário, a providência urgente e necessária se faz em restaurar a cobertura vegetal nativa, importantíssima como habitat para fauna ameaçada remanescente. 
        <br>
        O projeto, na configuração em que se apresenta, além de não estar alinhado com o bojo do próprio Plano Diretor, e com os nobres objetivos relacionados ao direito fundamental de moradia/habitação, em convergência com o ambiente ecologicamente equilibrado, serve principalmente ao ganho imobiliário, em prejuízo do ambiente natural social.
      </p>
      <p>
        Porquanto, precisamos defender o remanescente atual do Parque dos Búfalos, respeitando-se a natureza e os seus elementos, em especial as vulnerabilidades ambientais e faixas de proteção correspondentes, bem como, também, o passivo ambiental e o diagnóstico que considera a população impactada pela perda de uma enorme área ambiental.
      </p>
      <p>
        A área requer atenção incisiva do poder público no sentido de se impor a necessidade de proteção aos interesses difusos e coletivos relacionados à matéria ambiental, principalmente se considerando a época de escassez hídrica em que nos encontramos, em grande parte por ingerência e omissão por parte do poder público, também no que se refere à conservação do ambiente importante aos recursos hídricos, mas não somente a eles, pois possui importância intrínseca à biodiversidade vegetal que representa por si só, servindo ainda de habitat para fauna, e como estabilizador climático.
      </p>
      <p>
       Atualmente predomina uma linha que desvirtua o conceito de meio ambiente ecologicamente equilibrado, bem como de melhoria ambiental, redefinindo-o sob o prestados de forma efetiva por parques sem compromisso ecológico, meros bosques, praças, canteiros ajardinados etc., a despeito de sua importância relativa intrínseca
      </p>

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

