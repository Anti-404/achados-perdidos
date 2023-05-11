<?php
use core\Router;

$router = new Router();

$router->get('/categorias', 'CategoriasController@index'); 
$router->get('/categorias/get/{id}', 'CategoriasController@get'); 
$router->get('/categorias/delete/{id}', 'CategoriasController@delete'); 
$router->post('/categorias/update', 'CategoriasController@update');
$router->post('/categorias/insert', 'CategoriasController@insert');


$router->get('/objetos', 'ObjetosController@index'); 
$router->get('/objetos/get/{id}', 'ObjetosController@get'); 
$router->get('/objetos/delete/{id}', 'ObjetosController@delete'); 
$router->post('/objetos/update', 'ObjetosController@update');
$router->post('/objetos/insert', 'ObjetosController@insert');
$router->get('/objetos/getallbycategory/{idcategoria}', 'ObjetosController@getAllByCategory');



$router->post('/adms/login', 'AdmsController@login'); 
