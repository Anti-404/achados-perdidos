import Model from '../../core/model/index.js';

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

 async getThingsDiscard(){

  const endpoint = `${this.path}${this.nameController}/getalldiscard`;
  
  try {            
      const response = await fetch(endpoint);           
      
      return await response.json();
                  
    } catch(e) {
      console.log(e);
    }

}

async getThingsReturned(){

  const endpoint = `${this.path}${this.nameController}/getallreturned`;
  
  try {            
      const response = await fetch(endpoint);           
      
      return await response.json();
                  
    } catch(e) {
      console.log(e);
    }


  }
 
}