const fundo1 = document.querySelector("#fundo1");
const fundo2 = document.querySelector("#fundo2");
const fundoProduto = document.querySelector("#fundoProduto");
let categorias = document.querySelector("#categorias")
let setaCate = document.querySelector(".setaCate")
  
let chev = -1, fiat = -1, niss = -1, renau = -1, ford = -1, volk = -1,
    audi = -1, honda = -1, jeep = -1, mitsu = -1, citro = -1;

let abreCate = 0;
let categoriasT = -9;

function voltarInicial() {
  if (fundo1) {
    fundo1.style.display = "flex";
    if (fundo2) fundo2.style.display = "none";
    if (fundoProduto) fundoProduto.style.display = "none";
  } else {
    window.location.href = 'home.html';
  }
}

function mostrarProduto() {
  window.location.href = 'comprar.html';
}

function abrirCategorias() {
  if (abreCate === 0) {
    setaCate.style.transform = "rotate(-180deg)";
    abrindoCategorias();
  } else {
    setaCate.style.transform = "rotate(0deg)";
    fechandoCategorias();
  }
}

function abrindoCategorias() {
  categorias.style.display = "flex";
  if (categoriasT < 11.5) {
    categoriasT += 1.05;
    categorias.style.top = categoriasT + "vw";
    requestAnimationFrame(abrindoCategorias);
  } else {
    abreCate = 1;
  }
}
function fechandoCategorias() {
  if (categoriasT > -9) {
    categoriasT -= 1;
    categorias.style.top = categoriasT + "vw";
    requestAnimationFrame(fechandoCategorias);
  } else {
    abreCate = 0;
    categorias.style.display = "none";
  }
}

function pecaEscolhida() {
  let nomeFundo2 = document.querySelector("#nomeFundo2");
  if (!nomeFundo2) return;
  
  const params = new URLSearchParams(window.location.search);
  const peca = parseInt(params.get("peca"), 10);
  const nomes = ["", "Corpo de Válvulas", "Conversores de Torque", "Transmissões Completas", "Módulo de Controle de Transmissão", "Carcaças", "Outras Peças de Transmissão"];
  if (nomes[peca]) {
      nomeFundo2.innerHTML = nomes[peca];
  }
}
if(document.getElementById('fundo2')){
    pecaEscolhida();
}
  
function filtrar() {
  const produtos = document.querySelectorAll('#fundo2 .produto');
  const filtros = {fChevrolet: chev, fFiat: fiat, fNissan: niss, fRenaut: renau, fFord: ford, fVolkswagen: volk, fAudi: audi, fHonda: honda, fJeep: jeep, fMitsubishi: mitsu, fCitroen: citro};
  
  const algumFiltroAtivo = Object.values(filtros).some(v => v === 1);

  if (!algumFiltroAtivo) {
    produtos.forEach(p => p.style.display = "flex");
    return;
  }

  produtos.forEach(produto => {
    produto.style.display = "none"; // Esconde todos
    for (const classeFiltro in filtros) {
        if (produto.classList.contains(classeFiltro) && filtros[classeFiltro] === 1) {
            produto.style.display = "flex"; // Mostra se corresponder
            break;
        }
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
    const todosOsProdutosClicaveis = document.querySelectorAll('.produto, .produtoInic');
    todosOsProdutosClicaveis.forEach(produto => {
        produto.addEventListener('click', () => {
            mostrarProduto(); 
        });
    });

    const btnConta = document.getElementById('btn-conta');
    const contaDropdown = document.getElementById('conta-dropdown');
    const btnCarrinho = document.getElementById('btn-carrinho');
    const carrinhoDropdown = document.getElementById('carrinho-dropdown');

    if (btnConta && contaDropdown) {
        const closeConta = contaDropdown.querySelector('.close-btn');
        btnConta.addEventListener('click', function(event) {
            event.stopPropagation();
            if (carrinhoDropdown) carrinhoDropdown.classList.remove('aberto');
            contaDropdown.classList.toggle('aberto');
        });
        if(closeConta) {
            closeConta.addEventListener('click', function() {
                contaDropdown.classList.remove('aberto');
            });
        }
    }

    if (btnCarrinho && carrinhoDropdown) {
        const closeCarrinho = carrinhoDropdown.querySelector('.close-btn');
        btnCarrinho.addEventListener('click', function(event) {
            event.stopPropagation();
            if (contaDropdown) contaDropdown.classList.remove('aberto');
            carrinhoDropdown.classList.toggle('aberto');
        });
        if (closeCarrinho) {
            closeCarrinho.addEventListener('click', function() {
                carrinhoDropdown.classList.remove('aberto');
            });
        }
    }

    window.addEventListener('click', function(event) {
        if (contaDropdown && !contaDropdown.contains(event.target) && !event.target.closest('.conta-container')) {
            contaDropdown.classList.remove('aberto');
        }
        if (carrinhoDropdown && !carrinhoDropdown.contains(event.target) && !event.target.closest('.carrinho-container')) {
            carrinhoDropdown.classList.remove('aberto');
        }
    });
});