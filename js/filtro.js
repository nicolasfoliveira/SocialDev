function redirectIndex(){
    window.location.href = "index.html?search="+filtroSearch.value;
}

document.addEventListener("keydown", function(event){
    if(event.keyCode == 13) redirectIndex();  
});

function filtro(info){
  
    resetContadores();

    var selectCarregamento = document.querySelector(".carregamentoId")
    selectCarregamento.setAttribute('id', 'carregamento')

    scriptCard.innerHTML = "";
   
    resultadofiltro = dadosFiltro(info);
    respostaFiltroOrg = filtroTipo("Organization",info)
    respostaFiltroUser = filtroTipo("User",info)
    addDados(resultadofiltro);
};