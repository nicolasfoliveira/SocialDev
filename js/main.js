var scriptCard = document.getElementById('script-card');

var url = window.location.search;
var parametro = url.split("=")[1];

var selectTipo = document.getElementById('selectTipo');
var selectOrdem = document.getElementById('selectOrdem');
var valueSelectTipo = selectTipo.options[selectTipo.selectedIndex].value;
var valueSelectOrdem = selectOrdem.options[selectOrdem.selectedIndex].value
var selectCarregamento = document.querySelector(".carregamentoId")
var filtroSearch = document.querySelector("#filtroSearch");

var tam = 20;
var cc = 0;
var ccLoading = 0;
var tamanhoDados = 0;
var subtracao = 0;

var lista

//Função para injetar o html na pagina index.html, os cards
injetarHTMLIndex = (total) => {
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
    scriptCard.appendChild(card);
}

//Função para injetar HTML quando não tiver resultado na API
function injetarHTMLsemResultado(){
    card = document.createElement('span');
    const conteudo_html = `
    <div class="semresultado">
        <h2>Não existe resultado para sua busca<h2>
    </div>`;

    card.innerHTML = conteudo_html;  
    scriptCard.appendChild(card);
}

//Adiciona os dados na minha view do site
addDados = async (listaDados) => {
    let lista = await listaDados;
    
    tamanhoDados = lista.length;

    //verefica se não tem nenhum usuario
    if(tamanhoDados == 0) injetarHTMLsemResultado();
    else{
        if(tamanhoDados < 20) tam = tamanhoDados;
        
        for(indice=cc;indice<tam;indice++){
            injetarHTMLIndex(lista[indice]);
        }
        somadosContadoresdosCards();
    }
    vereficarEfeitodeCarregamento();
}   

function somadosContadoresdosCards(){
    subtracao = tamanhoDados - tam;
    if(subtracao<=19 && subtracao>0){
        cc = tam;
        tam = subtracao+tam
    }else{
        cc = tam;
        tam = tam + 20;
    }
}

function vereficarEfeitodeCarregamento (){
    if(tam>tamanhoDados && ccLoading==0){
        var selectCarregamento = document.querySelector(".carregamentoId")
        selectCarregamento.setAttribute('id', 'zero')
        ccLoading = 1;
    }
}

//Verifica o meu scroll, qua na pagina inseri em 20 em 20 cards
window.addEventListener('scroll', function(){
    if(valueSelectTipo == "vazio" && valueSelectOrdem == "vazio" && ((window.innerHeight+window.scrollY+0.8) >= document.documentElement.scrollHeight) && tam<=100 && filtroSearch.value == "") addDados(listaPiracicaba);
    
    else if(tam<=tamanhoDados && filtroSearch.value != "" && valueSelectTipo == "vazio" && valueSelectOrdem == "vazio" && ((window.innerHeight+window.scrollY+0.8) >= document.documentElement.scrollHeight)) addDados(resultadofiltro);
    
    else if(tam<=tamanhoDados && valueSelectTipo != "vazio" && valueSelectOrdem == "vazio" && filtroSearch.value == "" && ((window.innerHeight+window.scrollY+0.8) >= document.documentElement.scrollHeight)) addDados(lista);
    
    else if(valueSelectOrdem != "vazio" && filtroSearch.value == "" && tam <= tamanhoDados && ((window.innerHeight+window.scrollY+0.8) >= document.documentElement.scrollHeight)) addDados(ListaUserSort);

    else if(tam<=tamanhoDados && ((window.innerHeight+window.scrollY+0.8) >= document.documentElement.scrollHeight)) addDados(respostaFiltro);

    vereficarEfeitodeCarregamento();
})

//realiza a ordenação dos dados
var ListaUserSort
ordenarDados = async (lista) => {
    let resp = await lista;
    resetContadores();

    if(valueSelectOrdem == "data"){
        resp.sort(function(a,b){
            if(a.created_at > b.created_at) return 1;
            if(a.created_at < b.created_at) return -1;
            return 0;
        });
        ListaUserSort = await resp.reverse();
        addDados(ListaUserSort);
    }else if(valueSelectOrdem == "seguidores"){
        resp.sort(function(a,b){
            if(a.followers > b.followers) return 1;
            if(a.followers < b.followers) return -1;
            return 0;
        });
        ListaUserSort = await resp.reverse();
        addDados(ListaUserSort);
    }else if(valueSelectOrdem == "repos"){
        resp.sort(function(a,b){
            if(a.public_repos > b.public_repos) return 1;
            if(a.public_repos < b.public_repos) return -1;
            return 0;
        })
        ListaUserSort = await resp.reverse();
        addDados(ListaUserSort);
    }
}

function resetContadores(){
    cc = 0;
    tam = 20;
    ccLoading = 0;
}

//A cada mudança nos Selects, verefico oque foi selecionado para fazer a chamada das funções
objetoSelect = () =>{
    valueSelectTipo = selectTipo.options[selectTipo.selectedIndex].value;
    valueSelectOrdem = selectOrdem.options[selectOrdem.selectedIndex].value
    
    resetContadores();

    scriptCard.innerHTML = "";
    selectCarregamento.setAttribute('id', 'carregamento')
    
    if(filtroSearch.value == ""){
        if(valueSelectTipo != "vazio" || valueSelectOrdem != "vazio"){
            if(valueSelectTipo == "user") lista = listaTipoUserPiracicaba;
            else if(valueSelectTipo=="org") lista = listaTipoOrgPiracicaba;
            else lista = listaPiracicaba;

            if(valueSelectOrdem!="vazio") ordenarDados(lista);
            else addDados(lista);
        }else{
            listaPiracicaba = chamaPiracicaba();
            addDados(listaPiracicaba);
        }
    }else{
        if(valueSelectTipo != "vazio" || valueSelectOrdem != "vazio"){
            if(valueSelectTipo == "user") respostaFiltro = respostaFiltroUser;
            else if(valueSelectTipo=="org") respostaFiltro = respostaFiltroOrg;
            else respostaFiltro = resultadofiltro;
            
            if(valueSelectOrdem!="vazio") ordenarDados(respostaFiltro);
            else addDados(respostaFiltro);
        }else{
            resultadofiltro = dadosFiltro(parametro);
            addDados(resultadofiltro);
        }
    }
}

//Limpar os filtros select
function limparSelect(){

    selectTipo.selectedIndex = "0"
    selectOrdem.selectedIndex = "0"
    
    objetoSelect();
    
}

