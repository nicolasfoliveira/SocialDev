var scriptCard = document.getElementById('script-card');

dadosFiltro = (parametro) => {
    return fetch('https://api.github.com/search/users?q='+parametro+'&per_page=100&access_token=febb8fe31223bc8117df8b61f9b012c6c6000e8f').then( resposta => {
        return resposta.json();
    })
    .then (json => {
        return json;
    }); 
};

addFiltro = () =>{
    respostaFiltro.then(exibe=>{
        
        if(exibe.items.length <= 19){
            tam = exibe.items.length - 1;
        }

        tamanhoDados2 = exibe.items.length;
 
        for(indice=cc;indice<=tam;indice++){
     
            buscaDados(exibe.items[indice].login).then(total=>{
            
                card = document.createElement('span');
                var conteudoTipo;
                const conteudo_html = `
                <a href="perfil.html?User=${total.login}">
                    <div class="container-card">
                        <div class="card">
                            <img src="${total.avatar_url}" alt="Foto do ${total.avatar_url}">
                            <h3>${total.login}</h3>
                            <p><img src="src/seguidores.png">${total.followers}
                            <img src="src/github.png" >${total.public_repos}`
                            if(total.type == 'User'){
                                conteudoTipo =`<img src="src/pessoal.png" >`
                            }else{
                                conteudoTipo = `<img src="src/corp.png" ></p>`
                            }`
                        </div>
                    </div>
                </a>
                `;
           
                card.innerHTML = conteudo_html + conteudoTipo;  
                scriptCard.appendChild(card)
            });
        }

        cc = tam + 1;
        tam = tam + 20;

        if(tam>tamanhoDados2 && ccLoading==0){
            var selectCarregamento = document.querySelector(".carregamentoId")
            selectCarregamento.setAttribute('id', 'zero')
            ccLoading = 1;
        }

    });
}

function redirectIndex(){
    window.location.href = "index.html?search="+filtroSearch.value;
}

document.addEventListener("keydown", function(event){
    if(event.keyCode == 13){
        redirectIndex();
    }  
});

function filtro(info){
  
    ccLoading = 0;
    tam = 19;
    cc = 0;

    var selectCarregamento = document.querySelector(".carregamentoId")
    selectCarregamento.setAttribute('id', 'carregamento')

    scriptCard.innerHTML = "";
   
    if(info !== ""){
        
        respostaFiltro = dadosFiltro(info);
        addFiltro();
        
    }else{
        ccVazio = 0;
        cc = 0;
        tam = 19; 
        addDados();
    }
};