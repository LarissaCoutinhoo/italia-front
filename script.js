const API_URL = window.API_URL || 'https://italia-back.onrender.com/lugares';

function criarCard(lugar) {
  const artigo = document.createElement('article');
  artigo.className = 'card';

  if (lugar.imagem) {
    const imagem = document.createElement('img');
    imagem.src = lugar.imagem;
    imagem.alt = lugar.nome;
    imagem.className = 'card-image';
    artigo.appendChild(imagem);
  }

  const conteudo = document.createElement('div');
  conteudo.className = 'card-content';

  const titulo = document.createElement('h2');
  titulo.textContent = lugar.nome;

  const descricao = document.createElement('p');
  descricao.textContent = lugar.descricao;

  conteudo.appendChild(titulo);
  conteudo.appendChild(descricao);
  artigo.appendChild(conteudo);

  return artigo;
}

async function carregarLugares() {
  const status = document.getElementById('status');
  const cards = document.getElementById('cards');

  try {
    const resposta = await fetch(API_URL);

    if (!resposta.ok) {
      throw new Error('Falha ao consultar a API.');
    }

    const lugares = await resposta.json();

    cards.innerHTML = '';
    lugares.forEach((lugar) => {
      cards.appendChild(criarCard(lugar));
    });

    status.textContent = 'Conteudo carregado com sucesso.';
  } catch (erro) {
    status.textContent = 'Nao foi possivel carregar os lugares.';
    cards.innerHTML = '<p class="status error">Verifique a URL da API do backend.</p>';
  }
}

carregarLugares();