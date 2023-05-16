<?php
use core\Router;

$router = new Router();

$router->get('/category', 'CategoryController@index'); 
$router->get('/category/get/{id}', 'CategoryController@get'); 
$router->get('/category/delete/{id}', 'CategorysController@delete'); 
$router->post('/category/update', 'CategoryController@update');
$router->post('/category/insert', 'CategoryController@insert');


$router->get('/thing', 'ThingController@index'); 
$router->get('/thing/get/{id}', 'ThingController@get'); 
$router->get('/thing/delete/{id}', 'ThingController@delete'); 
$router->post('/thing/update', 'ThingController@update');
$router->post('/thing/insert', 'ThingController@insert');
$router->get('/thing/getallbycategory/{categoryid}', 'ThingController@getAllByCategory');
$router->get('/thing/getallreserved', 'ThingController@getAllReserved');

$router->get('/admin/get/{id}', 'AdminController@get');
$router->post('/admin/login', 'AdminController@login'); 
$router->post('/admin/update', 'AdminController@update'); 
