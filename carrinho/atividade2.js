// Função para adicionar um produto ao carrinho
function adicionarProduto(id, nome, valor, quantidade) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let produtoExistente = false;

    for (let i = 0; i < carrinho.length; i++) {
        if (carrinho[i].id === id) {
            carrinho[i].quantidade += quantidade;
            produtoExistente = true;
            break;
        }
    }

    if (!produtoExistente) {
        carrinho.push({ id, nome, valor, quantidade });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
}

// Função para remover um produto do carrinho
function removerProduto(id) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));
    carrinho = carrinho.filter(produto => produto.id !== id);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
}

// Função para exibir os produtos do carrinho
function exibirCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));
    const listaProdutos = document.getElementById('lista-produtos');
    listaProdutos.innerHTML = '';

    if (carrinho && carrinho.length > 0) {
        carrinho.forEach(produto => {
            const li = document.createElement('li');
            const total = produto.valor * produto.quantidade;
            li.textContent = `${produto.nome} - Quantidade: ${produto.quantidade} - Valor: R$ ${total.toFixed(2)}`;

            // Cria um botão de remover
            const btnRemover = document.createElement('button');
            btnRemover.textContent = 'Remover';
            btnRemover.onclick = () => removerProduto(produto.id);
            li.appendChild(btnRemover);

            listaProdutos.appendChild(li);
        });
    } else {
        listaProdutos.innerHTML = 'O carrinho está vazio!';
    }
}

// Inicialização da aplicação: verificar se há produtos no carrinho e exibi-los
exibirCarrinho();

// Função para adicionar produtos manualmente
function adicionarProdutoManual() {
    // Exemplo de produtos a serem adicionados
    const produtosParaAdicionar = [
        { id: 1, nome: 'Camiseta', valor: 29.99, quantidade: 2 },
        { id: 2, nome: 'Calça Jeans', valor: 99.90, quantidade: 1 },
        { id: 3, nome: 'Tênis', valor: 149.90, quantidade: 1 }
    ];

    produtosParaAdicionar.forEach(produto => {
        adicionarProduto(produto.id, produto.nome, produto.valor, produto.quantidade);
    });
}

// Chame a função para adicionar produtos manualmente
adicionarProdutoManual();
