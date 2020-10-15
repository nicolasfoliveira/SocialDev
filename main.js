const search = document.getElementById('search');

var tam = 19;
var cc = 0;
var ccLoading = 0;

chamaDados = () => {
    return fetch('https://api.github.com/search/users?q=location:araras&per_page=100&client_secret=38eb7d374a0afeb53113a22b5847dd03258de034').then( resposta => {
        return resposta.json();
    })
    .then (json => {
        return json;
    });
    
};

function addDados() {
    lista.then(exibe=>{

        for(indice=cc;indice<=tam;indice++){

            card = document.createElement('span');
            var conteudoTipo;
            const conteudo_html = `
            <a href="perfil.html?User=${exibe.items[indice].login}">
            <div class="container-card">
            <div class="card">
            <img src="${exibe.items[indice].avatar_url}" alt="Foto do ${exibe.items[indice].avatar_url}">
            <h3>${exibe.items[indice].login}</h3>
            <br>
            <img style="width: 20px;  top: 3px; position: relative;" src="src/like.png">
            <span>${exibe.items[indice].followers_url.length}</span>
            <span><img style="width: 20px; top: 3px; position: relative;" src="src/repositorio.png" ></span>
            <span>${exibe.items[indice].repos_url.length}</span>`
            if(exibe.items[indice].type == 'User'){
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
            document.getElementById('script-card').appendChild(card)
        }

        cc = tam + 1;
        tam = tam + 20;
        return tam
    });
}

window.onload = function(){
    lista = chamaDados();
    addDados()
}

window.addEventListener('scroll', function(){
    if(((window.innerHeight+window.scrollY+0.8) >= document.documentElement.scrollHeight) && tam<=100){
        addDados()
    }
    if(tam>100 && ccLoading==0){    
        var loading = document.getElementById('loading');
        loading.parentNode.removeChild(loading);
        ccLoading = 1;
    }
})
