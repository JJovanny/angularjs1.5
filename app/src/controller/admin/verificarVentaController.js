'use strict';

app.controller("verificarVentaController", function ($scope, DetalleCompraFactory) {

    var lista = this;
    var n = 2;

    lista.idDeta;
    lista.idDetaCompra;
    lista.detalleCompras = [];


    lista.id;
    lista.subtotal;
    lista.compro;
    lista.verificacion;


    DetalleCompraFactory.getAllDetalleCompra().then(function(data){

        data.data.forEach(x => {

        lista.detalleCompras.push({id : x.id, fecha : x.fecha,subtotal : x.subtotal, Nombreusuario : x.usuarios.nombre, Apellidousuario : x.usuarios.apellido});
    
    });

        lista.detalleCompras.forEach(x => {
            
            if(x.verificada == null){

               x.verificarBoton = true;
    
            }
           
        });

        


    });


    lista.getDetalleCompra = function(detalle){

        lista.id = detalle.id;
        lista.subtotal = detalle.subtotal;
        lista.compro;

        var image = new Image();
        image.src = detalle.archivo;
        lista.compro = image.src;

         

    },


    lista.eliminarDetalleCompra = function(id){        


            Swal.fire({
                title: 'Estas seguro?',
                text: "Si elimnas lacompranopodras recuperarla!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminar!',
                cancelButtonText: 'Cancelar'

              }).then((result) => {

                if (result.isConfirmed) {


             DetalleCompraFactory.deleteDetalleCompra(id).then(function(data){

                 console.log(data);
             });
           
             Swal.fire({
                 position: 'top-end',
                 icon: 'success',
                 title: 'Excelente!',
                 text : 'Se ha elimnado exitosamente',
                 showConfirmButton: false,
                 timer: 1500
     
             });

          }
        

         });

        },


        lista.comprobarVenta = function(id,verificacion){

            DetalleCompraFactory.verificarComprobante(id, verificacion).then(function(data){

                console.log(data);
                 lista.verificarBoton = true;


                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Excelente!',
                    text : 'Se ha Comprobado la venta exitosamente',
                    showConfirmButton: false,
                    timer: 1300
         
                });

            });
           

        }


});


