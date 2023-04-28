const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")

// troca de string para arrary: JSON.parse
const itens = JSON.parse(localStorage.getItem('itens')) || []

//para carregar itens inciais
itens.forEach( (elemento) => {
    criaElemento(elemento);
});

//envia dados do formulário
form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade']

    //procurando itens no array
    const existe = itens.find( elemento => elemento.nome === nome.value )

    const itemAtual = {
        'nome': nome.value,
        'quantidade': quantidade.value
    }

    if(existe){
        itemAtual.id = existe.id
        atualizaElemento(itemAtual);

        //atualiza array para atualizar o localstorage
       // itens[existe.id] = itemAtual
       itens[ itens.findIndex( elemento => elemento.id === existe.id ) ] = itemAtual
    } else {
        
        //se for novo iem pega o tamanho do array para próximo item
        //itemAtual.id = itens.length

        //encontrar último elemento do aaray e soma 1
        itemAtual.id = itens[ itens.length -1 ] ? ( itens[ itens.length - 1 ] ).id + 1 : 0


        criaElemento(itemAtual)
        //adiciona o novo item ao array
        itens.push(itemAtual)
    }

    //apenas string no localStorage
    //troca para string: JSON.stringify
    localStorage.setItem('itens', JSON.stringify(itens) )  
    
    nome.value = ""
    quantidade.value = ""
})

function criaElemento(item) {
    
    //cria um novo elemento li
    const novoItem = document.createElement('li')
    
    //e adiciona ele na lista
    novoItem.classList.add("item")

    //novo elmento strong
    const numeroItem = document.createElement('strong')
    numeroItem.dataset.id = item.id
    numeroItem.innerHTML = item.quantidade
    novoItem.appendChild(numeroItem)

    const textoItem = document.createElement('p')
    textoItem.innerHTML += item.nome
    novoItem.appendChild(textoItem)

    //botao de deletar
    novoItem.appendChild( botaoDeleta(item.id) )

    lista.appendChild(novoItem)
}

function deletaElemento(tag, id){
    tag.remove();

    //remove item do array
    itens.splice( itens.findIndex( elemento => elemento.id === id ), 1 )

    //reescreve localstore menos o item deletado
    localStorage.setItem('itens', JSON.stringify(itens) ) 
}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id){
    const elementoBotao = document.createElement('button')
    elementoBotao.innerText = 'x'
    elementoBotao.addEventListener('click', function(){
        //passa o elemento anterior para função de deletar'
        deletaElemento(this.parentNode, id);
    })
    
    return elementoBotao
}