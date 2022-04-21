'use strict';

app.factory('proveedorFactory',function($http, $cookies){


var url = 'https://localhost:44385/';

var api = {

getAllProveedores : 'api/Proveedores',
getProveedores : 'api/Proveedores/',
postproveedores : 'api/Proveedores',
putProveedores : 'api/Proveedores/',
deleteProveedores : 'api/Proveedores/Delete/'
};



var proveedorFactory = {



getProveedores : function(){

    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + $cookies.get('token'),
    };


    return $http.get(url + api.getAllProveedores, {headers : headers}).success(function(data){

      return data;

    }).error(function(err){

        console.log(err);

    });




},


postProveedor : function(Dto){

    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + $cookies.get('token'),
    };



    return $http.post(url + api.postproveedores, Dto, {headers : headers}).success(function(data){

        return data;
  
      }).error(function(err){
  
          console.log(err);
  
      });




},


putProveedor : function(id,Dto) {
    

    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + $cookies.get('token'),
    };


    return $http.put(url + api.putProveedores + id, Dto, {headers : headers}).success(function(data){

        return data;
  
      }).error(function(err){
  
          console.log(err);
  
      });


},


deleteProveedor : function(id){

    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + $cookies.get('token'),
    };


    return $http.get(url + api.deleteProveedores + id, {headers : headers}).success(function(data){

        return data;
  
      }).error(function(err){
  
          console.log(err);
  
      });


}





};




return proveedorFactory;


});