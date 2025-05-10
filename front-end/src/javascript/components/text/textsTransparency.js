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
        <strong>O Meio Ambiente</strong>, seu conhecimento e proteção requer que observemos que a área a qual está denominada como “Parque dos Búfalos” foi desmatada e teve várias atividades ilegais que aconteceram em sua extensão, crimes como: Queimadas, extração de minérios e desmatamento em toda a sua história. 
      </p>
      <p>
        Importante observar que a Lei obriga tanto o estado como os “proprietários de terras assegurar e potencializar a função da Bacia Hidrográfica do Reservatório Billings como produtora de água para a Região Metropolitana de São Paulo, garantindo sua qualidade e quantidade; estabelecer as condições e os instrumentos básicos para assegurar e ampliar a produção de água em quantidade e qualidade para abastecimento da população, com o objetivo de promover a preservação, recuperação e conservação dos mananciais da Bacia Hidrográfica do Reservatório Billings.
      </p>
        <br>
          <img src="../../assets/transparency/naturalEnvironment/arvore.png" alt="Imagens Aéreas da área de terreno do ano de 1958 do Parque dos Búfalos, recheada de árvores e natureza." class="img-fluid">
        <br>
        <p>
          A vegetação no local é bastante diversificada, composta por 150 espécies, entre arbustivas, arbóreas, trepadeiras, herbáceas, epífitas, subarbustivas e palmeiras estipe.
          Espécies nativas do Município de São Paulo: vassoura (Baccharis conyzoides), araticum (Annona dolabripetala Raddi), falso-caraguatá (Eryngium horridum Malme), jerivá (Syagrus romanzoffiana), cambará (Moquiniastrum polymorphum), ingá (Inga sp), jacarandá-paulista (Machaerium villosum), murici (Byrsonima intermedia), manacá-da-serra (Pleroma mutabile), entre outras.
        <br>
      </p>
      <p>
        Entre as espécies exóticas destacam-se: árvore-polvo (Heptapleurum actinophyllum), mamoeiro (Carica papaya), aspargo (Asparagus), jaqueira (Artocarpus heterophyllus), figueira-benjamim (Ficus benjamina L.), eucalipto (Eucalyptus sp.), pau-incenso (Pittosporum undulatum), goiabeira (Psidium guajava) e outras.
        Duas espécies encontradas estão vulneráveis de extinção: a papo-de-peru ou jarrinha (Aristolochia cymbifera) e a canela-amarela (Nectandra barbellata). Outras duas encontra-se em perigo de extinção no Brasil e no município: Pleroma riedelianum e a pinheiro-do-paraná (Araucaria angustifólia).
        Portaria Secretaria Municipal do Verde e do Meio Ambiente - SVMA Nº 38 de 21 de Maio de 2024
        Medidas preventivas frente aos eventos climáticos extremos nos Parques Naturais Municipais e Parques Urbanos Municipais. 
        <br>
        Parte acima retirado do site: https://capital.sp.gov.br/web/meio_ambiente/w/parque-municipal-jardim-apur%C3%A1-b%C3%BAfalos
      </p>
    `,
    
    '2-educacao': `
    <br>
      <h5 class="text-center">Luta por escolas</h5>
      <p> 
        A luta por escolas, é um direito fundamental e uma necessidade urgente para garantir o acesso à educação e ao desenvolvimento de crianças da comunidade do Jardim Apurá.
        <br>
        A falta de escolas adequadas pode gerar desigualdades sociais, prejudicar o desenvolvimento infantil e juvenil, limitando as oportunidades de aprendizado e de crescimento.
        <br>
        É importante que as autoridades locais e regionais garantam a construção e melhoria de escolas no Jardim Apurá, com o objetivo de que o acesso à educação de qualidade, sejam a todos os moradores.
      </p>
      <p>
        Em resumo, a luta no Jardim Apurá envolve tanto a transformação de um terreno em parque, como o Parque dos Búfalos, quanto a necessidade de garantir o acesso à educação e a melhoria da qualidade de vida dos moradores, incluindo a construção de novas escolas e melhoria das existentes, que não são muitas. O Jardim Apura conta com somente uma escola estadual, a escola E.E Professor Francisco Alves Mourão, que fica na Rua: Adelina Maria De Jesus, nº15, CEP: 04470-261 – Jardim Apurá – São Paulo – SP, tel: (11) 26588736. A escola atende os anos iniciais que vão do 1º ano do fundamental I, fundamental II que atende o 6º ano ao 9º ano e ensino médio. 
      </p>
      <p>
        Com o crescimento imobiliário na região do Jardim Apurá, com a construção do conjunto de prédios – o Residencial Espanha em 2016, o bairro teve um adensamento extremo e a infraestrutura infelizmente não acompanhou essa demanda crescente de pessoas no bairro. Então serviços básicos ainda hoje ano 2025 estão em falta, como hospital, postos de saúde, escolas, creches, transporte público etc. Porém um problema muito relatado pelos moradores é a falta de escolas na região, pois somente uma escola não suporta a alta demanda de alunos na região. Mães relatam que precisam procurar escolas fora do bairro a alguns quilômetros de distância pois se veem sem saída. Muitas crianças que moram no Jardim Apurá estudam em escolas longe do bairro, como E.E Professor Eugênio Zerbini, que não é tão distante, porém não é dentro do bairro Jardim Apurá, e outras mães são obrigadas a matricular e levar suas crianças todos os dias para o Céu Alvarenga, que é bem distante do bairro. 
      </p>
      <p>
        O bairro conta também com o EMEI Jardim Apurá localizado na Rua: Camilo Angleria, nº 314 – Jardim Bandeirantes – Cep: 04470-310 – São Paulo – SP , Tel: 11-5560-0184 inaugurado em março de 2019. A unidade atende 520 alunos entre os períodos manhã e tarde. 
      </p>
      <p>
        Tem também com o  CEI Irmã Agostina localizado na Rua: Lúcio Dias da Fonseca, nº 27 – Jardim Apurá – São Paulo – SP Cep: 04470-080, e o CEI Amor Perfeito localizado na Rua: Independência, nº 146 – Jardim Apurá – Cep: 04470-010, que atendem as crianças menores a partir dos primeiros meses de vida. Se formos pensar, em um bairro, onde a população de uma hora pra outra cresceu de forma tão rápida, com a chegada de moradias populares, que somadas chegam a mais de 15 mil pessoas a mais do que as que já moravam no bairro, o número de escolas e creches não é suficiente para todos os moradores. 
      </p>
      <p>         
        Nesse pensamento, também sabemos que as demais infraestruturas são muito necessárias, como hospitais, postos, transporte mas a educação é de extrema urgência, principalmente para mães que precisam matricular seus filhos em escolas próximo onde mora e simplesmente escutam que não tem vagas, chega a ser frustrante.
      </p>
 `,
    '3-agua' : `
      <p>
        <strong>A questão Hídrica</strong> que cerca os arredores do Parque dos Búfalos se faz necessário conhecimento prévio de sua situação e localização, dado que o parque fica colado à Represa Billings.
      </p>
      <h5 class="text-center">Represa Billings</h5>
      <p>
        A Represa Billings, construída nos anos 1920 pelo engenheiro norte-americano Asa White Kenney Billings, é uma das maiores reservas de água potável, são 9,8 bilhões de litros de água, com 127 km2 de superfície abrangendo terras de vários municípios. Na época de sua construção, foi responsável por abastecer a Usina Hidrelétrica de Cubatão e assim suprir a crescente demanda do setor industrial que se instalava nos arredores, o que permitiu o crescimento econômico da região, transformando São Paulo no maior polo industrial da América Latina.
      </p>
      <p> 
        Parte acima retirado do site: https://capital.sp.gov.br/web/meio_ambiente/w/parque-municipal-jardim-apur%C3%A1-b%C3%BAfalos
      </p>
      <p>
        Esta Nota Técnica reúne resultados de pesquisas científicas e recomendações para a 
        gestão da bacia hidrográfica do reservatório Billings. Este documento foi escrito com a colaboração de pesquisadoras e pesquisadores de quatro instituições de ensino e pesquisa, representando equipes de onze instituições. A proposta foi elaborada respondendo a um convite da coordenação do Subcomitê Billings-Tamanduateí.
      </p>
      <p>
        Este convite foi proposto a partir de um evento comemorativo dos 99 anos da Billings, realizado no Teatro Clara Nunes em Diadema, em 27 de março de 2024, organizado pela iniciativa do Subcomitê Billings-Tamanduateí. Neste evento estiveram presentes representantes da prefeitura de Diadema, Fundação Agência Bacia Hidrográfica do Alto Tietê (FABHAT), Movimento em Defesa da Vida (MDV), Consórcio Intermunicipal do Grande ABC, Grupo de Fiscalização Integrada - Billings (GFI-B) da Secretaria de Meio Ambiente, Infraestrutura e Logística; também contou com a participação da deputada estadual Marina Helou, e pesquisadoras(es) da Universidade São Caetano do Sul, Universidade Federal do ABC, Universidade Federal de São Paulo. O evento contou com ampla participação da sociedade civil e de autoridades do município de Diadema. A mensagem central do coordenador do Subcomitê, Sr. Virgílio Farias, foi sobre a necessidade de ampliar as ações para melhoria da qualidade ambiental na bacia da Billings para que nos 100 anos da Billings tenhamos resultados positivos para comemorar. Em especial, destacou a necessidade de atender às normas que determinam que a qualidade da água no reservatório deve atender aos padrões de Classe 1 e 2, conforme Resolução CONAMA nº 357, de 17 de março de 2005.
      </p>
      <p>
        Este documento foi escrito de forma colaborativa e não esgota orientações de pesquisadoras e pesquisadores; há centenas de pesquisas concluídas e em andamento dedicadas à qualidade ambiental na bacia da Billings e a temas de interesse para sua recuperação e proteção. Este documento resume tão somente as contribuições destes pesquisadores. São apresentadas recomendações para os temas qualidade da água, solos e fitorremediação, mudanças climáticas, assentamentos nas margens dos corpos d’água e instrumentos de políticas públicas. O documento sintetiza contribuições relevantes para tomadores de decisão de diferentes instituições responsáveis pelas ações que impactam na qualidade ambiental da Billings. Os responsáveis pela elaboração destas recomendações ficam à disposição para contribuir com os próximos passos do planejamento e gestão desta importante bacia.
        Documento de pesquisa feito por profissionais de Faculdades do estado de São Paulo, sobre tudo que envolve a Represa Billings. O Material consiste em:
      </p>
      <p>
      <ol class="principal-list list-center">
        <li>
          <b>Qualidade da água</b>
          <ol class="sublist">
            <li>Cabeceiras do reservatório Billings</li>
            <li>Reservatório Billings</li>
            <li>Cianobactérias e cianotoxinas</li>
            <li>Recomendações</li>
          </ol>
        </li>

        <li>
          <b>Solos e fitorremediação</b>
          <ol class="sublist">
            <li>Solos das margens da represa Billings e contaminação por metais</li>
            <li>Recomendações</li>
          </ol>
        </li>

        <li>
          <b>Clima, tendências, balanço hídrico e cenários futuros</b>
          <ol class="sublist">
            <li>Recomendações</li>
          </ol>
        </li>

        <li>
          <b>Assentamentos nas margens da Billings</b>
          <ol class="sublist">
            <li>Recomendações</li>
          </ol>
        </li>

        <li>
          <b>Instrumentos de Planejamento e Gestão Ambiental</b>
        </li>
      </ol>
      <p>

      Nota retirada do documento: Contribuições das universidades_APRM-Billings_5jun2024 
      
      </p>
      <p>
      Autores(as) das pesquisas apresentadas:
      <br>
      UFABC:
      Prof. Ricardo Taniwaki;
      Prof.ª María Valverde;
      Felipe Rodrigues de Oliveira;
      <br>
      UFPR:
      Prof. Simone Mendonça dos Santos;
      <br>
      UNIFESP:
      Armando Correa Cezar;
      Beatriz Dias Bandeira;
      Beatriz Rodrigues Fraga da Silva;
      Fernanda Delfino;
      Jhéssica Saminês Barbalho;
      Larissa Ribeiro Souza;
      M.a. Natália Takahashi Margarido;
      Matheus Matarazzo;
      Melissa Min Ju Kim;
      Prof. Diego Barcellos;
      Prof. Heron Dominguez Torres da Silva;
      Prof. Werner Hanisch;
      Prof.ª Carla Grigoletto Duarte;
      Prof.ª Cristina Souza Freire Nordi;
      Prof.ª Cristina Viana Niero;
      Prof. Giovano Candiani;
      Prof.ª Luciana Aparecida Farias;
      Prof.ª Rosangela Calado da Costa;
      <br>
      USCS:
      Prof.ª Marta Angela Marcondes;
      Profa Paula Simone da Costa Larizzatti;
      Profa Fernanda Amate Lopes;
      Rafaela Lubianqui Mello Boscolo;
      Renata Borges Franchi;
      Leticia Marinho de Oliveira;
      Fernanda Nunes de Melo;
      Camila Menezes de Souza;
      <br>
      USP:
      Prof. Luis César Schiesari;
      </p>

      <p class="text-center">
        <a href="https://youtu.be/SRsYrpCuh9Y?si=VuGpBXeYo6qefOf-">Billings 100 anos documentário</a>
      </p>

      `,

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

