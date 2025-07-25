let index = 0;
const imagens = document.querySelectorAll(".carrossel .imagem");

function atualizarCarrossel() {
  imagens.forEach((img, i) => {
    const offset = (i - index) * 100;
    img.style.left = `${offset}vw`;
  });
}

function moverCarrossel(direcao) {
  if (direcao === "dir") {
    index = (index + 1) % imagens.length;
  } else {
    index = (index - 1 + imagens.length) % imagens.length;
  }
  atualizarCarrossel();
}

// Posição inicial
atualizarCarrossel();
