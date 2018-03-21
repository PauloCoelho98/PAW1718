function randomAll(){

    for(let i=1; i<=16; i++){
        var rndCol = 'rgb(' + Math.floor(1 + Math.random() * 255) + ',' + Math.floor(1 + Math.random() * 255) + ',' + Math.floor(1 + Math.random() * 255) + ')';
        document.getElementById(i).style.backgroundColor=rndCol;
    }

}

function selecionarCor(quadrado){

    var rndCol = 'rgb(' + Math.floor(1 + Math.random() * 255) + ',' + Math.floor(1 + Math.random() * 255) + ',' + Math.floor(1 + Math.random() * 255) + ')';

        document.getElementById(quadrado).style.backgroundColor=rndCol;
    
}

document.getElementById('1').addEventListener("click", function() {
    selecionarCor(1);
});
document.getElementById('2').addEventListener("click", function() {
    selecionarCor(2);
});
document.getElementById('3').addEventListener("click", function() {
    selecionarCor(3);
});
document.getElementById('4').addEventListener("click", function() {
    selecionarCor(4);
});
document.getElementById('5').addEventListener("click", function() {
    selecionarCor(5);
});
document.getElementById('6').addEventListener("click", function() {
    selecionarCor(6);
});
document.getElementById('7').addEventListener("click", function() {
    selecionarCor(7);
});
document.getElementById('8').addEventListener("click", function() {
    selecionarCor(8);
});
document.getElementById('9').addEventListener("click", function() {
    selecionarCor(9);
});
document.getElementById('10').addEventListener("click", function() {
    selecionarCor(10);
});
document.getElementById('11').addEventListener("click", function() {
    selecionarCor(11);
});
document.getElementById('12').addEventListener("click", function() {
    selecionarCor(12);
});
document.getElementById('13').addEventListener("click", function() {
    selecionarCor(13);
});
document.getElementById('14').addEventListener("click", function() {
    selecionarCor(14);
});
document.getElementById('15').addEventListener("click", function() {
    selecionarCor(15);
});
document.getElementById('16').addEventListener("click", function() {
    selecionarCor(16);
});