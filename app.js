function lerTarefas() {

    let strDados = localStorage.getItem('db');
    let objDados = {};
    if (strDados) {
        objDados = JSON.parse(strDados);
    }
    else { 
        objDados = { tarefas: [
                        {nome: "Lavar louça" },
                        {nome: "Arrumar cama" },
                        {nome: "Fazer almoço" }
                    ]};
    }
    return objDados;
}
function mostrarTarefas() {
    let espaço = document.getElementById('tarefas');
    let objDados = lerTarefas();
    let strHTML = '';
    for(let i = 0; i < objDados.tarefas.length; i++){
        strHTML += `<p>${objDados.tarefas[i].nome}</p> <button id="btnRemover" data-index="${i}">Remover</button> <button id="btnMarcar">Marcar</button>`
    }
    espaço.innerHTML = strHTML;
    let btnRemover = document.querySelectorAll("#btnRemover");
    btnRemover.forEach(function(botao){
        botao.addEventListener('click', function(){
            let id = this.getAttribute('data-index');
            removerTarefa(id);
        });
    });
    let btnMarcar = document.querySelectorAll("#btnMarcar");
    btnMarcar.forEach(function(botao){
        botao.addEventListener('click', function(){
            let id = this.getAttribute('data-index');
            marcaTarefa(id);
        });
    });
}
function adicionarTarefas() {
    let objDados = lerTarefas();
    let strNome = document.getElementById('campoTarefa').value;
    let novaTarefa = {
        nome : strNome
    };
    objDados.tarefas.push(novaTarefa);
    salvaDados(objDados);
    mostrarTarefas();   
}
function salvaDados(dados){
    localStorage.setItem('db', JSON.stringify(dados));
}
function removerTarefa(id){
    let objDados = lerTarefas();
    let objDadosFiltrados;
    objDados.tarefas = objDados.tarefas.filter(function(tarefa, index){
        return index != id;
    });
    salvaDados(objDados);
    mostrarTarefas();
}
function marcaTarefa(id){
    let espaço = document.getElementById('tarefas');
    let objDados = lerTarefas();
    let strHTML = '';
    for(let i = 0; i < objDados.tarefas.length; i++){
        if(i != id) strHTML += `<p>${objDados.tarefas[i].nome}</p> <button id="btnRemover" data-index="${i}">Remover</button> <button id="btnMarcar">Marcar</button>`
        else strHTML +=  `<p class="marcado">${objDados.tarefas[i].nome}</p> <button id="btnRemover" data-index="${i}">Remover</button> <button id="btnMarcar">Marcar</button>`
    }
    espaço.innerHTML = strHTML;
}

mostrarTarefas();

document.getElementById('btnAdicionar').addEventListener('click', adicionarTarefas);