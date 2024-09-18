// Criando a base de dados de filmes (inicial)
let filmes = localStorage.getItem('filmes') ? JSON.parse(localStorage.getItem('filmes')) : [
  {
    id: 0,
    nome: 'Harry Potter',
    genero: 'fantasia',
    lancamento: 2001
  },
  {
    id: 1,
    nome: 'Avatar',
    genero: 'fantasia',
    lancamento: 2010
  },
  {
    id: 2,
    nome: 'O senhor dos Anéis',
    genero: 'fantasia',
    lancamento: 2000,
  },
  {
    id: 3,
    nome: 'Branquelas',
    genero: 'comédia',
    lancamento: 2007
  },
  {
    id: 4,
    nome: 'A Lagoa Azul',
    genero: 'romance',
    lancamento: 1983
  }
];

// Criando um array de filmes favoritos
let filmesFavoritos = []

// Pegando Elementos HTML
const btn1 = document.querySelector('button')
const listaFilmes = document.querySelector('#listaFilmes')

// Ao carregar a página, executa a função que renderiza os elementos na tela
window.onload = () => {
  // Carregar favoritos salvos do localStorage
  if(localStorage.getItem('favoritos')) {
    filmesFavoritos = JSON.parse(localStorage.getItem('favoritos'));
  }
  renderizarLista();
}

// Função para verificar se um filme está nos favoritos (sem .some)
const verificarFavorito = (idFilme) => {
  for (let i = 0; i < filmesFavoritos.length; i++) {
    if (filmesFavoritos[i].id === idFilme) {
      return true;
    }
  }
  return false;
}

// Função para renderizar filmes na tela
const renderizarLista = () => {
  listaFilmes.innerHTML = ""
  filmes.forEach((filme) => {
    const itemLista = document.createElement('li')
    listaFilmes.append(itemLista)

    // Adiciona o nome do filme
    const nomeFilme = document.createElement('span')
    nomeFilme.textContent = filme.nome
    itemLista.append(nomeFilme)

    // Cria uma nova imagem (ícone de favorito)
    const favorito = document.createElement('img')
    
    // Verifica se o filme está nos favoritos para ajustar o ícone (sem .some)
    if (verificarFavorito(filme.id)) {
      favorito.src = 'img/heart-fill.svg' // Se estiver favoritado, usa o coração cheio
    } else {
      favorito.src = 'img/heart.svg' // Se não estiver, usa o coração vazio
    }

    favorito.style.cursor = 'pointer'
    favorito.addEventListener('click', (e) => {
      favoritoClicado(e, filme)
    })

    // Adiciona a área de ações ao final do item da lista
    const actions = document.createElement('div')
    actions.className = 'actions'
    actions.append(favorito)

    // Cria o botão de remover filme
    const btnRemover = document.createElement('button')
    btnRemover.textContent = 'Remover'
    btnRemover.addEventListener('click', () => {
      removerFilme(filme.id)
    })
    actions.append(btnRemover)

    itemLista.append(actions)
  })
}

// Adiciona o evento de clique ao botão de adicionar
btn1.addEventListener('click', () => {
  const inputUsuario = document.querySelector('#filmeInput')
  let id = filmes.length
  filmes.push({id: id, nome: inputUsuario.value, genero: '', lancamento: ''})

  // Salva o array atualizado de filmes no localStorage
  localStorage.setItem('filmes', JSON.stringify(filmes))

  renderizarLista()
  inputUsuario.value = ''
})

// Função que é executada quando o ícone de favorito é clicado (sem .some)
const favoritoClicado = (eventoDeClique, objetoFilme) => {
  const favoriteState = {
    favorited: 'img/heart-fill.svg',
    notFavorited: 'img/heart.svg'
  }

  // Verificar apenas a parte final do src (o nome da imagem)
  const src = eventoDeClique.target.src.split('/').pop();

  // Carregar o array de favoritos do localStorage
  if(localStorage.getItem('favoritos')) {
    filmesFavoritos = JSON.parse(localStorage.getItem('favoritos'))
  }

  // Verificar se o filme já está favoritado (sem .some)
  let filmeJaFavoritado = false;
  for (let i = 0; i < filmesFavoritos.length; i++) {
    if (filmesFavoritos[i].id === objetoFilme.id) {
      filmeJaFavoritado = true;
      break;
    }
  }

  if(src === 'heart.svg') {
    eventoDeClique.target.src = favoriteState.favorited
    if (!filmeJaFavoritado) {
      filmesFavoritos.push(objetoFilme)
    }
  } else {
    eventoDeClique.target.src = favoriteState.notFavorited
    filmesFavoritos = filmesFavoritos.filter(movie => movie.id !== objetoFilme.id)
  }

  // Atualiza o localStorage com a nova lista de favoritos
  localStorage.setItem('favoritos', JSON.stringify(filmesFavoritos))
}

// Função para remover um filme da lista
const removerFilme = (id) => {
  filmes = filmes.filter(filme => filme.id !== id)

  // Atualiza o localStorage com a nova lista de filmes
  localStorage.setItem('filmes', JSON.stringify(filmes))

  // Renderiza novamente a lista após a remoção
  renderizarLista()
}
