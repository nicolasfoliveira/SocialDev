const tokenJson = {token:"5c0921e15488bbb86bed2ccedf4b45b4684bc502"}
var accessToken = tokenJson.token

var urlUser = "https://api.github.com/users/"
var urlSearch = "https://api.github.com/search/users?q="

//###################### main.js ###########################
// Faz uma busca por usuarios em geral localizados em piracicabas
var arrayLista = [];
chamaPiracicaba = () => {
    return fetch(urlSearch+'location:piracicaba&per_page=100&access_token='+accessToken)    
    .then( resposta => {
        return resposta.json();
    })
    .then (json => {
        arrayLista = json.items;
        return json.items;
    })
};

//Faz uma busca por cada usuario especifico, pelo nome de login
buscaUser = (user) => {
    return fetch(urlUser+user+'?access_token='+accessToken)
    .then( resposta => {
        return resposta.json();
    })
    .then (json => {
        return json;
    });
}

/*Faz uma busca por usuarios em geral localizados em piracicaba, com um tipo de conta
    especifico sendo uma conta de usuario ou uma organização*/
chamaTipo = async (tipo) => {
    return fetch(urlSearch+'location:piracicaba+type:'+tipo+'&per_page=100&access_token='+accessToken)
    .then( resposta => {
        return resposta.json();
    })
    .then (json => {
        arrayLista = json.items;
        return json.items;
    })
};

/*Faz uma busca por cada usuario especifico, pelo nome de login com um tipo de conta especifica
    sendo uma conta de usuario ou uma organização*/
filtroTipo = (tipo, parametro) => {
    return fetch(urlSearch+parametro+'+type:'+tipo+'&per_page=100&access_token='+accessToken)
    .then( resposta => {
        return resposta.json();
    })
    .then (json => {
        arrayLista = json.items;
        return json.items;
    }); 
};

//############## FIM main.js ######################### 
var arraytotal =[];
//####################### filtro.js ####################################
dadosFiltro = (parametro) => {
    return fetch(urlSearch+parametro+'&per_page=100&access_token='+accessToken)
    .then( resposta => {
        return resposta.json();
    })
    .then (json => {
        arrayLista = json.items;
        return json.items;
    }); 
};
//############################## FIM filtro.js ######################################