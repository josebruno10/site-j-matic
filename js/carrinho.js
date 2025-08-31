window.addEventListener("DOMContentLoaded", function () {
  // Modal Carrinho
  const btnAbrirCarrinho = document.getElementById("abrir-carrinho-btn");
  const modalCarrinho = document.getElementById("modal-carrinho");
  const btnFecharCarrinho = document.getElementById("fechar-carrinho-btn");
  const carrinhoItensDiv = document.getElementById("carrinho-itens");
  const carrinhoTotalSpan = document.getElementById("carrinho-total");
  const btnFinalizarWhatsapp = document.getElementById("finalizar-whatsapp");
  const btnLimparCarrinho = document.getElementById("limpar-carrinho");
  // Limpar carrinho
  if (btnLimparCarrinho) {
    btnLimparCarrinho.addEventListener("click", () => {
      localStorage.removeItem("carrinho");
      renderizarCarrinho();
      atualizarBadgeCarrinho && atualizarBadgeCarrinho();
    });
  }

  function renderizarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinhoItensDiv.innerHTML = "";
    let total = 0;
    if (carrinho.length === 0) {
      carrinhoItensDiv.innerHTML =
        '<p style="text-align:center;color:#888;">Seu carrinho está vazio.</p>';
      carrinhoTotalSpan.textContent = "";
      btnFinalizarWhatsapp.style.display = "none";
      return;
    }
    btnFinalizarWhatsapp.style.display = "block";
    carrinho.forEach((item, idx) => {
      total += item.preco * (item.quantidade || 1);
      const div = document.createElement("div");
      div.className = "carrinho-item";
      div.innerHTML = `
        <img src="${item.imagem}" class="carrinho-item-img" alt="${item.nome}">
        <div class="carrinho-item-info">
          <div class="carrinho-item-nome">${item.nome}</div>
          <div class="carrinho-item-preco">R$ ${item.preco.toFixed(2)}</div>
          <div class="carrinho-item-qtd">
            <button class="carrinho-item-qtd-btn" data-idx="${idx}" data-action="menos">-</button>
            <span>${item.quantidade || 1}</span>
            <button class="carrinho-item-qtd-btn" data-idx="${idx}" data-action="mais">+</button>
          </div>
        </div>
        <button class="carrinho-item-remove" data-idx="${idx}" title="Remover">&times;</button>
      `;
      carrinhoItensDiv.appendChild(div);
    });
    carrinhoTotalSpan.textContent = `Total: R$ ${total.toFixed(2)}`;
  }

  btnAbrirCarrinho.addEventListener("click", () => {
    modalCarrinho.style.display = "flex";
    renderizarCarrinho();
  });
  btnFecharCarrinho.addEventListener("click", () => {
    modalCarrinho.style.display = "none";
  });
  window.addEventListener("click", (e) => {
    if (e.target === modalCarrinho) modalCarrinho.style.display = "none";
  });

  // Alterar quantidade/remover
  carrinhoItensDiv.addEventListener("click", (e) => {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    if (e.target.classList.contains("carrinho-item-qtd-btn")) {
      const idx = +e.target.getAttribute("data-idx");
      const action = e.target.getAttribute("data-action");
      if (action === "mais")
        carrinho[idx].quantidade = (carrinho[idx].quantidade || 1) + 1;
      if (action === "menos" && carrinho[idx].quantidade > 1)
        carrinho[idx].quantidade--;
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      renderizarCarrinho();
      atualizarBadgeCarrinho();
    }
    if (e.target.classList.contains("carrinho-item-remove")) {
      const idx = +e.target.getAttribute("data-idx");
      carrinho.splice(idx, 1);
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      renderizarCarrinho();
      atualizarBadgeCarrinho();
    }
  });

  // Finalizar compra no WhatsApp
  btnFinalizarWhatsapp.addEventListener("click", () => {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    if (carrinho.length === 0) return;
    let mensagem = "Olá! Gostaria de comprar os seguintes produtos:%0A";
    carrinho.forEach((item) => {
      mensagem += `- ${item.nome} (Qtd: ${item.quantidade || 1})%0A`;
    });
    const total = carrinho
      .reduce((s, p) => s + p.preco * (p.quantidade || 1), 0)
      .toFixed(2);
    mensagem += `%0ATotal: R$ ${total}`;
    window.open(`https://wa.me/SEUNUMERO?text=${mensagem}`, "_blank");
  });
});
