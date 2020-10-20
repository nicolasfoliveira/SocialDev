var tam = 19;
var cc = 0;
var ccLoading = 0;


chamaDados = () => {
    return fetch('https://api.github.com/search/users?q=location:piracicaba&per_page=100&access_token=3129ef14bcdc25cece63804c473e989c0bfd8069').then( resposta => {
        return resposta.json();
    })
    .then (json => {
        return json;
    });
};

buscaDados = (user) => {

    return fetch('https://api.github.com/users/'+user+'?access_token=3129ef14bcdc25cece63804c473e989c0bfd8069').then( resposta => {
        return resposta.json();
    })
    .then (json => {
        return json;
    });
}

function addDados() {
    lista.then(exibe=>{
        ccLoading = 0;
        for(indice=cc;indice<=tam;indice++){
                
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

window.onload = function(){
    lista = chamaDados();
    addDados();
}


window.addEventListener('scroll', function(){
    var filtroSearch = document.querySelector("#filtroSearch");
    console.log(ccLoading)
    if(((window.innerHeight+window.scrollY+0.8) >= document.documentElement.scrollHeight) && tam<=100 && filtroSearch.value == ""){
        addDados()
    }
    if(tam>100 && ccLoading==0){
        var selectCarregamento = document.querySelector(".carregamentoId")
        selectCarregamento.setAttribute('id', 'zero')
        ccLoading = 1;
    }
    if(filtroSearch.value != "" && ((window.innerHeight+window.scrollY+0.8) >= document.documentElement.scrollHeight) && tam<=100){
        addFiltro();
    }
})
