'use strict';


app.factory('registrarUsuarioFactory',function($http,$cookies){


var url = 'https://localhost:44385/';

var api = {

registrarUsuario : 'api/Login/RegistrarUsuario',

};


var registrarUsuarioFactory = {


postRegistrarusuario : function(Dto){



return $http.post(url + api.registrarUsuario, Dto)
.success(function(data){

    return data;

}).error(function(err){

console.log(err);

});





}



}


return registrarUsuarioFactory;


});