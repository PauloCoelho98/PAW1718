/*function click() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("demo").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "countries.json", true);
    xhttp.send();

}*/

function click() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

        if(this.readyState == 4 && this.status == 200){

            var obj = JSON.parse(this.responseText); 

            for(let i=0; i<obj.countries.length; i++){

                let division = document.createElement('div');
                let code = document.createElement('p');
                let country = document.createElement('p');

                document.getElementById("janela").appendChild(division);
                division.appendChild(code);
                division.appendChild(country);
                
                code.innerHTML = "Code:" + obj.countries[i].code;
                country.innerHTML = "Full name:" + obj.countries[i].name;
                
            }

        }

    };
    xhttp.open("GET", "getcountries", true);
    xhttp.send();

}

document.getElementById('sub').addEventListener("click", function() {
    click();
});