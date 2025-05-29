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
        Observe como era a área antes de ser populada pelas pessoas onde imagens aéreas do ano de 1958 revela a área como um grande terreno com árvores e natureza:
      </p>
          <img src="../../assets/transparency/naturalEnvironment/img1_Meio-Ambiente.jpg" alt="Imagens Aéreas da área de terreno do ano de 1958 do Parque dos Búfalos, recheada de árvores e natureza." class="img-fluid">
      <p>
        Observe a notória diferença entre as áreas verdes sendo cada vez mais desmatadas e o verde sendo substituído por prédios e casas, como mostra a imagem dentre os anos de 2003-2007:
      </p>
          <img src="../../assets/transparency/naturalEnvironment/img2_Meio-Ambiente.jpg" alt="Imagens do ano de 2007" class="img-fluid">
      <p>
        <ul class="text-center"><li>No Parque dos Búfalos, se encontra 18 APP(Áreas de Preservação Permanente).</li></ul>
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
        Como podemos ver acima, destacado em vermelho todas as <strong>escolas públicas</strong> que atendem não só ao bairro do Jardim Apurá, Santa Amélia, Dorotéia, Guacuri como também como um todo, ao distrito Pedreira(este que soma-se mais de 40 mil pessoas[<a href="https://www.ibge.gov.br/estatisticas/sociais/populacao/22827-censo-demografico-2022.html?edicao=39499&t=resultados">IBGE 2022 — Agregados por Distritos</a>]).
        <br>
        Fazendo então seu entorno populacional, este que houve um notório crescimento imobiliário habitacional na região, em conjunto com a construção dos conglomerados de prédios e condomínios, seu adensamento extremo e a infraestrutura infelizmente não acompanharam essa demanda crescente de pessoas no bairro. Então serviços básicos ainda hoje no ano de 2025 estão em falta ou sobrecarregados, como: Hospital, postos de saúde, escolas, creches, transporte público...
      </p>
      <br>
      <h5 class="text-center">Educação em risco</h5>
       <p>
          De fato, um grave problema, por muito relatado pelos moradores, onde diversas mães relatam que precisam procurar escolas fora do bairro, a quilômetros de distância agregando a crianças que moram no Jardim Apurá, mas estudam em escolas, que não no próprio bairro do Jardim Apurá, afetando não só a demanda e a educação de diversas escolas, mas como também ao transporte e vias públicas, prejudicando ainda mais uma área tão trafegada, contribuindo com o aumento do trânsito e da poluição.
          Se formos pensar, em um bairro, onde a população de uma hora pra outra cresceu de forma tão rápida com a chegada de moradias populares. O número de escolas e creches visivelmente não é suficiente para todos os moradores. 
      </p>
      <p>
        A falta de escolas adequadas pode gerar desigualdades sociais, prejudicando o desenvolvimento infantojuvenil e limitando as oportunidades de aprendizado, crescimento e obtenção de trabalho.
        <br>
        É importante que as autoridades locais e regionais garantam a construção de novas escolas e a melhoria das existentes no Jardim Apurá e região, com o objetivo de que o acesso à educação de qualidade seja a todos.
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

    // '4-comunidade': `
    //   <p><strong>A Construção e reforma do Parque deve ser um ponto importante a </strong> 
    //   <br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet rhoncus nibh. Morbi a congue nisi. In rhoncus mauris varius urna elementum, nec sollicitudin velit lacinia. Vivamus nec purus eros. Ut ante ante, accumsan sed vestibulum eget, tempor in magna. Aliquam eu mauris quis dui mattis bibendum sed nec felis. Suspendisse potenti.
    //   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit amet rhoncus nibh. Morbi a congue nisi. In rhoncus mauris varius urna elementum, nec sollicitudin velit lacinia. Vivamus nec purus eros. Ut ante ante, accumsan sed vestibulum eget, tempor in magna. Aliquam eu mauris quis dui mattis bibendum sed nec felis. Suspendisse potenti.</p>
    // `,
    '5-orgaos_publicos': `
    <br>
      <h5 class="text-center">Manifesto do Parque dos Búfalos</h5> 
      
      <p>
        Em março de 2012, o então prefeito da cidade de São Paulo, Gilberto Kassab, decretou de utilidade pública a área conhecida como Parque dos Búfalos, visando a preservação ambiental através da futura implantação do parque como área de lazer para a população.
      </p>
      
      <p>
        Em dezembro de 2013, o decreto foi revogado pelo atual prefeito, Fernando Haddad, com a intenção de construir moradias populares em cima de 19 nascentes, soterrando as últimas fontes naturais de água, responsáveis por abastecer a atual caixa d’água de São Paulo: a Represa Billings.
      </p>
      
      <p
        >Ocorre que ambas as diretrizes de Proteção e Recuperação dos Mananciais, prescritas na Lei Estadual de Proteção Ambiental e Lei Específica da Billings, estão sendo violadas.
      </p>
      
      <p>
        Para nossa surpresa, houve revogação do <a href="https://legislacao.prefeitura.sp.gov.br/leis/decreto-53008-de-6-de-marco-de-2012">Decreto Municipal n° 53.008/12 de 06/03/2012</a>(sancionado pelo Prefeito Gilberto Kassab) através do <a href="https://legislacao.prefeitura.sp.gov.br/leis/decreto-54680-de-11-de-dezembro-de-2013/detalhe">Decreto Municipal n° 54.680/13 de 11/12/2013</a>(sancionado pelo Prefeito Fernando Haddad) dias depois da conversa com os representantes da prefeitura. Em seguida à revogação do Decreto, apareceu uma empresa oriunda de Minas Gerais, denominada EMCCAMP RESIDENCIAL S/A, que deu início ao levantamento preliminar para implantação de um loteamento no local, protocolando ainda, pedido de certidão de uso do solo.
      </p>
      
      <p>
        O movimento em defesa do parque chegou até a indicar outras sete áreas na região mais adequadas para receber o residencial, mas foi ignorado. O atropelo das normas, no entanto, não é privilégio de São Paulo — A Cetesb inclusive é apontada com frequência como um dos mais bem estruturados órgãos ambientais do país.
      </p>
      
      <p>
        O governador Geraldo Alckmin disse outro dia que o atraso nas obras do metrô era devido a ‘empecilhos ambientais’, diz Luis Enrique Sánchez, professor da Escola Politécnica da Universidade de São Paulo e membro da Associação Internacional para Avaliação de Impacto.
      </p>
      <p>
        “Tenho certeza de que a maioria dos governantes pensa da mesma forma. O meio ambiente, a licença, é visto como um problema.” Não é difícil entender os motivos. Moradia rende mais votos que nascentes. Logo, natureza e licença ambiental viram “empecilhos”. Não à toa, o governo discute a criação da Lei Geral do Licenciamento.
      </p>
      
      <p>
        Através de ação popular promovida por defensores do Parque dos Búfalos, a qual o autor popular reitera que o Parque dos Búfalos “única área que restou preservada” naquela região de mananciais da Billings(Região que foi irresponsavelmente desmatada, ocupada, degradada e poluída) deve ser integralmente preservada por se enquadrar conforme define o incontroverso Art. 119 da Lei Específica da Billings, no 13.579/2009.
      </p>

      <p> 
        Artigo 119 – As áreas ainda preservadas do território da Área de Proteção e Recuperação dos Mananciais do Reservatório Billings, dada sua essencialidade para a recarga hídrica do reservatório e a importância de manutenção de seus atributos naturais, deverão ser objeto de ações integradas entre os Poderes Públicos e a população envolvida, visando conter a expansão urbana das ocupações isoladas existentes à data de publicação da lei.
      </p>
      <br>
      <h5 class="text-center">CETESB assume o erro no licenciamento da forma a qual foi feita.</h5>
      <p>
        É impressionante como o lobby imobiliário consegue cometer crimes ao meio ambiente e ainda ganhar licenças aparentemente "lícita" com pareceres políticos. CETESB autoriza empreendimento, mesmo confessando que são os atos administrativo foram ilegais, errados, 193 prédios as margens da represa Billings em cima de 19 nascentes. Parque dos Búfalos, por se tratar de uma área preservada (livre se assentamento populacional) a área é amparada pela Lei Estadual específica da Billings nº 13.579/2009, Artigo 119, dada sua essencialidade para recarga hídrica do reservatório Billings e a importância de manutenção dos seus atributos naturais, devendo ser objeto de ações integradas entre os órgãos públicos e a população envolvida, visando conter a expansão urbana das ocupações isoladas existentes a data da publicação da lei. A Companhia Ambiental do Estado de São Paulo – CETESB é a agência do Governo do Estado responsável pelo controle, fiscalização, monitoramento e licenciamento de atividades geradoras de poluição, com a preocupação fundamental de preservar e recuperar a qualidade das águas, do ar e do solo. Portanto oeste órgão público, que deveria ter como preocupação fundamental preservar e recuperar a qualidade das águas, faz exatamente o oposto, atuando a favor das construtoras e do capital especulativo aprovando projetos absurdos e ilegais que destroem o meio ambiente.
      </p>

      <div class="video-youtube-container">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/2Nmgyyuk66I?si=8AIdSd4rujTYiorz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>


    `,
    '6-animais': showAnimals,
    '7-preservacao': `
      <p>
        Sem árvores, sem ar, nisso todos perdem: a fauna e flora locais perdem, os cidadãos e cidadãs perdem a qualidade de vida, os mananciais perdem, perde-se o direito ao lazer, cultura e esporte… eu, você e a natureza perdemos.
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

