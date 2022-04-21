'use strict';

app.controller("productosController", function ($scope, $window,categoriaFactory,productosFactory) {

    var vm = this;
    vm.categorias = [];
    vm.fotoProducto = document.getElementById('fotoProducto');
    vm.productos = [];


    categoriaFactory.getAllCategorias().then(function (data) {

        vm.categorias = data.data;

    });

    
    productosFactory.getProductos().then(function (data) {


        data.data.forEach(x => {
            
            vm.productos.push({id : x.id, nombre : x.nombre , precio : x.precio, stock : x.stock, categoria: x.categorias.tipoCategoria });

            
        });



    });


    vm.crearProducto = function () {


        if (vm.nombre == null || vm.precio == 0 || vm.stock == 0 || vm.categoria == null || vm.fotoProducto == null) {
       
            Swal.fire(
                'Disculpe',
                'Todos los campos son requeridos',
                'error'
              );


        }else{

            var reader = new FileReader();
            reader.readAsDataURL(vm.fotoProducto.files[0]);
            reader.onload = function(){ 

                var objeto = {
                    Nombre : vm.nombre,
                    Precio : vm.precio,
                    Stock : vm.stock,
                    Foto : reader.result,
                    CategoriaId : vm.categoria,
                };

            productosFactory.postProductos(objeto).then(function(data){

                console.log(data);
                vm.nombre = "";
                vm.precio = "";
                vm.stock = "";
                vm.fotoProducto.value = "";
                vm.categoria = "";

            
                Swal.fire(
                    'Excelente',
                    'Se ha creado el producto exitosamente',
                    'success'
                  );

                  vm.productos.push({ id: data.config.data.id, nombre: data.config.data.nombre, precio: data.config.data.precio, stock: data.config.data.stock });

            });
        }

        }



    }

    


   vm.GenerarPdfProductos = function(){

    var filas = [];

      productosFactory.getProductos().then(function (data) {

       var pdf = new jsPDF({orientation: 'landscape'});
       pdf.text(20,20,"Productos en el stock");

       data.data.forEach(x => {

     
            
       var array = [x.id, x.nombre, x.precio,x.stock, x.categorias.tipoCategoria];

       filas.push(array);



       });

    var columns = ["Id", "Nombre", "Precio", "Stock", "Categoria"];
    
    pdf.autoTable(columns,filas,{ margin:{ top: 25 , startY: 10}});


    var date = new Date();

    pdf.save('Productos'+'_'+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'_'+date.getMilliseconds()+'.pdf');
      
  });


//  var elementHTML =  document.getElementById('containerPdfProductos').innerHTML;

//  var doc = new jsPDF({
//     orientation: 'landscape'
//  });

// doc.setFont("courier");
// doc.setFontType("normal");
// doc.setFontSize(24);
// doc.setTextColor(100);
// doc.fromHTML(elementHTML, 15, 15, {
//     'width': 170,
// });

// doc.save('sample-document.pdf');


   }


   vm.ElimnarProducto = function(id){


    Swal.fire({
        title: 'Estas seguro?',
        text: "si eliminas el producto, no podras recuperarlo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!',
        cancelButtonText: 'Cancelar'

    }).then((result) => {

        if (result.isConfirmed) {

            productosFactory.deleteProducto(id).then(function (data) {

                console.log(data);

                 vm.productos.forEach(x => {
                 
                    if(x.id == id){

                    var productoElimnado = vm.productos.indexOf(x);
 
                      vm.productos.splice(productoElimnado,1);

                    }

             });

              });


            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Excelente!',
                text: 'Se ha descativado exitosamente',
                showConfirmButton: false,
                timer: 1500

            });
        }


   });

   }



});


