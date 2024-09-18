
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


let filmesFavoritos = []


const btn1 = document.querySelector('button')
const listaFilmes = document.querySelector('#listaFilmes')


window.onload = () => {
  if(localStorage.getItem('favoritos')) {
    filmesFavoritos = JSON.parse(localStorage.getItem('favoritos'));
  }
  renderizarLista();
}

const verificarFavorito = (idFilme) => {
  for (let i = 0; i < filmesFavoritos.length; i++) {
    if (filmesFavoritos[i].id === idFilme) {
      return true;
    }
  }
  return false;
}


const renderizarLista = () => {
  listaFilmes.innerHTML = ""
  filmes.forEach((filme) => {
    const itemLista = document.createElement('li')
    listaFilmes.append(itemLista)


    const nomeFilme = document.createElement('span')
    nomeFilme.textContent = filme.nome
    itemLista.append(nomeFilme)

  
    const favorito = document.createElement('img')
    
   
    if (verificarFavorito(filme.id)) {
      favorito.src = 'img/heart-fill.svg'
    } else {
      favorito.src = 'img/heart.svg' 
    }

    favorito.style.cursor = 'pointer'
    favorito.addEventListener('click', (e) => {
      favoritoClicado(e, filme)
    })

 
    const actions = document.createElement('div')
    actions.className = 'actions'
    actions.append(favorito)

    
    const btnRemover = document.createElement('button')
    btnRemover.textContent = 'Remover'
    btnRemover.addEventListener('click', () => {
      removerFilme(filme.id)
    })
    actions.append(btnRemover)

    itemLista.append(actions)
  })
}


btn1.addEventListener('click', () => {
  const inputUsuario = document.querySelector('#filmeInput')
  let id = filmes.length
  filmes.push({id: id, nome: inputUsuario.value, genero: '', lancamento: ''})


  localStorage.setItem('filmes', JSON.stringify(filmes))

  renderizarLista()
  inputUsuario.value = ''
})


const favoritoClicado = (eventoDeClique, objetoFilme) => {
  const favoriteState = {
    favorited: 'img/heart-fill.svg',
    notFavorited: 'img/heart.svg'
  }


  const src = eventoDeClique.target.src.split('/').pop();


  if(localStorage.getItem('favoritos')) {
    filmesFavoritos = JSON.parse(localStorage.getItem('favoritos'))
  }

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


  localStorage.setItem('favoritos', JSON.stringify(filmesFavoritos))
}


const removerFilme = (id) => {
  filmes = filmes.filter(filme => filme.id !== id)


  localStorage.setItem('filmes', JSON.stringify(filmes))

 
  renderizarLista()
}
