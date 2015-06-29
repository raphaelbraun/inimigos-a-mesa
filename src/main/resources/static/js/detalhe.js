//  <![CDATA[
function mostraColherGordura(){
   var colher = $("#gordura").attr("value");
   if (colher >= 2){

       $("#imagem-colher-gordura").empty();
       for(i=0; i <= colher; i++){
            $("#imagem-colher-gordura").append($("#template-colher").find("img").clone());
       }
   }else {
        $("#imagem-colher-gordura").empty();
        $("#imagem-colher-gordura").append($("#template-sem-colher").find("p").clone());
   }
}

function mostraColherAcucar(){
   var colher = $("#acucar").attr("value");
   if (colher >= 1.5){
       $("#imagem-colher-acucar").empty();
       for(i=0; i <= colher; i++){
            $("#imagem-colher-acucar").append($("#template-colher").find("img").clone());
       }
   }else {
            $("#imagem-colher-acucar").empty();
            $("#imagem-colher-acucar").append($("#template-sem-colher").find("p").clone());
       }
}

function mostraColherSal(){
   var colher = $("#sal").attr("value");
   if (colher >= 2){

       $("#imagem-colher-sal").empty();
       for(i=0; i <= colher; i++){
            $("#imagem-colher-sal").append($("#template-colher").find("img").clone());
       }
   }else {
            $("#imagem-colher-sal").empty();
            $("#imagem-colher-sal").append($("#template-sem-colher").find("p").clone());
       }
}


$(document).ready(function(){

    mostraColherGordura();
    mostraColherAcucar();
    mostraColherSal();

})


//]]>