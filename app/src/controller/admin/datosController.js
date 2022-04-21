'use strict';


app.controller('datosController',function(productosFactory,usuariosFactory, DetalleCompraFactory){


var vm = this;

vm.productos = [];

vm.usuarios = [];

vm.roles = {

  rolAdmin : vm.usuariosXRolAdmin = [],
  rolCliente : vm.usuariosXRolCliente = [],
  rolEmpleado : vm.usuariosXRolEmpleado = []
};



vm.ventas = [];




productosFactory.getProductos().then(function (data) {


    data.data.forEach(x => {
        
        vm.productos.push({id : x.id, nombre : x.nombre , precio : x.precio, stock : x.stock, categoria: x.categorias.tipoCategoria });

        
    });


});



usuariosFactory.getAllUsuarios().then(function (data) {

    var usuarios = data.data.data;

    usuarios.forEach(x => {

        vm.usuarios.push({ id: x.id, nombre: x.nombre, apellido: x.apellido, direccion: x.direccion, username: x.username, password: x.password, Roles: x.usuariosSession.rols.tipo});
        
        if(x.usuariosSession.rols.tipo == 'Admin'){ 

            vm.roles.rolAdmin.push({Roles: x.usuariosSession.rols.tipo});

        }else if(x.usuariosSession.rols.tipo == 'Cliente'){

            vm.roles.rolCliente.push({Roles: x.usuariosSession.rols.tipo});

        }else{
            vm.roles.rolEmpleado.push({Roles: x.usuariosSession.rols.tipo});
        }

    });




});




DetalleCompraFactory.getAllDetalleCompra().then(function(data){

    data.data.forEach(x => {
        
        vm.ventas.push({id : x.id});

    });
    

});







});