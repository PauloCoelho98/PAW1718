"use strict"; 

function compareTwoValues(value1, value2, element){

    if(value1===value2){
        element.setCustomValidity("")
    }else{
        element.setCustomValidity("Invalid field.");
    }
    
}

function checkbox(){

    let checkBox = document.getElementById("checkBox").checked;
    let button = document.getElementById("submitButton");

    if(checkBox === true){
        button.disabled = false;
    }else{
        button.disabled = true;
    }

}

document.getElementById('confpass').addEventListener("blur", function() {
    compareTwoValues(document.getElementById("pass").value, document.getElementById("confpass").value, document.getElementById("confpass"));
});

document.getElementById('confmail').addEventListener("blur", function() {
    compareTwoValues(document.getElementById("mail").value, document.getElementById("confmail").value, document.getElementById("confmail"));
});

document.getElementById('checkBox').addEventListener("click", function() {
    checkbox();
});

//document.addEventListener("click", printMousePos);