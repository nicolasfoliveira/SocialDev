var listaPiracicaba
var listaTipoOrgPiracicaba
var listaTipoUserPiracicaba

//Iniciando o site no index.html quando abre ou faz uma busca
//verefica se existi informação no id na url
if(parametro != undefined){
    if(parametro == ""){
        document.querySelector("[name='filtro']").value = parametro; 
        window.onload = function(){
            listaPiracicaba = chamaPiracicaba();
            listaTipoOrgPiracicaba = chamaTipoPiracicaba("Organization")
            listaTipoUserPiracicaba = chamaTipoPiracicaba("User")
            addDados(listaPiracicaba);
        }
    }else{
        document.querySelector("[name='filtro']").value = parametro; 
        filtro(parametro);
    }
//Quando abri o site ele vai inicia por aqui
}else{
    window.onload = function(){
        listaPiracicaba = chamaPiracicaba(); 
        listaTipoOrgPiracicaba = chamaTipoPiracicaba("Organization")
        listaTipoUserPiracicaba = chamaTipoPiracicaba("User")
        addDados(listaPiracicaba);
    }
}