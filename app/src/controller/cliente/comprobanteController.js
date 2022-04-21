'use strict';

app.controller("comprobanteController", function ($scope, DetalleCompraFactory) {

    var lista = this;
    var n = 2;

    lista.idDeta;
    lista.idDetaCompra;
    lista.detalleCompras = [];
    
    lista.input;

    lista.id;
    lista.subtotal;
    lista.compro;
    lista.verificacion;


    DetalleCompraFactory.getAllDetalleCompra().then(function(data){

        lista.detalleCompras = data.data;

         lista.detalleCompras.forEach(x => {
            
             if(x.archivo == null){

                x.botonElimnar = true;
                x.enviarComprobante = true;
                x.texto = "Enviar Comprobante";

              }else{
                x.texto = "Enviado";
              }

         });


    });


    lista.getDetalleCompra = function(detalle){

        lista.id = detalle.id;
        lista.subtotal = detalle.subtotal;
        lista.compro = detalle.archivo;
      

        var image = new Image();
        image.src = detalle.archivo;
        lista.compro = image.src;

    }



    lista.enviarComprobante = function(idComprobante,comprobante){

        lista.btnFinalizar = false;

        lista.botonElimnar = true;
     
        document.getElementById(idComprobante+'btnsend').disabled = true;
        document.getElementById(idComprobante+'btnsend').style.backgroundColor='#198754';

        document.getElementById(idComprobante+'texto').innerHTML = "Enviado";
        document.getElementById(idComprobante+'texto').style.color ='white';

      



        var comprobantePago = document.getElementById('file');
       
        var reader = new FileReader();

        reader.readAsDataURL(comprobantePago.files[0]);

        reader.onload = function(){ 
       
           console.log(reader.result);

        DetalleCompraFactory.enviarComprobante(idComprobante,reader.result).then(function(data){

            console.log(data);
    
        });
    
    }

    } 


     lista.eliminarDetalleCompra = function(id) {
        

    //  DetalleCompraFactory.deleteDetalleCompra(id).then(function(data){

        //  Swal.fire(
        //      'Excelente!',
        //      'Se ha eliminado exitosamente',
        //      'success'
        //    );

           Swal.fire(
            'Disculpe!',
            'En process',
            'question'
          );


    //  });


 }





});


