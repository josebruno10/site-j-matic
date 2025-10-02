function adicionarAoCarrinho(produto) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  // Se já existe, só aumenta a quantidade
  const idx = carrinho.findIndex((p) => p.id === produto.id);
  if (idx !== -1) {
    carrinho[idx].quantidade = (carrinho[idx].quantidade || 1) + 1;
  } else {
    produto.quantidade = 1;
    carrinho.push(produto);
  }
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarBadgeCarrinho();
}

// Badge do carrinho
function atualizarBadgeCarrinho() {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  let total = carrinho.reduce((soma, p) => soma + (p.quantidade || 1), 0);
  let badge = document.getElementById("badge-carrinho");
  if (!badge) return;
  badge.textContent = total > 0 ? total : "";
}

// Evento para todos os botões de carrinho
document.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("btn-carrinho") ||
    e.target.closest(".btn-carrinho")
  ) {
    const btn = e.target.closest(".btn-carrinho");
    const produto = JSON.parse(btn.getAttribute("data-produto"));
    adicionarAoCarrinho(produto);
    btn.textContent = "Adicionado!";
    setTimeout(() => {
      btn.innerHTML =
        '<i class="fa fa-shopping-cart"></i> Adicionar ao Carrinho';
    }, 1200);
  }
});

// Atualiza badge ao carregar
window.addEventListener("DOMContentLoaded", atualizarBadgeCarrinho);
// Script para carregar produtos do JSON e exibir na home, separados por categoria
const NUMERO_WHATSAPP = "SEUNUMERO";

fetch("produtos.json").then((response) => response.json());

// Ordem e agrupamento conforme lista do usuário
const ordemExibicao = [
  // Corpo de Válvulas
  "Tf72sc (Fiat Toro, Renegade 1.8)",
  "Corpo De válvulas jf011e (Sentra, Fluence)",
  "Corpo de Válvulas AL4 Renault",
  "Corpo de válvulas JF015e kicks",
  "Corpo de válvulas TF72sc com start, stop (Renegade, Fiat Toro, 1.8)",
  "Corpo de válvulas 09g moderno Com start, stop (Jetta 1.4, Audi 1.4)",
  "Corpo de válvulas transmissão automática RE4F04A (motores 1.8)",
  "Corpo de válvulas transmissão automática 6F35 (Ford Fusion)",
  "Fusion 2.3 (FNR5)",

  // Módulo de Controle de Transmissão
  "TCM aw5040 (Vectra, Astra, Zafira)",
  "TCM GM 6t30 (Primeira Geração)",
  "TCM 6L50 GM (S10, Trailblazer flex e diesel)",
  "TCM transmissão V5A51 (Triton 3.0)",
  "TCM esitronic ks",
  "TCM AL4 (Citroen 2.0)",
  "TCM 09G Jetta, Golf, 2.0",
  "TCM Dual logic transmissão Fiat 500",
  "TCM TF72SC Jeep Compass 2.0",
  "TCM transmissão automática RE4F04A Grand livina 1.8",

  // Conversores de Torque
  "Conversor de Torque 6T31 (Spin, Cobalt)",
  "Conversor de Torque JF011e 2.0",
  "JF015e kicks 1.6",
  "Conversor de Torque 6L50 2.8 200cv",
  "Conversor de torq GM 6L50 200vc",

  // Transmissões Completas
  "Transmissão JF015e kicks",
  "Transmissão automática CVT HRV 1.8",
  "Transmissão automática zf9hp48 Fiat Toro diesel 4x4",
  "Transmissão automática CVT HRV 1.8 (06 meses de garantia)",

  // Carcaças
  "Carcaça Transmissão automatizada Imotion",
  "Carcaça 6t31 completa",
  "Carcaça 6t31 completa (traseira)",

  // Outras Peças
  "Tambor 3/5/ré 6t30",
  "09G moderno (Jetta 1.4, Audi 1.4 tsi/tfsi)",
];

fetch("produtos.json")
  .then((response) => response.json())
  .then((produtos) => {
    // Padronizar nomes para facilitar ordenação
    const padronizar = (nome) => nome.replace(/\s+/g, " ").trim().toLowerCase();
    const ordemPadrao = ordemExibicao.map(padronizar);
    produtos.sort((a, b) => {
      const idxA = ordemPadrao.indexOf(padronizar(a.nome));
      const idxB = ordemPadrao.indexOf(padronizar(b.nome));
      if (idxA === -1 && idxB === -1) return a.nome.localeCompare(b.nome);
      if (idxA === -1) return 1;
      if (idxB === -1) return -1;
      return idxA - idxB;
    });
    window._produtosOriginais = produtos;
    window._ordemCategorias = [
      "Corpo de Válvulas",
      "Módulo de Controle de Transmissão",
      "Conversores de Torque",
      "Transmissões Completas",
      "Carcaças",
      "Outras Peças de Transmissão",
    ];
    aplicarBuscaFiltros();
    // Eventos de busca/filtros
    document
      .getElementById("input-busca")
      .addEventListener("input", aplicarBuscaFiltros);
    document
      .getElementById("filtro-categoria")
      .addEventListener("change", aplicarBuscaFiltros);
    document
      .getElementById("filtro-preco")
      .addEventListener("input", aplicarBuscaFiltros);
    document
      .getElementById("filtro-modelo")
      .addEventListener("input", aplicarBuscaFiltros);
    document
      .getElementById("filtro-tipo")
      .addEventListener("input", aplicarBuscaFiltros);
    document
      .getElementById("filtro-motor")
      .addEventListener("input", aplicarBuscaFiltros);
    document
      .getElementById("filtro-garantia")
      .addEventListener("change", aplicarBuscaFiltros);
  });

function aplicarBuscaFiltros() {
  const produtos = window._produtosOriginais || [];
  const ordemCategorias = window._ordemCategorias || [];
  const busca = (
    document.getElementById("input-busca")?.value || ""
  ).toLowerCase();
  const categoria = document.getElementById("filtro-categoria")?.value || "";
  const precoMax = parseFloat(document.getElementById("filtro-preco")?.value);
  const modelo = (
    document.getElementById("filtro-modelo")?.value || ""
  ).toLowerCase();
  const tipo = (
    document.getElementById("filtro-tipo")?.value || ""
  ).toLowerCase();
  const motor = (
    document.getElementById("filtro-motor")?.value || ""
  ).toLowerCase();
  const garantia = document.getElementById("filtro-garantia")?.value || "";
  // Filtro principal
  let filtrados = produtos.filter((prod) => {
    let ok = true;
    if (busca) {
      const texto = (
        prod.nome +
        " " +
        prod.categoria +
        " " +
        (prod.descricao || "")
      ).toLowerCase();
      ok = ok && texto.includes(busca);
    }
    if (categoria) ok = ok && prod.categoria === categoria;
    if (!isNaN(precoMax)) ok = ok && prod.preco <= precoMax;
    if (modelo) ok = ok && (prod.modelo || "").toLowerCase().includes(modelo);
    if (tipo) ok = ok && (prod.tipo || "").toLowerCase().includes(tipo);
    if (motor) ok = ok && (prod.motor || "").toLowerCase().includes(motor);
    if (garantia) ok = ok && (prod.garantia || "") === garantia;
    return ok;
  });
  // Agrupar por categoria
  const categorias = {};
  ordemCategorias.forEach((cat) => (categorias[cat] = []));
  filtrados.forEach((produto) => {
    if (!categorias[produto.categoria]) categorias[produto.categoria] = [];
    categorias[produto.categoria].push(produto);
  });
  renderizarCategorias(categorias, ordemCategorias);
}

function renderizarCategorias(categorias, ordemCategorias) {
  const container = document.getElementById("produtosPorCategoria");
  container.innerHTML = "";
  ordemCategorias.forEach((categoria) => {
    if (!categorias[categoria] || categorias[categoria].length === 0) return;
    const secao = document.createElement("section");
    secao.className = "secao-categoria";
    secao.innerHTML = `<h2 class=\"titulo-categoria\">${categoria}</h2><div class=\"produtos-categoria\"></div>`;
    const lista = secao.querySelector(".produtos-categoria");
    categorias[categoria].forEach((produto) => {
      const card = document.createElement("div");
      card.className = "card-produto";
      card.innerHTML = `
          <img src=\"${produto.imagem}\" alt=\"${
        produto.nome
      }\" class=\"img-produto\"/>
          <span class=\"nome-produto\">${produto.nome}</span>
          <span class=\"preco-produto\">R$ ${produto.preco.toFixed(2)}</span>
          <span class=\"desc-produto\">${produto.descricao || ""}</span>
          <div class=\"botoes-produto\">
            <a class=\"btn-whatsapp\" href=\"https://wa.me/${NUMERO_WHATSAPP}?text=Quero%20comprar%20o%20produto%20${encodeURIComponent(
        produto.nome
      )}\" target=\"_blank\">
              <i class=\"fa fa-whatsapp\"></i> Comprar no WhatsApp
            </a>
            <button class=\"btn-carrinho\" data-produto='${JSON.stringify(
              produto
            )}'>
              <i class=\"fa fa-shopping-cart\"></i> Adicionar ao Carrinho
            </button>
          </div>
        `;
      // Ao clicar no card, abrir modal de detalhe
      card.addEventListener("click", function (e) {
        // Evita conflito com botões internos
        if (
          e.target.closest(".btn-carrinho") ||
          e.target.closest(".btn-whatsapp")
        )
          return;
        abrirModalProduto(produto);
      });
      lista.appendChild(card);
    });
    // Modal de detalhe do produto
    function abrirModalProduto(produto) {
      const modalBg = document.querySelector(".modal-produto-bg");
      const modal = document.querySelector(".modal-produto");
      document.getElementById("modal-produto-title").textContent = produto.nome;
      document.getElementById("modal-produto-img").src = produto.imagem;
      document.getElementById("modal-produto-img").alt = produto.nome;
      document.getElementById("modal-produto-preco").textContent =
        "R$ " + produto.preco.toFixed(2);
      document.getElementById("modal-produto-desc").textContent =
        produto.descricao || "";
      // Ficha técnica (exemplo: categoria)
      document.getElementById(
        "modal-produto-ficha"
      ).innerHTML = `<b>Categoria:</b> ${produto.categoria}`;
      // Thumbnails (se houver mais imagens futuramente)
      const thumbsDiv = document.getElementById("modal-produto-thumbs");
      thumbsDiv.innerHTML = "";
      const thumb = document.createElement("img");
      thumb.src = produto.imagem;
      thumb.className = "selected";
      thumbsDiv.appendChild(thumb);
      // Botão WhatsApp
      const btnWpp = document.getElementById("modal-produto-whatsapp");
      btnWpp.onclick = () => {
        window.open(
          `https://wa.me/${NUMERO_WHATSAPP}?text=Quero%20comprar%20o%20produto%20${encodeURIComponent(
            produto.nome
          )}`,
          "_blank"
        );
      };
      // Botão Carrinho
      const btnCarrinho = document.getElementById("modal-produto-carrinho");
      btnCarrinho.onclick = () => {
        adicionarAoCarrinho(produto);
        btnCarrinho.textContent = "Adicionado!";
        setTimeout(() => {
          btnCarrinho.innerHTML =
            '<i class="fa fa-shopping-cart"></i> Adicionar ao Carrinho';
        }, 1200);
      };
      // Abrir modal
      modalBg.classList.add('aberto')
      modal.classList.add('aberto')
    }
    // Fechar modal produto (garantir sempre que o DOM já existe)
    function fecharModalProduto() {
      const modalBg = document.querySelector(".modal-produto-bg");
      const modal = document.querySelector(".modal-produto");
      if (modalBg) {
        modal.classList.remove('aberto')
        setTimeout(() => {
          modalBg.classList.remove('aberto')
        }, 600);
      };
      
    }

    // Sempre garantir que o evento está ativo após o DOM carregar
    setTimeout(() => {
      const btnFechar = document.getElementById("fechar-produto-btn");
      const modalBg = document.querySelector(".modal-produto-bg");
      if (btnFechar) btnFechar.onclick = fecharModalProduto;
      if (modalBg) {
        modalBg.addEventListener("click", function (e) {
          if (e.target === modalBg) fecharModalProduto();
        });
      }
    }, 500);
    container.appendChild(secao);
  });
}
