'use strict';

app.controller("carritoController", function ($scope, productosFactory, CompraFactory, DetalleCompraFactory, localStorageService) {

    var lista = this;
    var n = 2;

    lista.productos = [];

    if (localStorageService.get("carrito")) {

        lista.carrito = localStorageService.get("carrito");

    } else {

        lista.carrito = [];
    }


    if (localStorageService.get("carrito")) {

        lista.validar = true;
        lista.btnFinalizar = true;


    } else {

        lista.validar = false;
        lista.btnFinalizar = false;

    }



    lista.idDeta;
    lista.idDetaCompra;
    lista.detalleCompras = [];
    lista.carritoLocal = [];


    lista.nombre;

    productosFactory.getProductos().then(function (data) {

        data.data.forEach(x => {

            var image = new Image();
            image.src = x.foto;

            var obj = {
                id: x.id,
                nombre: x.nombre,
                precio: x.precio,
                stock: x.stock,
                categoriaId: x.categoriaId,
                foto: image.src

            };


            lista.productos.push(obj);

        });



    });



    lista.addCarrito = function (productoid) {

        lista.btnFinalizar = true;

        console.log(productoid.id);

        document.getElementById('finalizarcompra').disabled = false;
        document.getElementById('EliminarCompra').disabled = false;


        var id = lista.productoSeleccionado;
        var cantidad = productoid.cantidadAComprar;

        lista.idDetaCompra = lista.idDeta;


        var obj = {
            ProductoId: productoid.id,
            DetalleCompraId: lista.idDetaCompra,
            Cantidad: cantidad
        };


        CompraFactory.postCompra(obj).then(function (dataCompra) {

            console.log(dataCompra);
        
            productosFactory.getProductos().then(function (data) {

                data.data.forEach(x => {

                if(x.id == productoid.id){ 

                  if(x.stock <= 1){

                    Swal.fire(
                        'Disculpe',
                        'Por el momento no tenemos esa cantidad para ese producto, intentelo mas tarde',
                        'error'
                      );
                     

                    }else{


                    if(cantidad > x.stock){

                        Swal.fire(
                            'Disculpe',
                            'Por el momento no tenemos esa cantidad para ese producto, intentelo mas tarde',
                            'error'
                          );

                    }else{ 

                     lista.carrito.push({
                         id: dataCompra.data.data.id, nombre: productoid.nombre,
                         precio: productoid.precio, cantidad: cantidad, total: productoid.precio * cantidad
                     });
            
            
                    lista.carritoLocal.push({
                     id: dataCompra.data.data.id, nombre: productoid.nombre,
                        precio: productoid.precio, cantidad: cantidad, total: productoid.precio * cantidad
                     });
            
            
                   localStorageService.set("carrito", lista.carritoLocal);
            
            
                    }

                  }
                 //if

              
             }
            //termina if

            });
            //termina foreach

        });

        //termina productoFactory




    });
    //termina comprafactory




    }

 

    lista.getTotalCarrito = function () {

        var total = 0;
        if (lista.carrito.total == 0) {
            total;
        } else {
            lista.carrito.forEach(x => {
                total += x.total;
            });
        }
        return total;
    }



    lista.EliminarCompra = function (id) {


        CompraFactory.deleteCompra(id).then(function (data) {


            lista.carrito.forEach(x => {

                if (x.id == id) {

                    var compraAeliminar = lista.carrito.indexOf(x);

                    lista.carrito.splice(compraAeliminar, 1);

                    console.log(data);

                }


            });


            lista.carritoLocal.forEach(x => {

                if (x.id == id) {

                    var compraAeliminararrito = lista.carritoLocal.indexOf(x);

                    lista.carritoLocal.splice(compraAeliminararrito, 1);

                    localStorageService.set("carrito", lista.carritoLocal);

                }

            });




            var total = 0;

            lista.carrito.forEach(x => {
                total -= x.total;
            });


            return total;

        });


    }


    lista.DetalleCompra = function () {

         lista.validar = true;


         document.getElementById('botonfecha').disabled = true;

           var fecha = moment().format("YYYY/MM/DD HH:MM");

           var Dto = {

            Dt1 : fecha
        };

         DetalleCompraFactory.postDetalleCompra(Dto).then(function (data) {

            console.log(data);

             localStorageService.set("idDetalleCompra", data.data.data.id);

             lista.idDeta = data.data.data.id;
             lista.idDetaCompra = data.data.data.id;


         });

    }



    lista.TerminarCompra = function () {

        lista.carrito.forEach(x => {
            var indice = lista.carrito.indexOf(x);
            lista.carrito.splice(indice);
            lista.fecha = "";
            lista.cantidad = "";
            lista.productoSeleccionado = "";
        });

        document.getElementById('botonfecha').disabled = false;

        document.getElementById('finalizarcompra').disabled = true;
        document.getElementById('EliminarCompra').disabled = true;
        lista.validar = false;
        localStorageService.remove("carrito");
        localStorageService.remove("idDetalleCompra");

        document.getElementById('cantidadAComprar').value = "";


        var Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
             timer: 2000,
            // timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Compra finalizada!'
          })

      
    }





    lista.EliminarDetalleCompra = function () {

         Swal.fire({
            title: 'Estas seguro?',
            text: "Si eliminas la Compra no podras recuperarla!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar'

          }).then((result) => {

            if (result.isConfirmed) {

                document.getElementById('botonfecha').disabled = false;

                document.getElementById('finalizarcompra').disabled = true;
                document.getElementById('EliminarCompra').disabled = true;
        
                document.getElementById('cantidadAComprar').value = "";

                lista.validar = false;
        
                lista.carrito.forEach(x => {
        
                    var indice = lista.carrito.indexOf(x);
                    lista.carrito.splice(indice);
                    lista.fecha = "";
                    lista.cantidad = "";
                    lista.productoSeleccionado = "";
        
                });
        
        
                var eliminarDetalleCompra = localStorageService.get("idDetalleCompra");
        
                 DetalleCompraFactory.deleteDetalleCompra(eliminarDetalleCompra).then(function (data) {
        
                     console.log(data);
                     localStorageService.remove("carrito");
                    localStorageService.remove("idDetalleCompra")
        
                 });

                 var Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                     timer: 2500,
                     timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: 'Compra Eliminada exitosamente!'
                  });
                }
    

     });

         
    }



});


