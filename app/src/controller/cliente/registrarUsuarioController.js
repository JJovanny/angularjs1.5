'use strict';


app.controller("registrarUsuarioController",function(registrarUsuarioFactory, $location){


var vm = this;


vm.registrarUsuario = function(){


    if(vm.nombres != null && vm.apellidos != null && vm.direccion != null && vm.nombreUsuario != null && vm.password != null){


    var Dto = {

        Dt1 : vm.nombres,
        Dt2 : vm.apellidos,
        Dt3 : vm.direccion,
        Dt4 : vm.nombreUsuario,
        Dt5 : vm.password

    };


    registrarUsuarioFactory.postRegistrarusuario(Dto).then(function(data){


       console.log(data);

    });

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Perfecto',
            text : 'Te has registrado exitosamente',
            showConfirmButton: false,
            timer: 1500
        });

        vm.nombres = "";
        vm.apellidos = "";
        vm.direccion = "";
        vm.nombreUsuario = "";
        vm.password = "";

        $location.path('/');


    }else{

        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Disculpe',
            text : 'Todos los campos son requeridos',
            showConfirmButton: true,
            // timer: 1500
        });



    }





}






});