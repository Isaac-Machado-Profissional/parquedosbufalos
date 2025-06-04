// cypress/e2e/meu_teste_app.cy.js
describe('1 - Testando o carregamento de páginas do Parque dos Búfalos:', () => {
  it('1.1 - Navega para a página inicial através da raiz / (index.html)', () => {
    cy.visit('/'); // baseUrl: http://localhost:9000/ (que deve servir index.html)

    cy.url().should('include', '/');
    cy.get('head link[rel="stylesheet"][href^="/116."][href$=".css"]').should('exist');
    cy.get('head link[rel="stylesheet"][href^="/index."][href$=".css"]').should('exist'); // Pagina inicial
    cy.contains('Faça diferente');
  });

  it('1.2 - Navega para a página de Notícias (noticias.html)', () => {
    cy.visit('/noticias.html'); // Página de notícias com calendário de eventos
    // Adicione aqui a verificação para o CSS de notícias, se aplicável
    cy.get('head link[rel="stylesheet"][href^="/116."][href$=".css"]').should('exist');
  });

  it('1.3 - Navega para a página de Transparência (transparencia.html)', () => {
    cy.visit('/transparencia.html');
    cy.get('head link[rel="stylesheet"][href^="/116."][href$=".css"]').should('exist');

  });

  it('1.4 - Navega para a página de notícia da Represa Billings 100 anos', () => {
    cy.visit('/noticias/2025/represa-billings-100-anos.html');
    cy.get('head link[rel="stylesheet"][href^="/116."][href$=".css"]').should('exist');
  });

  it('1.5 - Navega para a página Sobre', () => {
    cy.visit('/sobre.html');
    cy.get('head link[rel="stylesheet"][href^="/116."][href$=".css"]').should('exist');
    cy.contains('Sobre Nós');
  });
});

describe('2 - Verificação do Componente de Tempo de Leitura ([Todas notícias seguem o mesmo template])', () => {
  beforeEach(() => {
    cy.visit('/noticias/2025/represa-billings-100-anos.html');
  });

  it('2.1 - Deve encontrar pelo menos um elemento span com a classe "tempo-leitura"', () => {
    cy.get('span.tempo-leitura')
      .should('exist');
  });

  it('2.2 - Elemento span.tempo-leitura deve estar visível (se aplicável)', () => {
    cy.get('span.tempo-leitura')
      .should('be.visible'); // Verifica se o elemento existe para o usuário.
  });

  it('2.3 - Elemento span.tempo-leitura pode conter algum texto ou estar vazio (após trim)', () => {
    cy.get('span.tempo-leitura').first().invoke('text').then((text) => {
      expect(text.trim()).not.to.be.empty; // Esperando receber texto
    });
  });
});

describe('3 - Verificação do Componente de Compartilhar (com Modal)', () => {
  beforeEach(() => {
    cy.visit('/noticias/2025/represa-billings-100-anos.html');
  });

  it('3.1 - Deve encontrar o botão de compartilhamento e verificar sua visibilidade', () => {
    cy.get('#share-btn') // Seleciona o botão pelo ID
      .should('exist')
      .and('be.visible')
      .and('contain', 'Compartilhar'); // Verifica o texto do botão
  });

  it('3.2 - Deve verificar que o modal de compartilhamento está inicialmente invisível', () => {
    cy.get('#share-modal') // Seleciona o modal pelo ID
      .should('exist')
      .and('not.be.visible'); // O modal deve estar oculto inicialmente
  });

  it('3.3 - Ao clicar no botão, o modal de compartilhamento deve se tornar visível', () => {
    cy.get('#share-btn').click(); // Clica no botão de compartilhamento

    cy.get('#share-modal')
      .should('be.visible'); // Agora o modal deve estar visível

    cy.get('.share-modal-content h2')
      .should('contain', 'Compartilhar'); // Verifica o título dentro do modal

    // Opcional: Verifique se os botões de compartilhamento dentro do modal estão visíveis
    cy.get('#share-whatsapp').should('be.visible');
    cy.get('#share-x-twitter').should('be.visible');
    cy.get('#share-facebook').should('be.visible');
    cy.get('#copy-link-btn').should('be.visible');
  });

  it('3.4 - Ao clicar no botão de fechar, o modal deve ser ocultado novamente', () => {
    cy.get('#share-btn').click(); // Abre o modal primeiro
    cy.get('#share-modal').should('be.visible'); // Confirma que o modal está visível

    cy.get('#share-close').click(); // Clica no botão de fechar (X)
    cy.get('#share-modal').should('not.be.visible'); // O modal deve voltar a estar oculto
  });
});