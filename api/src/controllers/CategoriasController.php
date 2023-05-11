<?php
namespace src\controllers;

use \core\Controller;
use \src\models\Categoria;


class CategoriasController extends Controller {

    public function __construct(){
        parent::__construct();
    }

    public function index() {
        
        $categorias = Categoria::select()->orderBy('id','desc')->get();                
        
        if(count($categorias) > 0){
            foreach($categorias as $item) {
                $this->array['result'][] = [
                    'id' => $item['id'],
                    'nome' => $item['nome']
                ];
            }
        }
        
             
        echo json_encode($this->array);
        exit;
        
    }

    public function get($id){
        $categoria = Categoria::select()->where($id)->get();

        if($id) {
            
            if(count($categoria) > 0){                
    
                $this->array['result'] = [
                    'id' => $categoria[0]['id'],
                    'nome' => $categoria[0]['nome']
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

    public function delete($id){     
        
        if($id) {            
            Categoria::delete()->where('id',$id['id'])->execute(); 
            $array['error'] = '';               

        } else {
            $array['error'] = 'ID não enviado';
        } 
        
        
        echo json_encode($array);
        exit;
    
    }

    public function update(){  
        
        $id = filter_input(INPUT_POST, 'id');
        $nome = filter_input(INPUT_POST, 'nome');
        
        $dados = [
            'id' => $id,
            'nome' => $nome
        ];

        if($dados['id'] && $dados['nome']) {   
            $categoria = Categoria::select()->where('id', $dados['id'])->execute();            

            if(count($categoria) > 0){

                Categoria::update()->set('nome',$dados['nome'])->where('id', $dados['id'])->execute();
                
                $this->array['result'] = [
                    'id' => $dados['id'],
                    'nome' => $dados['nome']
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

        $nome = filter_input(INPUT_POST, 'nome');        

        if($nome) {   
            Categoria::insert(
                [
                    ['nome'=>$nome]
                ]
            )->execute();            

        } else {
            $this->array['error'] = 'Dados não enviados';
        } 
        
        
        echo json_encode($this->array);
        exit;
 
    }

}