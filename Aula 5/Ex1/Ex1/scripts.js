"use strict"; 

function selecionarImagem(imagem){

    switch (imagem){
        case 1:
            document.getElementById("imagemGrande").src="img1.jpg";
            break;
        case 2:
            document.getElementById("imagemGrande").src="img2.jpg";
            break;
        case 3:
            document.getElementById("imagemGrande").src="img3.jpg";
            break;
        case 4:
            document.getElementById("imagemGrande").src="img4.jpg";
            break;
        default:
            alert("default");
    }
    
}

function printMousePos(event) {
      alert("X: " + event.clientX + " Y: " + event.clientY);
}
function printKey(event){
    var x = event.which || event.keyCode;
    alert(x);
    console.log(x);
}

document.getElementById('imagem1').addEventListener("mouseover", function() {
    selecionarImagem(1);
});
document.getElementById('imagem2').addEventListener("mouseover", function() {
    selecionarImagem(2);
});
document.getElementById('imagem3').addEventListener("mouseover", function() {
    selecionarImagem(3);
});
document.getElementById('imagem4').addEventListener("mouseover", function() {
    selecionarImagem(4);
});

//document.addEventListener("click", printMousePos);
//document.addEventListener("keypress", printKey);