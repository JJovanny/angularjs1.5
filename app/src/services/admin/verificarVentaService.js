'use strict';

app.factory('DetalleCompraFactory', function ($http, $cookies) {

    var url = 'https://localhost:44385/';

    var api = {
        detallePut: 'api/DetalleCompra/',
        detalleGetAll : 'api/DetalleCompra/',
        detallePutComprobarVenta: 'api/ComprobarVenta/',
        detallePost: 'api/DetalleCompra/',
        detalleDelete :'api/DetalleCompra/',
        detalleGet : 'api/DetalleCompra/',

    };

    var DetalleCompraFactory = {

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

        getDetalleCompra :function(id){


            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + $cookies.get('token'),
            };


            return $http.get(url + api.detalleGet + id, { headers: headers })
                .success(function (data) {

                    return data;

                }).error(function (err) {

                    console.log(err);

                })



        },
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

        deleteDetalleCompra : function(idDetalle){

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + $cookies.get('token'),
            };

            return $http.delete(url + api.detalleDelete+ idDetalle, { headers: headers })
            .success(function (data) {
                //console.log(data);
                return data;

            }).error(function (err) {

                Swal.fire(
                    'Disculpe',
                    'No existe esa Compra, vuelva a intentarlo',
                    'error'
                  );
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


        verificarComprobante: function(id,verificacion) {

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + ' ' + $cookies.get('token'),
            };

            var obj = {id : id, verificacion : verificacion };

            return $http.put(url + api.detallePutComprobarVenta + id,obj,{ headers: headers })
                .success(function (data) {

                    console.log(data);
                    return data;

                }).error(function (err) {
                    console.log(err);
                })

        }
    

    };

    return DetalleCompraFactory;

});


