
var app = angular.module("app", ["ngRoute", "ngCookies", "LocalStorageModule"]);

// CONFIGURACION DE RUTAS
app.config(function ($routeProvider) {

    //==============================================================================
    //<------------------LOGIN & REGISTER---------------------------------------------->
    //==============================================================================

    $routeProvider.when("/", {
        templateUrl: "./app/src/views/login.html",
        controller: "LoginController",
        resolve: {
            auth: function ($location, $cookies) {

                var token = $cookies.get('token');
                var usuario = $cookies.get('usuario');

                if (token != null && usuario == "Admin") {

                    $location.path('/Principal');

                } else if(token != null && usuario == "Cliente") {

                        $location.path('/cajero');

                }else{

             $location.path('/personal');

                }

            }
        }
    }).when("/Registrarse", {
            templateUrl: "./app/src/views/cliente/registrarse.html",
             controller: "registrarUsuarioController",
            resolve: {
                 auth: function ($location, $cookies) {
        
                     var token = $cookies.get('token');
                     var usuario = $cookies.get('usuario');
        
                     if (token != null && usuario == "Admin") {
        
                        $location.path('/Principal');
                 
                    } else if(token != null && usuario == "Cliente") {
        
                            $location.path('/cajero');
        
                    }else{
        
                        if(token != null && usuario == "Empleado"){ 

                        $location.path('/personal');
                        
                        }

                    }
        
                }



             }
        
         //==============================================================================
        //<---------ADMIN----------------------------------------------------------------->
         //==============================================================================
        }).when("/Principal", {

            templateUrl: "./app/src/views/admin/principal.html",
            controller: "datosController",
            authenticated: true,
            resolve: {
                admin: function ($location, $cookies) {
    
                    var usuario = $cookies.get('usuario');
    
                    if (usuario != 'Admin' && usuario == 'Cliente' ) {
    
                        $location.path('/cajero');
    
                    }else if(usuario != 'Admin' && usuario == "Empleado"){
    
                        $location.path('/personal');
    
                    }
    
    
                }
            }

        }).when("/verificarVentas", {
            templateUrl: "./app/src/views/admin/verificarVenta.html",
            controller: "verificarVentaController",
            authenticated: true,
            resolve: {
                admin: function ($location, $cookies) {
    
                    var usuario = $cookies.get('usuario');
    
                    if (usuario != 'Admin' && usuario == 'Cliente' ) {
    
                        $location.path('/cajero');
    
                    }else if(usuario != 'Admin' && usuario == "Empleado"){
    
                        $location.path('/personal');
    
                    }
    
    
                }
            }

        }).when("/productos", {
            templateUrl: "./app/src/views/admin/productos.html",
            controller: "productosController",
            authenticated: true,
            resolve: {
                admin: function ($location, $cookies) {
        
                    var usuario = $cookies.get('usuario');
        
                    if (usuario != "Admin" && usuario == "Cliente") {
        
                        $location.path('/cajero');
        
                    }else if(usuario != 'Admin' && usuario == "Empleado"){
    
                        $location.path('/personal');
    
                    }
                }
            }

        }).when("/Usuarios", {
            templateUrl: "./app/src/views/admin/usuarios.html",
            controller: "usuariosController",
            authenticated: true,
            resolve: {
                admin: function ($location, $cookies) {
        
                    var usuario = $cookies.get('usuario');
        
                    if (usuario != "Admin" && usuario == "Cliente") {
        
                        $location.path('/cajero');
        
                    }else if(usuario != "Admin" && usuario == "Empleado"){

                        $location.path('/personal');


                    }
                }
            }

        }).when("/Proveedores", {
                templateUrl: "./app/src/views/admin/proveedores.html",
                controller: "proveedorController",
                authenticated: true,
                resolve: {
                    admin: function ($location, $cookies) {
            
                        var usuario = $cookies.get('usuario');
            
                        if (usuario != "Admin" && usuario == "Cliente") {
            
                            $location.path('/cajero');
            
                        }else if(usuario != "Admin" && usuario == "Empleado"){
    
                            $location.path('/personal');
    
    
                        }
                    }
                }

         //==============================================================================
        //<-----------------------PERSONAL ----------------------------------------------->
        //==============================================================================

        }).when("/personal", {
            templateUrl: "./app/src/views/empleado/principal.html",
             authenticated: true,
            // controller: "comprobanteController",
            resolve: {
                personal: function ($location, $cookies) {
        
                    var usuario = $cookies.get('usuario');
        
                    if (usuario != "Personal" && usuario == "Admin") {
        
                        $location.path('/Principal');
        
                    }else if(usuario != "Personal" && usuario == "Cliente"){
        
                        $location.path('/cajero');
        
        
                    }
        
                }
        
            }


    }).when("/cajero", {
        templateUrl: "./app/src/views/cliente/cajero.html",
        controller: "carritoController",
        authenticated: true,
        resolve: {
            cliente: function ($location, $cookies) {

                var usuario = $cookies.get('usuario');

                if (usuario != "Cliente" && usuario == "Admin") {

                    $location.path('/Principal');

                }else if(usuario != "Cliente" && usuario == "Empleado"){
        
                    $location.path('/personal');
    
    
                }

            }

        }


}).when("/ordenCompra", {
    templateUrl: "./app/src/views/cliente/ordenCompra.html",
    authenticated: true,
    controller: "comprobanteController",
    resolve: {
        cliente: function ($location, $cookies) {

            var usuario = $cookies.get('usuario');

            if (usuario != "Cliente" && usuario == "Admin") {

                $location.path('/Principal');

            }else if(usuario != "Cliente" && usuario == "Empleado"){
        
                $location.path('/personal');


            }

        }

    }

    
         //==============================================================================
        //<-----------------------Default ----------------------------------------------->
        //==============================================================================

}).otherwise('/');



});


app.run(function ($rootScope, $location, $route, $cookies, $window, LoginFactory) {

    $rootScope.$on("$routeChangeStart", function (event, next, current) {

        if (next.$$route.authenticated) {

            var token = $cookies.get('token');

            if (!token) {

                $location.path('/');
            }
        }



    });


});


