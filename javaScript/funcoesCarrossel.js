let lado = 0; // Índice atual do carrossel: 0 = imagem do meio (posição inicial)

let imagem1 = document.querySelector(".imagem1");
let imagem2 = document.querySelector(".imagem2");
let imagem3 = document.querySelector(".imagem3");
const dots = document.querySelectorAll(".dot");

let imagem1L = -100;
let imagem2L = 0;
let imagem3L = 100;
let intervaloPassar;

function irPE() {
  clearInterval(intervaloPassar);
  if (lado === 0) { animacao1E(); return; }
  if (lado === 1) { animacao2E(); return; }
  if (lado === 2) { animacao3E(); return; }
}

function animacao1E() {
  imagem3L = -100;
  if (imagem2L < 100) {
    imagem2L += 5; imagem1L += 5;
    imagem1.style.left = imagem1L + "vw";
    imagem2.style.left = imagem2L + "vw";
    requestAnimationFrame(animacao1E);
  } else {
    lado = 1;  passarCarrossel();
  }
}

function animacao2E() {
  imagem2L = -100;
  if (imagem1L < 100) {
    imagem1L += 5; imagem3L += 5;
    imagem3.style.left = imagem3L + "vw";
    imagem1.style.left = imagem1L + "vw";
    requestAnimationFrame(animacao2E);
  } else {
    lado = 2;  passarCarrossel();
  }
}

function animacao3E() {
  imagem1L = -100;
  if (imagem3L < 100) {
    imagem3L += 5; imagem2L += 5;
    imagem2.style.left = imagem2L + "vw";
    imagem3.style.left = imagem3L + "vw";
    requestAnimationFrame(animacao3E);
  } else {
    lado = 0; passarCarrossel();
  }
}

function irPD() {
  clearInterval(intervaloPassar);
  if (lado === 0) { animacao1D(); return; }
  if (lado === 1) { animacao2D(); return; }
  if (lado === 2) { animacao3D(); return; }
}

function animacao1D() {
  imagem1L = 100;
  if (imagem2L > -100) {
    imagem2L -= 5; imagem3L -= 5;
    imagem3.style.left = imagem3L + "vw";
    imagem2.style.left = imagem2L + "vw";
    requestAnimationFrame(animacao1D);
  } else {
    lado = 2; passarCarrossel();
  }
}

function animacao2D() {
  imagem3L = 100;
  if (imagem1L > -100) {
    imagem1L -= 5; imagem2L -= 5;
    imagem2.style.left = imagem2L + "vw";
    imagem1.style.left = imagem1L + "vw";
    requestAnimationFrame(animacao2D);
  } else {
    lado = 0; passarCarrossel();
  }
}

function animacao3D() {
  imagem2L = 100;
  if (imagem3L > -100) {
    imagem3L -= 5; imagem1L -= 5;
    imagem1.style.left = imagem1L + "vw";
    imagem3.style.left = imagem3L + "vw";
    requestAnimationFrame(animacao3D);
  } else {
    lado = 1; passarCarrossel();
  }
}

function passarCarrossel() {
  clearInterval(intervaloPassar);
  intervaloPassar = setInterval(irPD, 5000);
}

passarCarrossel();