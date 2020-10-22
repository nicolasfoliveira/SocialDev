var tam = 19;
var cc = 0;
var ccLoading = 0;
tamanhoDados = 0;
var url = window.location.search;
var parametro = url.split("=")[1];
var selectTipo = document.getElementById('selectTipo');
var valueSelectTipo = selectTipo.options[selectTipo.selectedIndex].value;
var selectOrdem = document.getElementById('selectOrdem');
var valueSelectOrdem = selectOrdem.options[selectOrdem.selectedIndex].value


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

var arrayLista
chamaDados = () => {
    return fetch('https://api.github.com/search/users?q=location:piracicaba&per_page=100&access_token=c1de38369453883da10a42053cdba48e20fdc511')
    .then( resposta => {
        return resposta.json();
    })
    .then (json => {
        arrayLista = json.items;
        return json;
    })
};


buscaDados = (user) => {

    return fetch('https://api.github.com/users/'+user+'?access_token=c1de38369453883da10a42053cdba48e20fdc511').then( resposta => {
        return resposta.json();
    })
    .then (json => {
        return json;
    });
}

addDados = () => {
    lista.then(exibe=>{

        if(exibe.items.length <= 19){
            tam = exibe.items.length - 1;
        }

        ccLoading = 0;
        tamanhoDados = exibe.items.length
        tamanhoDadosmenos = tamanhoDados - 1
        
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
            subtracao = tamanhoDadosmenos - tam;
            if(subtracao<20 && subtracao>0){
                cc = tam + 1;
                tam = subtracao + tam
            }else{
                cc = tam + 1;
                tam = tam + 20;
            }
        
    });
}

window.addEventListener('scroll', function(){
    filtroSearch = document.querySelector("#filtroSearch");
    valueSelectOrdem = selectOrdem.options[selectOrdem.selectedIndex].value;
    valueSelectTipo = selectTipo.options[selectTipo.selectedIndex].value;

    if(valueSelectTipo == "vazio" && valueSelectOrdem == "vazio" && ((window.innerHeight+window.scrollY+0.8) >= document.documentElement.scrollHeight) && tam<100 && filtroSearch.value == ""){
        addDados();
    }
    if(tam>tamanhoDados && ccLoading==0){
        var selectCarregamento = document.querySelector(".carregamentoId")
        selectCarregamento.setAttribute('id', 'zero')
        ccLoading = 1;
    }
    if(filtroSearch.value != "" && ((window.innerHeight+window.scrollY+0.8) >= document.documentElement.scrollHeight) && tam<=tamanhoDados){
        addFiltro();
    }
    if(valueSelectTipo != "vazio" && filtroSearch.value == "" && tam <= tamanhoDados && ((window.innerHeight+window.scrollY+0.8) >= document.documentElement.scrollHeight)){
        addDados();
    }
})


chamaTipo = (tipo) => {
    return fetch('https://api.github.com/search/users?q=location:piracicaba+type:'+tipo+'&per_page=100&access_token=c1de38369453883da10a42053cdba48e20fdc511')
    .then( resposta => {
        return resposta.json();
    })
    .then (json => {
        arrayLista = json.items;
        return json;
    })
};

filtroTipo = (tipo, parametro) => {
    return fetch('https://api.github.com/search/users?q='+parametro+'+type:'+tipo+'&per_page=100&access_token=c1de38369453883da10a42053cdba48e20fdc511').then( resposta => {
        return resposta.json();
    })
    .then (json => {
        return json;
    }); 
};

objetoSelect = () =>{
    selectTipo = document.getElementById('selectTipo');
    valueSelectTipo = selectTipo.options[selectTipo.selectedIndex].value;
    selectOrdem = document.getElementById('selectOrdem');
    valueSelectOrdem = selectOrdem.options[selectOrdem.selectedIndex].value
    filtroSearch = document.querySelector("#filtroSearch");

    console.log(filtroSearch.value)
    console.log(valueSelectOrdem)

    tam = 19;
    cc = 0;

    if(valueSelectTipo != "vazio"){
        scriptCard.innerHTML = "";
        if(valueSelectTipo == "user"){
            if(filtroSearch.value == ""){
                lista = chamaTipo("User")
                addDados();
            }
            else{
                respostaFiltro = filtroTipo("User", parametro)
                addFiltro();
            }
        }else{
            if(filtroSearch.value == ""){
                lista = chamaTipo("Organization")
                addDados();
            }else{
                respostaFiltro = filtroTipo("Organization", parametro)
                addFiltro();
            }
        }
    }else{
        if(filtroSearch.value == ""){
            scriptCard.innerHTML = "";
            var selectCarregamento = document.querySelector(".carregamentoId")
            selectCarregamento.setAttribute('id', 'carregamento')
            ccLoading = 0;
            lista = chamaDados();
            addDados();
        }else{
            scriptCard.innerHTML = "";
            var selectCarregamento = document.querySelector(".carregamentoId")
            selectCarregamento.setAttribute('id', 'carregamento')
            ccLoading = 0;
            respostaFiltro = dadosFiltro(parametro);
            addFiltro();
        }
    }
    /*arrayLista.sort(function(a,b){
        if(a.login > b.login){
            return 1;
        }
        if(a.login < b.login){
            return -1;
        }
        return 0;
    });*/
    
    
}

