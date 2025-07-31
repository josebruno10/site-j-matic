let categorias = document.querySelector("#categorias") //div em que ficam as categorias
let setaCate = document.querySelector(".setaCate")

abreCate = 0 // variavel para indicar se as categorias estão abertas ou fechadas (0 = fechada)

categoriasT = -9 // Top da categoria, -9 indica fora da visão do usuario

function voltarInicial() {
    fundo1.style.display = "flex"
    fundo2.style.display = "none"
}
// categorias
function abrirCategorias() {
  if (abreCate === 0) {
    setaCate.style.transform = "rotate(-180deg)"
    abrindoCategorias()
  } else {
    setaCate.style.transform = "rotate(0deg)"
    fechandoCategorias()
  }
}

//funções de animação para as categorias
function abrindoCategorias() {
  if (categoriasT < 11.1) {
    categoriasT += 1.01
    categorias.style.top = categoriasT + "vw"
    requestAnimationFrame(abrindoCategorias)
  } else {
    abreCate = 1 //categorias agora está visivel para o usuario
  }
}
function fechandoCategorias() {
  if (categoriasT > -9) {
    categoriasT += -1
    categorias.style.top = categoriasT + "vw"
    requestAnimationFrame(fechandoCategorias)
  } else {
    abreCate = 0 //categorias agora está visivel para o usuario
  }
}

// função para quando a pessoa escolher qual tipo de peça ela quer nas categorias
function pecaEscolhida(peca) {
  const fundo1 = document.querySelector("#fundo1")
  const fundo2 = document.querySelector("#fundo2")
  let nomeFundo2 = document.querySelector("#nomeFundo2")
  switch (peca) {
    case 1:
      fundo1.style.display = "none"
      fundo2.style.display = "flex"
      abrirCategorias()
      nomeFundo2.innerHTML = "Corpo de Válvulas"
      break;
    case 2:
      fundo1.style.display = "none"
      fundo2.style.display = "flex"
      abrirCategorias()
      nomeFundo2.innerHTML = "Conversores de Torque"

      break;
    case 3:
      fundo1.style.display = "none"
      fundo2.style.display = "flex"
      abrirCategorias()
      nomeFundo2.innerHTML = "Transmissões Completas"

      break;
    case 4:
      fundo1.style.display = "none"
      fundo2.style.display = "flex"
      abrirCategorias()
      nomeFundo2.innerHTML = "Módulo de Controle de Transmissão"

      break;
    case 5:
      fundo1.style.display = "none"
      fundo2.style.display = "flex"
      abrirCategorias()
      nomeFundo2.innerHTML = "Carcaças"

      break;
    case 6:
      fundo1.style.display = "none"
      fundo2.style.display = "flex"
      fechandoCategorias()
      nomeFundo2.innerHTML = "Outras Peças de Transmissão"

      break;

  }
}