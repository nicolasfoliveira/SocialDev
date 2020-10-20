var filtroSearch = document.querySelector("#filtroSearch");
var scriptCard = document.getElementById('script-card');
var ccVazio = 0

dadosFiltro = (parametro) => {
    return fetch('https://api.github.com/search/users?q='+parametro+'&per_page=100&access_token=f6ec563a2da30a5bd7dc191aa79e578a290a08ef').then( resposta => {
        return resposta.json();
    })
    .then (json => {
        return json;
    });
    
};

filtroSearch.addEventListener("input", function(){
    
    info = this.value

    if(info !== ""){
        var ccRemove = scriptCard.querySelector('.card')
        console.log(ccRemove)
        respostaFiltro = dadosFiltro(info);
        if(ccVazio == "0" && ccRemove != ""){
            document.getElementById("script-card").innerHTML = "";
            
            ccVazio = 1;
        }
        if(ccRemove == ""){
            ccVazio = 0;
        }

        
    }else{
        ccVazio = 0;
        addDados();
        console.log(chamaDados())
    }
    

});