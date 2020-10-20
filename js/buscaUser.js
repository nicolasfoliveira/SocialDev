var url = window.location.search;
var parametro = url.split("=")[1];

chamaUser = () => {
    return fetch('https://api.github.com/users/'+parametro+'?access_token=f6ec563a2da30a5bd7dc191aa79e578a290a08ef').then( resposta => {
        return resposta.json();
    })
    .then (json => {
        return json;
    });
    
};


function addUser() {
    lista.then(exibe=>{

        card = document.createElement('span');
        var maisHTML;
        const conteudo_html = `
        <div class="containerUser">
            <div class="cardUser">
                <div class="UserAvatar">
                    <img src="${exibe.avatar_url}" alt="Foto do ${exibe.avatar_url}">
                </div>
                <div class="UserDados">
                    <p class="UserName">${exibe.name}</p>
                    <p>${exibe.bio}</p>
                    <p class="UserCompany">${exibe.company}</p>
                    <p><img src="src/like.png">
                    ${exibe.location}</p>
                    <p><img src="src/like.png">
                    ${exibe.email}</p>
                    <p><img src="src/like.png">
                    ${exibe.followers} seguidores
                    <img src="src/repositorio.png" >
                    ${exibe.public_repos} repos</p>
                </div>
            </div>
        </div>`;
        
        card.innerHTML = conteudo_html;  
        document.getElementById('scriptUser').appendChild(card)
    });
}

var lista = chamaUser();
addUser();