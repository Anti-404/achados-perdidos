<?php
namespace src\controllers;

use \core\Controller;
use \src\models\Things;
use DateTime;
use DateTimeZone;


class ThingController extends Controller {    

    public function __construct(){
        parent::__construct();               
    }

    public function index() {
        
       $things = Things::select()
       ->where('reserved_status','0')
       ->where('returned_status','0')
       ->orderBy('id','desc')->get();      
       
       $timezone = new DateTimeZone('America/Fortaleza');
              
       if(count($things) > 0){
                foreach($things as $item) {                    
                    $diffDates = $this->checkDateDifference($timezone, $item['date'], 259200); 

                    if(!$diffDates){ 
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
           
            $things = Things::select()
            ->where('reserved_status','0')
            ->where('returned_status','0')
            ->where('category_id', $categoryId)
            ->orderBy('id','desc')
            ->execute();
            
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

    public function getAllByCategoryAndReserved($categoryId){
              
        if($categoryId) {
           
            $things = Things::select()
            ->where('reserved_status','1')
            ->where('returned_status','0')
            ->where('category_id', $categoryId)
            ->orderBy('id','desc')
            ->execute();
            
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
        
        $things = Things::select()->where('reserved_status','1')->where('returned_status','0')->orderBy('id','desc')->get();                
        $timezone = new DateTimeZone('America/Fortaleza');
        
        if(count($things) > 0){            
            foreach($things as $item) {
                 // 259200 == 3 dias | 15768000 == 6 meses                
                $diffDates = $this->checkDateDifference($timezone, $item['date'], 259200);
                if(!$diffDates){ 
                    $this->array['result'][] = [
                        'id' => $item['id'],                
                            'image_address' => $item['image_address'],
                            'description' => $item['description'],
                            'local' => $item['local'],
                            'register_date' => $item['date'],
                            'reserved_status' => $item['reserved_status'],                                           
                            'category_id' => $item['category_id']
                    ];
                }    
            }
        }
        
             
        echo json_encode($this->array);
        exit;
        
    }

    public function getAllReturned() {
        
        $things = Things::select()->where('returned_status','1')->orderBy('id','desc')->get();                
        
        
        if(count($things) > 0){
            foreach($things as $item) {
                $this->array['result'][] = [
                    'id' => $item['id'],                
                        'image_address' => $item['image_address'],
                        'description' => $item['description'],
                        'local' => $item['local'],
                        'register_date' => $item['date'],
                        'reserved_status' => $item['reserved_status'],                                           
                        'category_id' => $item['category_id']
                ];
            }
        }
        
             
        echo json_encode($this->array);
        exit;
        
    }

    public function getAllDiscard() {
        
        $things = Things::select()->orderBy('id','desc')->get();  
        $timezone = new DateTimeZone('America/Fortaleza');

        if(count($things) > 0){
            
            foreach($things as $item) {
                // 259200 == 3 dias | 15768000 == 6 meses                
                $diffDates = $this->checkDateDifference($timezone, $item['date'], 259200); 
                
                 if($diffDates){ 
                    $this->array['result'][] = [
                        'id' => $item['id'],                
                            'image_address' => $item['image_address'],
                            'description' => $item['description'],
                            'local' => $item['local'],
                            'date' => $item['date'],
                            'reserved_status' => $item['reserved_status'],                                           
                            'category_id' => $item['category_id'],
                            'diff_dates' => $diffDates
                    ];
                 }
                
            }
        }
        
             
        echo json_encode($this->array);
        exit;
        
    }

    public function delete($id){
        if($id) {            
            Things::delete()->where('id',$id['id'])->execute(); 
            $this->array['error'] = '';               

        } else {
            $this->array['error'] = 'ID não enviado';
        } 
        
        
        echo json_encode($this->array);
        exit;
    
    }
        
    public function insert(){        
        
       if(isset($_FILES['image_address']) && !empty($_FILES['image_address'])){
            $file = $_FILES['image_address'];        
            $extensionUploadedImage = explode('/',$_FILES['image_address']['type'])[1];
            
            $description = filter_input(INPUT_POST, 'description');
            $local = filter_input(INPUT_POST, 'local');    
            $categoryId = filter_input(INPUT_POST, 'category_id');
                  
            if(isset($file['tmp_name']) && !empty($file['tmp_name'])){
                $nameImg = md5(time().rand(0,99));
                $imageAddres = 'api/assets/imgs/'.$nameImg.'.'.$extensionUploadedImage;      
                $localPathImageAddres = '../assets/imgs/'.$nameImg.'.'.$extensionUploadedImage;  
                move_uploaded_file($file['tmp_name'], $localPathImageAddres);                   
                

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
    
    public function update(){  
        $id = filter_input(INPUT_POST, 'id');
        $pathImageAddressDB = filter_input(INPUT_POST, 'image_address');
        $description = filter_input(INPUT_POST, 'description');
        $local = filter_input(INPUT_POST, 'local');
        $returnedStatus = filter_input(INPUT_POST, 'returned_status');
        $returnedStatus = (isset($returnedStatus))? '1':'0';
        $reservedStatus = filter_input(INPUT_POST, 'reserved_status');
        $reservedStatus = (isset($reservedStatus))? '1':'0';
        $categoryId = filter_input(INPUT_POST, 'category_id');        
       
       if($_FILES['image_address_update']['size']){
            $file = $_FILES['image_address_update'];        
            $extensionUploadedImage = explode('/',$_FILES['image_address_update']['type'])[1];            
                  
            if(isset($file['tmp_name']) && !empty($file['tmp_name'])){
                $nameImg = md5(time().rand(0,99));
                $pathImageAddressDB = 'api/assets/imgs/'.$nameImg.'.'.$extensionUploadedImage;        
                $localPathImageAddres = '../assets/imgs/'.$nameImg.'.'.$extensionUploadedImage;        
                move_uploaded_file($file['tmp_name'], $localPathImageAddres);   
            }   
                
        }       

        $data = [
            'id' => $id,
            'image_address' => $pathImageAddressDB,
            'description' => $description,
            'local' => $local,
            'returned_status' => $returnedStatus,
            'reserved_status' => $reservedStatus,
            'category_id' => $categoryId            
        ];

        
        if($data['id'] && $data['image_address'] && $data['category_id']) {   
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

    private function checkDateDifference(DateTimeZone $timezone, $date, $daysLimit){
        $dateThing = new DateTime($date);
        $now = new DateTime('now', $timezone);                               
        $diffDates =  $now->format('U') - $dateThing->format('U');        
        return ($diffDates > $daysLimit);
    }

}
