'use strict';

app.factory('DetalleCompraFactory', function ($http, $cookies) {

    var url = 'https://localhost:44385/';

    var api = {
        detalle: 'api/DetalleCompra/',
        detallePut: 'api/DetalleCompra/',
        detalleGetAll : 'api/DetalleCompra/',
        detallePutComprobarVenta: 'api/ComprobarVenta/',
    };

    var DetalleCompraFactory = {

        postDetalleCompra: function (Dto) {

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + $cookies.get('token'),
            };

            return $http.post(url + api.detalle, Dto, { headers: headers })
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



app.factory('CompraFactory', function ($http, $cookies) {

    var url = 'https://localhost:44385/';

    var api = {
        compra: 'api/Compra/',
        deleteCompra: 'api/Compra/',
    };


    var CompraFactory = {

        postCompra: function (obj) {

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + $cookies.get('token'),
            };

            return $http.post(url + api.compra, obj, { headers: headers }).success(function (data) {

                // console.log(data);
                return data;

            }).error(function (err) {
                console.log(err);
            })

        },

        deleteCompra: function (id) {

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + $cookies.get('token'),
            };

            return $http.delete(url + api.deleteCompra + id, { headers: headers }).success(function (data) {

                return data;

            }).error(function (err) {

                Swal.fire(
                    'Disculpe',
                    'No existe esa compra, vuelva a intentarlo',
                    'error'
                  );
                console.log(err);
            })

        },


    };

    return CompraFactory;

});