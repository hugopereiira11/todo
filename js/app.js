const addProduto = document.querySelector('#adicionar-produto')
const addCodigo = document.querySelector('#add-codigo')
const addDescricao = document.querySelector('#add-descricao')
const addQuantidade = document.querySelector('#add-quantidade')
const editProduto = document.querySelector('#editar-produto')
const editCodigo = document.querySelector('#edit-codigo')
const editDescricao = document.querySelector('#edit-descricao')
const editQuantidade = document.querySelector('#edit-quantidade')
const tabela = document.querySelector('#lista')

const dados = []

let lista;
let indice;

function listarDados() {
    let lista = ''

    dados.forEach((produto, index) => {
        lista = lista + `
            <tr>
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td><button onclick="editarProduto(${index})">Editar</button></td>
                <td><button onclick="excluirProduto(${index})">Excluir</button></td>
            </tr>
        `
    })

    tabela.innerHTML = lista
}


function adicionarProduto(codigo, descricao, quantidade) {
    dados.push({
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade
    })

    addCodigo.value = ''
    addDescricao.value = ''
    addQuantidade.value = ''
    addCodigo.focus()

    listarDados()
}

function excluirProduto(index) {
    dados.splice(index, 1)
    listarDados()
    console.log(dados)
}

function editarProduto(index) {
    indice = index
    editCodigo.value = dados[index].codigo
    editDescricao.value = dados[index].descricao
    editQuantidade.value = dados[index].quantidade
    console.log(indice)
}

function salvarEdicao(index, codigo, descricao, quantidade) {
    dados.splice(index, 1, {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade
    })

    editCodigo.value = ""
    editDescricao.value = ""
    editQuantidade.value = ""

    listarDados()
}

addProduto.addEventListener('submit', (event) => {
    event.preventDefault()
    adicionarProduto(addCodigo.value, addDescricao.value, addQuantidade.value)
})

editProduto.addEventListener('submit', (event) => {
    event.preventDefault()
    salvarEdicao(indice, editCodigo.value, editDescricao.value, editQuantidade.value)

    
})


listarDados()