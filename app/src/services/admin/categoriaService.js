'use strict';

app.factory('categoriaFactory', function ($http, $cookies) {

var url = 'https://localhost:44385/';


var api = {

getAllCategorias : 'api/Categoria',


};

var categoriaFactory = {


getAllCategorias : function(){

    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + $cookies.get('token'),
    };

return $http.get(url + api.getAllCategorias, {headers : headers})
.success(function(data){

    return data;
}).error(function(err){

    console.log(err);
});



}



};


return categoriaFactory;



});