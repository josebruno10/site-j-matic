let categorias = document.querySelector("#categorias") //div em que ficam as categorias
let setaCate = document.querySelector(".setaCate")

lado = 0; // Índice atual do carrossel: 0 = imagem do meio (posição inicial)

abreCate = 0 // variavel para indicar se as categorias estão abertas ou fechadas (0 = fechada)

// Seleciona os elementos das imagens no HTML
let imagem1 = document.querySelector(".imagem1");
let imagem2 = document.querySelector(".imagem2");
let imagem3 = document.querySelector(".imagem3");

// Posições iniciais das imagens (em vw)
imagem1L = -100; // imagem1 começa fora da tela à esquerda
imagem2L = 0; // imagem2 começa no centro (visível)
imagem3L = 100; // imagem3 começa fora da tela à direita

categoriasT = -9 // Top da categoria, -9 indica fora da visão do usuario

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

// Função para ir para a esquerda no carrossel
function irPE() {
  clearInterval(intervaloPassar); // Para a rotação automática quando o usuário clica

  // Se imagem central for imagem2 e imagem3 estiver à direita
  if (lado === 0) {
    if (imagem2L === 0 && imagem3L === 100) {
      animacao1E(); // executa animação da imagem2 para imagem1
    }
    return;
  }

  // Se imagem central for imagem1 e imagem2 estiver à direita
  if (lado === 1) {
    if (imagem1L === 0 && imagem2L === 100) {
      animacao2E(); // executa animação da imagem1 para imagem3
    }
    return;
  }

  // Se imagem central for imagem3 e imagem1 estiver à direita
  if (lado === 2) {
    if (imagem3L === 0 && imagem1L === 100) {
      animacao3E(); // executa animação da imagem3 para imagem2
    }
    return;
  }
}

// Animação da imagem2 para imagem1 (indo para esquerda)
function animacao1E() {
  imagem3L = -100; // joga a imagem3 para fora da esquerda
  if (imagem2L < 100) {
    // move imagem2 e imagem1 5vw para a direita
    imagem2L += 5;
    imagem1L += 5;
    imagem1.style.left = imagem1L + "vw";
    imagem2.style.left = imagem2L + "vw";
    requestAnimationFrame(animacao1E); // continua a animação
  } else {
    lado = 1; // agora imagem1 está no centro
    passarCarrossel(); // reinicia o temporizador automático
  }
}

// Animação da imagem1 para imagem3 (indo para esquerda)
function animacao2E() {
  imagem2L = -100; // move imagem2 para fora à esquerda
  if (imagem1L < 100) {
    imagem1L += 5;
    imagem3L += 5;
    imagem3.style.left = imagem3L + "vw";
    imagem1.style.left = imagem1L + "vw";
    requestAnimationFrame(animacao2E);
  } else {
    lado = 2; // agora imagem3 está no centro
    passarCarrossel();
  }
}

// Animação da imagem3 para imagem2 (indo para esquerda)
function animacao3E() {
  imagem1L = -100; // joga imagem1 para a esquerda
  if (imagem3L < 100) {
    imagem3L += 5;
    imagem2L += 5;
    imagem2.style.left = imagem2L + "vw";
    imagem3.style.left = imagem3L + "vw";
    requestAnimationFrame(animacao3E);
  } else {
    lado = 0; // agora imagem2 está no centro
    passarCarrossel();
  }
}

// Função para ir para a direita no carrossel
function irPD() {
  clearInterval(intervaloPassar); // para rotação automática ao clicar

  if (lado === 0) {
    if (imagem2L === 0 && imagem3L === 100) {
      animacao1D(); // anima imagem2 indo para imagem3
    }
    return;
  }

  if (lado === 1) {
    if (imagem1L === 0 && imagem2L === 100) {
      animacao2D(); // anima imagem1 indo para imagem2
    }
    return;
  }

  if (lado === 2) {
    if (imagem3L === 0 && imagem1L === 100) {
      animacao3D(); // anima imagem3 indo para imagem1
    }
    return;
  }
}

// Animação da imagem2 para imagem3 (indo para direita)
function animacao1D() {
  imagem1L = 100; // imagem1 vai pro final da direita
  if (imagem2L > -100) {
    imagem2L += -5;
    imagem3L += -5;
    imagem3.style.left = imagem3L + "vw";
    imagem2.style.left = imagem2L + "vw";
    requestAnimationFrame(animacao1D);
  } else {
    lado = 2; // agora imagem3 está no centro
    passarCarrossel();
  }
}

// Animação da imagem1 para imagem2 (indo para direita)
function animacao2D() {
  imagem3L = 100;
  if (imagem1L > -100) {
    imagem1L += -5;
    imagem2L += -5;
    imagem2.style.left = imagem2L + "vw";
    imagem1.style.left = imagem1L + "vw";
    requestAnimationFrame(animacao2D);
  } else {
    passarCarrossel();
    lado = 0; // agora imagem2 está no centro
  }
}

// Animação da imagem3 para imagem1 (indo para direita)
function animacao3D() {
  imagem2L = 100;
  if (imagem3L > -100) {
    imagem3L += -5;
    imagem1L += -5;
    imagem1.style.left = imagem1L + "vw";
    imagem3.style.left = imagem3L + "vw";
    requestAnimationFrame(animacao3D);
  } else {
    lado = 1; // agora imagem1 está no centro
    passarCarrossel();
  }
}

// Função que cria o temporizador para mudar automaticamente as imagens
function passarCarrossel() {
  intervaloPassar = setInterval(() => {
    irPD(); // chama a função de ir para direita a cada 5 segundos
    passarCarrossel; // (essa linha está sobrando, mas não afeta)
  }, 5000);
}

// Inicia o carrossel automático ao carregar a página
passarCarrossel();

