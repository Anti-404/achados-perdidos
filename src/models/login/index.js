import Model from '../index.js';

export default class ModelAdmins extends Model{
    constructor() {
        super('admin');
     }

     login(addressRedirecting, fields){          
        
        const endpoint = `${this.path}${this.nameController}/login`;       
        
        let data = fields;
          
          jQuery.ajax({
            
            type:'POST',
            url:endpoint,
            data:data,
            success:function(response){

              if(!response.error){                                  
                localStorage.setItem("hash", response.result.hash);
                window.location.href = addressRedirecting;
              }else{
                  alert(response.error);
              }
              
            }
            
          });
          
       
      }
}