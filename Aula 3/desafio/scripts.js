function calculate(){

    let peso = document.getElementById("customWeight").value;
    let altura = document.getElementById("customHeight").value;

    let imc = Math.floor(peso/(Math.pow(altura,2)));

    if(imc<=18){ // imc1
        document.getElementById('img').src="imc1.png";
        //alert("imc1");
    }else if(imc>18 && imc<=25){ // imc2
        document.getElementById('img').src="imc2.png";
        //alert("imc2");
    }else if(imc>25 && imc<=30){ // imc3
        document.getElementById('img').src="imc3.png";
        //alert("imc3");
    }else{ // imc4
        document.getElementById('img').src="imc4.png";
        //alert("imc4");
    }
    document.getElementById("button").addEventListener(calculate); //Equivalente a usar onclick

}