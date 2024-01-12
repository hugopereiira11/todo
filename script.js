const formAdd = document.querySelector('#form-add')
const inputAdd = document.querySelector('#input-add')
const formEdit = document.querySelector('#form-edit')
const inputEdit = document.querySelector('#input-edit')
const list = document.querySelector('#lista-tarefas')

let listaDeTarefas = []

let lista
let indice

function adicionarTarefa(novaTarefa) {
    listaDeTarefas.push({
        tarefa: novaTarefa,
        concluida: false
    })

    mostrarTarefas()

}

function mostrarTarefas() {
    let lista = ''

    listaDeTarefas.forEach((item, index) => {
        lista = lista + `
        <div class="tarefa ${listaDeTarefas[index].concluida ? "concluida" : ""}">
            <span class="material-symbols-outlined" onclick="concluirTarefa(${index})">
            task_alt
            </span>
            <p>${item.tarefa}</p>
            <div class="options">
                <span class="material-symbols-outlined" onclick="editarTarefa(${index})">
                edit
                </span>
                <span class="material-symbols-outlined" onclick="deletarTarefa(${index})">
                    delete
                </span>
            </div>

        </div>
        
        `
    })

    list.innerHTML = lista

    localStorage.setItem('lista', JSON.stringify(listaDeTarefas))
}

function deletarTarefa(posicao) {
    listaDeTarefas.splice(posicao, 1)

    mostrarTarefas()
}

function editarTarefa(posicao) {
    indice = posicao
    inputEdit.value = listaDeTarefas[posicao].tarefa

    formAdd.style.display = 'none'
    formEdit.style.display = 'block'
}

function salvarEdicao(index, tarefaEditada) {
    listaDeTarefas.splice(index, 1, {
        tarefa: tarefaEditada,
        concluida: listaDeTarefas[index].concluida
    })

    formAdd.style.display = 'block'
    formEdit.style.display = 'none'

    mostrarTarefas()
}

function concluirTarefa(posicao) {
    listaDeTarefas[posicao].concluida = !listaDeTarefas[posicao].concluida

    mostrarTarefas()
}

function cancelarEdicao() {
    formEdit.style.display = 'none'
    formAdd.style.display = 'block'
}

function carregarLocal() {
    const listaLocal = localStorage.getItem('lista')

   if (listaLocal) {
    listaDeTarefas = JSON.parse(listaLocal)
  } 

    mostrarTarefas()
}

formAdd.addEventListener('submit', (evento) => {
    evento.preventDefault()
    adicionarTarefa(inputAdd.value)
    inputAdd.value = ''
})

formEdit.addEventListener('submit', (evento) => {
    evento.preventDefault()
    salvarEdicao(indice, inputEdit.value)
    mostrarTarefas()
})

carregarLocal()
