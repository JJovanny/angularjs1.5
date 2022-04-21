'use strict';

app.controller('usuariosController', function (usuariosFactory, rolesFactory,$window) {

    var vm = this;
    vm.imagenEditar;
    vm.usuarios = [];
    vm.roles = [];

    usuariosFactory.getAllUsuarios().then(function (data) {

        console.log(data);
         var usuariosGet = data.data.data;

         usuariosGet.forEach(x => {

             var image = new Image();
             image.src = x.foto;

            vm.usuarios.push({ id: x.id, nombre: x.nombre, apellido: x.apellido, direccion: x.direccion, username: x.username, password: x.password, Roles: x.usuariosSession.rols.tipo, Foto: image.src });

    });


    });



    rolesFactory.getAllRoles().then(function (data) {


        var roles = data.data;

        roles.forEach(x => {

            vm.roles.push({ Id: x.id, Tipo: x.tipo });

        });

    });



    vm.crearUsuario = function () {

        var foto = document.getElementById('fotoUsuario');

        if (vm.nombres != null && vm.apellidos != null && vm.direccion != null && vm.nombreUsuario != null && vm.password != null && vm.rol != null && foto.files.length != 0) {

            var reader = new FileReader();

            reader.readAsDataURL(foto.files[0]);

            reader.onload = function () {

                var Dto = {
                    Nombre: vm.nombres,
                    Apellido: vm.apellidos,
                    Direccion: vm.direccion,
                    Username: vm.nombreUsuario,
                    Password: vm.password,
                    RolId: vm.rol,
                    Foto: reader.result,
                };



                console.log(Dto.Nombre);

                usuariosFactory.postUsuarioNuevo(Dto).then(function (data) {

                    var x = data.data.data;

                    console.log(data);

                    var image = new Image();
                     image.src = x.Foto;

                     vm.usuarios.push({
                         id: x.id, nombre: x.nombre,
                         apellido: x.apellido, direccion: x.direccion,
                         username: x.username, password: x.password,
                         Roles: x.usuariosSession.rols.tipo,
                     });

                });
            }


            $(document).ready(function () {
                $('#exampleModal').modal('hide');
            });


             Swal.fire({
                 position: 'top-end',
                 icon: 'success',
                 title: 'Perfecto',
                 text: 'Usuario registrado exitosamente',
                 showConfirmButton: false,
                 timer: 1500
             });

           

               setTimeout(function(){

                  $window.location.reload();

              },999);

        } else {

            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Disculpe',
                text: 'Todos los campos son requeridos',
                showConfirmButton: true,
                // timer: 1500
            });



        }


    }




    vm.EditarUsuario = function (usuario) {


        var image = new Image();
        image.src = usuario.foto;

        document.getElementById('idEditar').value = usuario.id;
        document.getElementById('nombreEditar').value = usuario.nombre;
        document.getElementById('apellidosEditar').value = usuario.apellido;
        document.getElementById('direccionEditar').value = usuario.direccion;
        document.getElementById('nombreUsuarioEditar').value = usuario.username;
        vm.imagenEditar = image.src;


    }


    vm.EnviarUsuarioEditado = function () {

        vm.idUsuario = document.getElementById('idEditar').value;
        vm.nombreEditar = document.getElementById('nombreEditar').value;
        vm.apellidosEditar = document.getElementById('apellidosEditar').value;
        vm.direccionEditar = document.getElementById('direccionEditar').value;
        vm.nombreUsuarioEditar = document.getElementById('nombreUsuarioEditar').value;
        vm.rolEditar;
        vm.fotoUsuarioEditar = document.getElementById('fotoUsuarioEditar');

        if (vm.nombreEditar != null && vm.apellidosEditar != null && vm.direccionEditar != null && vm.nombreUsuarioEditar != null && vm.rolEditar != null && vm.fotoUsuarioEditar.files.length != 0) {

            var reader = new FileReader();

            reader.readAsDataURL(fotoUsuarioEditar.files[0]);

            reader.onload = function () {

                var data = {

                    Nombre: vm.nombreEditar,
                    Apellido: vm.apellidosEditar,
                    Direccion: vm.direccionEditar,
                    Username: vm.nombreUsuarioEditar,
                    RolId: vm.rolEditar,
                    Foto: reader.result
                };



                usuariosFactory.putUsuario(vm.idUsuario, data).then(function (data) {

                    $(document).ready(function () {
                        $('#EditarModal').modal('hide');
                    });

                    console.log(data);

                });

            }

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Perfecto',
                text: 'Usuario Editado exitosamente',
                showConfirmButton: false,
                timer: 1500
            });

             setTimeout(function(){

                $window.location.reload();
                
             },1500);

        } else {

            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Disculpe',
                text: 'Todos los campos son requeridos',
                showConfirmButton: true,
                // timer: 1500
            });






        }


    }


    vm.EliminarUsuario = function (id) {

        console.log(id);

        Swal.fire({
            title: 'Estas seguro?',
            text: "si eliminas el usuario, habran problemas parce!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar'

        }).then((result) => {

            if (result.isConfirmed) {

                usuariosFactory.DeleteUsuario(id).then(function (data) {

                    console.log(data);

                    vm.usuarios.forEach(x => {
                 
                        if(x.id == id){
    
                           var usuarioEliminado = vm.usuarios.indexOf(x);
     
                          vm.usuarios.splice(usuarioEliminado,1);
    
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