$(document).ready(function(){
    $("#checkBox").click(function(){
        if ($('#checkBox').is(':checked')){
            $("#submitButton").show();
        }else{
            $("#submitButton").hide();
        }
    });
});

$("#confpass").blur(function(){
    if($('#pass').val() === $('#confpass').val()){
        this.setCustomValidity('');
    }else{
        this.setCustomValidity('Passwords must match');
    }
}); 

$("#confmail").blur(function(){
    if($('#mail').val() === $('#confmail').val()){
        this.setCustomValidity('');
    }else{
        this.setCustomValidity('E-mails must match');
    }
}); 