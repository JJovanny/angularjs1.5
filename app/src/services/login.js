'use strict';

app.factory('LoginFactory', function ($http, $cookies,$window) {

    var url = 'https://localhost:44385/';
    
    var url2 = 'https://localhost:44351/';

    var api = {
        login: 'api/Login',
    };
    

    var LoginFactory = {

        postLogin: function (obj) {

            return $http.post(url + api.login, obj).success(function (data) {

            return data;
                       
         }).error(function (err) {

            Swal.fire(
                'Disculpe',
                'Datos incorrectos, vuelva a intentarlo',
                'error'
              );

             console.log(err);
        });

    },





    };

    return LoginFactory;

});