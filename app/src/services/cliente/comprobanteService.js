'use strict';

app.factory('DetalleCompraFactory', function ($http, $cookies) {

    var url = 'https://localhost:44385/';

    var api = {
        detallePost: 'api/DetalleCompra/',
        detallePut: 'api/DetalleCompra/',
        detalleGetAll : 'api/DetalleCompra/',
        detallePutComprobarVenta: 'api/ComprobarVenta/',
    };

    var DetalleCompraFactory = {

        postDetalleCompra: function (fecha) {

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + $cookies.get('token'),
            };

            return $http.post(url + api.detallePost, fecha, { headers: headers })
                .success(function (data) {
                    //console.log(data);
                    return data;

                }).error(function (err) {
                    console.log(err);
                })

        },


        getAllDetalleCompra: function () {

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + $cookies.get('token'),
            };

            return $http.get(url + api.detalleGetAll, { headers: headers })
                .success(function (data) {

                    return data;

                }).error(function (err) {

                    console.log(err);

                })
 
        },

        enviarComprobante: function (id,file) {

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + $cookies.get('token'),
            };

            var obj = {id : id, file : file };

            return $http.put(url + api.detallePut + id,obj,{ headers: headers })
                .success(function (data) {

                    console.log(data);
                    return data;

                }).error(function (err) {
                    console.log(err);
                })


        },


    };

    return DetalleCompraFactory;

});


