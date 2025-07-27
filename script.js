lado = 0 // inicio do codigo do carrossel, a imagem inicial começa com 0
let imagem1 = document.querySelector('.imagem1')
let imagem2 = document.querySelector('.imagem2')
let imagem3 = document.querySelector('.imagem3')
const img1 = document.querySelector('.img1')
const img2 = document.querySelector('.img2')
const img3 = document.querySelector('.img3')

imagem1L = -100
imagem2L = 0
imagem3L = 100

function irPE() {
    clearInterval(intervaloPassar)
    if (lado === 0) {
        // animacao do quadrado central
        if (imagem2L === 0 && imagem3L === 100) {
            animacao1E()
            
        }
        
        return
    }
    
    if (lado === 1) {
        // animacao do quadrado central
        if (imagem1L === 0 && imagem2L === 100) {

            animacao2E()
            
        }
        
        return
    }
    if (lado === 2) {
        // animacao do quadrado central
        if (imagem3L === 0 && imagem1L === 100) {
            
            animacao3E()
        }
        
        return
    }
    
}

function animacao1E() {
    imagem3L = -100
    if (imagem2L < 100)  {
        imagem2L += 5
        imagem1L += 5
        imagem1.style.left = imagem1L + 'vw'
        imagem2.style.left = imagem2L + 'vw'
        requestAnimationFrame(animacao1E)
    }else{
        lado = 1// o img1 está no centro, o img2 está no canto direito, o img3 está no começo
        passarCarrossel()
    }
    
    
    
}
function animacao2E() {
    imagem2L = -100
    if (imagem1L < 100)  {
        imagem1L += 5
        imagem3L += 5
        imagem3.style.left = imagem3L + 'vw'
        imagem1.style.left = imagem1L + 'vw'
        requestAnimationFrame(animacao2E)
    }else{
        lado = 2 // o img1 está no final, o img2 está no começo, o img3 está no centro
        passarCarrossel()
    }
    
    
    
}
function animacao3E() {  
    imagem1L = -100
    if (imagem3L < 100)  {
        imagem3L += 5
        imagem2L += 5
        imagem2.style.left = imagem2L + 'vw'
        imagem3.style.left = imagem3L + 'vw'
        requestAnimationFrame(animacao3E) 
    }else{
        lado = 0 // o img1 está no inicio, o img2 está no centro, o img3 está no canto direito
        passarCarrossel()
    }
    
    

}
function irPD() {
    clearInterval(intervaloPassar)
    if (lado === 0) {
        // animacao do quadrado central
        if (imagem2L === 0 && imagem3L === 100) {
            animacao1D()
            
        }
        
        return
    }
    
    if (lado === 1) {
        // animacao do quadrado central
        if (imagem1L === 0 && imagem2L === 100) {
            
            animacao2D()
            
        }
        
        return
    }
    if (lado === 2) {
        // animacao do quadrado central
        if (imagem3L === 0 && imagem1L === 100) {
            
            animacao3D()
        }
        
        return
    }
    
}

function animacao1D() {
    imagem1L = 100
    if (imagem2L > -100)  {
        imagem2L += -5
        imagem3L += -5
        imagem3.style.left = imagem3L + 'vw'
        imagem2.style.left = imagem2L + 'vw'
        requestAnimationFrame(animacao1D)
    }else{
        lado = 2// o img1 está no canto direito, o img2 está no começo, o img3 está no centro
        passarCarrossel()
    }
    
    
}
function animacao2D() {
    imagem3L = 100
    if (imagem1L > -100)  {
        imagem1L += -5
        imagem2L += -5
        imagem2.style.left = imagem2L + 'vw'
        imagem1.style.left = imagem1L + 'vw'
        requestAnimationFrame(animacao2D)
    }else{
        passarCarrossel()
        lado = 0 // o img1 está no inicio, o img2 está no centro, o img3 está no canto direito
    }
    
    
}
function animacao3D() {
    imagem2L = 100
    if (imagem3L > -100)  {
        imagem3L += -5
        imagem1L += -5
        imagem1.style.left = imagem1L + 'vw'
        imagem3.style.left = imagem3L + 'vw'
        requestAnimationFrame(animacao3D) 
    }else{
        lado = 1 // o img1 está no centro, o img2 está no canto direito, o img3 está no começo
        passarCarrossel()
    }
    
    
}
function passarCarrossel() {
    intervaloPassar = setInterval(() => {
        irPD()
        passarCarrossel
    }, 5000);
    
}
passarCarrossel()
