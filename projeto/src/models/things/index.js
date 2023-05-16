import Model from '../index.js';

export default class ModelThings extends Model{
    constructor() {
        super('thing');
   }    

   async getThingsByCategoryId(categoryId){
          
    const endpoint = `${this.path}${this.nameController}/getallbycategory/${categoryId}`;
    
    try {   
           
        const response = await fetch(endpoint);          
        
        return await response.json();
                    
      } catch(e) {
        console.log(e);
      }

   }

   async getThingsReserved(){

    const endpoint = `${this.path}${this.nameController}/getallreserved`;
    
    try {            
        const response = await fetch(endpoint);           
        
        return await response.json();
                    
      } catch(e) {
        console.log(e);
      }

 }
 
 insert(addressRedirecting, fileds){       
  const endpoint = `${this.path}${this.nameController}/insert`;         
  let data = fileds; 
  jQuery.ajax({              
    type:'POST',
    url:endpoint,
    data:data,
       
    success:function(response){          
      if(!response.error){                              
        alert("Cadastrado com Sucesso");
        window.location.href = addressRedirecting;

      }else{
          alert(response.error);
      }  
    },
    
    cache: false,
    contentType: false,
    processData: false,
    xhr: function() { 
        var myXhr = $.ajaxSettings.xhr();
        if (myXhr.upload) { 
            myXhr.upload.addEventListener('progress', function() {
                
            }, false);
        }
        return myXhr;
    } 

  });
  

 }





}