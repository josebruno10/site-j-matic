const fundo1 = document.querySelector("#fundo1");
const fundo2 = document.querySelector("#fundo2");
const fundoProduto = document.querySelector("#fundoProduto");
let categorias = document.querySelector("#categorias") //div em que ficam as categorias
let fChevrolet = document.querySelector(".fChevrolet")
let fFiat = document.querySelector(".fFiat")
let fNissan = document.querySelector(".fNissan")
let fRenaut = document.querySelector(".fRenaut")
let fFord = document.querySelector(".fFord")
let fVolkswagen = document.querySelector(".fVolkswagen")
let fAudi = document.querySelector(".fAudi")
let fHonda = document.querySelector(".fHonda")
let fJeep = document.querySelector(".fJeep")
let fMitsubishi = document.querySelector(".fMitsubishi")
let fCitroen = document.querySelector(".fCitroen")
  

let setaCate = document.querySelector(".setaCate")
  chev = -1,
  fiat = -1,
  niss = -1,
  renau = -1,
  ford = -1,
  volk = -1,
  audi = -1,
  honda = -1,
  jeep = -1,
  mitsu = -1,
  citro = -1



abreCate = 0 // variavel para indicar se as categorias estão abertas ou fechadas (0 = fechada)

categoriasT = -9 // Top da categoria, -9 indica fora da visão do usuario

function voltarInicial() {
  fundo1.style.display = "flex"
  fundo2.style.display = "none"
  fundoProduto.style.display = "none";
  
}
function mostrarProduto() {
  fundo1.style.display = "none";
  fundo2.style.display = "none";
  fundoProduto.style.display = "flex";
  window.scrollTo(0, 0); // Leva o usuário para o topo da página
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
  if (categoriasT < 11.5) {
    categoriasT += 1.05
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
function pecaEscolhida() {
  let nomeFundo2 = document.querySelector("#nomeFundo2")
  const params = new URLSearchParams(window.location.search);
  const peca = parseInt(params.get("peca"), 10);
  switch (peca) {
    case 1:
      nomeFundo2.innerHTML = "Corpo de Válvulas"
      break;
    case 2:

      nomeFundo2.innerHTML = "Conversores de Torque"

      break;
    case 3:

      nomeFundo2.innerHTML = "Transmissões Completas"

      break;
    case 4:

      nomeFundo2.innerHTML = "Módulo de Controle de Transmissão"

      break;
    case 5:

      nomeFundo2.innerHTML = "Carcaças"

      break;
    case 6:

      nomeFundo2.innerHTML = "Outras Peças de Transmissão"

      break;
      
    }
  }
  pecaEscolhida()
  
  function filtrar() {
  somaMarca = chev + fiat + niss + renau + ford + volk + audi + honda + jeep + mitsu + citro;

  if (somaMarca === -11) {
    todosOsProdutos.forEach(produto => {
      produto.style.display = "flex";
    })
  } else {
    produto.forEach(produto => {
      produto.style.display = "none";
    })
    if (chev === 1) {
      fChevrolet.style.display = "flex"
    }else{
      fChevrolet.style.display = "none"
      
    }
    if (fiat === 1) {
      fFiat.style.display = "flex"
    }else{
      fFiat.style.display = "none"
      
    }
    if (niss === 1) {
      fNissan.style.display = "flex"
    }else{
      fNissan.style.display = "none"
      
    }
    if (renau === 1) {
      fRenaut.style.display = "flex"
    }else{
      fRenaut.style.display = "none"
      
    }
    if (ford === 1) {
      fFord.style.display = "flex"
    }else{
      fFord.style.display = "none"
      
    }
    if (volk === 1) {
      fVolkswagen.style.display = "flex"
    }else{
      fVolkswagen.style.display = "none"
      
    }
    if (audi === 1) {
      fAudi.style.display = "flex"
    }else{
      fAudi.style.display = "none"
      
    }
    if (honda === 1) {
      fHonda.style.display = "flex"
    }else{
      fHonda.style.display = "none"
      
    }
    if (jeep === 1) {
      fJeep.style.display = "flex"
    }else{
      fJeep.style.display = "none"
      
    }
    if (mitsu === 1) {
      fMitsubishi.style.display = "flex"
    }else{
      fMitsubishi.style.display = "none"
      
    }
    if (citro === 1) {
      fCitroen.style.display = "flex"
    }else{
      fCitroen.style.display = "none"
      
    }
  }

}
// Pega todos os elementos que têm a classe 'produto'
const todosOsProdutos = document.querySelectorAll('.produto');

// Adiciona a função de clique a cada um deles
todosOsProdutos.forEach(produto => {
  produto.addEventListener('click', () => {
    mostrarProduto();
    // No futuro, você pode passar um ID de produto aqui, por exemplo:
    // mostrarProduto(produto.dataset.id); 
  });
});
function mudarImagem(novaImagemSrc) {
  const imagemPrincipal = document.querySelector("#imagemPrincipalProduto");
  imagemPrincipal.src = novaImagemSrc;
}

// chev = -1
// fiat = -1
// niss = -1
// renau = -1
// ford = -1
// volk = -1a
// audi = -1
// honda = -1
// jeep = -1
// mitsu = -1
// citro = -1
