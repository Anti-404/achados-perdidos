<?php
namespace src\controllers;

use \core\Controller;
use \src\models\Adm;


class AdmsController extends Controller {

    public function __construct(){
        parent::__construct();
    }

    public function login($id){ 
        
        $usuario = filter_input(INPUT_POST, 'usuario');
        $senha = md5(filter_input(INPUT_POST, 'senha'));
        
        
        if($usuario && $senha) {
            
            $data = Adm::select()->where('usuario', $usuario)->where('senha', $senha)->get();
            
            if(count($data[0]) > 0){                
                
                $this->array['result'] = [
                    'id' => $data[0]['hash'],                
                    'usuario' => $usuario, 
                    
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