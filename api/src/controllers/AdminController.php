<?php
namespace src\controllers;

use \core\Controller;
use \src\models\Admins;


class AdminController extends Controller {

    public function __construct(){
        parent::__construct();
    }

    public function login($id){ 
        
        $user = filter_input(INPUT_POST, 'user');
        $password = md5(filter_input(INPUT_POST, 'password'));
        
        
        if($user && $password) {
            
            $data = Admins::select()->where('user', $user)->where('password', $password)->get();
            
            if(count($data[0]) > 0){                
                
                $this->array['result'] = [
                    'id' => $data[0]['hash'],                
                    'user' => $user, 
                    
                ];
    
            } else {
                $this->array['error'] = 'Usuario inexistente';
            }

        } else {
            $this->array['error'] = 'Usuario ou Senha nao enviado';
        } 
        
        
        echo json_encode($this->array);
        exit;
    
    }

}