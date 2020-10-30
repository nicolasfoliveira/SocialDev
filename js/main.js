var scriptCard = document.getElementById('script-card');

var url = window.location.search;
var parametro = url.split("=")[1];

var selectTipo = document.getElementById('selectTipo');
var valueSelectTipo = selectTipo.options[selectTipo.selectedIndex].value;
var selectOrdem = document.getElementById('selectOrdem');
var valueSelectOrdem = selectOrdem.options[selectOrdem.selectedIndex].value
var selectCarregamento = document.querySelector(".carregamentoId")
var filtroSearch = document.querySelector("#filtroSearch");

var tam = 19;
var cc = 0;
var ccLoading = 0;
var tamanhoDados = 0;
var tamanhoDadosmenos = 0;
var subtracao = 0;

var lista = ""

//Iniciando o site no index.html quando abre ou faz uma busca
//verefica se existi informação no id na url
if(parametro != undefined){
    if(parametro == ""){
        document.querySelector("[name='filtro']").value = parametro; 
        window.onload = function(){
            lista = chamaPiracicaba();   
            addDados(lista);
        }
    }else{
        document.querySelector("[name='filtro']").value = parametro; 
        filtro(parametro);
    }
//Quando abri o site ele vai inicia por aqui
}else{
    window.onload = function(){
        lista = chamaPiracicaba();
        addDados(lista);
    }
}

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
    scriptCard.appendChild(card)
}

//Adiciona os dados na minha view do site
addDados = (lista) => {

    exibeTam = lista.length
    //verefica se não tem nenhum usuario
    if(exibeTam == 0){
        card = document.createElement('span');
        const conteudo_html = `
        <div class="semresultado">
            <h2>Não existe resultado para sua busca<h2>
        </div>`

        card.innerHTML = conteudo_html;  
        scriptCard.appendChild(card)
    }else if(lista[0] != undefined){
        if(lista.length <= 19){
            tam = lista.length - 1;
        }
        
        ccLoading = 0;
        tamanhoDados = lista.length
        tamanhoDadosmenos = tamanhoDados - 1
    
        for(indice=cc;indice<=tam;indice++){
            if(lista[indice].created_at == undefined){
                buscaUser(lista[indice].login).then(total=>{       
                    injetarHTMLIndex(total);
                });
            }else{
                injetarHTMLIndex(lista[indice]);
            }
        }
        subtracao = tamanhoDadosmenos - tam;
        
        if(subtracao<20 && subtracao>0){
            cc = tam + 1;
            tam = subtracao + tam
        }else{
            cc = tam + 1;
            tam = tam + 20;
        }
    }else if(lista[0] == undefined){
        lista.then(exibe=>{

            if(exibe.length <= 19){
                tam = exibe.length - 1;
            }
            ccLoading = 0;
            tamanhoDados = exibe.length
            tamanhoDadosmenos = tamanhoDados - 1
            
            for(indice=cc;indice<=tam;indice++){
                
                buscaUser(exibe[indice].login).then(total=>{
                                    
                    injetarHTMLIndex(total);

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

            if(tam>tamanhoDados && ccLoading==0){
                var selectCarregamento = document.querySelector(".carregamentoId")
                selectCarregamento.setAttribute('id', 'zero')
                ccLoading = 1;
            }
            
        });
    }
}

//faz uma busca por cada usuario especifico salvando na variavel listaUser
var salvadadosUser
dadosUserOrdenar = (lista) => {
    ccLoading = 0;
    tamanhoDados = lista.length
    salvadadosUser = []

    for(indice=cc;indice<tamanhoDados;indice++){
        listaUser = buscaUser(lista[indice].login).then(result=>{
            salvadadosUser.push(result)
            return salvadadosUser
        })
    }
}

//Verifica o meu scroll, qua na pagina inseri em 20 em 20 cards
window.addEventListener('scroll', function(){

    if(valueSelectTipo == "vazio" && valueSelectOrdem == "vazio" && ((window.innerHeight+window.scrollY+0.8) >= document.documentElement.scrollHeight) && tam<100 && filtroSearch.value == ""){
        console.log("test")
        addDados(lista);
    }
    else if(filtroSearch.value != "" && valueSelectTipo == "vazio" && valueSelectOrdem == "vazio" && ((window.innerHeight+window.scrollY+0.8) >= document.documentElement.scrollHeight) && tam<=tamanhoDados){
        console.log("test")
        addFiltro();
    }
    else if(valueSelectTipo != "vazio" && valueSelectOrdem == "vazio" && filtroSearch.value == "" && tam <= tamanhoDados && ((window.innerHeight+window.scrollY+0.8) >= document.documentElement.scrollHeight)){
        console.log("test")
        addDados(lista);
    }else if(valueSelectOrdem != "vazio" && filtroSearch.value == "" && tam <= tamanhoDados && ((window.innerHeight+window.scrollY+0.8) >= document.documentElement.scrollHeight)){
        console.log("test")
        addDados(ListaUserSort);
    }else if(tam<=tamanhoDados && ((window.innerHeight+window.scrollY+0.8) >= document.documentElement.scrollHeight)){
        console.log(listaUser)
        addDados(listaUser);
    }

    if(tam>tamanhoDados && ccLoading==0){
        console.log("test")
        selectCarregamento.setAttribute('id', 'zero')
        ccLoading = 1;
        ccSort = 0; 
    }
})

//realiza a ordenação dos dados
var ListaUserSort
ordenarDados = () => {

        resetContadores();
        ccfiltro = 0;
        ccSort = 1;

        if(valueSelectOrdem == "data"){
            listaUser.then(resp=>{
                resp.sort(function(a,b){
                    if(a.created_at > b.created_at){
                        return 1
                    }
                    if(a.created_at < b.created_at){
                        return -1;
                    }
                    return 0
                })
                ListaUserSort = resp.reverse();
                setTimeout(function(){
                    addDados(ListaUserSort);
                },1000)
            })
        }else if(valueSelectOrdem == "seguidores"){
            listaUser.then(resp=>{
                resp.sort(function(a,b){
                    if(a.followers > b.followers){
                        return 1
                    }
                    if(a.followers < b.followers){
                        return -1;
                    }
                    return 0
                })
                ListaUserSort = resp.reverse();
                setTimeout(function(){
                    addDados(ListaUserSort);
                },1000)
            })
        }else if(valueSelectOrdem == "repos"){
            listaUser.then(resp=>{
                resp.sort(function(a,b){
                    if(a.public_repos > b.public_repos){
                        return 1;
                    }if(a.public_repos < b.public_repos){
                        return -1;
                    }
                    return 0;
                })
                ListaUserSort = resp.reverse();
                setTimeout(function(){
                    addDados(ListaUserSort);
                },1000)
            })
        }
    }

function resetContadores(){
    tam = 19;
    cc = 0;
    ccSort = 0;
    ccLoading = 0;
}

//A cada mudança nos Selects, verefico oque foi selecionado para fazer a chamada das funções
var ccSort;
objetoSelect = () =>{
    valueSelectTipo = selectTipo.options[selectTipo.selectedIndex].value;
    valueSelectOrdem = selectOrdem.options[selectOrdem.selectedIndex].value
    
    resetContadores();

    scriptCard.innerHTML = "";

    selectCarregamento.setAttribute('id', 'carregamento')
    
    if(filtroSearch.value == ""){
        if(valueSelectTipo != "vazio" || valueSelectOrdem != "vazio"){
            if(valueSelectTipo == "vazio"){
                chamaPiracicaba();
                setTimeout(function(){
                    dadosUserOrdenar(arrayLista);
                    ordenarDados();
                },2000)
            }else{
                lista = chamaTipo(valueSelectTipo)
                if(valueSelectOrdem == "vazio"){
                    addDados(lista)
                }else{
                    setTimeout(function(){
                        dadosUserOrdenar(arrayLista);
                        ordenarDados();
                    },2000)
                }
            }
        }else if(valueSelectTipo == "vazio" && valueSelectOrdem =="vazio"){
            lista = chamaPiracicaba();
            addDados(lista);
        }
    }else{
        if(valueSelectTipo != "vazio" || valueSelectOrdem != "vazio"){
            if(valueSelectTipo == "vazio"){
                dadosFiltro(parametro)
                setTimeout(function(){
                    dadosUserOrdenar(arrayLista);
                    ordenarDados();
                },2000)
            }else{
                respostaFiltro = filtroTipo(valueSelectTipo, parametro)
                if(valueSelectOrdem == "vazio"){
                    setTimeout(function(){
                        addFiltro();
                    },2000)
                }else{
                    setTimeout(function(){
                        dadosUserOrdenar(arrayLista);
                        ordenarDados();
                    },2000)
                }
            }
        }else if(valueSelectTipo == "vazio" && valueSelectOrdem == "vazio"){
            respostaFiltro = dadosFiltro(parametro);
            addFiltro();
        }
    }
}

