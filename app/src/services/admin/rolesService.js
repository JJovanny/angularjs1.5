'use strict';

app.factory('rolesFactory', function ($http, $cookies) {

    var url = 'https://localhost:44385/';

    var api = {

        getAllRoles: 'api/Rol'

    };

    var rolesFactory = {


        getAllRoles: function () {

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + $cookies.get('token'),
            };


            return $http.get(url + api.getAllRoles, { headers: headers }).success(function (data) {

                return data;


            }).error(function (err) {

                console.log(err);

            });






        }







    }



    return rolesFactory;




});