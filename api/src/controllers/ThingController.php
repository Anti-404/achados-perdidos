<?php
namespace src\controllers;

use \core\Controller;
use \src\models\Things;


class ThingController extends Controller {

    public function __construct(){
        parent::__construct();
    }

    public function index() {
        
        $things = Things::select()->orderBy('id','desc')->get();                
        
        
        if(count($things) > 0){
            foreach($things as $item) {
                $this->array['result'][] = [
                    'id' => $item['id'],                
                    'image_address' => $item['image_address'],
                    'description' => $item['description'],
                    'local' => $item['local'],
                    'date' => $item['date'],
                    'reserved_status' => $item['reserved_status'],
                    'returned_status' => $item['returned_status'],                
                    'category_id' => $item['category_id']
                ];
            }
        }
        
             
        echo json_encode($this->array);
        exit;
        
    }

    public function get($id){    
        
        if($id) {
            
            $item = Things::select()->where($id)->get();
            
            if(count($item[0]) > 0){                
                
                $this->array['result'] = [
                    'id' => $item[0]['id'],                
                    'image_address' => $item[0]['image_address'],
                    'description' => $item[0]['description'],
                    'local' => $item[0]['local'],
                    'date' => $item[0]['date'],
                    'reserved_status' => $item[0]['reserved_status'],
                    'returned_status' => $item[0]['returned_status'],                
                    'category_id' => $item[0]['category_id']
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

    public function getAllByCategory($categoryId){
              
        if($categoryId) {
           
            $things = Things::select()->orderBy('id','desc')->where('category_id', $categoryId)->execute();
            
            if(count($things) > 0){                
                
                if(count($things) > 0){
                    foreach($things as $item) {
                        $this->array['result'][] = [
                            'id' => $item['id'],                
                            'image_address' => $item['image_address'],
                            'description' => $item['description'],
                            'local' => $item['local'],
                            'date' => $item['date'],
                            'reserved_status' => $item['reserved_status'],
                            'returned_status' => $item['returned_status'],                
                            'category_id' => $item['category_id']
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

    public function getAllReserved() {
        
        $things = Things::select()->where('reserved_status','1')->orderBy('id','desc')->get();                
        
        
        if(count($things) > 0){
            foreach($things as $item) {
                $this->array['result'][] = [
                    'id' => $item['id'],                
                        'image_address' => $item['image_address'],
                        'description' => $item['description'],
                        'local' => $item['local'],
                        'date' => $item['date'],
                        'reserved_status' => $item['reserved_status'],                                           
                        'category_id' => $item['category_id']
                ];
            }
        }
        
             
        echo json_encode($this->array);
        exit;
        
    }

    public function delete($id){                

        if($id) {            
            Things::delete()->where('id',$id['id'])->execute();                

        } else {
            $this->array['error'] = 'ID não enviado';
        } 
        
        
        echo json_encode($this->array);
        exit;
    
    }

    public function update(){  
        
        $id = filter_input(INPUT_POST, 'id');
        $imageAddress = filter_input(INPUT_POST, 'image_address');        
        $description = filter_input(INPUT_POST, 'description');
        $local = filter_input(INPUT_POST, 'local');
        $returnedStatus = filter_input(INPUT_POST, 'returned_status');
        $reservedStatus = filter_input(INPUT_POST, 'reserved_status');         
        $categoryId = filter_input(INPUT_POST, 'category_id');
        
        
        $data = [
            'id' => $id,
            'image_address' => $imageAddress,
            'description' => $description,
            'local' => $local,
            'returned_status' => $returnedStatus,
            'reserved_status' => $reservedStatus,
            'category_id' => $categoryId            
        ];

        

        if($data['id'] && $data['image_address']) {   
            $things = Things::select()->where('id', $data['id'])->execute();            

            if(count($things) > 0){

                Things::update()->set(
                    [
                        'image_address' => $data['image_address'],
                        'description' => $data['description'], 
                        'local'=>$data['local'],
                        'returned_status'=>$data['returned_status'],
                        'reserved_status'=>$data['reserved_status'],
                        'category_id'=>$data['category_id'],
                    ]
                    )->where('id', $data['id'])->execute();
                
                $this->array['result'] = [
                        'image_address' => $data['image_address'],
                        'description' => $data['description'], 
                        'local'=>$data['local'],
                        'returned_status'=>$data['returned_status'],
                        'reserved_status'=>$data['reserved_status'],
                        'category_id'=>$data['category_id'],
                ];

            }else{
                $this->array['error'] = 'ID inexistente';
            }                 
            

        } else {
            $this->array['error'] = 'data não enviados';
        } 


        echo json_encode($this->array);
        exit;
 
    }
    
    public function insert(){        
        
       if(isset($_FILES['image_address'])){
            $file = $_FILES['image_address'];        
            $extensionUploadedImage = explode('/',$_FILES['image_address']['type'])[1];
            
            $description = $_POST['description'];
            $local = $_POST['local'];    
            $categoryId = $_POST['category_id'];
                  
            if(isset($file['tmp_name']) && empty($file['tmp_name']) == false){
                
                $imageAddres = '../assets/imgs/'.md5(time().rand(0,99)).'.'.$extensionUploadedImage;        
                move_uploaded_file($file['tmp_name'], $imageAddres);                   
                

                if($categoryId)  {   
                    Things::insert(
                        [   
                            'image_address' => $imageAddres,
                            'description'=>$description,
                            'local'=>$local,
                            'category_id'=>$categoryId
                        ]
                    )->execute();            
                            

                } else {
                    $this->array['error'] = 'data não enviados';
                } 
                
                
            }       
            
                
                
                
                echo json_encode($this->array);
                exit;
        }
    }

}
