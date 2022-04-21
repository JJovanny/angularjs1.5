'use strict';


app.factory('usuariosFactory', function ($http, $cookies) {

    var url = 'https://localhost:44385/';
    //  var url2 = 'https://tiendaolineapi.herokuapp.com/';
    var url2 = 'https://localhost:44351/';

    var api = {
        getAllUsuarios: 'api/Usuario',
        postUsuarioNuevo : 'api/Usuario',
        putUsuario : 'api/Usuario/',
        DeleteUsuario : 'api/Usuario/Delete/',
    };


    var usuariosFactory = {


        getAllUsuarios: function () {

            var headers = {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer' + ' ' + $cookies.get('token')
              }
             
              
          return $http.get(url + api.getAllUsuarios,{ headers: headers })
                .success(function (data) {

                    return data;

                }).error(function (err) {

                    console.log(err);

                });

        },


        postUsuarioNuevo : function(Dto){

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + $cookies.get('token')
            }


            return $http.post(url + api.postUsuarioNuevo, Dto, {headers:headers} )
            .success(function(data){


                return data;

            }).error(function(err){

                console.log(err);

            });


        },

            putUsuario : function(idUsuario,data) {
                
                var headers = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer' + ' ' + $cookies.get('token')
                }

             return $http.put(url+api.putUsuario+idUsuario,data,{headers:headers})
             .success(function(data){

                return data;

             }).error(function(err){

                console.log(err);

             });



            },

            DeleteUsuario : function(idUsuario) {
                
                var headers = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer' + ' ' + $cookies.get('token')
                }

             return $http.get(url+api.DeleteUsuario+idUsuario,{headers:headers})
             .success(function(data){

                return data;

             }).error(function(err){

                console.log(err);

             });



            }







    }




    return usuariosFactory;



});