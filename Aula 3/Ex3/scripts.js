function verify(){
    let text =  document.getElementById("inputName4").value;
    var pos = text.indexOf(" ");

    if(pos>0 && pos<text.length-1 && text[text.length]!==" "){
        document.getElementById('submitBtn').disabled = false;
    }else{
        alert("Introduza o primeiro e último nome");
        document.getElementById('submitBtn').disabled = true;
    }

}