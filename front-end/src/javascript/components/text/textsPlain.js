// Função para alterar o conteúdo dinamicamente do plano de Gestão
function showTextParkManagement(section) {
    var content = document.getElementById('parkManagement-content');

    if (section === 'section1') {
        content.innerHTML = `
            <ul>
                    <li>
                        <h3> Votação a representante </h3>
                        <p> Votação que ocorre a cada 2 anos para o próximo representante do parque, acompanhe-nos! </p>

                    </li>
                        
                    <li>
                        <h3> Constantes reuniões </h3>
                        <p> Acompanhe nosso <strong><a href="../../html/news.html">Calendário de Eventos</a></strong> e receba os links para participação das reuniões do Parque! </p>
                        
                    </li>
                     <li>
                        <h3> Notícias mensais </h3>
                        <p> Cadastre-se em nossa <a href="../../../html/about.html?scrollTo=newsletter" id="newsletter-container">Newsletter</a>, mantendo-se atualizado sobre as oportunidades de fazer a diferença na região! </p>
                        
                    </li>
                    
            </ul>       
            
        `;
    } else if (section === 'section2') {
        content.innerHTML = `
            <ul>
                <li>
                        <h3> Trabalhos acadêmicos </h3>
                        <p> Mais de 16 trabalhos acadêmicos concluídos. </p>
                </li>

                <li> 
                        <h3> Plantio de árvores </h3>
                        <p> Plantio de árvores, com o apoio do CADES, dentre outras instituições e da comunidade.  </p>
                </li>

                <li>
                        <h3> Atividades de sustentabilidade </h3>
                        <p> Atividade em colaboração com o C.E.U Alvarenga e outras entidades, ensinando valores fundamentais de sustentabilidade às crianças. </p>
                </li>
            </ul>
        `;
    }
     // Removendo 'active' de todos os botões
     document.querySelectorAll(".parkManagement_dynamic-buttons button").forEach((btn) => {
        btn.classList.remove("active");
    });

    // Adicionando 'active' apenas ao botão clicado
    document.querySelector(`button[data-section="${section}"]`).classList.add("active");
}

window.showTextParkManagement = showTextParkManagement; 
window.onload = function() {showTextParkManagement('section1');} // Chama a function pra mostrar a seção 1 p nós assim q;


    // Adicionando os eventos de clique nos botões dinamicamente
document.querySelectorAll(".parkManagement_dynamic-buttons button").forEach((button) => {
    button.addEventListener("click", function () {
        showTextParkManagement(this.dataset.section);
    })

})
