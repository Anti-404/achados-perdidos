import ModelCategory from '../../../../../models/categories/index.js';
import Controller from '../../../../../core/controller/index.js';

class CategoriesInteraction extends Controller{

    constructor(){     
        super();   
        this.modelCategory  = new  ModelCategory();
        this.identifier = this.retrieveURLId();    
        this.prevPage = this.getPrevPageURL();        
        
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
        
        document.querySelector('input[name=id]').value = this.identifier;

        document.querySelector("#update-button").addEventListener("click",(e)=>{                        
            e.preventDefault();

            let form = document.querySelector('form');
            
            let formData = new FormData(form);                                    
            this.modelCategory.update(this.prevPage,formData);           
        });


    }

    delete(){        
        const id = this.identifier;

        document.querySelector("#delete-button").addEventListener("click",(e)=>{            
            e.preventDefault();

            this.modelCategory.delete(this.prevPage, id); 
        });

        
    }

    enableButton(){
        document.querySelector("#name").addEventListener("focus",()=>{
            document.querySelector("#update-button").removeAttribute("disabled");  
        });

    }

    handlerPageBack(){                
        document.querySelector("#back").addEventListener('click', ()=>{
            window.history.back();            
        });
    }
   
     
}

const categoriesInteraction = new CategoriesInteraction();
categoriesInteraction.getCategoryById();
categoriesInteraction.update();
categoriesInteraction.delete();
categoriesInteraction.enableButton();
categoriesInteraction.handlerPageBack();