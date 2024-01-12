const addProduto = document.querySelector('#adicionar-produto')
const addCodigo = document.querySelector('#add-codigo')
const addDescricao = document.querySelector('#add-descricao')
const addQuantidade = document.querySelector('#add-quantidade')
const editProduto = document.querySelector('#editar-produto')
const editCodigo = document.querySelector('#edit-codigo')
const editDescricao = document.querySelector('#edit-descricao')
const editQuantidade = document.querySelector('#edit-quantidade')
const tabela = document.querySelector('#tabela')
const list = document.querySelector('#lista')

const dados = []

let lista;
let indice;

function listarDados() {

    if(dados.length == 0) {
      tabela.style.display = 'none'
    } else {
      tabela.style.display = 'block'
    }
    let lista = ''

    dados.forEach((produto, index) => {
        lista = lista + `
            <tr>
                <td>${index + 1}</td>
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td><button onclick="editarProduto(${index})">Editar</button></td>
                <td><button onclick="excluirProduto(${index})">Excluir</button></td>
            </tr>
        `
    })

    list.innerHTML = lista
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

    addProduto.style.display = 'none'
    tabela.style.display = 'none'
    editProduto.style.display = 'block'
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

function cancelarEdicao() {
  editCodigo.value = ''
  editDescricao.value = ''
  editQuantidade.value = ''

  editProduto.style.display = 'none'
  addProduto.style.display = 'block'
  tabela.style.display = 'block'
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
