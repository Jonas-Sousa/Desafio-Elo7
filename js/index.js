const API_URL = "http://www.mocky.io/v2/5d6fb6b1310000f89166087b";
const DEFAULT_URL = "https://elo7.gupy.io/";

let ul = document.getElementById ("lista-de-vagas")

const getData = async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        criarLiDefault();
        console.log(error);
    }
}
// method reference
getData().then(({vagas}) =>{
    vagas
    .filter(filtraVagasAtivas)
    .filter(filtraVagasSemLocalizacao)
    .forEach(criarLiVaga);
    
});

const filtraVagasAtivas = (vaga) => vaga.ativa === true;
const filtraVagasSemLocalizacao = (vaga) => {
    if (vaga.localizacao === undefined) {
        return vaga.localizacao = {
            remote :"Remoto",
            
          }
    }else if (vaga.localizacao || undefined) {
        return vaga.localizacao 
    }
};

const criarLiVaga = (vaga) => {
    let novoLiItemComLink = criarLiComLink(vaga.link, vaga.cargo);
    let novoSpan = document.createElement("span");
    novoSpan.innerText = `${vaga.localizacao.remote ? vaga.localizacao.remote:""}${vaga.localizacao.bairro ? vaga.localizacao.bairro+ " - ": " "}  ${vaga.localizacao.cidade ? vaga.localizacao.cidade + ", ": ""} ${vaga.localizacao.pais ? vaga.localizacao.pais: ""}`;
    
    novoLiItemComLink.appendChild(novoSpan);
    ul.appendChild(novoLiItemComLink);
    
}

const criarLiComLink = (href, texto) => {
    let novoLiItem = document.createElement("li");
    let novoLink = document.createElement("a");
    novoLink.setAttribute("href", href);
    novoLink.setAttribute("target", "blank");
    novoLink.innerText = texto;
    novoLiItem.appendChild(novoLink);
    return novoLiItem;
}

const criarLiDefault = () => {
    let novoLiItemComLinkDefault = criarLiComLink(DEFAULT_URL, "Veja as nossas vagas na Gupy");
    ul.appendChild(novoLiItemComLinkDefault);
}
