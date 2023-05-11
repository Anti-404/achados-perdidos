<?php
namespace src\controllers;

use \core\Controller;
use \src\models\Objeto;


class ObjetosController extends Controller {

    public function __construct(){
        parent::__construct();
    }

    public function index() {
        
        $objetos = Objeto::select()->orderBy('id','desc')->get();                
        
        
        if(count($objetos) > 0){
            foreach($objetos as $item) {
                $this->array['result'][] = [
                    'id' => $item['id'],                
                    'img_endereco' => $item['img_endereco'],
                    'descricao' => $item['descricao'],
                    'local' => $item['local'],
                    'data' => $item['data'],
                    'status_retirada' => $item['status_retirada'],
                    'status_reservado' => $item['status_reservado'],                
                    'id_categoria' => $item['id_categoria']
                ];
            }
        }
        
             
        echo json_encode($this->array);
        exit;
        
    }

    public function get($id){    
        
        if($id) {
            
            $data = Objeto::select()->where($id)->get();
            
            if(count($data[0]) > 0){                
                
                $this->array['result'] = [
                    'id' => $data[0]['id'],                
                    'img_endereco' => $data[0]['img_endereco'],
                    'descricao' => $data[0]['descricao'],
                    'local' => $data[0]['local'],
                    'data' => $data[0]['data'],
                    'status_retirada' => $data[0]['status_retirada'],
                    'status_reservado' => $data[0]['status_reservado'],                
                    'id_categoria' => $data[0]['id_categoria']
                ];
    
            } else {
                $this->array['error'] = 'ID inexistente';
            }

        } else {
            $this->array['error'] = 'ID não enviado';
        } 
        
        
        echo json_encode($this->array);
        exit;
    
    }

    public function getAllByCategory($id_categoria){
              
        if($id_categoria) {
           
            $objetos = Objeto::select()->orderBy('id','desc')->where('id_categoria', $id_categoria)->execute();
            
            if(count($objetos) > 0){                
                
                if(count($objetos) > 0){
                    foreach($objetos as $item) {
                        $this->array['result'][] = [
                            'id' => $item['id'],                
                            'img_endereco' => $item['img_endereco'],
                            'descricao' => $item['descricao'],
                            'local' => $item['local'],
                            'data' => $item['data'],
                            'status_retirada' => $item['status_retirada'],
                            'status_reservado' => $item['status_reservado'],                
                            'id_categoria' => $item['id_categoria']
                        ];
                    }
                }
    
            } else {
                $this->array['error'] = 'ID inexistente';
            }

        } else {
            $this->array['error'] = 'ID não enviado';
        } 
        
        
        echo json_encode($this->array);
        exit;
    
    }

    public function delete($id){                

        if($id) {            
            Objeto::delete()->where('id',$id['id'])->execute();                

        } else {
            $this->array['error'] = 'ID não enviado';
        } 
        
        
        echo json_encode($this->array);
        exit;
    
    }

    public function update(){  
        
        $id = filter_input(INPUT_POST, 'id');
        $img_endereco = filter_input(INPUT_POST, 'img_endereco');        
        $descricao = filter_input(INPUT_POST, 'descricao');
        $local = filter_input(INPUT_POST, 'local');
        $status_retirada = filter_input(INPUT_POST, 'status_retirada');
        $status_reservado = filter_input(INPUT_POST, 'status_reservado');         
        $id_categoria = filter_input(INPUT_POST, 'id_categoria');
        
        
        $dados = [
            'id' => $id,
            'img_endereco' => $img_endereco,
            'descricao' => $descricao,
            'local' => $local,
            'status_retirada' => $status_retirada,
            'status_reservado' => $status_reservado,
            'id_categoria' => $id_categoria            
        ];

        

        if($dados['id'] && $dados['img_endereco']) {   
            $objeto = Objeto::select()->where('id', $dados['id'])->execute();            

            if(count($objeto) > 0){

                Objeto::update()->set(
                    [
                        'img_endereco' => $dados['img_endereco'],
                        'descricao' => $dados['descricao'], 
                        'local'=>$dados['local'],
                        'status_retirada'=>$dados['status_retirada'],
                        'status_reservado'=>$dados['status_reservado'],
                        'id_categoria'=>$dados['id_categoria'],
                    ]
                    )->where('id', $dados['id'])->execute();
                
                $this->array['result'] = [
                        'img_endereco' => $dados['img_endereco'],
                        'descricao' => $dados['descricao'], 
                        'local'=>$dados['local'],
                        'status_retirada'=>$dados['status_retirada'],
                        'status_reservado'=>$dados['status_reservado'],
                        'id_categoria'=>$dados['id_categoria'],
                ];

            }else{
                $this->array['error'] = 'ID inexistente';
            }                 
            

        } else {
            $this->array['error'] = 'Dados não enviados';
        } 


        echo json_encode($this->array);
        exit;
 
    }
    
    public function insert(){        
        
       if(isset($_FILES['img_endereco'])){
            $arquivo = $_FILES['img_endereco'];        
            $extensaoImgUpada = explode('/',$_FILES['img_endereco']['type'])[1];
            /*
            $descricao = filter_input(INPUT_POST, 'descricao')??'';
            $local = filter_input(INPUT_POST, 'local')??'';    
            $id_categoria = filter_input(INPUT_POST, 'id_categoria');         
            */

            $descricao = $_POST['descricao'];
            $local = $_POST['local'];    
            $id_categoria = $_POST['id_categoria'];
                    
            if(isset($arquivo['tmp_name']) && empty($arquivo['tmp_name']) == false){
                
                $img_endereco = '../assets/imgs/'.md5(time().rand(0,99)).'.'.$extensaoImgUpada;        
                move_uploaded_file($arquivo['tmp_name'], $img_endereco);   
                   

                if($id_categoria)  {   
                    Objeto::insert(
                        [   
                            'img_endereco' => $img_endereco,
                            'descricao'=>$descricao,
                            'local'=>$local,
                            'id_categoria'=>$id_categoria
                        ]
                    )->execute();            
                            

                } else {
                    $this->array['error'] = 'Dados não enviados';
                } 
                
                
            }       
            
                
                
                
                echo json_encode($this->array);
                exit;
        }
    }

}
