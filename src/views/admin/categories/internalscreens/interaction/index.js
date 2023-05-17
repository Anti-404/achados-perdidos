import ModelCategory from '../../../../../models/categories/index.js';

class CategoriesInteraction{

    constructor(){        
        this.modelCategory  = new  ModelCategory();
        this.identifier = this.retrieveURLId();        
    }

    retrieveURLId(){
        let url = (window.location.href).split("/");        
        url = url[url.length-1];
        let identifier = url.split("=")[1]; 
    
        return identifier;    
    }

    async getCategoryById(){    
                
        let category = await this.modelCategory.get(this.identifier);     
        if(!category.erro){
            document.querySelector("#name").value = category.result.name;
        }else{
            alert(category.erro);
        }        

        
    } 
    
    update(){
        const addressRedirecting = "src/views/admin/categories/";
        const id = this.identifier;

        document.querySelector("#update-button").addEventListener("click",(e)=>{                        
            e.preventDefault();

            let name = document.querySelector("#name").value;
            this.modelCategory.update(addressRedirecting,{ id, name}); 
        });


    }

    delete(){
        const addressRedirecting = "src/views/admin/categories/";
        const id = this.identifier;

        document.querySelector("#delete-button").addEventListener("click",(e)=>{            
            e.preventDefault();

            this.modelCategory.delete(addressRedirecting, id); 
        });
    }

    enableButton(){
        document.querySelector("#name").addEventListener("focus",()=>{
            document.querySelector("#update-button").removeAttribute("disabled");  
        });

    }
     
}

const categoriesInteraction = new CategoriesInteraction();
categoriesInteraction.getCategoryById();
categoriesInteraction.update();
categoriesInteraction.delete();
categoriesInteraction.enableButton();