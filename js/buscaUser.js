var url = window.location.search;
var parametro = url.split("=")[1];

chamaUser = () => {
    return fetch('https://api.github.com/users/'+parametro+'?access_token=c1de38369453883da10a42053cdba48e20fdc511').then( resposta => {
        return resposta.json();
    })
    .then (json => {
        return json;
    });
    
};

addUser = () => {
    lista.then(exibe=>{

        card = document.createElement('span');
    
        const conteudo_html = `
        <div class="containerUser">
            <div class="cardUser">
                <div class="UserAvatar">
                    <img src="${exibe.avatar_url}" alt="Foto do ${exibe.avatar_url}">
                </div>
                <div class="UserDados">
                    <p class="UserName">${exibe.name}</p>`
                    if(exibe.bio != null){
                        conteudoBio = `<p>${exibe.bio}</p>`
                    }else{
                        conteudoBio = ""
                    }
                    if(exibe.company != null){
                        conteudoCompany = `<p class="UserCompany">${exibe.company}</p>`
                    }else{
                        conteudoCompany = ""
                    }
                    if(exibe.location != null){
                        conteudoLocation = `<p><img src="src/location.png">${exibe.location}</p>`
                    }else{
                        conteudoLocation = ""
                    }
                    if(exibe.email != null){
                        conteudoEmail = `<p><img src="src/email.png">${exibe.email}</p>`
                    }else{
                        conteudoEmail = ""
                    }
                    conteudoGeral = `
                    <p><img src="src/seguidores.png">
                    ${exibe.followers} seguidores
                    <img src="src/github.png">
                    ${exibe.public_repos} repos</p>
                </div>
            </div>
        </div>`;
        
        card.innerHTML = conteudo_html+conteudoBio+conteudoCompany+conteudoLocation+conteudoEmail+conteudoGeral;
        document.getElementById('scriptUser').appendChild(card)

        selectCarregamento = document.querySelector(".carregamentoId")
        selectCarregamento.setAttribute('id', 'zero')
    });
}

lista = chamaUser();
addUser();