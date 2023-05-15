import ModelCategories from '../../../../../models/categories/index.js';

class CategoriesRegistration{

    constructor(){        
        this.modelCategories = new  ModelCategories();
        
    }
    
    save(){        
        document.querySelector("#save-button").addEventListener("click", (e)=>{ 
            e.preventDefault();
            
            let name = document.querySelector("#name").value; 
            
            let addressRedirecting = '';

            if(localStorage.getItem("redirProdReg")){
                addressRedirecting = localStorage.getItem("redirProdReg");
            }else{
                addressRedirecting = "http://localhost/smd/projeto/src/views/admin/categories/";  
            }
             
                         
            this.modelCategories.insert(addressRedirecting, {name});           
        
       });
    }

}

const categoriesRegistration = new CategoriesRegistration();
categoriesRegistration.save();