//  <![CDATA[

$(document).ready(function(){

    var parametros = getParametros();

    if(parametros["codigo"] != undefined){
        $("codigo").val(parametros["codigo"]);
    }


    cloudinary.applyUploadWidget(document.getElementById('upload_widget_opener'),
    //$('#upload_widget_opener').cloudinary_upload_widget(
                { cloud_name: 'dq5mndrjt',
                  upload_preset: 'yga4od15',
                  multiple: false,
                  sources: ['local','url'],
                  client_allowed_formats: ["png", "jpg", "jpeg"],
                  button_class: 'btn btn-success',
                  button_caption: 'Escolha uma Imagem',
                  theme: 'white'
                },

                function(error, result) {console.log(error, result);

                    var meuResult = JSON.stringify(result, null, 2);
                    var urlm = meuResult.replace('"url": "', "Site");

                    alert(urlm);

                    var inicioPublicId = urlm.indexOf("public_id");
                    var fimPublicId = urlm.indexOf("version");
                    var publicId = urlm.slice(inicioPublicId+13, fimPublicId-8);

                    var urlInicio = urlm.indexOf("Site");
                    var urlFim = urlm.indexOf("secure_url");

                    var urla = urlm.slice(urlInicio+4, urlFim-8);

                    var tamanhoPequeno = "/c_fit,w_108/";
                    var tamanhoGrande = "/c_fit,w_390/";

                    var urlParte1 = urla.slice(0,48);
                    var posicaoFinal = urla.lastIndexOf(".png")+4;
                    var urlParte2 = urla.slice(49,posicaoFinal);

                    var urlImagemPequena = urlParte1.concat(tamanhoPequeno);
                    var urlImagemPequenaFinal = urlImagemPequena.concat(urlParte2);

                    var urlImagemGrande = urlParte1.concat(tamanhoGrande);
                    var urlImagemGrandeFinal = urlImagemGrande.concat(urlParte2);

                    $( ".cloudinary-thumbnails" ).remove();
                    $( "#imagemAlimento" ).replaceWith( " <img src='"+urlImagemGrandeFinal+"' id='imagemAlimento' alt='Imagem do Alimento'/>" );


                    $("#urlImagemPequena").val(urlImagemPequenaFinal);
                    $("#urlImagemGrande").val(urlImagemGrandeFinal);
                }
           );
});


//]]>

