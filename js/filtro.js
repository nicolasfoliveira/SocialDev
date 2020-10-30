
var exibeTam = 0
var conteudoTipo
addFiltro = () =>{
    respostaFiltro.then(exibe=>{
        
        exibeTam = exibe.length
        if(exibe.length <= 19){
            tam = exibe.length - 1;
        }

        if(exibeTam == 0){
            card = document.createElement('span');
            const conteudo_html = `
            <div class="semresultado">
                <h2>Não existe resultado para sua busca<h2>
            </div>`

            card.innerHTML = conteudo_html;  
            scriptCard.appendChild(card)
        }else{
            tamanhoDados = exibe.length;
            tamanhoDadosmenos = exibe.length - 1;

            for(indice=cc;indice<=tam;indice++){
        
                buscaUser(exibe[indice].login).then(total=>{
                
                    card = document.createElement('span');
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

            subtracao = tamanhoDadosmenos - tam;
            if(subtracao<20 && subtracao>0){
                cc = tam + 1;
                tam = subtracao + tam
            }else{
                cc = tam + 1;
                tam = tam + 20;
            }
        }
        if(tam>tamanhoDados && ccLoading==0 || exibeTam == 0){
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
  
    resetContadores();

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