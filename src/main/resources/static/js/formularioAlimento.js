//  <![CDATA[
$(document).ready(function(){
    $("#remover-imagem").hide();
    var parametros = getParametros();
    if(parametros["codigo"] != undefined){
        $("codigo").val(parametros["codigo"]);
    }

    if($("#imagemAlimento").attr('src')==""){
    $("#imagemAlimento").replaceWith( " <img src='http://res.cloudinary.com/dq5mndrjt/image/upload/c_fit,w_450/v1440010712/no-food_uizqyy.jpg' id='imagemAlimento' alt='Imagem do Alimento'/>" );
    $("#urlImagemPequena").val('http://res.cloudinary.com/dq5mndrjt/image/upload/c_fit,w_250/v1440010712/no-food_uizqyy.jpg');
    $("#urlImagemGrande").val('http://res.cloudinary.com/dq5mndrjt/image/upload/c_fit,w_450/v1440010712/no-food_uizqyy.jpg');
    }

    cloudinary.applyUploadWidget(document.getElementById('upload_widget_opener'),
    //$('#upload_widget_opener').cloudinary_upload_widget(
    {   cloud_name: 'dq5mndrjt',
        upload_preset: 'yga4od15',
        multiple: false,
        cropping: 'server',
        sources: ['local'],
        client_allowed_formats: ['png','jpg','jpeg'],
        button_class: 'btn botao botao-envia-imagem',
        button_caption: 'Escolha uma Imagem',
        theme: 'white',
        cropping_aspect_ratio: 1.33,
    },function(error, result){

        var meuResult = JSON.stringify(result, null, 2);
        var json = JSON.stringify(result);
        var jsonObject = JSON.parse(json);
        var url = jsonObject[0].url;
        var publicId = jsonObject[0].public_id;

        var tamanhoPequeno = "/c_fit,w_250/";
        var tamanhoGrande = "/c_fit,w_450/";

        var urlParte1 = url.slice(0,48);
        var urlParte2 = url.slice(49,url.length);

        var urlImagemPequena = urlParte1.concat(tamanhoPequeno);
        var urlImagemPequenaFinal = urlImagemPequena.concat(urlParte2);

        var urlImagemGrande = urlParte1.concat(tamanhoGrande);
        var urlImagemGrandeFinal = urlImagemGrande.concat(urlParte2);

        $( ".cloudinary-thumbnails" ).hide();
        $( "#imagemAlimento" ).replaceWith("<img src='"+urlImagemGrandeFinal+
        "' id='imagemAlimento' alt='Imagem do Alimento'/>" );

        $("#urlImagemPequena").val(urlImagemPequenaFinal);
        $("#urlImagemGrande").val(urlImagemGrandeFinal);

        $(".botao-envia-imagem").hide();
        $("#remover-imagem").show();
    });
    $("#remover-imagem").on("click",removerImagemAtual);
});

function removerImagemAtual(){

    $("#imagemAlimento" ).replaceWith( " <img src='http://res.cloudinary.com/dq5mndrjt/image/upload/c_fit,w_450/v1440010712/no-food_uizqyy.jpg' id='imagemAlimento' alt='Imagem do Alimento'/>" );
    $("#urlImagemPequena").val('http://res.cloudinary.com/dq5mndrjt/image/upload/c_fit,w_250/v1440010712/no-food_uizqyy.jpg');
    $("#urlImagemGrande").val('http://res.cloudinary.com/dq5mndrjt/image/upload/c_fit,w_450/v1440010712/no-food_uizqyy.jpg');
    $( ".cloudinary-delete" ).trigger( "click" );
    $(".botao-envia-imagem").show();
    $("#remover-imagem").hide();
}

//]]>