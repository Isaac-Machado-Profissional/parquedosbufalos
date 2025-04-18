import "../css/style.css";
import { renderInstagramPosts } from './components/instagramPosts.js';

 // Função para alterar o conteúdo dinamicamente do plano de Gestão
function showSection(section) {
    var content = document.getElementById('plano-gestao-do-parque_dynamic-content');

    if (section === 'section1') {
        content.innerHTML = `
            <ul>
                    <li>
                        <h3> Votação anual para o Representante do Parque </h3>
                        <p> Votação que ocorre anualmente para o próximo representante do parque, acompanhe em nossas redes! </p>

                    </li>

                    <li>
                        <h3> Reforma do Parque </h3>
                        <p> O Parque necessita de atenção quanto à sua construção, ampliação e manutenção.  </p>

                    </li>
                        
                    <li>
                        <h3> Constantes Reuniões  </h3>
                        <p> Inscreva-se em nossa Newsletter e receba os links para participação das reuniões do Parque! </p>
                    </li>
                    
            </ul>       
        `;
    } else if (section === 'section2') {
        content.innerHTML = `
            <ul>
                <li> 
                        <h3> Viva o Verde SP </h3>
                        <p> Evento ocorrido no ano de 2024 em parceria com a ONU, promovendo um Plano de Gestão Geral para os parques de São Paulo.  </p>
                </li>

                <li>
                        <h3> Construção do Nosso Parque </h3>
                        <p> Atividade em colaboração com o C.E.U Alvarenga com o Fundamental 1, ensinando valores fundamentais de sustentabilidade à natureza. </p>
                </li>
                
            </ul>
        `;
    }

     // Removendo 'active' de todos os botões
     document.querySelectorAll(".plano-gestao-onu_dynamic-buttons button").forEach((btn) => {
        btn.classList.remove("active");
    });

    // Adicionando 'active' apenas ao botão clicado
    document.querySelector(`button[data-section="${section}"]`).classList.add("active");
}

window.showSection = showSection; // Expondo a função globalmente
window.onload = function() {showSection('section1');} // Chama a function pra mostrar a seção 1 p nós assim q;


    // Adicionando os eventos de clique nos botões dinamicamente
document.querySelectorAll(".plano-gestao-onu_dynamic-buttons button").forEach((button) => {
    button.addEventListener("click", function () {
        showSection(this.dataset.section);
    })

})

// Adicionando o evento de clique no botão "INSTAGRAM"
document.querySelectorAll(".midias-container button").forEach((button) => {
  button.addEventListener("click", async function () {
    let outputDiv = document.getElementById("output-instagram");

    // Se o container estiver vazio, mostra o "Carregando..." e renderiza os posts após o atraso
    if (outputDiv.childElementCount === 0) {
      outputDiv.innerHTML = "<p>Carregando...</p>";
      await renderInstagramPosts();
    } else {
      // Se já houver conteúdo, limpa o container para o toggle
      outputDiv.innerHTML = "";
    }
  });
}



);
