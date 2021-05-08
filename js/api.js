let tokenJson = {"token":"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"}
var access = JSON.parse(tokenJson)
var accessToken = access.token

var urlUser = "https://api.github.com/users/"
var urlSearch = "https://api.github.com/search/users?q="

var salvadadosUserPiracicaba = []
//###################### main.js ###########################
// Faz uma busca por usuarios em geral localizados em piracicabas

chamaPiracicaba = async () => {

    let resp = await(await fetch(urlSearch+'location:araras&per_page=100&cliente_id='+accessToken))
    .json()

    let salvaArray = await Promise.all(resp.items.map(async indice => {

        let result = await buscaUser(indice.login)
        salvadadosUserPiracicaba.push(result)

        return result
        
    }))
    return salvaArray;
};

//Faz uma busca por cada usuario especifico, pelo nome de login
buscaUser = async (user) => {
    let resp = await(await fetch(urlUser+user+'?access_token='+accessToken))
    .json()
  
    return resp
}

/*Faz uma busca por usuarios em geral localizados em piracicaba, com um tipo de conta
    especifico sendo uma conta de usuario ou uma organização*/
chamaTipoPiracicaba = async (tipo) => {
    let resp = await (await fetch(urlSearch+'location:araras+type:'+tipo+'&per_page=100&access_token='+accessToken))
    .json()

    let salvaArray = await Promise.all(resp.items.map(async indice => {

        let result = await buscaUser(indice.login)
        salvadadosUserPiracicaba.push(result)

        return result
        
    }))
    return salvaArray;
};

/*Faz uma busca por cada usuario especifico, pelo nome de login com um tipo de conta especifica
    sendo uma conta de usuario ou uma organização*/
filtroTipo = async (tipo, parametro) => {
    let resp = await(await fetch(urlSearch+parametro+'+type:'+tipo+'&per_page=100&access_token='+accessToken))
    .json()

    let salvaArray = await Promise.all(resp.items.map(async indice => {

        let result = await buscaUser(indice.login)
        salvadadosUserPiracicaba.push(result)

        return result
        
    }))
    return salvaArray;
};

//############## FIM main.js ######################### 
var arraytotal =[];
//####################### filtro.js ####################################
dadosFiltro = async (parametro) => {

    let resp = await (await fetch(urlSearch+parametro+'&per_page=100&access_token='+accessToken))
    .json()
 
    let salvaArray = await Promise.all(resp.items.map(async indice => {

        let result = await buscaUser(indice.login)
        salvadadosUserPiracicaba.push(result)

        return result
        
    }))
    return salvaArray;
};
//############################## FIM filtro.js ######################################
