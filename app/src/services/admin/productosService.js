'use strict';

app.factory('productosFactory',function($http, $cookies){

    var url = 'https://localhost:44385/';
     var url2 = 'https://localhost:44351/';


    var api = {
        productosPost: 'api/Producto/',
        Getproductos: 'api/Producto/',
        deleteProducto : 'api/Producto/Delete/'
    };


var productosFactory = {


postProductos : function(objeto){

    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + $cookies.get('token'),
    };

    

return $http.post(url+api.productosPost,objeto,{headers : headers})
.success(function(data){

return data;

}).error(function(err){

console.log(err);

});



},

getProductos: function () {

    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + $cookies.get('token'),
    };

    return $http.get(url + api.Getproductos, { headers: headers }).success(function (data) {

        return data;

    }).error(function (err) {
        console.log(err);
    })

},


deleteProducto : function(id){

   
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + $cookies.get('token'),
    };


    return $http.get(url + api.deleteProducto + id ,{ headers: headers }).success(function (data) {

        return data;

    }).error(function (err) {
        console.log(err);
    })



}



};


return productosFactory;

});
