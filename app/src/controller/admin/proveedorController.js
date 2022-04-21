'use strict';

app.controller('proveedorController',function(proveedorFactory,$window){


var vm = this;

vm.proveedores = [];


proveedorFactory.getProveedores().then(function(data){


    data.data.forEach(x => {
    
     vm.proveedores.push({Id : x.id, Rif : x.dt3, Nombres : x.dt1, Apellidos : x.dt2, Empresa : x.dt4, Direccion : x.dt6, Telefono : x.dt5});

    });


});


vm.crearProveedor = function(){



    if (vm.Rif != null && vm.Nombres != null && vm.Apellidos != null && vm.Empresa != null && vm.Direccion != null && vm.Telefono != null) {

    
        var Dto = {
            Dt1 : vm.Nombres,
            Dt2 : vm.Apellidos,
            Dt3 : vm.Rif.toString(),
            Dt4 : vm.Empresa,
            Dt5 : vm.Direccion,
            Dt6 : vm.Telefono.toString()
        };

        proveedorFactory.postProveedor(Dto).then(function(data){

           var datos = data.data.data;

         vm.proveedores.push({Id : datos.id, Rif : datos.dt3, Nombres : datos.dt1, Apellidos : datos.dt2, Empresa : datos.dt4, Direccion : datos.dt6, Telefono : datos.dt5});

                         console.log(datos);
        });

        var Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 500,
            // timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Excelente,Proveedor Registrado!'
          });


          $(document).ready(function () {
            $('#ProveedorCrear').modal('hide');
         });

         vm.Rif = "";
         vm.Nombres = "";
         vm.Apellidos = "";
         vm.Empresa = "";
         vm.Direccion = "";
         vm.Telefono = "";

       
         setTimeout(function(){

          $window.location.reload();

      },400);

    }else{

             Swal.fire(
                'Disculpe',
                'Todos los campos son requeridos',
                'error'
              );


    }





}


vm.EliminarProveedor = function(id){


    Swal.fire({
        title: 'Estas seguro?',
        text: "si eliminas el proveedor, no podras recuperarlo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!',
        cancelButtonText: 'Cancelar'

    }).then((result) => {

        if (result.isConfirmed) {

             proveedorFactory.deleteProveedor(id).then(function (data) {

                 vm.proveedores.forEach(x => {
                 
                    if(x.Id == id){

                       var proveedorEliminado = vm.proveedores.indexOf(x);
 
                      vm.proveedores.splice(proveedorEliminado,1);

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




vm.getProveedor = function(proveedor){

  document.getElementById('idProveedor').value = proveedor.Id;
  document.getElementById('EditarRif').value = proveedor.Rif;
  document.getElementById('EditarNombres').value = proveedor.Nombres;
  document.getElementById('EditarApellidos').value = proveedor.Apellidos;
  document.getElementById('EditarEmpresa').value = proveedor.Empresa;
  document.getElementById('EditarDireccion').value = proveedor.Direccion;
  document.getElementById('EditarTelefono').value = proveedor.Telefono;



}



vm.EditarProveedor = function(){

    var Id = document.getElementById('idProveedor').value;
    var newRif = document.getElementById('EditarRif').value;
    var newNombres =  document.getElementById('EditarNombres').value;
    var newApellidos = document.getElementById('EditarApellidos').value;
    var newEmpresa = document.getElementById('EditarEmpresa').value;
    var newDireccion = document.getElementById('EditarDireccion').value;
    var newTelefono = document.getElementById('EditarTelefono').value;


    var Dto = {
        Dt1 : newNombres,
        Dt2 : newApellidos,
        Dt3 : newRif.toString(),
        Dt4 : newEmpresa,
        Dt5 : newDireccion,
        Dt6 : newTelefono.toString()
    };
    

      proveedorFactory.putProveedor(Id, Dto).then(function(data){


        var datos = data.data.data;

             console.log(datos);
       
     $(document).ready(function () {
        $('#ProveedorEditar').modal('hide');
     });

     $window.location.reload();

      });

      



}




});