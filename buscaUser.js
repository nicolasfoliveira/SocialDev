var url = window.location.search;
var parametro = url.split("=")[1];

chamaDados = () => {
    return fetch('https://api.github.com/users/'+parametro+'?q=location:araras&per_page=100&client_secret=38eb7d374a0afeb53113a22b5847dd03258de034').then( resposta => {
        return resposta.json();
    })
    .then (json => {
        return json;
    });
    
};


function addDados() {
    lista.then(exibe=>{
        card = document.createElement('span');
            var test;
            const conteudo_html = `
            <div class="container-card">
            <div class="card">
            <img src="${exibe.avatar_url}" alt="Foto do ${exibe.avatar_url}">
            <h3>${exibe.login}</h3>
            <br>
            <img style="width: 20px;  top: 3px; position: relative;" src="src/like.png">
            <span>${exibe.followers}</span>
            <span><img style="width: 20px; top: 3px; position: relative;" src="src/repositorio.png" ></span>
            <span>${exibe.public_repos}</span>`
            if(exibe.type == 'User'){
                test =`<span><img style="width: 15px;  top: 1px; position: relative; margin-right: 7px; margin-left: 7px;" src="src/pessoal.png" ></span>`
            }else{
                test = `<span><img style="width: 15px;  top:1px; position: relative; margin-right: 7px; margin-left: 7px;" src="src/corp.png" ></span>`
            }
            `
            </div>
            </div>
            `;
           
            card.innerHTML = conteudo_html + test;  
            document.getElementById('scriptUser').appendChild(card)
    });
}

lista = chamaDados();
addDados()


console.log(chamaDados());