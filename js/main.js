var tam = 19;
var cc = 0;
var ccLoading = 0;
tamanhoDados = 0;
var url = window.location.search;
var parametro = url.split("=")[1];

if(parametro != undefined){
    if(parametro == ""){
        document.querySelector("[name='filtro']").value = parametro; 
        window.onload = function(){
            lista = chamaDados();   
            addDados();
        }
    }else{
        document.querySelector("[name='filtro']").value = parametro; 
        filtro(parametro);
    }

}else{
    window.onload = function(){
        lista = chamaDados();   
        addDados();
    }
}


chamaDados = () => {
    return fetch('https://api.github.com/search/users?q=location:piracicaba&per_page=100&access_token=febb8fe31223bc8117df8b61f9b012c6c6000e8f').then( resposta => {
        return resposta.json();
    })
    .then (json => {
        return json;
    });
};

buscaDados = (user) => {

    return fetch('https://api.github.com/users/'+user+'?access_token=febb8fe31223bc8117df8b61f9b012c6c6000e8f').then( resposta => {
        return resposta.json();
    })
    .then (json => {
        return json;
    });
}

addDados = () => {
    lista.then(exibe=>{

        ccLoading = 0;
        tamanhoDados = exibe.items.length
    
        for(indice=cc;indice<=tam;indice++){
            
            buscaDados(exibe.items[indice].login).then(total=>{
                
                var selecionaCard = document.querySelector("#script-card")
            
                card = document.createElement('span');
                var conteudoTipo;
                const conteudo_html = `
                <a href="perfil.html?User=${total.login}">
                    <div class="container-card">
                        <div class="card">
                            <img class="avatar" src="${total.avatar_url}" alt="Foto do ${total.avatar_url}">
                            <h3>${total.login}</h3>
                            <p><img src="src/seguidores.png">${total.followers}
                            <img src="src/github.png">${total.public_repos}`
                            if(total.type == 'User'){
                                conteudoTipo =`<img src="src/pessoal.png"></p>`
                            }else{
                                conteudoTipo = `<img src="src/corp.png" ></p>`
                            }`
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
    });
}

window.addEventListener('scroll', function(){
    var filtroSearch = document.querySelector("#filtroSearch");

    console.log("inner: "+window.innerHeight)
    console.log("scroly: "+window.scrollY)
    console.log(document.documentElement.scrollHeight)
    console.log(document.documentElement.offsetHeight)
    console.log(window.innerHeight+window.scrollY)

    if(((window.innerHeight+window.scrollY+0.8) >= document.documentElement.scrollHeight) && tam<=100 && filtroSearch.value == ""){
        addDados();
    }
    if(tam>tamanhoDados && ccLoading==0){
        var selectCarregamento = document.querySelector(".carregamentoId")
        selectCarregamento.setAttribute('id', 'zero')
        ccLoading = 1;
    }
    if(filtroSearch.value != "" && ((window.innerHeight+window.scrollY+0.8) >= document.documentElement.scrollHeight) && tam<=100){
        addFiltro();
    }
})
