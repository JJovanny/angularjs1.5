'use strict';

app.controller('LoginController', function (LoginFactory, $cookies,$window,$location) {

    var vm = this;

    vm.rol = $cookies.get('usuario');

    vm.Login = function () {
 

         var datos = {
             Dt1: vm.username,
            Dt2: vm.password
        };

        
        //  var datos = {
        //      Dt4: vm.username,
        //      Dt5: vm.password
        //  };


        if(datos.Dt1 != "" && datos.Dt2 != ""){ 


         LoginFactory.postLogin(datos).then(function (data) {

        //    console.log(data);

           console.log(data);

           $cookies.put('token', data.data.token);

            //   $cookies.put('usuario',JSON.stringify(data.data.usuario));

            //    $cookies.put('usuario',data.data.usuario.Dt6);
             $cookies.put('usuario',data.data.usuario.dt6);

             //var usuario = JSON.parse($cookies.get('usuario'));
             var usuario = $cookies.get('usuario');

             if(usuario == 'Admin'){ 

                 Swal.fire({
                     position: 'top-end',
                     icon: 'success',
                     title: 'Bienvenido!',
                     text : 'Datos Correctos',
                     showConfirmButton: false,
                     timer: 1500
                 });


               $location.path('/Principal');


             }else if(usuario == 'Cliente'){

                    Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Bienvenido!',
                    text : 'Datos Correctos',
                    showConfirmButton: false,
                    timer: 1500
                });
                
                 $location.path('/cajero');

             }else{

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Bienvenido!',
                    text : 'Datos Correctos',
                    showConfirmButton: false,
                    timer: 1500
                });
                
                 $location.path('/personal');


             }


             
         });
     
        }else{
           
            Swal.fire(
                'Disculpe',
                'Todos los campos son requeridos',
                'error'
              );

            $window.location = "#/";
        }

    }

    vm.Logout = function () {

        $cookies.remove('token');
        $cookies.remove('usuario');
        window.location = "#/";
        window.location.reload();
    }



});