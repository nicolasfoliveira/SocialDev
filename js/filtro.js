var filtroSearch = document.querySelector("#filtroSearch");
var scriptCard = document.getElementById('script-card');
var ccVazio = 0

document.addEventListener("keydown", function(event){

    if(event.keyCode == 13){
        filtro();
    }  
});

function filtro(){
    ccLoading = 0;
    tam = 19;
    cc = 0;

    var selectCarregamento = document.querySelector(".carregamentoId")
    selectCarregamento.setAttribute('id', 'carregamento')

    document.getElementById("script-card").innerHTML = "";
    info = filtroSearch.value
    console.log(info)
    if(info !== ""){

        var ccRemove = scriptCard.querySelector('.card')
        respostaFiltro = dadosFiltro(info);

        if(ccVazio == "0" && ccRemove != ""){
            document.getElementById("script-card").innerHTML = "";
            ccVazio = 1;
        }
        console.log("test"+tam)
        addFiltro();
        
    }else{
        ccVazio = 0;
        cc = 0;
        tam = 19; 
        addDados();
    }
};


dadosFiltro = (parametro) => {
    return fetch('https://api.github.com/search/users?q='+parametro+'&per_page=100&access_token=3129ef14bcdc25cece63804c473e989c0bfd8069&page').then( resposta => {
        return resposta.json();
    })
    .then (json => {
        return json;
    });
    
};

function addFiltro() {
    respostaFiltro.then(exibe=>{
        console.log(exibe)
        console.log(cc)
        console.log(tam)

        for(indice=cc;indice<=tam;indice++){
            console.log(indice)            
            buscaDados(exibe.items[indice].login).then(total=>{

                var selecionaCard = document.querySelector("#script-card")
            
                card = document.createElement('span');
                var conteudoTipo;
                const conteudo_html = `
                <a href="perfil.html?User=${total.login}">
                <div class="container-card">
                <div class="card">
                <img src="${total.avatar_url}" alt="Foto do ${total.avatar_url}">
                <h3>${total.login}</h3>
                <br>
                <img style="width: 20px;  top: 3px; position: relative;" src="src/like.png">
                <span>${total.followers}</span>
                <span><img style="width: 20px; top: 3px; position: relative;" src="src/repositorio.png" ></span>
                <span>${total.public_repos}</span>`
                if(total.type == 'User'){
                    conteudoTipo =`<span><img style="width: 15px;  top: 1px; position: relative; margin-right: 7px; margin-left: 7px;" src="src/pessoal.png" ></span>`
                }else{
                    conteudoTipo = `<span><img style="width: 15px;  top:1px; position: relative; margin-right: 7px; margin-left: 7px;" src="src/corp.png" ></span>`
                }
                `
                </div>
                </div>
                </a>
                `;
           
                card.innerHTML = conteudo_html + conteudoTipo;  
                selecionaCard.appendChild(card)
            });
        }

        cc = tam + 1;
        tam = tam + 20;
        return tam
    });
}