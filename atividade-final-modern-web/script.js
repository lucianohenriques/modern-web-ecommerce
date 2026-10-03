const API_URL = "https://dummyjson.com/products?limit=30";

const listaProdutos = document.querySelector("#lista-produtos");
const statusApi = document.querySelector("#status-api");
const campoPesquisa = document.querySelector("#pesquisa");
const filtroCategoria = document.querySelector("#categoria");
const botaoTema = document.querySelector("#botao-tema");
const botaoCarrinho = document.querySelector("#botao-carrinho");
const painelCarrinho = document.querySelector("#painel-carrinho");
const fecharCarrinho = document.querySelector("#fechar-carrinho");
const itensCarrinho = document.querySelector("#itens-carrinho");
const contadorCarrinho = document.querySelector("#contador-carrinho");
const totalCarrinho = document.querySelector("#total-carrinho");
const limparCarrinho = document.querySelector("#limpar-carrinho");
const dataHora = document.querySelector("#data-hora");
const anoAtual = document.querySelector("#ano-atual");

let produtos = [];
let carrinho = carregarCarrinho();

/* Busca os produtos da API e inicia a vitrine. */
async function buscarProdutos() {
  atualizarStatusApi("Carregando produtos...");
  try {
    const resposta = await fetch(API_URL);
    if (!resposta.ok) throw new Error(`Erro HTTP: ${resposta.status}`);

    const dados = await resposta.json();
    produtos = dados.products;

    if (!Array.isArray(produtos)) {
      throw new Error("Formato de resposta inesperado da API.");
    }

    preencherCategorias(produtos);
    exibirProdutos(produtos);
    atualizarStatusApi(`${produtos.length} produtos carregados pela API.`);
  } catch (erro) {
    console.error("Não foi possível carregar os produtos:", erro);
    listaProdutos.innerHTML = `
      <p class="mensagem">
        Não foi possível carregar os produtos. Verifique sua conexão e tente novamente.
      </p>`;
    atualizarStatusApi("Falha ao carregar os produtos.");
  }
}

/* Cria os cards com os dados recebidos da API. */
function exibirProdutos(lista) {
  if (lista.length === 0) {
    listaProdutos.innerHTML = '<p class="mensagem">Nenhum produto encontrado.</p>';
    return;
  }
  listaProdutos.innerHTML = lista.map(criarCardProduto).join("");
}

function criarCardProduto(produto) {
  const nome = escaparHtml(produto.title);
  const descricao = escaparHtml(produto.description);
  const categoria = escaparHtml(produto.category);
  const imagem = escaparHtml(produto.thumbnail);

  return `
    <article class="produto">
      <figure>
        <img class="produto-imagem" src="${imagem}"
          alt="Imagem do produto ${nome}" loading="lazy">
        <figcaption class="produto-conteudo">
          <p class="produto-categoria">${categoria}</p>
          <h3>${nome}</h3>
          <p class="produto-descricao">${descricao}</p>
          <p class="produto-preco">${formatarMoeda(produto.price)}</p>
          <button class="botao-comprar" type="button"
            data-produto-id="${produto.id}"
            aria-label="Adicionar ${nome} ao carrinho">
            Adicionar ao carrinho
          </button>
        </figcaption>
      </figure>
    </article>`;
}

/* Impede que textos recebidos da API sejam interpretados como HTML. */
function escaparHtml(valor) {
  const elemento = document.createElement("div");
  elemento.textContent = String(valor);
  return elemento.innerHTML;
}

function preencherCategorias(lista) {
  const categorias = [...new Set(lista.map((produto) => produto.category))].sort();
  filtroCategoria.innerHTML = `
    <option value="todas">Todas</option>
    ${categorias.map((categoria) =>
      `<option value="${escaparHtml(categoria)}">${escaparHtml(categoria)}</option>`
    ).join("")}`;
}

function filtrarProdutos() {
  const termo = campoPesquisa.value.trim().toLowerCase();
  const categoriaSelecionada = filtroCategoria.value;

  const produtosFiltrados = produtos.filter((produto) => {
    const correspondePesquisa =
      produto.title.toLowerCase().includes(termo) ||
      produto.category.toLowerCase().includes(termo);
    const correspondeCategoria =
      categoriaSelecionada === "todas" || produto.category === categoriaSelecionada;
    return correspondePesquisa && correspondeCategoria;
  });

  exibirProdutos(produtosFiltrados);
}

function adicionarAoCarrinho(idProduto) {
  const produto = produtos.find((item) => item.id === idProduto);
  if (!produto) return;

  const itemExistente = carrinho.find((item) => item.id === idProduto);
  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    carrinho.push({ id: produto.id, title: produto.title, price: produto.price, quantidade: 1 });
  }

  salvarCarrinho();
  atualizarCarrinho();
  abrirCarrinho();
}

function atualizarCarrinho() {
  const quantidadeTotal = carrinho.reduce((total, item) => total + item.quantidade, 0);
  const valorTotal = carrinho.reduce((total, item) => total + item.price * item.quantidade, 0);

  contadorCarrinho.textContent = quantidadeTotal;
  totalCarrinho.textContent = formatarMoeda(valorTotal);

  if (carrinho.length === 0) {
    itensCarrinho.innerHTML = "<p>Seu carrinho está vazio.</p>";
    return;
  }

  itensCarrinho.innerHTML = carrinho.map((item) => `
    <div class="item-carrinho">
      <p><strong>${escaparHtml(item.title)}</strong></p>
      <p>Quantidade: ${item.quantidade}</p>
      <p>Subtotal: ${formatarMoeda(item.price * item.quantidade)}</p>
    </div>`).join("");
}

function salvarCarrinho() {
  localStorage.setItem("techstore-carrinho", JSON.stringify(carrinho));
}

function carregarCarrinho() {
  try {
    return JSON.parse(localStorage.getItem("techstore-carrinho")) || [];
  } catch {
    return [];
  }
}

function limparItensCarrinho() {
  carrinho = [];
  salvarCarrinho();
  atualizarCarrinho();
}

function abrirCarrinho() {
  painelCarrinho.hidden = false;
  botaoCarrinho.setAttribute("aria-expanded", "true");
}

function fecharPainelCarrinho() {
  painelCarrinho.hidden = true;
  botaoCarrinho.setAttribute("aria-expanded", "false");
}

function alternarCarrinho() {
  painelCarrinho.hidden ? abrirCarrinho() : fecharPainelCarrinho();
}

function alternarTema() {
  const modoEscuroAtivo = document.body.classList.toggle("modo-escuro");
  localStorage.setItem("techstore-tema", modoEscuroAtivo ? "escuro" : "claro");
  atualizarBotaoTema(modoEscuroAtivo);
}

function aplicarTemaSalvo() {
  const modoEscuroAtivo = localStorage.getItem("techstore-tema") === "escuro";
  document.body.classList.toggle("modo-escuro", modoEscuroAtivo);
  atualizarBotaoTema(modoEscuroAtivo);
}

function atualizarBotaoTema(modoEscuroAtivo) {
  botaoTema.textContent = modoEscuroAtivo ? "☀️ Modo claro" : "🌙 Modo escuro";
  botaoTema.setAttribute("aria-label",
    modoEscuroAtivo ? "Ativar modo claro" : "Ativar modo escuro");
}

function atualizarDataHora() {
  dataHora.textContent = new Date().toLocaleString("pt-BR", {
    dateStyle: "full", timeStyle: "medium"
  });
}

function atualizarStatusApi(mensagem) {
  statusApi.textContent = mensagem;
}

function formatarMoeda(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency", currency: "BRL"
  });
}

/* Eventos da interface. */
listaProdutos.addEventListener("click", (evento) => {
  const botaoComprar = evento.target.closest("[data-produto-id]");
  if (botaoComprar) adicionarAoCarrinho(Number(botaoComprar.dataset.produtoId));
});
campoPesquisa.addEventListener("input", filtrarProdutos);
filtroCategoria.addEventListener("change", filtrarProdutos);
botaoTema.addEventListener("click", alternarTema);
botaoCarrinho.addEventListener("click", alternarCarrinho);
fecharCarrinho.addEventListener("click", fecharPainelCarrinho);
limparCarrinho.addEventListener("click", limparItensCarrinho);

/* Inicialização. */
aplicarTemaSalvo();
atualizarCarrinho();
atualizarDataHora();
anoAtual.textContent = new Date().getFullYear();
setInterval(atualizarDataHora, 1000);
buscarProdutos();

/*
Reflexão sobre Clean Code:

Neste projeto, apliquei princípios de Clean Code utilizando nomes claros e
significativos para variáveis e funções, separando responsabilidades em
funções menores e mantendo HTML, CSS e JavaScript em arquivos distintos.

Também procurei evitar repetições, manter a indentação consistente e utilizar
comentários curtos apenas para facilitar a compreensão das principais partes
do código. O consumo da API foi isolado em uma função específica e possui
tratamento de erro para deixar o comportamento da aplicação mais previsível.

Como melhoria futura, caso o projeto aumente de tamanho, o JavaScript poderá
ser dividido em módulos separados para produtos, carrinho, tema e utilidades.
Também seria possível criar testes automatizados e melhorar ainda mais o
tratamento dos estados da interface.
*/
