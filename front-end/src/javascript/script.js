import "../css/style.css";

 // Função para alterar o conteúdo dinamicamente do plano de Gestão
function showSection(section) {
    var content = document.getElementById('plano-gestao-do-parque_dynamic-content');

    if (section === 'section1') {
        content.innerHTML = `
            <ul >
                    <li>
                        <h3> Votação anual para o Representante do Parque </h3>
                        <p3> Votação que ocorre anualmente para o próximo representante do parque, acompanhe em nossas redes! </p3>

                    </li>

                    <li>
                        <h3> Reforma do Parque </h3>
                        <p3> O Parque necessita de atenção quanto à sua construção, ampliação e manutenção.  </p3>

                    </li>
                        
                    <li>
                        <h3> Constantes Reuniões  </h3>
                        <p3> Inscreva-se em nossa Newsletter e receba os links para participação das reuniões do Parque! </p3>
                    </li>
                    
            </ul>       
        `;
    } else if (section === 'section2') {
        content.innerHTML = `
            <ul>
                <li> 
                        <h3> Viva o Verde SP </h3>
                        <p3> Evento ocorrido no ano de 2024 em parceria com a ONU, promovendo um Plano de Gestão Geral para os parques de São Paulo.  </p3>
                </li>

                <li>
                        <h3> Construção do Nosso Parque </h3>
                        <p3> Atividade em colaboração com o C.E.U Alvarenga com o Fundamental 1, ensinando valores fundamentais de sustentabilidade à natureza. </p3>
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

// Função para alterar dinamicamente o conteúdo de mídias sociais ao clicar no Insta
document.querySelectorAll(".midias-container button").forEach((button) => {
    button.addEventListener("click", function () {
        let outputDiv = document.getElementById("output-instagram");

        if (outputDiv.childElementCount === 0) {
            // Se não existir nada dentro da div, cria um <p>
            let p = document.createElement("p");
            p.textContent = "Instagram API resultados aqui";
            outputDiv.appendChild(p);
        } else {
            // Se já existir algo, não faz nada
            outputDiv.innerHTML = "";
        }
})})

// Middleware onde tive dificuldades em puxar a API do Facebook/Instagram, junto ao Meta For Developers...
// https://developers.facebook.com/

// const appId = 'xxxxxxAppId'; // Seu App ID
// const redirectUri = 'http://localhost:8080/callback'; // O mesmo URI redirect configurado lá no Facebook
// const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&scope=pages_show_list,pages_manage_metadata,instagram_basic`;

// Redireciona para o login do Facebook definido acima com const authUrl
window.location.href = authUrl;
;


