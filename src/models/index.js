export default class Model{
    constructor(nameController) {
        this.path = "http://localhost/smd/projeto/api/public/";  
        this.nameController = nameController;
     }


     async get(id){
      const endpoint = `${this.path}${this.nameController}/get/${id}`;
              
        try {            
            const response = await fetch(endpoint);           
            
            return response.json();
                        
          } catch(e) {
            console.log(e);
          }     
      }

    async getAll(){

        const endpoint = `${this.path}${this.nameController}`;             
        try {            
            const response = await fetch(endpoint);           
            
            return await response.json();
                        
          } catch(e) {
            console.log(e);
          }

     }

     insert(addressRedirecting, fields){       
      const endpoint = `${this.path}${this.nameController}/insert`;      

      let data = fields;     

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

          
        }       

      });
      

    }

    update(addressRedirecting, fields){
    const endpoint = `${this.path}${this.nameController}/update`;
                   
      const data =  fields;            
      
      jQuery.ajax({              
        type:'POST',
        url:endpoint,
        data:data,
        success:function(response){          
          if(!response.error){                              
            alert("Editado com Sucesso");                 
            window.location.href = `${addressRedirecting}`;

          }else{
              alert(response.error);
          }
          
        }       

      });      

    }

    delete(addressRedirecting, id){
  
  const endpoint = `${this.path}${this.nameController}/delete/${id}`;

  try {            
    
    jQuery.ajax({              
      type:'GET',
      url:endpoint,
      success:function(response){          
        if(!response.error){                              
          alert("Excluido com Sucesso");                           
          window.location.href = `${addressRedirecting}`;

        }else{
            alert(response.error);
        }
        
      }       

    });
                  
    } catch(e) {
      console.log(e);
    }

    }

}
